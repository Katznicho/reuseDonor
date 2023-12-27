import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { Button, IconButton } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { BASE_URL } from '../../constants/endpoints';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { causeVibration, getErrorMessage } from '../../utils/Helpers';
import { generalstyles } from '../../generalstyles/generalstyles';

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
        setLoading(true);

        const headers = new Headers();
        headers.append('Accept', 'application/json');

        const body = new FormData();
        body.append('email', email.toLowerCase());

        fetch(`${BASE_URL}/client/auth/resendOTP`, {
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

                navigation.navigate('Verification', { email: email });
                // navigation.goBack();

                setLoading(false);
            })
            .catch(error => {
                console.log('error', error);

                setLoading(false);
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView keyboardShouldPersistTaps="always">
                <View style={{ marginTop: Platform.OS === 'ios' ? 20 : 0 }}>
                    <IconButton
                        icon="chevron-left"
                        iconColor={theme.colors.white}
                        size={28}
                        onPress={() => navigation.goBack()}
                        containerColor={theme.colors.arraowBackGroundColor}
                    />
                </View>

                <Text style={styles.resendTitle}>Resend OTP Code</Text>

                <Text style={styles.resendText}>
                    Please re-enter your email again to resend verification code
                </Text>

                <View style={styles.spacing}>
                    <TextInput
                        label="Enter Email"
                        mode={'flat'}
                        style={styles.emailInput}
                        theme={{
                            colors: {
                                text: theme.colors.white,
                                primary: theme.colors.white,
                            },
                        }}
                        value={email}
                        outlineColor={theme.colors.primary}
                        underlineColor={theme.colors.disabled}
                        textColor={theme.colors.white}
                        textContentType="emailAddress"
                        onChangeText={text => {
                            setEmail(text);

                            if (errors?.email) {
                                setErrors({
                                    ...errors,
                                    email: '',
                                });
                            }
                        }}
                    />

                    <Animated.Text style={[styles.errorColor, errorStyle]}>
                        {getErrorMessage(errors, 'email')}
                    </Animated.Text>
                </View>

                <View style={generalstyles.buttonStyles}>
                    <Button
                        mode="contained"
                        // eslint-disable-next-line react-native/no-inline-styles
                        contentStyle={{
                            flexDirection: 'row-reverse',
                        }}
                        loading={loading}
                        disabled={loading}
                        buttonColor={theme.colors.buttonColor}
                        textColor={theme.colors.primary}
                        onPress={resendOtp}
                    >
                        Send
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ResendEmailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        padding: 20,
    },

    resendTitle: {
        color: theme.colors.white,
        fontSize: 30,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 10,
    },

    spacing: { marginBottom: 10 },

    errorColor: { color: '#EF4444', fontSize: 12 },

    emailInput: {
        backgroundColor: theme.colors.primary,
        borderBottomColor: theme.colors.placeholder,
        height: 60,
        borderBottomWidth: 0,
        color: theme.colors.white,
    },

    resendText: {
        color: theme.colors.placeholder,
        fontSize: 15,
        width: 200,
        flexWrap: 'wrap',
        flexDirection: 'row',
        margin: 10,
    },
});
