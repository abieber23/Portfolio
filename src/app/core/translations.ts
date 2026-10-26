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
  projects: {
    label: 'Portfolio',
    heading: 'Featured Projects',
    intro: 'Explore a selection of my work here – interact with the projects to see my skills in action.',
    previewOf: 'Preview of',
  },
  testimonials: {
    heading: 'What my colleagues say about me',
    previous: 'Previous testimonial',
    next: 'Next testimonial',
    goTo: 'Show testimonial',
    // TODO: replace with real testimonials
    items: [
      {
        text: 'Adrian was a reliable and motivated team partner. His structured approach and clean code were crucial to the success of our project.',
        author: 'H. Janisch',
        role: 'Team Partner',
      },
      {
        text: "I had the good fortune of working with Adrian on a group project that involved a lot of effort. He always stayed calm and focused and made sure our team was set up for success. He's very knowledgeable, easy to work with, and I'd happily work with him again.",
        author: 'A. Fischer',
        role: 'Team Partner',
      },
      {
        text: "Our project benefited enormously from Adrian's efficient way of working. He communicates clearly, helps others when they get stuck and always keeps an eye on the details.",
        author: 'M. Weber',
        role: 'Team Partner',
      },
    ],
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
  projects: {
    label: 'Portfolio',
    heading: 'Ausgewählte Projekte',
    intro: 'Hier finden Sie eine Auswahl meiner Arbeiten – probieren Sie die Projekte aus und erleben Sie meine Fähigkeiten in Aktion.',
    previewOf: 'Vorschau von',
  },
  testimonials: {
    heading: 'Was meine Kollegen über mich sagen',
    previous: 'Vorherige Bewertung',
    next: 'Nächste Bewertung',
    goTo: 'Bewertung anzeigen',
    items: [
      {
        text: 'Adrian war ein zuverlässiger und motivierter Teampartner. Seine strukturierte Arbeitsweise und sein sauberer Code haben maßgeblich zum Erfolg unseres Projekts beigetragen.',
        author: 'H. Janisch',
        role: 'Teampartner',
      },
      {
        text: 'Ich hatte das Glück, mit Adrian an einem aufwendigen Gruppenprojekt zu arbeiten. Er blieb immer ruhig und konzentriert und hat dafür gesorgt, dass unser Team erfolgreich sein konnte. Er hat viel Fachwissen, die Zusammenarbeit mit ihm ist angenehm, und ich würde jederzeit wieder mit ihm arbeiten.',
        author: 'A. Fischer',
        role: 'Teampartner',
      },
      {
        text: 'Unser Projekt hat enorm von Adrians effizienter Arbeitsweise profitiert. Er kommuniziert klar, hilft anderen, wenn sie nicht weiterkommen, und behält stets die Details im Blick.',
        author: 'M. Weber',
        role: 'Teampartner',
      },
    ],
  },
};

export const TRANSLATIONS: Record<Lang, Translations> = { en, de };
