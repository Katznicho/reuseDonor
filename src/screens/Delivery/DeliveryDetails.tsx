import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,

    Dimensions
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';
import { useFirebase } from '../../hooks/useFirebase';
import { TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const { width } = Dimensions.get('window');

const DeliveryDetails = () => {
    const { item } = useRoute<any>().params;
    console.log(item.id);
    const navigation = useNavigation<any>();

    const { confirmDelivery } = useFirebase();

    const onConfirmDelivery = () => {
        confirmDelivery(item.id);
        showMessage({
            message: "Delivery Confirmed",
            description: "Delivery has been confirmed",
            type: "success",
            icon: "success",
            autoHide: true,
            duration: 3000

        })
        navigation.navigate("ConfirmedDelivery");

    }



    return (
        <SafeAreaView style={generalStyles.ScreenContainer}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{
                    paddingBottom: 100,
                    backgroundColor: COLORS.primaryBlackHex
                }}
            >

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
                        {item?.product?.title}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Receiver Community
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {item?.receiver.communityName}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Delivery Status
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {item?.status}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Payment  Status
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {item?.payments.status}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Total Amount
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {item?.payments.totalAmount}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Pick Up Date
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {item?.pickUpDate}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Delivery Date
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {item?.deliveryDate}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>
                {
                    item?.isConfirmed
                        ?
                        <View style={styles.cardViewStyles}>
                            <Text
                                style={{
                                    color: COLORS.primaryWhiteHex,
                                    padding: 2,
                                }}>
                                Confirmed
                            </Text>
                            <Text
                                style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                                Confirmed
                            </Text>
                            <View style={[styles.bottom]} />
                        </View>
                        :
                        <View style={styles.cardViewStyles}>
                            <Text
                                style={{
                                    color: COLORS.primaryWhiteHex,
                                    padding: 2,
                                }}>
                                Confirmed
                            </Text>
                            <Text
                                style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                                Not Confirmed
                            </Text>
                            <View style={[styles.bottom]} />
                        </View>
                }

                {
                    item?.isDelivered
                        ?
                        <View style={styles.cardViewStyles}>
                            <Text
                                style={{
                                    color: COLORS.primaryWhiteHex,
                                    padding: 2,
                                }}>
                                Delivered
                            </Text>
                            <Text
                                style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                                Delivered
                            </Text>
                            <View style={[styles.bottom]} />
                        </View>
                        :
                        <View style={styles.cardViewStyles}>
                            <Text
                                style={{
                                    color: COLORS.primaryWhiteHex,
                                    padding: 2,
                                }}>
                                Delivered
                            </Text>
                            <Text
                                style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                                Not Delivered
                            </Text>
                            <View style={[styles.bottom]} />
                        </View>
                }

                {
                    !item.isConfirmed && (<TouchableOpacity
                        style={[generalStyles.loginContainer, {
                            marginTop: 5,
                            marginBottom: 20
                        }]}
                        onPress={() => onConfirmDelivery()}>
                        <Text style={generalStyles.loginText}>{'Confirm Delivery'}</Text>
                    </TouchableOpacity>)
                }


                {/* card */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default DeliveryDetails;

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
        // backgroundColor: theme.colors.preference.primaryBackground,
        // elevation: 10,
        // padding: 5,
        // borderRadius: 10,
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

    textStyle: {
        color: COLORS.primaryWhiteHex
    }
});
