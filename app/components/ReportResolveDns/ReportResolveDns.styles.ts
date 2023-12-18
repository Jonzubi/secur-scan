import colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  normalText: {
    fontSize: 20,
    color: colors.WHITE,
  },
  boldText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
});
