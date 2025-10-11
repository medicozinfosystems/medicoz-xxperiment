import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getPostsCollection, getCommentsCollection, getEpisodesCollection } from '../db/mongodb';
import { requireAuth, optionalAuth, requireModerator } from '../middleware/auth';
import { contentModerator } from '../utils/moderation';
import { getPublicUserData, getUserById } from '../utils/auth';
import { notifyNewComment, notifyPostLiked } from './notifications.routes';
import type { Post, Comment, PostWithUser, CommentWithUser } from '../db/schemas';

const router = Router();

// Get all posts (general + episode specific)
router.get('/posts', optionalAuth, async (req: Request, res: Response) => {
  try {
    const { type, episodeId, page = '1', limit = '20', sort = 'recent' } = req.query;
    const postsCollection = await getPostsCollection();
    
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;
    
    // Build query
    const query: any = { isModerated: false };
    
    if (type === 'general') {
      query.episodeId = null;
      query.type = 'general';
    } else if (type === 'episode') {
      // If episodeId is provided, filter by that specific episode
      if (episodeId) {
        query.episodeId = new ObjectId(episodeId as string);
      } else {
        // Otherwise, show all episode posts (where episodeId is not null)
        query.episodeId = { $ne: null };
        query.type = 'episode';
      }
    }
    
    // Sorting
    let sortOption: any = { lastActivityAt: -1 }; // recent activity
    if (sort === 'popular') {
      sortOption = { likes: -1, commentCount: -1 };
    } else if (sort === 'new') {
      sortOption = { createdAt: -1 };
    }
    
    const posts = await postsCollection
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .toArray() as Post[];
    
    // Get user data for each post
    const postsWithUsers: PostWithUser[] = await Promise.all(
      posts.map(async (post) => {
        const user = await getUserById(post.userId);
        const episode = post.episodeId 
          ? await (await getEpisodesCollection()).findOne({ _id: post.episodeId }) 
          : undefined;
        
        return {
          ...post,
          user: user ? getPublicUserData(user) : null,
          episode
        } as any;
      })
    );
    
    const total = await postsCollection.countDocuments(query);
    
    res.json({
      posts: postsWithUsers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get single post
router.get('/posts/:id', optionalAuth, async (req: Request, res: Response) => {
  try {
    const postsCollection = await getPostsCollection();
    const post = await postsCollection.findOne({ 
      _id: new ObjectId(req.params.id) 
    }) as Post | null;
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Increment view count
    await postsCollection.updateOne(
      { _id: post._id },
      { $inc: { views: 1 } }
    );
    
    const user = await getUserById(post.userId);
    const episode = post.episodeId 
      ? await (await getEpisodesCollection()).findOne({ _id: post.episodeId }) 
      : undefined;
    
    const postWithUser: PostWithUser = {
      ...post,
      user: user ? getPublicUserData(user) : null,
      episode
    } as any;
    
    res.json({ post: postWithUser });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Create new post
router.post('/posts', requireAuth, async (req: Request, res: Response) => {
  try {
    const { title, content, type = 'general', episodeId, tags = [], isAnonymous = false } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    
    if (title.length < 5 || title.length > 200) {
      return res.status(400).json({ error: 'Title must be between 5 and 200 characters' });
    }
    
    if (content.length < 10) {
      return res.status(400).json({ error: 'Content must be at least 10 characters' });
    }
    
    // Check content moderation
    const moderationCheck = contentModerator.checkContent(title + ' ' + content);
    if (!moderationCheck.isAllowed) {
      return res.status(400).json({ 
        error: moderationCheck.reason,
        flaggedWords: moderationCheck.flaggedWords
      });
    }
    
    const postsCollection = await getPostsCollection();
    
    const newPost: Omit<Post, '_id'> = {
      userId: req.user!._id!,
      episodeId: episodeId ? new ObjectId(episodeId) : null,
      title,
      content,
      type: episodeId ? 'episode' : 'general',
      isAnonymous: Boolean(isAnonymous),
      isModerated: false,
      isPinned: false,
      isLocked: false,
      likes: 0,
      likedBy: [],
      commentCount: 0,
      views: 0,
      tags: Array.isArray(tags) ? tags.slice(0, 5) : [],
      createdAt: new Date(),
      updatedAt: new Date(),
      lastActivityAt: new Date()
    };
    
    const result = await postsCollection.insertOne(newPost as any);
    
    res.status(201).json({
      message: 'Post created successfully',
      postId: result.insertedId
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Like/unlike a post
router.post('/posts/:id/like', requireAuth, async (req: Request, res: Response) => {
  try {
    const postsCollection = await getPostsCollection();
    const postId = new ObjectId(req.params.id);
    const userId = req.user!._id!;
    
    const post = await postsCollection.findOne({ _id: postId }) as Post | null;
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const hasLiked = post.likedBy.some(id => id.equals(userId));
    
    if (hasLiked) {
      // Unlike
      await postsCollection.updateOne(
        { _id: postId },
        { 
          $pull: { likedBy: userId } as any,
          $inc: { likes: -1 }
        }
      );
      res.json({ message: 'Post unliked', liked: false });
    } else {
      // Like
      await postsCollection.updateOne(
        { _id: postId },
        { 
          $addToSet: { likedBy: userId },
          $inc: { likes: 1 }
        }
      );
      
      // Send notification to post author
      const likerName = req.user!.displayName || req.user!.username;
      notifyPostLiked(postId, userId, likerName).catch(console.error);
      
      res.json({ message: 'Post liked', liked: true });
    }
  } catch (error) {
    console.error('Like post error:', error);
    res.status(500).json({ error: 'Failed to like post' });
  }
});

// Get comments for a post
router.get('/posts/:id/comments', optionalAuth, async (req: Request, res: Response) => {
  try {
    const commentsCollection = await getCommentsCollection();
    const postId = new ObjectId(req.params.id);
    
    const comments = await commentsCollection
      .find({ postId, parentCommentId: null, isModerated: false })
      .sort({ createdAt: -1 })
      .toArray() as Comment[];
    
    // Get user data and replies for each comment
    const commentsWithUsers: CommentWithUser[] = await Promise.all(
      comments.map(async (comment) => {
        const user = await getUserById(comment.userId);
        
        // Get replies
        const replies = await commentsCollection
          .find({ parentCommentId: comment._id })
          .sort({ createdAt: 1 })
          .toArray() as Comment[];
        
        const repliesWithUsers = await Promise.all(
          replies.map(async (reply) => {
            const replyUser = await getUserById(reply.userId);
            return {
              ...reply,
              user: replyUser ? getPublicUserData(replyUser) : null
            } as CommentWithUser;
          })
        );
        
        return {
          ...comment,
          user: user ? getPublicUserData(user) : null,
          replies: repliesWithUsers
        } as CommentWithUser;
      })
    );
    
    res.json({ comments: commentsWithUsers });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Add comment to post
router.post('/posts/:id/comments', requireAuth, async (req: Request, res: Response) => {
  try {
    const { content, parentCommentId, isAnonymous = false } = req.body;
    const postId = new ObjectId(req.params.id);
    
    if (!content || content.trim().length < 1) {
      return res.status(400).json({ error: 'Comment content is required' });
    }
    
    if (content.length > 2000) {
      return res.status(400).json({ error: 'Comment is too long (max 2000 characters)' });
    }
    
    // Check content moderation
    const moderationCheck = contentModerator.checkContent(content);
    if (!moderationCheck.isAllowed) {
      return res.status(400).json({ 
        error: moderationCheck.reason,
        flaggedWords: moderationCheck.flaggedWords
      });
    }
    
    const commentsCollection = await getCommentsCollection();
    const postsCollection = await getPostsCollection();
    
    // Verify post exists
    const post = await postsCollection.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    const newComment: Omit<Comment, '_id'> = {
      postId,
      userId: req.user!._id!,
      content,
      isAnonymous: Boolean(isAnonymous),
      parentCommentId: parentCommentId ? new ObjectId(parentCommentId) : null,
      isModerated: false,
      likes: 0,
      likedBy: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await commentsCollection.insertOne(newComment as any);
    
    // Update post comment count and last activity
    await postsCollection.updateOne(
      { _id: postId },
      { 
        $inc: { commentCount: 1 },
        $set: { lastActivityAt: new Date() }
      }
    );
    
    // Send notification to post author
    const commenterName = isAnonymous ? 'Anonymous' : (req.user!.displayName || req.user!.username);
    notifyNewComment(postId, req.user!._id!, commenterName, content).catch(console.error);
    
    res.status(201).json({
      message: 'Comment added successfully',
      commentId: result.insertedId
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Get episodes
router.get('/episodes', async (req: Request, res: Response) => {
  try {
    const episodesCollection = await getEpisodesCollection();
    const episodes = await episodesCollection
      .find({})
      .sort({ episodeNumber: -1 })
      .toArray();
    
    res.json({ episodes });
  } catch (error) {
    console.error('Get episodes error:', error);
    res.status(500).json({ error: 'Failed to fetch episodes' });
  }
});

export default router;


