import Colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
