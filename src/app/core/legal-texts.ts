import { PROFILE } from './profile';
import { Lang } from './translations';

/*
 * PROVISIONAL legal texts – they are a starting point, not legal advice.
 * Fill in the [placeholders] and have them checked (e.g. with a generator like
 * e-recht24.de or by a lawyer) before the site goes live.
 */

export interface LegalSection {
  heading: string;
  /** Paragraphs; line breaks inside a paragraph are kept (used for addresses). */
  paragraphs: string[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  sections: LegalSection[];
}

export type LegalDocKey = 'legalNotice' | 'privacyPolicy';

const name = `${PROFILE.firstName} ${PROFILE.lastName}`;
const addressDe = `${name}\n${PROFILE.street}\n${PROFILE.zip} ${PROFILE.city}\nDeutschland`;
const addressEn = `${name}\n${PROFILE.street}\n${PROFILE.zip} ${PROFILE.city}\nGermany`;

// TODO: fill in once the hosting provider is chosen
const hosterDe = '[Name und Anschrift des Hosting-Anbieters]';
const hosterEn = '[name and address of the hosting provider]';

const de: Record<LegalDocKey, LegalDoc> = {
  legalNotice: {
    title: 'Impressum',
    updated: 'Stand: Oktober 2026',
    sections: [
      { heading: 'Angaben gemäß § 5 DDG', paragraphs: [addressDe] },
      { heading: 'Kontakt', paragraphs: [`E-Mail: ${PROFILE.email}`] },
      {
        heading: 'Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV',
        paragraphs: [`${name}\nAnschrift wie oben`],
      },
      {
        heading: 'Haftung für Inhalte',
        paragraphs: [
          'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Als Diensteanbieter bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.',
        ],
      },
      {
        heading: 'Haftung für Links',
        paragraphs: [
          'Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese fremden Inhalte ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Sollte mir eine Rechtsverletzung bekannt werden, entferne ich den betreffenden Link umgehend.',
        ],
      },
      {
        heading: 'Urheberrecht',
        paragraphs: [
          'Die von mir erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung.',
        ],
      },
    ],
  },
  privacyPolicy: {
    title: 'Datenschutzerklärung',
    updated: 'Stand: Oktober 2026',
    sections: [
      {
        heading: '1. Verantwortlicher',
        paragraphs: [
          'Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:',
          `${addressDe}\nE-Mail: ${PROFILE.email}`,
        ],
      },
      {
        heading: '2. Allgemeines',
        paragraphs: [
          'Der Schutz Ihrer persönlichen Daten ist mir wichtig. Personenbezogene Daten werden auf dieser Website nur im technisch notwendigen Umfang verarbeitet. Diese Datenschutzerklärung informiert Sie darüber, welche Daten erhoben werden, wofür sie genutzt werden und welche Rechte Sie haben.',
        ],
      },
      {
        heading: '3. Hosting und Server-Logfiles',
        paragraphs: [
          `Diese Website wird bei folgendem Anbieter gehostet:\n${hosterDe}`,
          'Beim Aufruf der Website speichert der Server automatisch Informationen, die Ihr Browser übermittelt (Server-Logfiles): IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite, Referrer-URL, verwendeter Browser und Betriebssystem.',
          'Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt in der sicheren und fehlerfreien Bereitstellung der Website. Die Logfiles werden nach spätestens [X] Tagen gelöscht. Mit dem Hosting-Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.',
        ],
      },
      {
        heading: '4. Kontaktformular',
        paragraphs: [
          'Wenn Sie mir über das Kontaktformular eine Nachricht senden, verarbeite ich Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachricht, um Ihre Anfrage zu bearbeiten und zu beantworten.',
          'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage auf einen Vertrag oder eine Anstellung abzielt, ansonsten Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Ihre Daten werden nicht an Dritte weitergegeben und gelöscht, sobald Ihre Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.',
        ],
      },
      {
        heading: '5. Kontakt per E-Mail',
        paragraphs: [
          'Wenn Sie mir eine E-Mail schreiben, werden Ihre E-Mail-Adresse und der Inhalt der Nachricht zur Bearbeitung Ihrer Anfrage gespeichert. Mein E-Mail-Postfach wird von Google (Gmail) bereitgestellt (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Dabei kann eine Übermittlung in die USA nicht ausgeschlossen werden; Google ist nach dem EU-US Data Privacy Framework zertifiziert.',
        ],
      },
      // TODO: remove this section once the fonts are self-hosted (recommended)
      {
        heading: '6. Google Fonts',
        paragraphs: [
          'Diese Website verwendet Schriftarten von Google Fonts, die beim Seitenaufruf von Servern der Google Ireland Limited geladen werden. Dabei wird Ihre IP-Adresse an Google übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse liegt in einer einheitlichen Darstellung der Website.',
        ],
      },
      {
        heading: '7. Lokale Speicherung im Browser',
        paragraphs: [
          'Diese Website setzt keine Cookies. Ihre Sprachauswahl (Deutsch/Englisch) wird lediglich im lokalen Speicher (localStorage) Ihres Browsers abgelegt, damit sie beim nächsten Besuch erhalten bleibt. Diese Information verlässt Ihr Gerät nicht. Die Speicherung ist für die von Ihnen gewünschte Funktion unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können sie jederzeit über die Einstellungen Ihres Browsers löschen.',
        ],
      },
      {
        heading: '8. Links zu GitHub und LinkedIn',
        paragraphs: [
          'Diese Website enthält einfache Links zu meinen Profilen bei GitHub und LinkedIn. Es werden keine Plugins eingebunden; Daten werden erst übertragen, wenn Sie einen Link anklicken. Ab dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters.',
        ],
      },
      {
        heading: '9. Ihre Rechte',
        paragraphs: [
          'Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO) sowie Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Wenden Sie sich dazu einfach per E-Mail an mich.',
          'Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), zum Beispiel beim Bayerischen Landesamt für Datenschutzaufsicht, Promenade 18, 91522 Ansbach.',
        ],
      },
      {
        heading: '10. SSL-/TLS-Verschlüsselung',
        paragraphs: [
          'Aus Sicherheitsgründen nutzt diese Website eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.',
        ],
      },
    ],
  },
};

const en: Record<LegalDocKey, LegalDoc> = {
  legalNotice: {
    title: 'Legal Notice',
    updated: 'Last updated: October 2026',
    sections: [
      { heading: 'Information according to § 5 DDG (German Digital Services Act)', paragraphs: [addressEn] },
      { heading: 'Contact', paragraphs: [`Email: ${PROFILE.email}`] },
      {
        heading: 'Responsible for the content according to § 18 (2) MStV',
        paragraphs: [`${name}\nAddress as above`],
      },
      {
        heading: 'Liability for content',
        paragraphs: [
          'The content of this website has been created with the utmost care. However, I cannot guarantee that it is accurate, complete or up to date. As a service provider, I am responsible for my own content on these pages in accordance with general law.',
        ],
      },
      {
        heading: 'Liability for links',
        paragraphs: [
          'This website contains links to external third-party websites whose content I have no influence over. The respective provider or operator is always responsible for the content of linked pages. No legal violations were apparent at the time of linking. If I become aware of any infringement, I will remove the link immediately.',
        ],
      },
      {
        heading: 'Copyright',
        paragraphs: [
          'The content and works I have created on this website are subject to German copyright law. Reproduction, editing, distribution and any kind of use beyond the limits of copyright law require my written consent.',
        ],
      },
    ],
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    updated: 'Last updated: October 2026',
    sections: [
      {
        heading: '1. Controller',
        paragraphs: [
          'The controller responsible for data processing on this website within the meaning of the General Data Protection Regulation (GDPR) is:',
          `${addressEn}\nEmail: ${PROFILE.email}`,
        ],
      },
      {
        heading: '2. General information',
        paragraphs: [
          'Protecting your personal data is important to me. This website only processes personal data to the extent that is technically necessary. This privacy policy explains which data is collected, what it is used for and what rights you have.',
        ],
      },
      {
        heading: '3. Hosting and server log files',
        paragraphs: [
          `This website is hosted by the following provider:\n${hosterEn}`,
          'When you visit the website, the server automatically stores information transmitted by your browser (server log files): IP address, date and time of access, page visited, referrer URL, browser and operating system used.',
          'This processing is based on Art. 6 (1) (f) GDPR. My legitimate interest lies in providing the website securely and without errors. The log files are deleted after [X] days at the latest. A data processing agreement in accordance with Art. 28 GDPR has been concluded with the hosting provider.',
        ],
      },
      {
        heading: '4. Contact form',
        paragraphs: [
          'If you send me a message via the contact form, I process your name, your email address and your message in order to handle and answer your request.',
          'The legal basis is Art. 6 (1) (b) GDPR if your request relates to a contract or employment, otherwise Art. 6 (1) (f) GDPR (legitimate interest in answering enquiries). Your data is not passed on to third parties and is deleted as soon as your request has been fully dealt with, unless statutory retention obligations apply.',
        ],
      },
      {
        heading: '5. Contact by email',
        paragraphs: [
          'If you send me an email, your email address and the content of your message are stored to handle your request. My mailbox is provided by Google (Gmail) (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland). A transfer to the USA cannot be ruled out; Google is certified under the EU-US Data Privacy Framework.',
        ],
      },
      // TODO: remove this section once the fonts are self-hosted (recommended)
      {
        heading: '6. Google Fonts',
        paragraphs: [
          'This website uses fonts from Google Fonts, which are loaded from servers of Google Ireland Limited when you open the page. In the process, your IP address is transmitted to Google. The legal basis is Art. 6 (1) (f) GDPR; my legitimate interest lies in a consistent presentation of the website.',
        ],
      },
      {
        heading: '7. Local storage in your browser',
        paragraphs: [
          'This website does not use cookies. Your language selection (German/English) is only saved in your browser’s local storage so that it is kept for your next visit. This information never leaves your device. Storing it is strictly necessary for the function you requested (§ 25 (2) no. 2 TDDDG). You can delete it at any time in your browser settings.',
        ],
      },
      {
        heading: '8. Links to GitHub and LinkedIn',
        paragraphs: [
          'This website contains simple links to my profiles on GitHub and LinkedIn. No plugins are embedded; data is only transferred once you click a link. From then on, the privacy policy of the respective provider applies.',
        ],
      },
      {
        heading: '9. Your rights',
        paragraphs: [
          'You have the right to access (Art. 15 GDPR), rectification (Art. 16 GDPR), erasure (Art. 17 GDPR), restriction of processing (Art. 18 GDPR), data portability (Art. 20 GDPR) and to object to processing (Art. 21 GDPR) at any time. You can withdraw any consent you have given at any time with effect for the future (Art. 7 (3) GDPR). Simply contact me by email.',
          'You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), for example the Bavarian Data Protection Authority (Bayerisches Landesamt für Datenschutzaufsicht), Promenade 18, 91522 Ansbach, Germany.',
        ],
      },
      {
        heading: '10. SSL/TLS encryption',
        paragraphs: [
          'For security reasons, this website uses SSL/TLS encryption. You can recognise an encrypted connection by “https://” in your browser’s address bar.',
        ],
      },
    ],
  },
};

export const LEGAL_TEXTS: Record<Lang, Record<LegalDocKey, LegalDoc>> = { en, de };
