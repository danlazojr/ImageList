/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Footer';

export default defineMessages({
  licenseMessage: {
    id: `${scope}.content.message`,
    defaultMessage:
      'This project is for a test app for Flexisource by Danilo Lazo.',
  },
});
