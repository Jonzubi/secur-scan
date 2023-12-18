import colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    fontSize: 20,
    color: colors.WHITE,
  },
  textSuccess: {
    color: colors.MAIN_GREEN,
  },
  textError: {
    color: colors.SECONDARY_RED,
  },
  headerTextBold: {
    fontSize: 20,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});
