import colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND,
    justifyContent: 'space-between',
  },
  optionsContainer: {
    padding: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    backgroundColor: colors.GRAY,
    borderRadius: 10,
  },
  optionContainerText: {
    color: colors.WHITE,
    fontSize: 15,
  },
});
