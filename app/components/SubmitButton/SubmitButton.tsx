import { ActivityIndicator, View, ViewStyle } from 'react-native';
import colors from '../../constants/colors';
import { Button } from '@rneui/themed';
import styles from './SubmitButton.styles';

interface SubmitButtonProps {
  isLoading: boolean;
  handlePress(): void;
  title: string;
  containerStyle?: ViewStyle;
}
export default function SubmitButton({
  isLoading,
  handlePress,
  title,
  containerStyle,
}: SubmitButtonProps) {
  return (
    <View style={containerStyle}>
      {isLoading && (
        <ActivityIndicator
          size={'large'}
          color={colors.MAIN_RED}
          style={styles.button}
        />
      )}
      {!isLoading && (
        <Button
          title={title}
          color={colors.MAIN_RED}
          containerStyle={styles.button}
          onPress={handlePress}
        />
      )}
    </View>
  );
}
