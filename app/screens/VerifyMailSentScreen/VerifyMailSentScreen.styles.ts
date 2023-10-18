import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: colors.BACKGROUND,
    padding: 15,
  },
  mainText: {
    color: colors.WHITE,
    flexWrap: 'wrap',
  },
});
