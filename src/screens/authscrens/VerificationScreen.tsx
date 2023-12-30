import {
    Text,
    View,
    TouchableOpacity,

    ScrollView,
    TextInput,
    StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { VERIFY_EMAIL } from '../utils/constants/routes';
import { causeVibration, getErrorMessage } from '../utils/helpers/helpers';
import { showMessage } from 'react-native-flash-message';
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActivityIndicator } from '../../components/ActivityIndicator';


const VerificationScreen = () => {
    const [otpCode, setOtpCode] = useState<any>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showResendLink, setShowResendLink] = useState<boolean>(false);

    const [timer, setTimer] = useState(120); // Initial timer value in seconds

    const { params } = useRoute<any>();
    const { email } = params ?? "katznicho@gmail.com";
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
            marginLeft: 14,
        };
    });

    function triggerErrorAnimation() {
        rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(ANGLE, { duration: 100 }), 4, true),
            withTiming(0, { duration: 50 }),
        );
    }

    // useEffect(() => {
    //   navigation.navigate('ResendEmail');
    // });

    const navigation = useNavigation<any>();

    useEffect(() => {
        // Start the timer when the component mounts
        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 0) {
                    clearInterval(interval);
                    // Perform action when timer reaches zero (e.g., enable the link)
                    setShowResendLink(true);
                    return prevTimer;
                }
                setShowResendLink(false);
                return prevTimer - 1;
            });
        }, 1000);

        // Clear the timer when the component unmounts
        return () => clearInterval(interval);
    }, []);



    //
    //Verify email address
    function verifyEmail() {
        if (otpCode == "") {
            setErrors((prevErrors: any) => ({
                ...prevErrors,
                otpCode: "Code is required"
            }));
            return;
        }
        setLoading(true);

        const headers = new Headers();
        headers.append('Accept', 'application/json');


        const body = new FormData();
        body.append('email', email.toLowerCase());
        body.append('otp', otpCode);

        fetch(`${VERIFY_EMAIL}`, {
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
                    // setErrors({
                    //   // email: [result?.message],
                    //   password: [result?.message],
                    // });
                    causeVibration();
                    triggerErrorAnimation();
                    return setLoading(false);
                }

                if (result.response === 'success') {
                    //dispatch(loginUser());
                    showMessage({
                        message: "Email Valid",
                        description: "Your email has been verified",
                        icon: "success",
                        autoHide: true,
                        duration: 3000

                    })
                    navigation.navigate("Login");
                }

                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);

                setLoading(false);
            });
    }

    //
    //
    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                contentContainerStyle={{ margin: 20 }}
                keyboardShouldPersistTaps="always"
            >


                <View style={styles.contentRow}>
                    <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>Verification?</Text>
                </View>

                <View style={styles.contentRow}>
                    <Text style={[generalStyles.textStyle]}>
                        Check your email. We have sent you a code
                    </Text>
                </View>

                <View>
                    <View style={generalStyles.formContainer}>
                        <View>
                            <Text style={generalStyles.formInputTextStyle}>
                                Code </Text>
                        </View>
                        <TextInput
                            style={generalStyles.formInput}
                            placeholder="Enter Code"
                            placeholderTextColor={COLORS.primaryLightGreyHex}
                            keyboardType="number-pad"
                            value={otpCode}
                            onChangeText={text => {
                                setOtpCode(text);

                                if (errors?.otp) {
                                    setErrors({
                                        ...errors,
                                        otp: '',
                                    });
                                }
                            }}
                            maxLength={6}
                        />

                        <Animated.Text style={[styles.errorColor, errorStyle]}>
                            {getErrorMessage(errors, 'otp')}
                        </Animated.Text>
                        <View>
                            {errors.otpCode && <Text style={generalStyles.errorText}>{errors.otpCode}</Text>}
                        </View>

                    </View>

                    {showResendLink && (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[
                                generalStyles.centerContent,
                                { marginTop: 30 },
                            ]}
                            onPress={() => {
                                setOtpCode('');

                                setErrors({
                                    ...errors,
                                    otp: '',
                                });
                                navigation.navigate('ResendEmail');
                            }}
                        >
                            <Text style={{ color: COLORS.primaryOrangeHex }}>
                                Click here to Resend Otp
                            </Text>
                        </TouchableOpacity>
                    )}

                    {!showResendLink && (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[generalStyles.centerContent]}
                        >
                            <Text style={{ color: COLORS.primaryOrangeHex }}>
                                Resend Otp in {timer} seconds
                            </Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        activeOpacity={1}
                        style={generalStyles.loginContainer}
                        onPress={() => verifyEmail()}>
                        <Text style={generalStyles.loginText}>{'Verify'}</Text>
                    </TouchableOpacity>

                    {loading && <ActivityIndicator />}


                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default VerificationScreen;

const styles = StyleSheet.create({


    contentRow: { marginHorizontal: 10, marginVertical: 10 },

    verifyTitle: {
        color: COLORS.primaryBlackHex,
        fontSize: 30,
        fontWeight: 'bold',
    },

    verifyText: {
        color: COLORS.primaryLightGreyHex,
        fontSize: 15,
    },

    otpInput: {
        color: COLORS.primaryBlackHex,
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primaryBlackHex,
        padding: 10,
    },

    errorColor: { color: '#EF4444', fontSize: 12 },
});
