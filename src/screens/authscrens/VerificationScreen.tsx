import {
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { IconButton, Button } from 'react-native-paper';
import { generalstyles } from '../../generalstyles/generalstyles';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../../constants/endpoints';
import { loginUser } from '../../redux/slices/UserSlice';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { causeVibration, getErrorMessage } from '../../utils/Helpers';

const VerificationScreen = () => {
    const [otpCode, setOtpCode] = useState<any>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showResendLink, setShowResendLink] = useState<boolean>(false);

    const [timer, setTimer] = useState(120); // Initial timer value in seconds

    const { params } = useRoute<any>();
    const { email } = params;
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

    const dispatch = useDispatch<any>();

    //
    //Verify email address
    function verifyEmail() {
        setLoading(true);

        const headers = new Headers();
        headers.append('Accept', 'application/json');

        const body = new FormData();
        body.append('email', email.toLowerCase());
        body.append('otp', otpCode);

        fetch(`${BASE_URL}/client/auth/verifyEmail`, {
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
                    dispatch(loginUser());
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
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ margin: 20 }}
                keyboardShouldPersistTaps="always"
            >
                <View>
                    <IconButton
                        icon="chevron-left"
                        iconColor={theme.colors.white}
                        size={28}
                        onPress={() => navigation.goBack()}
                        containerColor={theme.colors.arraowBackGroundColor}
                    />
                </View>

                <View style={styles.contentRow}>
                    <Text style={styles.verifyTitle}>Verification?</Text>
                </View>

                <View style={styles.contentRow}>
                    <Text style={styles.verifyText}>
                        Check your email. We have sent you a code
                    </Text>
                </View>

                <View>
                    <View>
                        <TextInput
                            style={styles.otpInput}
                            placeholder="Enter Code"
                            placeholderTextColor={theme.colors.placeholder}
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
                    </View>

                    {showResendLink && (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[
                                generalstyles.centerContent,
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
                            <Text style={{ color: theme.colors.buttonColor }}>
                                Click here to Resend Otp
                            </Text>
                        </TouchableOpacity>
                    )}

                    {!showResendLink && (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[generalstyles.centerContent]}
                        >
                            <Text style={{ color: theme.colors.textColor }}>
                                Resend Otp in {timer} seconds
                            </Text>
                        </TouchableOpacity>
                    )}

                    <View style={generalstyles.buttonStyles}>
                        <Button
                            mode="contained"
                            // eslint-disable-next-line react-native/no-inline-styles
                            contentStyle={{
                                flexDirection: 'row-reverse',
                            }}
                            loading={loading}
                            disabled={otpCode.length < 6 || loading}
                            buttonColor={theme.colors.buttonColor}
                            textColor={theme.colors.primary}
                            onPress={verifyEmail}
                        >
                            Verify
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default VerificationScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.primary },

    contentRow: { marginHorizontal: 10, marginVertical: 10 },

    verifyTitle: {
        color: theme.colors.white,
        fontSize: 30,
        fontWeight: 'bold',
    },

    verifyText: {
        color: theme.colors.placeholder,
        fontSize: 15,
    },

    otpInput: {
        color: theme.colors.white,
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.white,
        padding: 10,
    },

    errorColor: { color: '#EF4444', fontSize: 12 },
});
