/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFirebase } from '../../hooks/useFirebase';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dialog, PanningProvider } from 'react-native-ui-lib';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { FLUTTER_WAVE_MERCHANT_KEY } from '@env';
import { showMessage } from 'react-native-flash-message';
import { generateTransactionRef } from '../utils/helpers/helpers';
import { PAYMENT_STATUS } from '../utils/constants/constants';
import { RedirectParams } from '../Types/types';
import { generalStyles } from '../utils/generatStyles';
import { COLORS } from '../../theme/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const { width } = Dimensions.get('window');



const PaymentSummary = () => {

    const { updateProductPaymentStatus, updatePaymentStatus } = useFirebase();
    const navigation = useNavigation<any>();

    const handleOnRedirect = async (data: RedirectParams) => {


        if (data.status === 'successful') {
            //console.log("Payment Successful");

            await updatePaymentStatus(data.tx_ref, PAYMENT_STATUS.COMPLETED);
        }
        else {
            //console.log("Payment Cancelled");
            await updatePaymentStatus(data.tx_ref, PAYMENT_STATUS.COMPLETED);
        }
        await updateProductPaymentStatus(params.item.id, PAYMENT_STATUS.COMPLETED, data.tx_ref);

        showMessage({
            message: "Payment Successful",
            type: "success"

        })
        navigation.navigate("Payments");
    };



    // const [ownerDetails, setOwnerDetails] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] =
        useState<string>('Other');

    const [transactionRef, setTransactionRef] = useState<string>("");

    const handlePaymentMethodSelection = (method: React.SetStateAction<string>) => {
        setSelectedPaymentMethod(method);
    };

    const [isVisible, setIsVisible] = useState<boolean>(false);


    const { params } = useRoute<any>();




    const handlePayment = async () => {

        try {
            setLoading(true);
            setIsVisible(true);


        } catch (error) {
            console.log(error);
        }

    };

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
                keyboardShouldPersistTaps="always"
            >
                {/* payment methods */}
                <Dialog
                    visible={isVisible}
                    onDismiss={() => setIsVisible(false)}
                    panDirection={PanningProvider.Directions.DOWN}
                    containerStyle={{
                        backgroundColor: COLORS.primaryBlackHex,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 10
                    }}
                    height={500}>
                    <View>
                        <Text>Select Payment Method</Text>
                    </View>
                    <View style={[styles.paymenthMethod]}>
                        <TouchableOpacity
                            onPress={() => {
                                handlePaymentMethodSelection('Wallet');
                            }}
                            style={[
                                styles.choosePayment,
                                {
                                    backgroundColor:
                                        selectedPaymentMethod === 'Wallet'
                                            ? COLORS.primaryOrangeHex
                                            : COLORS.primaryLightGreyHex,
                                },
                            ]}>
                            <Text style={[styles.textStyle]}>Wallet</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                handlePaymentMethodSelection('Other');
                            }}
                            style={[
                                styles.choosePayment,
                                {
                                    backgroundColor:
                                        selectedPaymentMethod === 'Other'
                                            ? COLORS.primaryOrangeHex
                                            : COLORS.primaryLightGreyHex,
                                },
                            ]}
                        >
                            <Text style={[styles.textStyle]}>Other</Text>
                        </TouchableOpacity>

                    </View>

                    {/* payment buttons */}
                    <View >
                        <View>

                            <TouchableOpacity
                                style={[generalStyles.loginContainer, { backgroundColor: COLORS.primaryRedHex, width: "100%", }]}
                                onPress={() => {
                                    setLoading(false);
                                    setIsVisible(false)
                                }}

                            >
                                <Text style={generalStyles.loginText}>{'Cancel Payment'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    {/* payment buttons */}
                </Dialog>
                {/* payment methods */}
                <View
                    style={[
                        // generalStyles.centerContent,

                        styles.description,
                        {
                            elevation: 20,
                            marginHorizontal: 10,
                            borderRadius: 20,
                            marginVertical: 20,
                            padding: 10,
                            backgroundColor: COLORS.primaryBlackHex,
                        },
                    ]}>
                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: COLORS.primaryWhiteHex,
                                padding: 2,
                            }}>
                            Product Name
                        </Text>
                        <Text
                            style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                            {params.item?.name}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: COLORS.primaryWhiteHex,
                                padding: 2,
                            }}>
                            Product Status
                        </Text>
                        <Text
                            style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                            {params.item?.status}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: COLORS.primaryWhiteHex,
                                padding: 2,
                            }}>
                            Total Price
                        </Text>
                        <Text
                            style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                            {params.item?.total_amount}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: COLORS.primaryWhiteHex,
                                padding: 2,
                            }}>
                            Paid By
                        </Text>
                        <Text
                            style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                            {`${params?.ownerDetails?.name}`}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    {/* paid to */}
                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: COLORS.primaryWhiteHex,
                                padding: 2,
                            }}>
                            Paid To
                        </Text>
                        <Text
                            style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                            Reuse Team
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>
                    {/* paid to */}

                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: COLORS.primaryWhiteHex,
                                padding: 2,
                            }}>
                            Description
                        </Text>
                        <Text
                            style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                            {params.item?.description}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>
                        <Text
                            style={{
                                color: COLORS.primaryWhiteHex,
                                padding: 2,
                            }}>
                            Reason
                        </Text>
                        <Text
                            style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                            {params.item?.reason}
                        </Text>
                        <View style={[styles.bottom]} />
                    </View>

                    <View style={styles.cardViewStyles}>



                        <TouchableOpacity
                            disabled={loading}
                            style={[generalStyles.loginContainer, { backgroundColor: COLORS.primaryOrangeHex }]}
                            onPress={handlePayment}

                        >
                            <Text style={generalStyles.loginText}>{'Confirm Payment'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </KeyboardAwareScrollView>
    );
};

export default PaymentSummary;

const styles = StyleSheet.create({
    nameStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.primaryWhiteHex,
        marginLeft: 20,
    },
    imageContainer: {
        marginHorizontal: 5,
        marginVertical: 5,
        width: width * 0.6,
        height: width * 0.6,
    },
    image: {
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: COLORS.primaryWhiteHex,
    },
    description: {
        backgroundColor: COLORS.primaryWhiteHex,
        elevation: 10,
        padding: 5,
        borderRadius: 10,
    },
    bottom: {
        borderBottomColor: COLORS.primaryWhiteHex,
        borderBottomWidth: 0.5,
        marginVertical: 5,
    },
    cardViewStyles: {
        marginVertical: 10,
        padding: 5,
    },
    paymenthMethod: {
        // backgroundColor: COLORS.primaryWhiteHex,
        elevation: 10,
        borderRadius: 10,
    },
    choosePayment: {
        // backgroundColor: theme.colors.preference.secondaryBackground,
        // elevation: 10,
        borderRadius: 10,
        padding: 25,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    textStyle: {
        color: COLORS.primaryWhiteHex
    }
});
