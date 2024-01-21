import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { useNavigation } from '@react-navigation/native';
import { PAYMENT_TYPE } from '../utils/constants/constants';
import { PROCESSORDER } from '../utils/constants/routes';
import { showMessage } from 'react-native-flash-message';
import { generalStyles } from '../utils/generatStyles';
import { COLORS } from '../../theme/theme';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import PhoneInput from "react-native-phone-number-input";


const Donate = () => {
    const [amount, setAmount] = useState<string>('')
    const [reason, setReason] = useState<string>('')
    // const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { authToken } = useSelector((state: RootState) => state.user);

    //phone number details
    const [value, setValue] = useState("");
    // const [formattedValue, setFormattedValue] = useState("");
    const [phoneNumber, setPhoneNumber] = React.useState<any>('');
    const [valid, setValid] = useState(false);
    const phoneInput = useRef<PhoneInput>(null);

    const [errors, setErrors] = useState<any>({});

    const navigation = useNavigation<any>()
    const [redirect_url, setRedirect_url] = useState('')

    const onDeposit = () => {
        try {
            if (amount == "") {
                setLoading(false)
                return setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    password: "Amount is required"
                }));

            }
            if (phoneNumber == "") {
                setLoading(false)
                return setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    confirmpassword: "Phone number is required"
                }));

            }
            if (reason == "") {
                setLoading(false)
                return setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    confirmpassword: "Phone number is required"
                }));

            }
            const formData = new FormData();
            formData.append('amount', amount);
            formData.append('description', reason);
            formData.append('phone_number', phoneNumber);
            formData.append('callback', `https://reuse.risidev.com/finishPayment`);
            formData.append('cancel_url', `https://reuse.risidev.com/cancelPayment`);
            formData.append("payment_type", PAYMENT_TYPE.Donation)

            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', `Bearer ${authToken}`);

            setLoading(true)

            fetch(`${PROCESSORDER}`, {
                method: 'POST',
                headers,
                body: formData
            }).then((response) => {

                return response.json()
            }).then((result) => {

                console.log(result)
                if (result?.response?.success) {
                    setRedirect_url(result?.response?.message?.redirect_url)
                    return navigation.navigate('MyWebView', {
                        url: result?.response?.message?.redirect_url
                    })
                }
                else {
                    setLoading(false);
                    return showMessage({
                        message: "Failed to Initiate Deposit",
                        description: "Please try again",
                        type: "info",
                        icon: "info",
                        duration: 3000,
                        autoHide: true
                    })

                }

            }).catch((error) => {
                showMessage({
                    message: 'Failed to create pin',
                    description: 'Please try again',
                    type: 'info',
                    icon: 'info',
                    duration: 3000,
                    autoHide: true,
                });
                return setLoading(false);

            })

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

    useEffect(() => {
        if (redirect_url) {
            navigation.navigate('MyWebView', {
                url: redirect_url
            })
        }

    }, [redirect_url])
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
                        Donate ?
                    </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[generalStyles.textStyle]}>
                        Your donation will help us to serve you better.
                    </Text>
                </View>
                {/* amount */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Amount</Text>
                    </View>
                    <View>
                        <TextInput
                            style={[generalStyles.formInput]}
                            placeholderTextColor={COLORS.primaryWhiteHex}

                            keyboardType="number-pad"
                            placeholder={'enter amount'}
                            onChangeText={text => setAmount(text)}
                            value={amount}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"

                        />


                    </View>

                    <View>
                        {errors.amount && <Text style={generalStyles.errorText}>{errors.amount}</Text>}
                    </View>

                </View>
                {/* amount */}

                {/* phone number */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Phone Number </Text>
                    </View>
                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="UG"
                        layout="second"
                        onChangeText={(text) => {
                            setValue(text);
                        }}
                        onChangeFormattedText={(text) => {
                            console.log(text)
                            setPhoneNumber(text);
                        }}
                        placeholder={'enter phone number'}
                        containerStyle={[generalStyles.formInput, { backgroundColor: COLORS.primaryLightWhiteGrey, }]}
                        textContainerStyle={{ paddingVertical: 0, backgroundColor: COLORS.primaryLightWhiteGrey }}
                        textInputProps={{
                            placeholderTextColor: COLORS.primaryWhiteHex
                        }}
                    />
                    <View>
                        {errors.phoneNumber && <Text style={generalStyles.errorText}>{errors.phoneNumber}</Text>}
                    </View>

                </View>
                {/* phone number */}

                {/* reason */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Reason</Text>
                    </View>
                    <TextInput
                        style={generalStyles.formInput}
                        placeholder="Enter deposit reason forexample: topup"
                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        keyboardType="default"
                        value={reason}
                        onChangeText={text => setReason(text)}

                    />

                    <View>
                        {errors.reason && <Text style={generalStyles.errorText}>{errors.reason}</Text>}
                    </View>

                </View>
                {/* reason */}
                <TouchableOpacity
                    activeOpacity={1}
                    style={generalStyles.loginContainer}
                    onPress={() => onDeposit()}>
                    <Text style={generalStyles.loginText}>{'Donate'}</Text>
                </TouchableOpacity>
                {/* button */}
                {loading && <ActivityIndicator />}
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

export default Donate

const styles = StyleSheet.create({
    errorColor: { color: '#EF4444', fontSize: 12 },
})