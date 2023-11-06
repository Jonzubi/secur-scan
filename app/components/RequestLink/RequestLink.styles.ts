import colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#777',
    borderRadius: 10,
    gap: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: colors.WHITE,
    fontSize: 14,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.MAIN_RED,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
