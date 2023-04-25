import { StyleSheet } from 'react-native';

import { stylesheet } from '~/utils/styles';

export const LoginScreenStyles = stylesheet({
  text: {
    header: {
      marginBottom: 15,
      textAlign: 'left',
    },
  },
  view: {
    configContainer: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,

      justifyContent: 'flex-start',
      marginBottom: 20,
      marginTop: 60,
      marginVertical: 0,
      width: '100%',
    },
    content: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
    },
    map: { height: '100%', width: '100%' },
    overlay: {
      backgroundColor: '#000',
      bottom: 0,
      left: 0,
      opacity: 0.8,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    sheet: {
      alignItems: 'stretch',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 45,
    },
  },
});

export const colors = {
  error: 'red',
};
