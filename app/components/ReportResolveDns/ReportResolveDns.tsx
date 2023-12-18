import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './ReportResolveDns.styles';
import { IGetRequest } from 'api/interfaces/request';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../constants/colors';
import * as Clipboard from 'expo-clipboard';

interface IReportResolveDnsProps {
  request: IGetRequest;
}
const ReportResolveDns = ({ request }: IReportResolveDnsProps) => {
  const { requestResolve } = request;
  const { resolveDNS } = requestResolve[0];
  const [ipCopied, setIpCopied] = useState(false);

  const handleCopyIP = async () => {
    //Copy IP to clipboard
    await Clipboard.setStringAsync(resolveDNS);
    setIpCopied(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.normalText}>IP:</Text>
      <Text style={styles.boldText}>{resolveDNS}</Text>
      {!ipCopied && (
        <TouchableOpacity onPress={handleCopyIP}>
          <MaterialIcons
            name="content-copy"
            size={24}
            color={colors.SECONDARY_RED}
          />
        </TouchableOpacity>
      )}
      {ipCopied && (
        <MaterialIcons name="done" size={24} color={colors.MAIN_GREEN} />
      )}
    </View>
  );
};

export default ReportResolveDns;
