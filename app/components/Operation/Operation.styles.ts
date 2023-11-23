import colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.BACKGROUND,
    padding: 15,
    paddingVertical: 20,
    borderBottomColor: colors.GRAY,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  targetText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
});
