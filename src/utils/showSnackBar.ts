import Snackbar from 'react-native-snackbar';

enum Duration {
  SHORT = -1,
  LONG = -2,
  INDEFINITE = 0,
}

export default function (text: string, duration: Duration) {
  return Snackbar.show({
    text,
    fontFamily: 'Nunito-Regular',
    duration: duration,
    backgroundColor: '#6C63FF',
  });
}
