// Custom moderation filter without external dependencies
// Simple but effective profanity filtering

class ContentModerator {
  private commonProfanity: Set<string>;
  private allowedWomenHealthTerms: Set<string>;
  
  constructor() {
    // Common inappropriate words (partial list for demonstration)
    this.commonProfanity = new Set([
      'fuck', 'shit', 'ass', 'bitch', 'damn', 'hell', 'crap',
      'bastard', 'slut', 'whore', 'dick', 'cock', 'pussy',
      // Add more as needed, keeping medical terms out
    ]);
    
    // Terms related to women's health that should be allowed
    this.allowedWomenHealthTerms = new Set([
      'vagina', 'vulva', 'breast', 'breasts', 'period', 'periods',
      'menstruation', 'menstrual', 'ovulation', 'cervix', 'uterus',
      'pregnancy', 'pregnant', 'fertility', 'infertility', 'miscarriage',
      'abortion', 'contraception', 'pms', 'menopause', 'hormone',
      'hormones', 'estrogen', 'progesterone', 'testosterone',
      'pap', 'smear', 'mammogram', 'mastectomy', 'hysterectomy',
      'endometriosis', 'pcos', 'fibroids', 'cyst', 'cysts',
      'discharge', 'yeast', 'infection', 'uti', 'std', 'sti',
      'sex', 'sexual', 'sexuality', 'libido', 'orgasm',
      'tampon', 'pad', 'menstrual', 'cycle', 'ovary', 'ovaries',
      'labia', 'clitoris', 'vaginal', 'reproductive', 'gynecologist',
      'obstetrician', 'midwife', 'doula', 'lactation', 'breastfeeding',
      'postpartum', 'prenatal', 'trimester', 'embryo', 'fetus',
      'caesarean', 'epidural', 'contraction', 'labor', 'delivery',
      'pelvic', 'kegel', 'incontinence', 'prolapse', 'nipple', 'nipples',
      'puberty', 'adolescent', 'menarche', 'menarch', 'spotting',
      'cramp', 'cramps', 'ovulate', 'ovulating', 'implantation'
    ]);
  }
  
  /**
   * Check if content contains inappropriate language
   * Returns { isClean: boolean, flaggedWords: string[] }
   */
  moderateContent(text: string): { isClean: boolean; flaggedWords: string[] } {
    if (!text || text.trim().length === 0) {
      return { isClean: true, flaggedWords: [] };
    }
    
    const flaggedWords: string[] = [];
    
    // Check for profanity (excluding allowed terms)
    const words = text.toLowerCase().split(/\s+/);
    
    for (const word of words) {
      const cleanWord = word.replace(/[^a-z]/g, '');
      
      // Skip if it's an allowed women's health term
      if (this.allowedWomenHealthTerms.has(cleanWord)) {
        continue;
      }
      
      // Check if word is profane
      if (this.commonProfanity.has(cleanWord)) {
        flaggedWords.push(word);
      }
      
      // Check for variations with special characters (e.g., f*ck, sh!t)
      const variations = this.getVariations(cleanWord);
      for (const variant of variations) {
        if (this.commonProfanity.has(variant)) {
          flaggedWords.push(word);
          break;
        }
      }
    }
    
    return {
      isClean: flaggedWords.length === 0,
      flaggedWords: flaggedWords
    };
  }
  
  /**
   * Generate common character substitution variations
   */
  private getVariations(word: string): string[] {
    const variations: string[] = [word];
    
    // Common substitutions
    const substitutions: Record<string, string[]> = {
      'a': ['4', '@'],
      'e': ['3'],
      'i': ['1', '!'],
      'o': ['0'],
      's': ['5', '$'],
      't': ['7', '+']
    };
    
    // Generate one level of substitutions
    for (const [char, subs] of Object.entries(substitutions)) {
      if (word.includes(char)) {
        for (const sub of subs) {
          variations.push(word.replace(new RegExp(char, 'g'), sub));
        }
      }
    }
    
    return variations;
  }
  
  /**
   * Clean the content by replacing bad words with asterisks
   */
  cleanContent(text: string): string {
    if (!text) return text;
    
    let cleaned = text;
    const words = text.split(/\s+/);
    
    for (const word of words) {
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
      
      // Skip if it's an allowed women's health term
      if (this.allowedWomenHealthTerms.has(cleanWord)) {
        continue;
      }
      
      // Replace if profane
      if (this.commonProfanity.has(cleanWord)) {
        cleaned = cleaned.replace(new RegExp(`\\b${word}\\b`, 'gi'), '***');
      }
    }
    
    return cleaned;
  }
  
  /**
   * Check for spam patterns
   */
  isSpam(text: string): boolean {
    if (!text) return false;
    
    const spamPatterns = [
      /(.)\1{10,}/i, // Repeated characters (10+ times)
      /(https?:\/\/[^\s]+){3,}/i, // Multiple URLs (3+ in one post)
      /\b(buy|click here|subscribe|follow|check out)\b.*\b(http|www)\b/i, // Spam phrases with links
      /[A-Z]{20,}/, // Long strings of capital letters
    ];
    
    return spamPatterns.some(pattern => pattern.test(text));
  }
  
  /**
   * Comprehensive content check
   */
  checkContent(text: string): {
    isAllowed: boolean;
    reason?: string;
    flaggedWords?: string[];
  } {
    // Check for spam
    if (this.isSpam(text)) {
      return {
        isAllowed: false,
        reason: 'Content appears to be spam'
      };
    }
    
    // Check for profanity
    const moderation = this.moderateContent(text);
    
    if (!moderation.isClean) {
      return {
        isAllowed: false,
        reason: 'Content contains inappropriate language',
        flaggedWords: moderation.flaggedWords
      };
    }
    
    return { isAllowed: true };
  }
}

// Export singleton instance
export const contentModerator = new ContentModerator();
