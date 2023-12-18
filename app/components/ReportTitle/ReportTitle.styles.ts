import colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  title: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
