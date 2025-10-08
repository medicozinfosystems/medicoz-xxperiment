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
    "hero.eyebrow": "Healthcare • Platforms • AI",
    "hero.title": "Medicoz Infosystems",
    "hero.tagline": "Technology that cares",
    "hero.subtitle": "Empowering healthcare providers with intelligent, empathetic technology solutions that put patients first. From real-time communication to global connectivity, we bridge the gap between care and technology.",
    "hero.cta.primary": "Explore our services",
    "hero.cta.secondary": "Partner with us",
    
    // Service Section
    "service.title": "From Conversation to Care",
    "service.subtitle": "Empowering women's health through stories and seamless digital care",
    "service.xxperiment.title": "The XXperiment",
    "service.xxperiment.type": "Podcast",
    "service.xxperiment.description": "Women's health conversations that empower, educate, and inspire change through authentic stories.",
    "service.xxperiment.cta": "Listen Now →",
    "service.xxperiment.episode": "Fertility & Choice",
    "service.xxperiment.episode.tagline": "Your timeline is valid, always",
    "service.phone.hint": "Hover to switch apps",
    "service.medicoz.title": "Medicoz App",
    "service.medicoz.badge": "Coming Soon",
    "service.medicoz.description": "Your complete women's health companion — appointments, insights, and personalized care in one app.",
    "service.medicoz.feature1": "Track your health vitals",
    "service.medicoz.feature2": "AI-powered insights",
    "service.medicoz.feature3": "Privacy-first design",
    "service.medicoz.cta1": "Join Waitlist",
    "service.medicoz.cta2": "Get Notified",
    "service.phoneFeature1": "Health Tracking",
    "service.phoneFeature2": "AI Insights",
    "service.phoneFeature3": "Private & Secure",
    "service.closing": "From conversation to care, in your pocket",
    "service.closingSubtitle": "Empowering women's health through knowledge and technology",
    
    // Team Section
    "team.title": "People Behind the Pulse",
    "team.subtitle": "Everyone revolves around the same purpose: care",
    "team.center": "Our Purpose",
    "team.member1.name": "Meera Gupta",
    "team.member1.role": "Chief Experience Officer",
    "team.member1.tagline": "Engineer of empathy",
    "team.member2.name": "Arjun Khanna",
    "team.member2.role": "Head of Engineering",
    "team.member2.tagline": "Building care into code",
    "team.member3.name": "Veda Raman",
    "team.member3.role": "Clinical Partnerships",
    "team.member3.tagline": "Bridging health and tech",
    "team.member4.name": "Harshiv Gajjar",
    "team.member4.role": "Product & Platforms",
    "team.member4.tagline": "Designing technology that feels human",
    "team.member5.name": "Mitra Vanshita",
    "team.member5.role": "Strategy & Growth",
    "team.member5.tagline": "Scaling trust globally",
    
    // Contact Section
    "contact.title": "Start a Conversation",
    "contact.subtitle": "Whether it's a partnership, pilot, or joining our team—let's build healthcare that cares",
    "contact.pathTitle": "Choose Your Path",
    "contact.pathSubtitle": "Select what brings you here today",
    "contact.intent.partnership": "Partnership",
    "contact.intent.pilot": "Pilot Project",
    "contact.intent.sponsorship": "Sponsorship",
    "contact.intent.careers": "Careers",
    "contact.intent.careers.note": "Remote-friendly. Mission-first. Healthcare experts welcome.",
    "contact.form.name": "Your Name",
    "contact.form.namePlaceholder": "Jane Doe",
    "contact.form.email": "Email Address",
    "contact.form.emailPlaceholder": "jane@example.com",
    "contact.form.message": "Your Message",
    "contact.form.messagePlaceholder": "Tell us about your goals, timeline, and how we can help make care more human...",
    "contact.form.links": "Supporting Links (Optional)",
    "contact.form.linksPlaceholder": "Portfolio, deck, or relevant links...",
    "contact.form.submit": "Send Message",
    "contact.success.message": "Message received. We'll reply within 48h.",
    "contact.success.id": "Message ID",
    
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
    
    // Footer
    "footer.title": "Medicoz Infosystems",
    "footer.tagline": "Healthcare deserves technology that cares back",
    "footer.about": "We're building intelligent healthcare platforms that bridge the gap between care providers and patients. Through The XXperiment podcast and our upcoming Medicoz app, we're making healthcare more accessible, empathetic, and human-centered.",
    "footer.links.about": "About",
    "footer.links.services": "Services",
    "footer.links.xxperiment": "The XXperiment",
    "footer.links.careers": "Careers",
    "footer.links.privacy": "Privacy Policy",
    "footer.links.terms": "Terms of Service",
    "footer.contact.title": "Get in Touch",
    "footer.contact.email": "hello@medicoz.com",
    "footer.contact.phone": "+1 (555) 123-4567",
    "footer.contact.address": "San Francisco, CA",
    "footer.social": "Connect With Us",
    "footer.copyright": "© 2024 Medicoz Infosystems. Building care into code.",

    // Preloader
    "preloader.frame1.text": "A pulse.",
    "preloader.frame1.subtitle": "Every heartbeat tells a story",
    "preloader.frame2.text": "A message.",
    "preloader.frame2.subtitle": "Connecting those who heal",
    "preloader.frame3.text": "A moment of help.",
    "preloader.frame3.subtitle": "When every second counts",
    "preloader.frame4.text": "Across miles.",
    "preloader.frame4.subtitle": "Healthcare without boundaries",
    "preloader.frame5.text": "Technology that listens.",
    "preloader.frame5.subtitle": "Intelligent care, human touch",
    "preloader.skip": "Skip",
  },
  hi: {
    // Header
    "header.brand": "मेडिकोज",
    
    // Hero Section
    "hero.eyebrow": "स्वास्थ्य सेवा • प्लेटफॉर्म • AI",
    "hero.title": "मेडिकोज इन्फोसिस्टम्स",
    "hero.tagline": "प्रौद्योगिकी जो परवाह करती है",
    "hero.subtitle": "स्वास्थ्य सेवा प्रदाताओं को बुद्धिमान, संवेदनशील प्रौद्योगिकी समाधानों के साथ सशक्त बनाना जो रोगियों को पहले रखते हैं। वास्तविक समय संचार से लेकर वैश्विक कनेक्टिविटी तक, हम देखभाल और प्रौद्योगिकी के बीच की खाई को पाटते हैं।",
    "hero.cta.primary": "हमारी सेवाएं देखें",
    "hero.cta.secondary": "हमारे साथ साझेदारी करें",
    
    // Service Section
    "service.title": "बातचीत से देखभाल तक",
    "service.subtitle": "कहानियों और निर्बाध डिजिटल देखभाल के माध्यम से महिलाओं के स्वास्थ्य को सशक्त बनाना",
    "service.xxperiment.title": "द एक्सएक्सपेरिमेंट",
    "service.xxperiment.type": "पॉडकास्ट",
    "service.xxperiment.description": "महिलाओं के स्वास्थ्य की बातचीत जो प्रामाणिक कहानियों के माध्यम से सशक्त बनाती है, शिक्षित करती है और परिवर्तन को प्रेरित करती है।",
    "service.xxperiment.cta": "अभी सुनें →",
    "service.xxperiment.episode": "प्रजनन और पसंद",
    "service.xxperiment.episode.tagline": "आपकी समय रेखा हमेशा मान्य है",
    "service.phone.hint": "ऐप स्विच करने के लिए होवर करें",
    "service.medicoz.title": "मेडिकोज ऐप",
    "service.medicoz.badge": "जल्द आ रहा है",
    "service.medicoz.description": "आपका संपूर्ण महिला स्वास्थ्य साथी — एक ऐप में अपॉइंटमेंट, अंतर्दृष्टि और व्यक्तिगत देखभाल।",
    "service.medicoz.feature1": "अपने स्वास्थ्य संकेतकों को ट्रैक करें",
    "service.medicoz.feature2": "AI-संचालित अंतर्दृष्टि",
    "service.medicoz.feature3": "गोपनीयता-प्रथम डिज़ाइन",
    "service.medicoz.cta1": "प्रतीक्षा सूची में शामिल हों",
    "service.medicoz.cta2": "सूचित करें",
    "service.phoneFeature1": "स्वास्थ्य ट्रैकिंग",
    "service.phoneFeature2": "AI अंतर्दृष्टि",
    "service.phoneFeature3": "निजी और सुरक्षित",
    "service.closing": "बातचीत से देखभाल तक, आपकी जेब में",
    "service.closingSubtitle": "ज्ञान और प्रौद्योगिकी के माध्यम से महिलाओं के स्वास्थ्य को सशक्त बनाना",
    
    // Team Section
    "team.title": "नाड़ी के पीछे के लोग",
    "team.subtitle": "हर कोई एक ही उद्देश्य के चारों ओर घूमता है: देखभाल",
    "team.center": "हमारा उद्देश्य",
    "team.member1.name": "मीरा गुप्ता",
    "team.member1.role": "मुख्य अनुभव अधिकारी",
    "team.member1.tagline": "सहानुभूति का इंजीनियर",
    "team.member2.name": "अर्जुन खन्ना",
    "team.member2.role": "इंजीनियरिंग प्रमुख",
    "team.member2.tagline": "कोड में देखभाल का निर्माण",
    "team.member3.name": "वेदा रमण",
    "team.member3.role": "क्लिनिकल साझेदारी",
    "team.member3.tagline": "स्वास्थ्य और तकनीक को जोड़ना",
    "team.member4.name": "हर्षिव गज्जर",
    "team.member4.role": "उत्पाद और प्लेटफॉर्म",
    "team.member4.tagline": "मानवीय लगने वाली प्रौद्योगिकी डिजाइन करना",
    "team.member5.name": "मित्रा वंशिता",
    "team.member5.role": "रणनीति और विकास",
    "team.member5.tagline": "विश्व स्तर पर विश्वास का विस्तार",
    
    // Contact Section
    "contact.title": "बातचीत शुरू करें",
    "contact.subtitle": "चाहे वह साझेदारी हो, पायलट हो, या हमारी टीम में शामिल होना हो—आइए स्वास्थ्य सेवा बनाएं जो परवाह करती है",
    "contact.pathTitle": "अपना रास्ता चुनें",
    "contact.pathSubtitle": "चुनें कि आज आपको यहाँ क्या लाता है",
    "contact.intent.partnership": "साझेदारी",
    "contact.intent.pilot": "पायलट परियोजना",
    "contact.intent.sponsorship": "प्रायोजन",
    "contact.intent.careers": "करियर",
    "contact.intent.careers.note": "दूरस्थ-अनुकूल। मिशन-प्रथम। स्वास्थ्य विशेषज्ञों का स्वागत है।",
    "contact.form.name": "आपका नाम",
    "contact.form.namePlaceholder": "जेन डो",
    "contact.form.email": "ईमेल पता",
    "contact.form.emailPlaceholder": "jane@example.com",
    "contact.form.message": "आपका संदेश",
    "contact.form.messagePlaceholder": "हमें अपने लक्ष्यों, समय रेखा के बारे में बताएं और हम देखभाल को अधिक मानवीय बनाने में कैसे मदद कर सकते हैं...",
    "contact.form.links": "सहायक लिंक (वैकल्पिक)",
    "contact.form.linksPlaceholder": "पोर्टफोलियो, डेक, या प्रासंगिक लिंक...",
    "contact.form.submit": "संदेश भेजें",
    "contact.success.message": "संदेश प्राप्त हुआ। हम 48 घंटों में जवाब देंगे।",
    "contact.success.id": "संदेश आईडी",
    
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
    
    // Footer
    "footer.title": "मेडिकोज इन्फोसिस्टम्स",
    "footer.tagline": "स्वास्थ्य सेवा प्रौद्योगिकी के योग्य है जो वापस परवाह करती है",
    "footer.about": "हम बुद्धिमान स्वास्थ्य प्लेटफ़ॉर्म बना रहे हैं जो देखभाल प्रदाताओं और रोगियों के बीच की खाई को पाटते हैं। द एक्सएक्सपेरिमेंट पॉडकास्ट और हमारे आगामी मेडिकोज ऐप के माध्यम से, हम स्वास्थ्य सेवा को अधिक सुलभ, संवेदनशील और मानव-केंद्रित बना रहे हैं।",
    "footer.links.about": "हमारे बारे में",
    "footer.links.services": "सेवाएं",
    "footer.links.xxperiment": "द एक्सएक्सपेरिमेंट",
    "footer.links.careers": "करियर",
    "footer.links.privacy": "गोपनीयता नीति",
    "footer.links.terms": "सेवा की शर्तें",
    "footer.contact.title": "संपर्क करें",
    "footer.contact.email": "hello@medicoz.com",
    "footer.contact.phone": "+1 (555) 123-4567",
    "footer.contact.address": "सैन फ्रांसिस्को, CA",
    "footer.social": "हमसे जुड़ें",
    "footer.copyright": "© 2024 मेडिकोज इन्फोसिस्टम्स। कोड में देखभाल का निर्माण।",

    // Preloader
    "preloader.frame1.text": "एक धड़कन।",
    "preloader.frame1.subtitle": "हर दिल की धड़कन एक कहानी बयान करती है",
    "preloader.frame2.text": "एक संदेश।",
    "preloader.frame2.subtitle": "उन लोगों को जोड़ना जो चंगा करते हैं",
    "preloader.frame3.text": "मदद का एक पल।",
    "preloader.frame3.subtitle": "जब हर पल मायने रखता है",
    "preloader.frame4.text": "मीलों के पार।",
    "preloader.frame4.subtitle": "बिना सीमाओं के स्वास्थ्य सेवा",
    "preloader.frame5.text": "प्रौद्योगिकी जो सुनती है।",
    "preloader.frame5.subtitle": "बुद्धिमान देखभाल, मानवीय स्पर्श",
    "preloader.skip": "छोड़ें",
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
