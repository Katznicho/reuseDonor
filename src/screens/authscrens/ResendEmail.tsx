import {
    Text,
    View,
    TextInput,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { causeVibration, validateEmail } from '../utils/helpers/helpers';
import { RESEND_OTP } from '../utils/constants/routes';
import { generalStyles } from '../utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { showMessage } from 'react-native-flash-message';


const ResendEmailScreen = () => {
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [errors, setErrors] = useState<any>({});

    const rotation = useSharedValue(0);
    const ANGLE = 10;

    const errorStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: rotation.value,
                },
            ],
            marginLeft: 17,
        };
    });

    function triggerErrorAnimation() {
        rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(ANGLE, { duration: 100 }), 4, true),
            withTiming(0, { duration: 50 }),
        );
    }

    //
    //Resend OTP
    function resendOtp() {
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

        fetch(`${RESEND_OTP}`, {
            method: 'POST',
            headers,
            body,
        })
            .then(response => response.json())
            .then(async result => {
                console.log(result);

                if (result?.errors) {
                    setErrors(result.errors);
                    causeVibration();
                    triggerErrorAnimation();
                    return setLoading(false);
                }

                if (result.response === 'failure') {
                    setErrors({
                        // email: [result?.message],
                        password: [result?.message],
                    });
                    causeVibration();
                    triggerErrorAnimation();
                    return setLoading(false);
                }
                showMessage({
                    message: "Code Resent",
                    description: "An otp has been resent to your email",
                    icon: "success",
                    autoHide: true,
                    duration: 3000
                })

                navigation.navigate('VerifyEmail', { email: email });
            

                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);

                setLoading(false);
            });
    }

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                    margin: 20,
                }}
            >


                <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>Resend OTP Code</Text>

                <Text style={[generalStyles.textStyle]}>
                    Please re-enter your email again to resend verification code
                </Text>

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
                    onPress={() => resendOtp()}>
                    <Text style={generalStyles.loginText}>{'Resend Email'}</Text>
                </TouchableOpacity>
                {/* button */}
                {loading && <ActivityIndicator />}
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default ResendEmailScreen;


