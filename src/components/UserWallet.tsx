import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme'
import { usePostQuery } from '../hooks/usePostQuery';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { generalStyles } from '../screens/utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dialog, PanningProvider } from 'react-native-ui-lib';
import { ActivityIndicator } from './ActivityIndicator';
import { showMessage } from 'react-native-flash-message';
import { UPDATEWALLETBALANCE } from '../screens/utils/constants/routes';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';


const UserWallet = () => {
    const { data, error, isLoading, refetch } = usePostQuery<any>({
        endpoint: '/auth/hasWalletAccount',
        params: {
            "account": "hasWalletAccount"
        },
        queryOptions: {
            enabled: true,
            refetchInterval: 2000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })

    const { user, authToken } = useSelector((state: RootState) => state.user);

    const [errors, setErrors] = useState<any>({})
    const navigation = useNavigation<any>();
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleShowPassword = () => { setShowPassword(!showPassword); };
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);



    const onUpdataShowWalletBalance = async () => {

        try {
            if (password == "") {
                return setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    password: "Pin is required"
                }));

            }
            setLoading(true)
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', `Bearer ${authToken}`);

            const body = new FormData();
            body.append('pin', password);
            body.append('show_wallet_balance', data.data.show_wallet_balance ? 0 : 1);

            console.log(body)


            fetch(`${UPDATEWALLETBALANCE}`, {
                method: 'POST',
                headers,
                body,
            })
                .then(response => response.json())
                .then(async result => {
                    setLoading(false)
                    setPassword("")
                    setIsVisible(false)
                    if (result?.errors) {

                        setErrors(result.errors);

                        showMessage({
                            message: 'Failed to show balance',
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
                            message: 'Failed',
                            description: 'Invalid Pin',
                            type: 'info',
                            icon: 'info',
                            duration: 3000,
                            autoHide: true,
                        });

                        return setLoading(false);
                    }
                    if (result.response == 'success') {
                        showMessage({
                            message: 'Success',
                            description:
                                'Your show wallet balance has been updated successfully',
                            type: 'success',
                            icon: 'success',
                            duration: 3000,
                            autoHide: true,
                        });

                        return setLoading(false);

                    }
                    else {
                        showMessage({
                            message: 'Failed to show balance',
                            description: 'Please try again',
                            type: 'info',
                            icon: 'info',
                            duration: 3000,
                            autoHide: true,
                        });

                        return setLoading(false);

                    }

                })


        }
        catch (error) {
            showMessage({
                message: 'Failed to show balance',
                description: 'Please try again',
                type: 'info',
                icon: 'info',
                duration: 3000,
                autoHide: true,
            });
            return setLoading(false);

        }


    }

    return (
        <View>
            {/* dialog */}
            <Dialog
                visible={isVisible}
                onDismiss={() => setIsVisible(false)}
                panDirection={PanningProvider.Directions.DOWN}
                containerStyle={{
                    backgroundColor: COLORS.primaryBlackHex,
                    justifyContent: "center",
                    // alignItems: "center",
                    paddingVertical: 20,
                    paddingHorizontal: 40,
                    borderRadius: 10
                }}
                height={350}>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[generalStyles.textStyle]}>
                        Enter your pin to continue.
                    </Text>
                </View>
                {/* password */}
                <View style={generalStyles.formContainer}>
                    <View>
                        <Text style={generalStyles.formInputTextStyle}>
                            Pin</Text>
                    </View>
                    <View style={[generalStyles.flexStyles, styles.viewStyles]}>
                        <TextInput
                            style={[generalStyles.formInput, { flex: 1 }]}
                            placeholderTextColor={COLORS.primaryWhiteHex}
                            secureTextEntry={!showPassword}
                            placeholder={'enter pin'}
                            keyboardType="number-pad"
                            onChangeText={text => setPassword(text)}
                            value={password}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            maxLength={4}
                        />
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={24}
                            color={COLORS.secondaryGreyHex}

                            onPress={toggleShowPassword}
                        />
                    </View>

                    <View>
                        {errors.password && <Text style={generalStyles.errorText}>{errors.password}</Text>}
                    </View>

                </View>
                {/* password */}

                <TouchableOpacity
                    activeOpacity={1}
                    style={[generalStyles.loginContainer, { marginTop: 5, marginBottom: 20 }]}
                    onPress={() => onUpdataShowWalletBalance()}>
                    <Text style={generalStyles.loginText}>{'Confirm Pin'}</Text>
                </TouchableOpacity>
                {/* button */}
                {loading && <ActivityIndicator
                />}

            </Dialog>
            {/* dialog */}
            <View
                style={{
                    marginVertical: 10,
                    marginHorizontal: 15,
                    elevation: 5,
                    borderRadius: 10,
                    paddingBottom: 20,
                    backgroundColor: COLORS.primaryBlackHex,
                }}
            >
                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between", marginHorizontal: 5 }]}>
                    <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center" }]}>
                        <Text style={[styles.avaialableText]}>
                            {`Available Balance`}
                        </Text>
                        <MaterialCommunityIcons
                            name={data?.data?.show_wallet_balance ? 'eye-off' : 'eye'}
                            size={24}
                            color={COLORS.secondaryGreyHex}
                            // style={styles.icon}
                            onPress={() => setIsVisible(true)}
                        />

                    </View>

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => navigation.navigate("AllTransactions")}
                        style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }]}
                    >
                        <Text style={[styles.avaialableText]}>Transaction History</Text>
                        <Ionicons
                            name={"chevron-forward-sharp"}
                            size={24}
                            color={COLORS.secondaryGreyHex}
                            onPress={() => navigation.navigate("AllTransactions")}
                        />
                    </TouchableOpacity>

                </View>


                <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between", marginHorizontal: 10 }]}>
                    <View>
                        <Text style={[styles.avaialableText, { fontFamily: FONTFAMILY.poppins_bold, fontSize: 15, }]}>UGX   {`${data.data.show_wallet_balance ? data.data.account_balance : "****"}`}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[generalStyles.loginContainer, { marginTop: 5, paddingHorizontal: 5, paddingVertical: 5, width: "100%" }]}
                            onPress={() => navigation.navigate("Deposit")}
                        >
                            <Text style={generalStyles.loginText}>{'+ Add Money'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </View>
    )
}


export default UserWallet

const styles = StyleSheet.create({
    avaialableText: {
        fontSize: 12,
        marginVertical: 10,
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        paddingHorizontal: SPACING.space_10,
    },
    viewStyles: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})