export type Lang = 'en' | 'de';

const en = {
  nav: {
    about: 'About me',
    skills: 'Skills',
    projects: 'Projects',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Switch language',
  },
  hero: {
    role: 'Frontend Developer',
    checkWork: 'Check my work',
    contact: 'Contact me',
    scrollDown: 'Scroll down',
    marquee: ['Frontend Developer', 'Based in Stadtlauringen/Germany', 'Open to work', 'Available for remote work'],
  },
  about: {
    label: 'Who I Am',
    heading: 'About me',
    photoAlt: 'Portrait of Adrian Bieber',
    intro:
      "Hi there, I'm Adrian! I'm a frontend developer who loves turning ideas into fast, clean and user-friendly web applications. What fascinates me most about coding is watching a few lines of code turn into something people actually enjoy using. I find inspiration in well-crafted websites, in the developer community and in every project that pushes me a little beyond what I already know.",
    points: [
      "I'm based in Stadtlauringen near Schweinfurt, Germany. I'm open to remote work and just as happy to work in a hybrid or on-site role in the region.",
      "I'm curious by nature and enjoy learning new technologies. Whether it's a new framework, a better tool or a cleaner way to structure my code, I keep improving my skills every day.",
      'When I face a problem, I break it down into small steps and look for the most efficient and elegant solution. Every challenge teaches me something new. Analytical thinking, creativity, persistence and collaboration help me reach my goal, both on my own and as part of a team.',
    ],
  },
  skills: {
    label: 'Technologies',
    heading: 'Skill Set',
    intro:
      'I build responsive and maintainable web applications with modern frontend technologies, from semantic HTML and modern CSS to TypeScript and Angular. Web development moves fast, and I make a point of keeping up: I stay curious, try out new tools and frameworks and adapt quickly to new technologies.',
    anotherSkill: 'You need',
    anotherSkillAccent: 'another skill?',
    contactText: 'Feel free to contact me. I look forward to expanding on my existing knowledge.',
    cta: "Let's Talk",
    growthMindset: 'Growth mindset',
    learningInterest: 'I have a special interest in learning',
  },
  avatar: {
    label: 'AI Assistant',
    heading: 'Ask my avatar',
    intro:
      'Curious about my skills, my projects or how I work? My AI avatar knows me well – type your question and it will answer you in writing and out loud.',
    comingSoon: 'Coming soon',
    start: 'Start avatar',
    consentBefore: 'When you start the avatar, your input is processed by D-ID. More in the',
    consentLink: 'privacy policy',
    startFirst: 'Start the avatar to ask a question',
    videoLabel: 'AI avatar of Adrian Bieber',
    chatTitle: 'Chat with my avatar',
    greeting: "Hi, I'm Adrian's AI avatar! Ask me anything about his experience, skills or projects.",
    placeholderReply: "I'm not quite ready yet – my avatar is still being set up. Until then, feel free to use the contact form below!",
    suggestions: ['What are your skills?', 'Which projects have you built?', 'Are you open to remote work?'],
    inputLabel: 'Your question',
    inputPlaceholder: 'Type your question...',
    send: 'Send',
  },
  projects: {
    label: 'Portfolio',
    heading: 'Featured Projects',
    intro: 'Explore a selection of my work here – interact with the projects to see my skills in action.',
    previewOf: 'Preview of',
    about: 'What is this project about?',
    nextProject: 'Next project',
    close: 'Close',
    opensInNewTab: 'opens in a new tab',
    descriptions: {
      join: 'Task manager inspired by the Kanban system. Create and organize tasks using drag and drop, assign users and categories.',
      sharkie:
        'Underwater action game based on an object-oriented approach. Help Sharkie collect coins and poison bottles to fight against the killer whale.',
      bubble:
        'A Slack clone that makes team communication and collaboration easy, with an intuitive interface, real-time messaging and well-organized channels.',
    },
  },
  testimonials: {
    heading: 'What my colleagues say about me',
    previous: 'Previous testimonial',
    next: 'Next testimonial',
    goTo: 'Show testimonial',
    items: [
      {
        text: "Working with Adrian was a lot of fun. He was very direct, ambitious and always wanted to move the project forward. His structured way of working made sure we kept the big picture in view and made progress as a team. On top of that, he's a really likeable guy and I'd gladly work with him again!",
        author: 'Moritz Böhm',
        role: 'Team Partner',
      },
      {
        text: 'His code was consistently well structured, cleanly documented and of a very high standard. Mr Bieber regularly contributed his own optimisation ideas, identified areas for improvement on his own initiative and implemented them efficiently.\nMr Bieber impressed with his exceptional commitment, utmost reliability and a remarkable ability to deliver excellent results even under time pressure.\nHe was always friendly, professional and respectful, and was highly valued by everyone involved.',
        author: 'Daniel Kurzja',
        role: 'CEO, VIDEOCOMET GmbH',
      },
      {
        text: "I found working with Adrian very positive. He works reliably and independently while always keeping the big picture in mind. Even under time pressure he stays calm, and his commitment contributed a great deal to the successful completion of our project.\nOn a personal level, too, working together was very pleasant. Adrian is helpful, open and brings a relaxed, friendly attitude to the team.\nI'd be happy to work with him again at any time and can recommend him without reservation, both professionally and personally.",
        author: 'Christopher Braun',
        role: 'Team Partner',
      },
    ],
  },
  contact: {
    label: 'Contact me',
    heading: "Let's work together",
    subheading: 'Got a problem to solve?',
    intro:
      "I'm looking for a role as a frontend developer where I can build modern, user-friendly web applications as part of a motivated team. Tell me about your project – I'll bring clean code, fresh ideas and the drive to make it a success.",
    question: 'Need a Frontend developer?',
    cta: "Let's talk!",
    nameLabel: "What's your name?",
    namePlaceholder: 'Your name goes here',
    nameRequired: 'Oops! it seems your name is missing',
    emailLabel: "What's your email?",
    emailPlaceholder: 'youremail@email.com',
    emailRequired: 'Hoppla! your email is required',
    emailInvalid: 'Please enter a valid email address',
    messageLabel: 'How can I help you?',
    messagePlaceholder: 'Hello Adrian, I am interested in...',
    messageRequired: 'What do you need to develop?',
    privacyBefore: "I've read the",
    privacyLink: 'privacy policy',
    privacyAfter: 'and agree to the processing of my data as outlined.',
    privacyRequired: 'Please accept the privacy policy.',
    submit: 'Say Hello ;)',
    sending: 'Sending…',
    success: 'Thanks for your message! I will get back to you soon.',
    error: 'Sorry, your message could not be sent. Please try again or write me an email.',
  },
  footer: {
    location: 'Stadtlauringen, Germany',
    email: 'Email',
    legalNotice: 'Legal Notice',
    privacyPolicy: 'Privacy Policy',
  },
  legal: {
    back: 'Back to homepage',
  },
};

export type Translations = typeof en;

const de: Translations = {
  nav: {
    about: 'Über mich',
    skills: 'Skills',
    projects: 'Projekte',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    switchLanguage: 'Sprache wechseln',
  },
  hero: {
    role: 'Frontend-Entwickler',
    checkWork: 'Meine Projekte',
    contact: 'Kontakt',
    scrollDown: 'Nach unten scrollen',
    marquee: ['Frontend-Entwickler', 'Wohnhaft in Stadtlauringen/Deutschland', 'Offen für neue Stellen', 'Verfügbar für Remote-Arbeit'],
  },
  about: {
    label: 'Wer ich bin',
    heading: 'Über mich',
    photoAlt: 'Porträt von Adrian Bieber',
    intro:
      'Hallo, ich bin Adrian! Als Frontend-Entwickler verwandle ich Ideen in schnelle, saubere und benutzerfreundliche Webanwendungen. Am Programmieren fasziniert mich vor allem, wie aus ein paar Zeilen Code etwas entsteht, das Menschen gerne benutzen. Inspiration finde ich in gut gemachten Websites, in der Entwickler-Community und in jedem Projekt, das mich ein Stück über das hinausbringt, was ich bereits kann.',
    points: [
      'Ich wohne in Stadtlauringen bei Schweinfurt. Ich bin offen für Remote-Arbeit und arbeite genauso gerne hybrid oder vor Ort in der Region.',
      'Ich bin von Natur aus neugierig und lerne gerne neue Technologien kennen. Ob ein neues Framework, ein besseres Tool oder eine sauberere Struktur für meinen Code – ich entwickle meine Fähigkeiten jeden Tag weiter.',
      'Stehe ich vor einem Problem, zerlege ich es in kleine Schritte und suche nach der effizientesten und elegantesten Lösung. Jede Herausforderung bringt mir etwas Neues bei. Analytisches Denken, Kreativität, Ausdauer und Teamarbeit helfen mir, mein Ziel zu erreichen – allein wie im Team.',
    ],
  },
  skills: {
    label: 'Technologien',
    heading: 'Skill Set',
    intro:
      'Mit modernen Frontend-Technologien entwickle ich responsive und wartbare Webanwendungen – von semantischem HTML und modernem CSS bis zu TypeScript und Angular. Die Webentwicklung verändert sich rasant, und ich lege großen Wert darauf, Schritt zu halten: Ich bleibe neugierig, probiere neue Tools und Frameworks aus und arbeite mich schnell in neue Technologien ein.',
    anotherSkill: 'Sie suchen',
    anotherSkillAccent: 'einen weiteren Skill?',
    contactText: 'Kontaktieren Sie mich gerne. Ich freue mich darauf, mein bisheriges Wissen zu erweitern.',
    cta: 'Kontakt aufnehmen',
    growthMindset: 'Growth Mindset',
    learningInterest: 'Besonders interessiert mich gerade',
  },
  avatar: {
    label: 'KI-Assistent',
    heading: 'Fragen Sie meinen Avatar',
    intro:
      'Sie möchten mehr über meine Skills, meine Projekte oder meine Arbeitsweise wissen? Mein KI-Avatar kennt mich gut – tippen Sie Ihre Frage ein, und er antwortet Ihnen schriftlich und per Sprache.',
    comingSoon: 'Demnächst verfügbar',
    start: 'Avatar starten',
    consentBefore: 'Mit dem Start werden Ihre Eingaben von D-ID verarbeitet. Mehr dazu in der',
    consentLink: 'Datenschutzerklärung',
    startFirst: 'Starten Sie den Avatar, um eine Frage zu stellen',
    videoLabel: 'KI-Avatar von Adrian Bieber',
    chatTitle: 'Chat mit meinem Avatar',
    greeting: 'Hallo, ich bin Adrians KI-Avatar! Fragen Sie mich alles über seine Erfahrung, Skills oder Projekte.',
    placeholderReply:
      'Ich bin noch nicht ganz fertig – mein Avatar wird gerade eingerichtet. Bis dahin nutzen Sie gerne das Kontaktformular weiter unten!',
    suggestions: ['Welche Skills hast du?', 'Welche Projekte hast du umgesetzt?', 'Bist du offen für Remote-Arbeit?'],
    inputLabel: 'Ihre Frage',
    inputPlaceholder: 'Ihre Frage eingeben...',
    send: 'Senden',
  },
  projects: {
    label: 'Portfolio',
    heading: 'Ausgewählte Projekte',
    intro: 'Hier finden Sie eine Auswahl meiner Arbeiten – probieren Sie die Projekte aus und erleben Sie meine Fähigkeiten in Aktion.',
    previewOf: 'Vorschau von',
    about: 'Worum geht es in dem Projekt?',
    nextProject: 'Nächstes Projekt',
    close: 'Schließen',
    opensInNewTab: 'öffnet in einem neuen Tab',
    descriptions: {
      join: 'Aufgabenmanager nach dem Vorbild des Kanban-Systems. Aufgaben per Drag-and-drop erstellen und organisieren, Personen und Kategorien zuweisen.',
      sharkie:
        'Unterwasser-Actionspiel mit objektorientiertem Aufbau. Hilf Sharkie, Münzen und Giftflaschen zu sammeln, um gegen den Killerwal zu kämpfen.',
      bubble:
        'Ein Slack-Klon, der die Kommunikation und Zusammenarbeit im Team erleichtert – mit intuitiver Oberfläche, Echtzeit-Nachrichten und übersichtlich organisierten Channels.',
    },
  },
  testimonials: {
    heading: 'Was meine Kollegen über mich sagen',
    previous: 'Vorherige Bewertung',
    next: 'Nächste Bewertung',
    goTo: 'Bewertung anzeigen',
    items: [
      {
        text: 'Die Zusammenarbeit mit Adrian hat echt Spaß gemacht. Er war sehr direkt, ehrgeizig und wollte das Projekt immer weiter voranbringen. Durch seine strukturierte Arbeitsweise hat er dafür gesorgt, dass wir den Überblick behalten und als Team weiterkommen. Außerdem ist er ein sehr sympathischer Typ, mit dem ich gerne wieder zusammenarbeiten würde!',
        author: 'Moritz Böhm',
        role: 'Teampartner',
      },
      {
        text: 'Sein Code war durchgehend vorbildlich strukturiert, sauber dokumentiert und auf einem sehr guten Niveau. Herr Bieber brachte regelmäßig eigene Optimierungsideen ein, identifizierte Verbesserungspotenziale selbstständig und setzte diese mit Effizienz um.\nHerr Bieber überzeugte durch außergewöhnliche Einsatzbereitschaft, höchste Zuverlässigkeit und eine bemerkenswerte Fähigkeit, auch unter Zeitdruck hervorragende Ergebnisse zu liefern.\nEr trat stets freundlich, professionell und respektvoll auf und wurde von allen Beteiligten sehr geschätzt.',
        author: 'Daniel Kurzja',
        role: 'Geschäftsführer VIDEOCOMET GmbH',
      },
      {
        text: 'Die Zusammenarbeit mit Adrian habe ich als sehr positiv erlebt. Er arbeitet zuverlässig, selbstständig und behält dabei immer das große Ganze im Blick. Auch unter Zeitdruck bleibt er ruhig und hat mit seinem Einsatz viel zum erfolgreichen Abschluss unseres Projekts beigetragen.\nMenschlich war die Zusammenarbeit ebenfalls sehr angenehm. Adrian ist hilfsbereit, offen und bringt eine entspannte, freundliche Art ins Team.\nIch würde jederzeit wieder gerne mit ihm zusammenarbeiten und kann ihn fachlich wie persönlich uneingeschränkt weiterempfehlen.',
        author: 'Christopher Braun',
        role: 'Teampartner',
      },
    ],
  },
  contact: {
    label: 'Kontakt',
    heading: 'Lassen Sie uns zusammenarbeiten',
    subheading: 'Sie haben ein Problem zu lösen?',
    intro:
      'Ich suche eine Stelle als Frontend-Entwickler, in der ich in einem motivierten Team moderne und benutzerfreundliche Webanwendungen entwickeln kann. Erzählen Sie mir von Ihrem Projekt – ich bringe sauberen Code, frische Ideen und den Ehrgeiz mit, es zum Erfolg zu führen.',
    question: 'Sie suchen einen Frontend-Entwickler?',
    cta: 'Sprechen wir!',
    nameLabel: 'Wie heißen Sie?',
    namePlaceholder: 'Ihr Name',
    nameRequired: 'Hoppla! Ihr Name fehlt noch',
    emailLabel: 'Wie lautet Ihre E-Mail?',
    emailPlaceholder: 'ihre-email@email.de',
    emailRequired: 'Hoppla! Ihre E-Mail-Adresse wird benötigt',
    emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    messageLabel: 'Wie kann ich helfen?',
    messagePlaceholder: 'Hallo Adrian, ich interessiere mich für...',
    messageRequired: 'Was möchten Sie entwickeln lassen?',
    privacyBefore: 'Ich habe die',
    privacyLink: 'Datenschutzerklärung',
    privacyAfter: 'gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.',
    privacyRequired: 'Bitte akzeptieren Sie die Datenschutzerklärung.',
    submit: 'Sag Hallo ;)',
    sending: 'Wird gesendet…',
    success: 'Danke für Ihre Nachricht! Ich melde mich in Kürze bei Ihnen.',
    error: 'Ihre Nachricht konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie mir eine E-Mail.',
  },
  footer: {
    location: 'Stadtlauringen, Deutschland',
    email: 'E-Mail',
    legalNotice: 'Impressum',
    privacyPolicy: 'Datenschutz',
  },
  legal: {
    back: 'Zurück zur Startseite',
  },
};

export const TRANSLATIONS: Record<Lang, Translations> = { en, de };
