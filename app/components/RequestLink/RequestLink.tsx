import { View, Text } from 'react-native';
import { ReactNode } from 'react';
import styles from './RequestLink.styles';
import { Link } from 'expo-router';

export type RequestLinkProps = {
  title: string;
  icon: () => ReactNode;
  description: string;
  tokenCost: number;
  href: string;
};
const RequestLink = ({
  description,
  icon,
  title,
  tokenCost,
  href,
}: RequestLinkProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {icon()}
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Text style={styles.descriptionText}>{description}</Text>
      <Link href={href} style={styles.buttonContainer}>
        <Text
          style={styles.buttonText}
        >{`Process for ${tokenCost} token`}</Text>
      </Link>
    </View>
  );
};

export default RequestLink;
