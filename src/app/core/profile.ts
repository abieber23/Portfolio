export const PROFILE = {
  firstName: 'Adrian',
  lastName: 'Bieber',
  email: 'adrianbieber2@gmail.com',
  street: 'Königsweg 1',
  zip: '97488',
  city: 'Stadtlauringen',
  github: 'https://github.com/abieber23',
  // TODO: replace with the real profile URL
  linkedin: 'https://www.linkedin.com/',
} as const;

/** Browser tab title of the homepage (same as in index.html). */
export const PAGE_TITLE = `${PROFILE.firstName} ${PROFILE.lastName} – Frontend Developer`;
