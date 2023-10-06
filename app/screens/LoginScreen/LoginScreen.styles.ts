import Colors from '../../constants/colors';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  logo: {
    width: 500 * width * 0.001,
    height: 500 * width * 0.001,
    alignSelf: 'center',
  },
  form: {
    marginTop: 30,
    gap: 15,
  },
});
