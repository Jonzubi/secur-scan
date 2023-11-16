import { View, Text, TouchableOpacity } from 'react-native';
import { ReactNode } from 'react';
import styles from './RequestLink.styles';
import { RequestType, REQUEST_PRICES } from '@jonzubi/securscan-shared';
import { useUserStore } from '../../store/userStore';
import { useRouter } from 'expo-router';
import { REQUEST_TO_HREF } from '../../constants/requestToHref';

export type RequestLinkProps = {
  title: string;
  icon: () => ReactNode;
  description: string;
  requestType: RequestType;
};
const RequestLink = ({
  description,
  icon,
  title,
  requestType,
}: RequestLinkProps) => {
  const { tokens } = useUserStore();
  const router = useRouter();

  const handleClick = () => {
    const price = REQUEST_PRICES[requestType];
    if (tokens >= price) {
      const href = REQUEST_TO_HREF[requestType];
      router.push(href);
      return;
    }

    router.push('/buy-tokens');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {icon()}
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
      <TouchableOpacity onPress={handleClick} style={styles.buttonContainer}>
        <Text
          style={styles.buttonText}
        >{`Process for ${REQUEST_PRICES[requestType]} token`}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestLink;
