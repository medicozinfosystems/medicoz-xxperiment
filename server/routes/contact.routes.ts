import { Router, Request, Response } from 'express';
import { connectToMongoDB, getAdminContactsCollection } from '../db/mongodb';
import { ContactForm } from '../db/schemas';
import { ObjectId } from 'mongodb';

const router = Router();

// Submit contact form
router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { name, email, message, intent, links } = req.body;

    // Validation
    if (!name || !email || !message || !intent) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Intent validation
    const validIntents = ['partnership', 'pilot', 'sponsorship', 'careers'];
    if (!validIntents.includes(intent)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid intent selected'
      });
    }

    const db = await connectToMongoDB();
    const contactCollection = db.collection<ContactForm>('contacts');
    const adminContactCollection = await getAdminContactsCollection();

    // Create contact form entry
    const contactData: Omit<ContactForm, '_id'> = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      intent: intent as ContactForm['intent'],
      links: links?.trim() || undefined,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent'),
      isRead: false,
      isReplied: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to both main database and admin database
    const result = await contactCollection.insertOne(contactData);
    await adminContactCollection.insertOne(contactData);

    if (result.insertedId) {
      res.status(201).json({
        success: true,
        message: 'Thank you for your message! We\'ll get back to you soon.',
        contactId: result.insertedId
      });
    } else {
      throw new Error('Failed to save contact form');
    }

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
});

// Get all contact forms (admin only)
router.get('/admin/all', async (req: Request, res: Response) => {
  try {
    // TODO: Add admin authentication middleware
    const contactCollection = await getAdminContactsCollection();

    const contacts = await contactCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      contacts
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
});

// Get contact form by ID (admin only)
router.get('/admin/:id', async (req: Request, res: Response) => {
  try {
    // TODO: Add admin authentication middleware
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID'
      });
    }

    const contactCollection = await getAdminContactsCollection();

    const contact = await contactCollection.findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact form not found'
      });
    }

    res.json({
      success: true,
      contact
    });

  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    });
  }
});

// Mark contact as read (admin only)
router.patch('/admin/:id/read', async (req: Request, res: Response) => {
  try {
    // TODO: Add admin authentication middleware
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID'
      });
    }

    const contactCollection = await getAdminContactsCollection();

    const result = await contactCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          isRead: true,
          updatedAt: new Date()
        }
      }
    );

    if (result.modifiedCount > 0) {
      res.json({
        success: true,
        message: 'Contact marked as read'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

  } catch (error) {
    console.error('Error marking contact as read:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact'
    });
  }
});

// Reply to contact (admin only)
router.patch('/admin/:id/reply', async (req: Request, res: Response) => {
  try {
    // TODO: Add admin authentication middleware
    const { id } = req.params;
    const { replyMessage } = req.body;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID'
      });
    }

    if (!replyMessage) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }

    const contactCollection = await getAdminContactsCollection();

    const result = await contactCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          isReplied: true,
          replyMessage: replyMessage.trim(),
          repliedAt: new Date(),
          updatedAt: new Date()
        }
      }
    );

    if (result.modifiedCount > 0) {
      res.json({
        success: true,
        message: 'Reply saved successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

  } catch (error) {
    console.error('Error replying to contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save reply'
    });
  }
});

// Delete contact (admin only)
router.delete('/admin/:id', async (req: Request, res: Response) => {
  try {
    // TODO: Add admin authentication middleware
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact ID'
      });
    }

    const contactCollection = await getAdminContactsCollection();

    const result = await contactCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: 'Contact deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact'
    });
  }
});

export default router;
