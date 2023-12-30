import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { generalStyles } from './utils/generatStyles';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from '../theme/theme';
import { ActivityIndicator } from '../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { SETUP_WALLET_ACCOUNT } from './utils/constants/routes';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';

const CreatePin = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [errors, setErrors] = useState<any>({});
  const { user, authToken } = useSelector((state: RootState) => state.user);


  const navigation = useNavigation<any>()
  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { setShowPassword(!showPassword); };

  const onCreatePin = async () => {
    try {
      if (password == "") {
        return setErrors((prevErrors: any) => ({
          ...prevErrors,
          password: "Pin is required"
        }));

      }
      if (confirmPassword == "") {
        return setErrors((prevErrors: any) => ({
          ...prevErrors,
          confirmpassword: "Confirm Pin is required"
        }));

      }
      if (password !== confirmPassword) {
        return showMessage({
          message: 'Pin Mismatch',
          description: 'Pin and Confirm Pin Dont match',
          type: 'info',
          icon: 'info',
          duration: 3000,
          autoHide: true,
        });

      }

      setLoading(true)
      const headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', `Bearer ${authToken}`);

      const body = new FormData();
      body.append('pin', password);
      body.append('confitm_pin', confirmPassword);


      fetch(`${SETUP_WALLET_ACCOUNT}`, {
        method: 'POST',
        headers,
        body,
      })
        .then(response => response.json())
        .then(async result => {
          if (result?.errors) {
            setErrors(result.errors);

            showMessage({
              message: 'Failed to create wallet Account',
              description: 'Please try again',
              type: 'info',
              icon: 'info',
              duration: 3000,
              autoHide: true,
            });
            return setLoading(false);
          }

          if (result.response == 'failure') {
            setErrors({
              // email: [result?.message],
              password: [result?.message],
            });
            showMessage({
              message: 'Failed to create wallet Account',
              description: 'Please try again',
              type: 'info',
              icon: 'info',
              duration: 3000,
              autoHide: true,
            });

            return setLoading(false);
          }
          if (result.response == 'success') {
            showMessage({
              message: 'Wallet Account Created',
              description:
                'Your can now deposit onto your wallet account',
              type: 'success',
              icon: 'success',
              duration: 3000,
              autoHide: true,
            });
            navigation.goBack();

            return setLoading(false);

          }
          else {
            showMessage({
              message: 'Failed to create wallet Account',
              description: 'Please try again',
              type: 'info',
              icon: 'info',
              duration: 3000,
              autoHide: true,
            });

            return setLoading(false);

          }

        })
        .catch(error => {
          showMessage({
            message: 'Failed to create wallet Account',
            description: 'Please try again',
            type: 'info',
            icon: 'info',
            duration: 3000,
            autoHide: true,
          });
          console.log(error);

          return setLoading(false);
        });


    }
    catch (error) {
      showMessage({
        message: 'Failed to create pin',
        description: 'Please try again',
        type: 'info',
        icon: 'info',
        duration: 3000,
        autoHide: true,
      });
      return setLoading(false);

    }


  }
  return (
    <KeyboardAwareScrollView
      style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
    >
      <ScrollView
        contentContainerStyle={{
          margin: 20,
        }}
        keyboardShouldPersistTaps="always"
      >
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
            Create your PIN?
          </Text>
        </View>
        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
          <Text style={[generalStyles.textStyle]}>
            Create a 4-digit pin to use in the app to protect your wallet account.
          </Text>
        </View>
        {/* password */}
        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Pin</Text>
          </View>
          <View style={[generalStyles.flexStyles, styles.viewStyles]}>
            <TextInput
              style={[generalStyles.formInput, { flex: 1 }]}
              placeholderTextColor={COLORS.primaryWhiteHex}
              secureTextEntry={!showPassword}
              placeholder={'enter pin'}
              keyboardType="number-pad"
              onChangeText={text => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={4}
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={COLORS.secondaryGreyHex}
              style={styles.icon}
              onPress={toggleShowPassword}
            />
          </View>

          <View>
            {errors.password && <Text style={generalStyles.errorText}>{errors.password}</Text>}
          </View>

        </View>
        {/* password */}
        {/* confirm password */}
        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Confirm Pin</Text>
          </View>
          <View style={[generalStyles.flexStyles, styles.viewStyles]}>
            <TextInput
              style={[generalStyles.formInput, { flex: 1 }]}
              placeholderTextColor={COLORS.primaryWhiteHex}
              secureTextEntry={!showPassword}
              keyboardType="number-pad"
              placeholder={'confirm  your pin'}
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              maxLength={4}
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color={COLORS.secondaryGreyHex}
              style={styles.icon}
              onPress={toggleShowPassword}
            />

          </View>

          <View>
            {errors.confirmpassword && <Text style={generalStyles.errorText}>{errors.confirmpassword}</Text>}
          </View>

        </View>

        {/* confirm  password*/}
        {/* button */}
        <TouchableOpacity
          activeOpacity={1}
          style={generalStyles.loginContainer}
          onPress={() => onCreatePin()}>
          <Text style={generalStyles.loginText}>{'Create Pin'}</Text>
        </TouchableOpacity>
        {/* button */}
        {loading && <ActivityIndicator />}

      </ScrollView>
    </KeyboardAwareScrollView>
  )
}

export default CreatePin

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 10,
  },
  icon: {
    marginLeft: -20,
  },
  viewStyles: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorColor: { color: '#EF4444', fontSize: 12 },
});