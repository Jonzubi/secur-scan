import { useEffect } from 'react';
import { Modal, View, Text } from 'react-native';
import styles from './CustomToast.styles';

export enum ToastType {
  ERROR,
  SUCCESS,
}

interface CustomToast {
  visible: boolean;
  text: string;
  closeModal(): void;
  type: ToastType;
}
export default function CustomToast({
  visible,
  text,
  closeModal,
  type,
}: CustomToast) {
  useEffect(() => {
    if (!visible) return;
    setTimeout(() => {
      closeModal();
    }, 1000);
  }, [visible]);
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.container,
            type === ToastType.ERROR && styles.containerError,
            type === ToastType.SUCCESS && styles.containerSuccess,
          ]}
        >
          <Text>{text}</Text>
        </View>
      </View>
    </Modal>
  );
}
