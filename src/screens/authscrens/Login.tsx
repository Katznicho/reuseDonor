import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import { generalStyles } from '../utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import { useFirebase } from '../../hooks/useFirebase';

const Login = () => {
  const { login, signUpWithGoogle } = useFirebase()

  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState<any>('');
  const [password, setPassword] = React.useState<any>('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<any>({
    email: '',
    password: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onPressLogin = async () => {
    if (email == "") {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: "Email is required"
      }));
      return;
    }
    else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: ""
      }));
    }
    if (!validateEmail(email)) {

      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      return;

    } else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        email: '',
      }));
    }

    if (password == "") {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: "Passsword is required"
      }));
      return;
    }
    else {
      setErrors((prevErrors: any) => ({
        ...prevErrors,
        password: ""
      }));
    }

    try {
      setLoading(true)
      let res = await login(email, password);
      setLoading(false)
      if (res?.user) {
        showMessage({
          message: "Success",
          type: "success",
          autoHide: true,
          duration: 3000,
          description: "Logged in successfully"
        })
      }
      else {
        showMessage({
          message: "Error",
          description: "Invalid email or password",
          type: "info",
          autoHide: true,
          duration: 3000,
          icon: "danger"
        })
        return;
      }



    } catch (error) {
      setLoading(false)
      showMessage({
        message: "Error",
        description: "Invalid email or password",
        type: "info",
        autoHide: true,
        duration: 3000,
        icon: "danger"
      })
    }



  }

  return (
    <View style={generalStyles.ScreenContainer}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
        >
        {/* login and register */}
        {/* <Text style={styles.title}>{'Login'}</Text> */}

        {/* login and register */}
        <View
          style={[
            generalStyles.flexStyles,
            {
              alignItems: 'center',
            },
          ]}
        >
          <View

          >
            <TouchableOpacity>
              <Text style={generalStyles.authTitle}>Login</Text>
            </TouchableOpacity>
            <View style={generalStyles.bottomHairline} />

          </View>

          <View>
            <TouchableOpacity
              onPress={() => {

                navigation.navigate('Register');
              }}
            >
              <Text style={generalStyles.authTitle}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* login and register */}

        <View style={generalStyles.centerContent}>
          <Text style={{
            fontSize: 20,
            color: COLORS.primaryWhiteHex
          }}>
            Email</Text>
        </View>

        <TextInput
          style={generalStyles.InputContainer}
          placeholder={'enter email'}
          keyboardType="email-address"
          placeholderTextColor={COLORS.primaryWhiteHex}
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={generalStyles.centerContent}>
          {errors.email && <Text style={generalStyles.errorText}>{errors.email}</Text>}
        </View>

        <View style={generalStyles.centerContent}>
          <Text style={{
            fontSize: 20,
            color: COLORS.primaryWhiteHex
          }}>
            Password</Text>
        </View>
        <TextInput
          style={generalStyles.InputContainer}
          placeholderTextColor={COLORS.primaryWhiteHex}
          secureTextEntry
          placeholder={'enter password'}
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={generalStyles.centerContent}>
          {errors.password && <Text style={generalStyles.errorText}>{errors.password}</Text>}
        </View>

        {/* <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => onForgotPassword()}>
          <Text style={styles.forgotPasswordText}>
            {'Forgot password?'}
          </Text>
        </TouchableOpacity>
      </View> */}

        <TouchableOpacity
          style={generalStyles.loginContainer}
          onPress={() => onPressLogin()}>
          <Text style={generalStyles.loginText}>{'Log In'}</Text>
        </TouchableOpacity>
        <>
          {/* <Text style={styles.orTextStyle}> {'OR'}</Text>
        <Text style={styles.facebookText}>
          {'Login With Google'}
        </Text> */}
        </>


        {/* <IMGoogleSignInButton
        containerStyle={styles.googleButtonStyle}
        onPress={onGoogleButtonPress}
      /> */}

        {/* <TouchableOpacity
        style={styles.phoneNumberContainer}
        onPress={() => navigation.navigate('Sms', { isSigningUp: false })}>
        <Text style={styles.phoneNumber}>
          Login with phone number
        </Text>
      </TouchableOpacity> */}

        {loading && <ActivityIndicator />}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  orTextStyle: {
    color: COLORS.primaryWhiteHex,
    marginTop: 40,
    marginBottom: 10,
    alignSelf: 'center',
  },

  

})