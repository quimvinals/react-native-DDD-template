import { stylesheet } from '~/utils/styles';

export const ICON_LOGO_SIZE = 160;

export const loginFormStyles = stylesheet({
  view: {
    buttonContainer: {
      alignItems: 'flex-start',
      marginTop: 16,
    },
    content: {
      justifyContent: 'flex-end',
    },
  },
});
