import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';
export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  container: {
    height: 75,
    width: 300,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.BACKGROUND,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 15,
    borderLeftWidth: 5,
  },
  containerError: {
    borderLeftColor: colors.MAIN_RED,
  },
  containerSuccess: {
    borderLeftColor: colors.MAIN_GREEN,
  },
});
