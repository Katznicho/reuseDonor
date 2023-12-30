import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { showMessage } from 'react-native-flash-message';
import { FORGOT_PASSWORD } from '../utils/constants/routes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { generalStyles } from '../utils/generatStyles';
import { COLORS } from '../../theme/theme';
import { causeVibration, validateEmail } from '../utils/helpers/helpers';
import { ActivityIndicator } from '../../components/ActivityIndicator';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState<string>('');

    const [errors, setErrors] = useState<any>({ email: '', });



    const rotation = useSharedValue(0);
    const ANGLE = 10;

    function triggerErrorAnimation() {
        rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(ANGLE, { duration: 100 }), 4, true),
            withTiming(0, { duration: 50 }),
        );
    }

    const [loading, setLoading] = useState<boolean>(false);

    const navigation = useNavigation<any>();

    function onForgotPassword() {
        if (email == "") {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                email: "Email is required"
            }));
            return;
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
        setLoading(true);

        const headers = new Headers();
        headers.append('Accept', 'application/json');

        const body = new FormData();
        body.append('email', email.toLowerCase());

        fetch(`${FORGOT_PASSWORD}`, {
            method: 'POST',
            headers,
            body,
        })
            .then(response => response.json())
            .then(async result => {

                if (result?.errors) {
                    setErrors(result.errors);
                    causeVibration();
                    triggerErrorAnimation();
                    showMessage({
                        message: 'Email not found',
                        description: 'This email is not registered with us',
                        type: 'info',
                        icon: 'info',
                        duration: 3000,
                        autoHide: true,
                    });
                    return setLoading(false);
                }

                if (result.response === 'failure') {
                    setErrors({
                        // email: [result?.message],
                        password: [result?.message],
                    });
                    causeVibration();
                    triggerErrorAnimation();
                    showMessage({
                        message: 'Email not found',
                        description: 'This email is not registered with us',
                        type: 'info',
                        icon: 'info',
                        duration: 3000,
                        autoHide: true,
                    });
                    return setLoading(false);
                }
                showMessage({
                    message: 'A code has been sent to your email',
                    description: 'Please check your email',
                    type: 'success',
                    icon: 'success',
                    duration: 3000,
                    autoHide: true,
                });

                navigation.navigate('ChangePasswordForgotEmail', {
                    email: email,
                });


                setLoading(false);
            })
            .catch(error => {
                console.log(error);

                setLoading(false);
            });
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
                    <Text
                        style={[generalStyles.textStyle, { fontSize: 20 }]}
                    >
                        Forgot Password?
                    </Text>
                </View>

                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text
                        style={[generalStyles.textStyle]}
                    >
                        Enter your email address. We will send you a link to
                        reset your password
                    </Text>
                </View>

                <View>
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

                    {/* button */}
                    <TouchableOpacity
                        activeOpacity={1}
                        style={generalStyles.loginContainer}
                        onPress={() => onForgotPassword()}>
                        <Text style={generalStyles.loginText}>{'Send'}</Text>
                    </TouchableOpacity>
                    {/* button */}
                    {loading && <ActivityIndicator />}
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default ForgotPasswordScreen;
