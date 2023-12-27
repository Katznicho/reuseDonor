import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput as RNTextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { IconButton } from 'react-native-paper';
import {
    causeVibration,
    confirmPasswordError,
    getErrorMessage,
} from '../../utils/Helpers';
import { TextInput } from 'react-native-paper';
import { HelperText, Button } from 'react-native-paper';
import { generalstyles } from '../../generalstyles/generalstyles';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { BASE_URL } from '../../constants/endpoints';
import { showMessage } from 'react-native-flash-message';

const ChangePasswordForgotEmail = () => {
    const { params } = useRoute<any>();

    const [otpCode, setOtpCode] = useState<any>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    //password icons
    const [passwordType, setPasswordType] = useState(true);

    const [, setConfirmPasswordType] = useState(true);

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

    const navigation = useNavigation<any>();

    function changePassword() {
        try {
            setLoading(true);

            const headers = new Headers();
            headers.append('Accept', 'application/json');

            const body = new FormData();
            body.append('email', params?.email.toLowerCase());
            body.append('otp', otpCode);
            body.append('new_password', password);
            body.append('confirmPassword', confirmPassword);

            fetch(`${BASE_URL}/client/auth/requestPasswordReset`, {
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
                        showMessage({
                            message: 'Failed to change password',
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
                            message: 'Failed to change password',
                            description: 'Please try again',
                            type: 'info',
                            icon: 'info',
                            duration: 3000,
                            autoHide: true,
                        });
                        causeVibration();
                        triggerErrorAnimation();
                        return setLoading(false);
                    }
                    showMessage({
                        message: 'Password Changed Successfully',
                        description:
                            'Your password has been changed successfully',
                        type: 'success',
                        icon: 'success',
                        duration: 3000,
                        autoHide: true,
                    });
                    navigation.navigate('Login');

                    return setLoading(false);
                })
                .catch(error => {
                    showMessage({
                        message: 'Failed to change password',
                        description: 'Please try again',
                        type: 'info',
                        icon: 'info',
                        duration: 3000,
                        autoHide: true,
                    });
                    console.log(error);

                    return setLoading(false);
                });
        } catch (error) {
            showMessage({
                message: 'Failed to change password',
                description: 'Please try again',
                type: 'info',
                icon: 'info',
                duration: 3000,
                autoHide: true,
            });
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                backgroundColor: theme.colors.primary,
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{
                    margin: 20,
                }}
                keyboardShouldPersistTaps="always"
            >
                <View style={{ marginTop: Platform.OS === 'ios' ? 20 : 0 }}>
                    <IconButton
                        icon="chevron-left"
                        iconColor={theme.colors.white}
                        size={28}
                        onPress={() => navigation.goBack()}
                        containerColor={theme.colors.arraowBackGroundColor}
                    />
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text
                        style={{
                            color: theme.colors.white,
                            fontSize: 30,
                            fontWeight: 'bold',
                        }}
                    >
                        Change Password
                    </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text
                        style={{
                            color: theme.colors.placeholder,
                            fontSize: 15,
                        }}
                    >
                        Check your email. We have sent you a code. You need the
                        code to change your password
                    </Text>
                </View>

                {/* code */}
                <View>
                    <View>
                        <RNTextInput
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
                </View>

                {/* code */}
                {/* password */}
                <View style={styles.spacing}>
                    <TextInput
                        label="New Password"
                        mode={'flat'}
                        style={{
                            backgroundColor: theme.colors.primary,
                            borderBottomColor: theme.colors.placeholder,
                            height: 60,
                            borderBottomWidth: 0,
                        }}
                        theme={{
                            colors: {
                                text: theme.colors.white,
                                primary: theme.colors.white,
                                secondary: theme.colors.white,
                                surface: theme.colors.white,
                                onSurface: theme.colors.white,
                                accent: theme.colors.white,
                                inverseOnSurface: theme.colors.primary,
                                inverseSurface: theme.colors.primary,
                                onSurfaceVariant: theme.colors.white,
                                placeholder: theme.colors.primary,
                            },
                        }}
                        right={
                            password.length > 0 && (
                                <TextInput.Icon
                                    icon={
                                        passwordType ? 'eye-off-outline' : 'eye'
                                    }
                                    style={{ marginRight: 15, padding: 5 }}
                                    color={theme.colors.white}
                                    size={24}
                                    theme={{
                                        colors: {
                                            background: theme.colors.white,
                                            primary: theme.colors.white,
                                            onBackground: theme.colors.white,
                                            surface: theme.colors.white,
                                        },
                                    }}
                                    onPress={() =>
                                        setPasswordType(!passwordType)
                                    }
                                />
                            )
                        }
                        value={password}
                        outlineColor={theme.colors.primary}
                        underlineColor={theme.colors.disabled}
                        selectionColor={theme.colors.primary}
                        textContentType="password"
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={passwordType ? true : false}
                    />
                </View>
                {/* password */}

                {/* confirm password */}
                <View style={styles.spacing}>
                    <TextInput
                        label="Confirm New Password"
                        mode={'flat'}
                        style={{
                            backgroundColor: theme.colors.primary,
                            borderBottomColor: theme.colors.placeholder,
                            height: 60,
                            borderBottomWidth: 0,
                        }}
                        autoFocus={true}
                        theme={{
                            colors: {
                                text: theme.colors.white,
                                primary: theme.colors.white,
                                secondary: theme.colors.white,
                                surface: theme.colors.white,
                                onSurface: theme.colors.white,
                                accent: theme.colors.white,
                                inverseOnSurface: theme.colors.primary,
                                inverseSurface: theme.colors.primary,
                                onSurfaceVariant: theme.colors.white,
                                placeholder: theme.colors.primary,
                            },
                        }}
                        right={
                            confirmPassword.length > 0 && (
                                <TextInput.Icon
                                    icon={
                                        passwordType ? 'eye-off-outline' : 'eye'
                                    }
                                    style={{ marginRight: 15, padding: 5 }}
                                    color={theme.colors.white}
                                    size={24}
                                    onPress={() =>
                                        setConfirmPasswordType(!passwordType)
                                    }
                                />
                            )
                        }
                        error={confirmPasswordError(password, confirmPassword)}
                        value={confirmPassword}
                        outlineColor={theme.colors.primary}
                        underlineColor={theme.colors.disabled}
                        selectionColor={theme.colors.primary}
                        textContentType="password"
                        onChangeText={text => setConfirmPassword(text)}
                        secureTextEntry={passwordType ? true : false}
                    />
                    {confirmPasswordError(password, confirmPassword) && (
                        <HelperText type="error" visible={true}>
                            {'Passwords dont match'}
                        </HelperText>
                    )}
                </View>
                {/* confirm  password*/}

                <View>
                    {/* remember me */}
                    <TouchableOpacity
                        style={[
                            generalstyles.centerContent,
                            generalstyles.flexStyles,
                            { marginLeft: -40, marginVertical: 10 },
                        ]}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text
                            style={{
                                color: theme.colors.buttonColor,
                                marginLeft: -5,
                            }}
                        >
                            Back to login
                        </Text>
                    </TouchableOpacity>
                    {/* remember me */}

                    {/* button */}
                    <View
                        style={{
                            marginHorizontal: 40,
                            marginVertical: 30,
                            backgroundColor: theme.colors.white,
                            borderRadius: 20,
                        }}
                    >
                        <Button
                            mode="contained"
                            contentStyle={{
                                flexDirection: 'row-reverse',
                            }}
                            loading={loading}
                            disabled={
                                loading ||
                                password == '' ||
                                confirmPassword == '' ||
                                confirmPasswordError(
                                    password,
                                    confirmPassword,
                                ) ||
                                otpCode == ''
                            }
                            buttonColor={theme.colors.buttonColor}
                            textColor={theme.colors.primary}
                            onPress={changePassword}
                        >
                            Change Password
                        </Button>
                    </View>
                    {/* button */}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ChangePasswordForgotEmail;

const styles = StyleSheet.create({
    spacing: {
        marginBottom: 10,
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
