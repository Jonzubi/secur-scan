import colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.MAIN_RED,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  icon: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
});
