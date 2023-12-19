import colors from '../../constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.WHITE,
  },
  subContainer: {
    marginVertical: 20,
  },
  portsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  portContainer: {
    width: 50,
    height: 25,
    borderRadius: 5,
    border: 1,
    borderColor: colors.WHITE,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GRAY,
  },
  portText: {
    color: colors.WHITE,
  },
  vulnsReportText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
  permorDetailedScanText: {
    color: colors.SECONDARY_RED,
  },
});
