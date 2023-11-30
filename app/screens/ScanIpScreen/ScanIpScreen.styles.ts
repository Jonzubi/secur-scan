import colors from '../../constants/colors';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BACKGROUND,
    padding: 15,
  },
  formContainer: {
    gap: 15,
    marginBottom: 30,
    width: width - 30,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.WHITE,
    textAlign: 'center',
    marginBottom: 15,
  },
});
