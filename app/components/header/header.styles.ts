import { stylesheet } from '~/utils/styles';

const ICON_CONTAINER_SIZE = 48;
export const ICON_SIZE = 24;

export const HeaderStyles = stylesheet({
  text: {
    title: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
  view: {
    container: {
      alignItems: 'center',
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    iconContainer: {
      alignItems: 'center',
      height: ICON_CONTAINER_SIZE,
      justifyContent: 'center',
      width: ICON_CONTAINER_SIZE,
    },
  },
});
