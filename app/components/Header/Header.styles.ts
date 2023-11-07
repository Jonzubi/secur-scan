import colors from '../../constants/colors';
import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: height * 0.1,
    backgroundColor: colors.BACKGROUND,
    shadowColor: colors.WHITE,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tokenContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  tokenText: {
    color: colors.WHITE,
    fontSize: 18,
  },
});
