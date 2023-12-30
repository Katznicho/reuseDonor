import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import { generalStyles } from '../utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import { LOGIN } from '../utils/constants/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUserState } from '../../redux/store/slices/UserSlice';
import { useDispatch } from 'react-redux';
import { validateEmail } from '../utils/helpers/helpers';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Login = () => {
  const dispatch = useDispatch<any>()

  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState<any>('');
  const [password, setPassword] = React.useState<any>('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // Function to toggle the password visibility state 
  const toggleShowPassword = () => { setShowPassword(!showPassword); };

  const [errors, setErrors] = useState<any>({
    email: '',
    password: '',
  });



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
      const headers = new Headers();
      headers.append('Accept', 'application/json');

      const body = new FormData();
      body.append('email', email.toLowerCase());
      body.append('password', password);

      fetch(`${LOGIN}`, {
        method: 'POST',
        headers,
        body,
      })
        .then(response => response.json())
        .then(async result => {
          console.log(result);

          if (result?.errors) {
            setErrors(result.errors);
            showMessage({
              message: "Error",
              description: "Invalid email or password",
              type: "info",
              autoHide: true,
              duration: 3000,
              icon: "danger"
            })
            return setLoading(false);
          }

          if (result.response === 'failure') {
            setErrors({
              // email: [result?.message],
              password: [result?.message],
            });
            showMessage({
              message: "Error",
              description: "Invalid email or password",
              type: "info",
              autoHide: true,
              duration: 3000,
              icon: "danger"
            })
            return setLoading(false);
          }

          if (result?.response === 'success') {
            //login in user with firebase using email and password
            // const userCredentials = await auth().signInWithEmailAndPassword(
            //   email,
            //   password,
            // );

            //store the token in the async storage
            AsyncStorage.setItem('token', result?.authToken);
            //"name": "Katende Nicholas"
            let name = result.user.name;
            let firstName = name.split(' ')[0];
            let lastName = name.split(' ')[1];

            dispatch(
              updateUserState({
                isLoggedIn: true,
                user: {
                  UID: result?.user.id,
                  fname: firstName,
                  lname: lastName,
                  email: result?.user?.email,
                  phone: result?.user?.phone_number,
                  displayPicture: result?.user?.avatar,
                  isVerified: false,
                  reuseType: result?.user.role
                },
                authToken: result?.authToken,
              }),
            );

            setLoading(false);
            setEmail('');
            setPassword('');
          }

          setLoading(false);
        })
        .catch(error => {
          console.log('error', error);

          setLoading(false);
        });



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
        contentContainerStyle={{ paddingBottom: 50 }}
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

        {/* center logo */}
        <View style={generalStyles.centerContent}>
          <Image
            source={require('../../assets/images/reuse.png')}
            style={{
              width: 100,
              height: 100,
              // tintColor: COLORS.primaryBlackHex,
              borderRadius: 20
            }}
            resizeMode="contain"
          />

        </View>
        {/* center logo */}

        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Email</Text>
          </View>

          <TextInput
            style={generalStyles.formInput}
            placeholder={'enter email'}
            keyboardType="email-address"
            placeholderTextColor={COLORS.primaryWhiteHex}
            onChangeText={text => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <View>
            {errors.email && <Text style={generalStyles.errorText}>{errors.email}</Text>}
          </View>

        </View>


        <View style={generalStyles.formContainer}>
          <View>
            <Text style={generalStyles.formInputTextStyle}>
              Password</Text>
          </View >
          <View style={[generalStyles.flexStyles, styles.viewStyles]}>
            <TextInput
              style={[generalStyles.formInput, { flex: 1 }]}
              placeholderTextColor={COLORS.primaryWhiteHex}
              secureTextEntry={!showPassword}
              placeholder={'enter password'}
              onChangeText={text => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
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



        <View style={generalStyles.forgotPasswordContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={generalStyles.forgotText}>
              {'Forgot password?'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          style={generalStyles.loginContainer}
          onPress={() => onPressLogin()}>
          <Text style={generalStyles.loginText}>{'Login'}</Text>
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

  icon: {
    marginLeft: -20,
  },
  viewStyles: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },

});

