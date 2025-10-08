import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "hi";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "header.brand": "Medicoz",
    
    // Hero Section
    "hero.title": "Conversation. To Code. To Care.",
    "hero.subtitle": "We translate human needs into clinical software that actually works",
    "hero.cta": "Let's talk",
    
    // Service Section
    "service.title": "From Conversation to Care",
    "service.subtitle": "What we build, and how we build it",
    
    // Contact Curtain
    "curtain.title": "Let's build what care deserves",
    "curtain.subtitle": "A guided conversation, one thoughtful question at a time",
    "curtain.openButton": "Open Curtain",
    "curtain.q1.title": "What brings you here?",
    "curtain.q1.subtitle": "We'll tailor the next steps",
    "curtain.q1.partnership": "Partnership",
    "curtain.q1.pilot": "Pilot project",
    "curtain.q1.sponsorship": "Sponsorship",
    "curtain.q1.careers": "Careers",
    "curtain.q1.other": "Other",
    "curtain.q1.helper.partnership": "Tell us who you serve and how we can move the needle.",
    "curtain.q1.helper.pilot": "Scope, timeline, and what 'success' looks like.",
    "curtain.q1.helper.sponsorship": "Which topics, geographies, and outcomes matter most?",
    "curtain.q1.helper.careers": "Link work you're proud of—we review every note.",
    "curtain.q1.helper.other": "We're listening.",
    "curtain.q2.title": "Who are you?",
    "curtain.q2.subtitle": "So we can say hello properly",
    "curtain.q2.name": "Your name",
    "curtain.q2.org": "Organization (optional)",
    "curtain.q3.title": "What's on your mind?",
    "curtain.q3.subtitle": "Share your vision, challenge, or idea",
    "curtain.q3.message": "Your message",
    "curtain.q4.title": "How can we reach you?",
    "curtain.q4.subtitle": "We reply within 48 hours",
    "curtain.q4.email": "Email",
    "curtain.q4.phone": "Phone (optional)",
    "curtain.q5.title": "Extras",
    "curtain.q5.subtitle": "Optional add-ons",
    "curtain.q5.deck": "I'd like a deck overview",
    "curtain.q5.voice": "Schedule a voice call",
    "curtain.q5.confidential": "Confidential NDA required",
    "curtain.q6.title": "Review your message",
    "curtain.q6.subtitle": "Edit if needed, then hold to send",
    "curtain.next": "Next",
    "curtain.back": "Back",
    "curtain.send": "Hold to Send",
    "curtain.sent.title": "Message received.",
    "curtain.sent.subtitle": "Reply within 48 hours",
    "curtain.sent.copy": "Copy confirmation link",
    
    // Elevator Section
    "elevator.title": "Elevator to Humans",
    "elevator.subtitle": "Select your floor — we'll take you there",
    "elevator.lobby": "Lobby",
    "elevator.partnerships": "Partnerships",
    "elevator.clinical": "Clinical",
    "elevator.product": "Product",
    "elevator.careers": "Careers",
    "elevator.floor": "Floor",
    "elevator.directory": "Directory",
    "elevator.progress": "Progress",
    "elevator.ding": "DING",
    "elevator.arrived": "You've arrived",
    "elevator.name": "Your name",
    "elevator.org": "Organization",
    "elevator.email": "Email",
    "elevator.phone": "Phone (optional)",
    "elevator.message": "Tell us about your needs",
    "elevator.submit": "Submit",
    "elevator.submitted": "Submitted! We'll be in touch soon.",
  },
  hi: {
    // Header
    "header.brand": "मेडिकोज",
    
    // Hero Section
    "hero.title": "बातचीत. कोड. देखभाल.",
    "hero.subtitle": "हम मानवीय जरूरतों को क्लिनिकल सॉफ्टवेयर में बदलते हैं जो वास्तव में काम करता है",
    "hero.cta": "बात करते हैं",
    
    // Service Section
    "service.title": "बातचीत से देखभाल तक",
    "service.subtitle": "हम क्या बनाते हैं, और कैसे बनाते हैं",
    
    // Contact Curtain
    "curtain.title": "आइए वह बनाएं जो देखभाल के योग्य है",
    "curtain.subtitle": "एक निर्देशित बातचीत, एक बार में एक विचारशील प्रश्न",
    "curtain.openButton": "पर्दा खोलें",
    "curtain.q1.title": "आप यहाँ क्यों आए?",
    "curtain.q1.subtitle": "हम अगले कदम तैयार करेंगे",
    "curtain.q1.partnership": "साझेदारी",
    "curtain.q1.pilot": "पायलट परियोजना",
    "curtain.q1.sponsorship": "प्रायोजन",
    "curtain.q1.careers": "करियर",
    "curtain.q1.other": "अन्य",
    "curtain.q1.helper.partnership": "हमें बताएं कि आप किसकी सेवा करते हैं और हम कैसे आगे बढ़ सकते हैं।",
    "curtain.q1.helper.pilot": "दायरा, समयरेखा, और 'सफलता' कैसी दिखती है।",
    "curtain.q1.helper.sponsorship": "कौन से विषय, भूगोल और परिणाम सबसे महत्वपूर्ण हैं?",
    "curtain.q1.helper.careers": "अपने काम को लिंक करें—हम हर नोट की समीक्षा करते हैं।",
    "curtain.q1.helper.other": "हम सुन रहे हैं।",
    "curtain.q2.title": "आप कौन हैं?",
    "curtain.q2.subtitle": "ताकि हम सही से नमस्ते कह सकें",
    "curtain.q2.name": "आपका नाम",
    "curtain.q2.org": "संगठन (वैकल्पिक)",
    "curtain.q3.title": "आपके मन में क्या है?",
    "curtain.q3.subtitle": "अपनी दृष्टि, चुनौती या विचार साझा करें",
    "curtain.q3.message": "आपका संदेश",
    "curtain.q4.title": "हम आपसे कैसे संपर्क कर सकते हैं?",
    "curtain.q4.subtitle": "हम 48 घंटों में जवाब देते हैं",
    "curtain.q4.email": "ईमेल",
    "curtain.q4.phone": "फोन (वैकल्पिक)",
    "curtain.q5.title": "अतिरिक्त",
    "curtain.q5.subtitle": "वैकल्पिक सुविधाएं",
    "curtain.q5.deck": "मुझे डेक ओवरव्यू चाहिए",
    "curtain.q5.voice": "वॉयस कॉल शेड्यूल करें",
    "curtain.q5.confidential": "गोपनीय NDA आवश्यक",
    "curtain.q6.title": "अपना संदेश देखें",
    "curtain.q6.subtitle": "यदि आवश्यक हो तो संपादित करें, फिर भेजने के लिए दबाए रखें",
    "curtain.next": "आगे",
    "curtain.back": "पीछे",
    "curtain.send": "भेजने के लिए दबाए रखें",
    "curtain.sent.title": "संदेश प्राप्त हुआ।",
    "curtain.sent.subtitle": "48 घंटों में जवाब",
    "curtain.sent.copy": "पुष्टि लिंक कॉपी करें",
    
    // Elevator Section
    "elevator.title": "मनुष्यों तक लिफ्ट",
    "elevator.subtitle": "अपनी मंजिल चुनें — हम आपको वहां ले जाएंगे",
    "elevator.lobby": "लॉबी",
    "elevator.partnerships": "साझेदारी",
    "elevator.clinical": "क्लिनिकल",
    "elevator.product": "उत्पाद",
    "elevator.careers": "करियर",
    "elevator.floor": "मंजिल",
    "elevator.directory": "निर्देशिका",
    "elevator.progress": "प्रगति",
    "elevator.ding": "डिंग",
    "elevator.arrived": "आप पहुंच गए",
    "elevator.name": "आपका नाम",
    "elevator.org": "संगठन",
    "elevator.email": "ईमेल",
    "elevator.phone": "फोन (वैकल्पिक)",
    "elevator.message": "हमें अपनी जरूरतों के बारे में बताएं",
    "elevator.submit": "जमा करें",
    "elevator.submitted": "जमा किया गया! हम जल्द ही संपर्क करेंगे।",
  }
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}
