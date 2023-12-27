import {
    Text,
    View,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/theme';
import { IconButton } from 'react-native-paper';
import { causeVibration, emailChecker } from '../../utils/Helpers';
import { TextInput } from 'react-native-paper';
import { HelperText, Button } from 'react-native-paper';
import { BASE_URL } from '../../constants/endpoints';
import {
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { showMessage } from 'react-native-flash-message';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState<string>('');

    const [, setErrors] = useState<any>({});

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
        setLoading(true);

        const headers = new Headers();
        headers.append('Accept', 'application/json');

        const body = new FormData();
        body.append('email', email.toLowerCase());

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
                // navigation.goBack();

                setLoading(false);
            })
            .catch(error => {
                console.log(error);

                setLoading(false);
            });
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
                <View>
                    <IconButton
                        icon="chevron-left"
                        iconColor={theme.colors.white}
                        size={28}
                        onPress={() => navigation.goBack()}
                        containerColor={'#FFFFFF78'}
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
                        Forgot Password?
                    </Text>
                </View>

                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text
                        style={{
                            color: theme.colors.placeholder,
                            fontSize: 15,
                        }}
                    >
                        Enter your email address. We will send you a link to
                        reset your password
                    </Text>
                </View>

                <View>
                    <TextInput
                        label="Email"
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
                            },
                        }}
                        right={
                            emailChecker(email) == false &&
                            email.length > 0 && (
                                <TextInput.Icon
                                    icon={'checkbox-outline'}
                                    style={{ marginRight: 15, padding: 5 }}
                                    color={theme.colors.buttonColor}
                                    size={24}
                                />
                            )
                        }
                        error={emailChecker(email)}
                        textColor={theme.colors.white}
                        value={email}
                        autoFocus={true}
                        outlineColor={theme.colors.primary}
                        underlineColor={theme.colors.disabled}
                        selectionColor={theme.colors.white}
                        textContentType="emailAddress"
                        onChangeText={text => setEmail(text)}
                    />
                    {emailChecker(email) && (
                        <HelperText type="error" visible={true}>
                            {'Please enter a valid email address'}
                        </HelperText>
                    )}

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
                                email == '' || loading || emailChecker(email)
                            }
                            buttonColor={theme.colors.buttonColor}
                            textColor={theme.colors.primary}
                            onPress={onForgotPassword}
                        >
                            Send
                        </Button>
                    </View>
                    {/* button */}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ForgotPasswordScreen;
