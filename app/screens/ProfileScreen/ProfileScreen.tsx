import { View, Text, Image, TouchableOpacity } from 'react-native';
import {} from 'react';
import styles from './ProfileScreen.styles';
import LogOutButton from '../../components/LogOutButton/LogOutButton';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../store/userStore';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { tokens, tier } = useUserStore();
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionContainer}>
          <Text style={styles.optionContainerText}>
            {t('profileScreen.myTokens')}
          </Text>
          <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
            <Text style={styles.optionContainerText}>{tokens}</Text>
            <Image
              source={require('../../assets/icons/currency.png')}
              style={{
                width: 25,
                height: 25,
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}>
          <Text style={styles.optionContainerText}>
            {t('profileScreen.myPlan')}
          </Text>
          <Text style={styles.optionContainerText}>{tier}</Text>
        </TouchableOpacity>
      </View>
      <LogOutButton />
    </View>
  );
};

export default ProfileScreen;
