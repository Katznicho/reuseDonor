/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
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
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');



const PaymentSummary = () => {

    const { updateProductPaymentStatus, storePaymentDetails, updatePaymentStatus } = useFirebase();
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
        useState<string>('card');

    const [transactionRef, setTransactionRef] = useState<string>("");

    const handlePaymentMethodSelection = (method: React.SetStateAction<string>) => {
        setSelectedPaymentMethod(method);
    };

    const [isVisible, setIsVisible] = useState<boolean>(false);


    const { params } = useRoute<any>();

    useEffect(() => {
        setTransactionRef(generateTransactionRef(10));
    }, [])




    const handlePayment = async () => {

        try {
            if (!transactionRef) return;
            else {
                setLoading(true);
                //update product payment status
                await updateProductPaymentStatus(params.item.id, PAYMENT_STATUS.PENDING, transactionRef);

                const paymentDeails = {
                    productName: params.item?.title,
                    totalAmount: params.item?.totalAmount,
                    status: PAYMENT_STATUS.PENDING,
                    paymentMethod: selectedPaymentMethod,
                    userId: params.item?.userId,
                    paidTo: "Reuse Team",
                    owner: params?.ownerDetails,
                    transactionRef: transactionRef
                }

                await storePaymentDetails(paymentDeails, transactionRef);

                setIsVisible(true);
            }

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <SafeAreaView style={generalStyles.ScreenContainer}>
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
                                handlePaymentMethodSelection('mobilemoneyuganda');
                            }}
                            style={[
                                styles.choosePayment,
                                {
                                    backgroundColor:
                                        selectedPaymentMethod === 'mobilemoneyuganda'
                                            ? COLORS.primaryOrangeHex
                                            : COLORS.primaryLightGreyHex,
                                },
                            ]}>
                            <Text style={[styles.textStyle]}>Mobile Money</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                handlePaymentMethodSelection('card');
                            }}
                            style={[
                                styles.choosePayment,
                                {
                                    backgroundColor:
                                        selectedPaymentMethod === 'card'
                                            ? COLORS.primaryOrangeHex
                                            : COLORS.primaryLightGreyHex,
                                },
                            ]}
                        >
                            <Text style={[styles.textStyle]}>Card Payment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                handlePaymentMethodSelection('ussd');
                            }}
                            style={[
                                styles.choosePayment,
                                {
                                    backgroundColor:
                                        selectedPaymentMethod === 'ussd'
                                            ? COLORS.primaryOrangeHex
                                            : COLORS.primaryLightGreyHex,
                                },
                            ]}
                        >
                            <Text style={[styles.textStyle]}>Card Payment</Text>
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
                        <View>


                            <PayWithFlutterwave
                                currency="UGX"
                                onRedirect={handleOnRedirect}
                                options={{
                                    tx_ref: transactionRef ?? generateTransactionRef(10),
                                    authorization: FLUTTER_WAVE_MERCHANT_KEY,
                                    customer: {
                                        email: params?.ownerDetails?.email,
                                        name: `${params?.ownerDetails?.firstName} ${params?.ownerDetails?.lastName}`,
                                        phonenumber: params?.ownerDetails?.phoneNumber

                                    },
                                    amount: parseInt(params.item?.totalAmount),
                                    payment_options: selectedPaymentMethod,
                                    customizations: {
                                        title: 'Reuse App Payments',
                                        description: `Payment for ${params.item?.title}  `,
                                        logo: 'https://reuse-f0081.web.app/static/media/reuse.b7e1ca16.png',
                                    }
                                }}

                                customButton={(props) => (


                                    <TouchableOpacity
                                        disabled={selectedPaymentMethod === '' || props.disabled}
                                        style={[generalStyles.loginContainer, { backgroundColor: COLORS.primaryOrangeHex, width: "100%" }]}
                                        onPress={props.onPress}

                                    >
                                        <Text style={generalStyles.loginText}>{'Make Payment'}</Text>
                                    </TouchableOpacity>


                                )}
                            />
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
                            backgroundColor: COLORS.primaryDarkGreyHex,
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
                            {params.item?.title}
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
                            {params.item?.totalAmount}
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
                            {`${params?.ownerDetails?.firstName} ${params?.ownerDetails?.lastName}`}
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
        </SafeAreaView>
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
