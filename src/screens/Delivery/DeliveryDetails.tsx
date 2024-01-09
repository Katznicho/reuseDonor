import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';
import { showMessage } from 'react-native-flash-message';
import { formattedDate } from '../utils/helpers/helpers';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { CONFIRM_DELIVERY } from '../utils/constants/routes';
import { DELIVERY_STORAGE } from '../utils/constants/constants';

const { width } = Dimensions.get('window');

const DeliveryDetails = () => {

    const { item } = useRoute<any>().params;
    const { authToken } = useSelector((state: RootState) => state.user);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({})


    const navigation = useNavigation<any>();

    console.log(item?.proof)



    const onConfirmDelivery = () => {

        try {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', `Bearer ${authToken}`);
            setLoading(true)

            const body = new FormData();
            body.append("delivery_id", item?.id);

            fetch(`${CONFIRM_DELIVERY}`, {
                method: 'POST',
                headers,
                body
            }).then(response => response.json())
                .then(result => {
                    setLoading(false)
                    if (result?.errors) {
                        showMessage({
                            message: 'Failed to create product',
                            type: 'info',
                            icon: 'info',
                        })
                        return setErrors(result.errors);

                    }
                    if (result.success === false) {
                        setErrors({
                            // email: [result?.message],
                            password: [result?.message],
                        });
                        return showMessage({
                            message: "Failed to confirm delivery",
                            description: "Something went wrong. Please try again.",
                            type: "info",
                            autoHide: true,
                            duration: 3000,
                            icon: "danger"
                        })

                    }
                    if (result.success == true) {
                        showMessage({
                            message: "Delivery Confirmed",
                            description: "Delivery has been confirmed",
                            type: "success",
                            icon: "success",
                            duration: 3000,
                            autoHide: true
                        })
                        return navigation.goBack()
                    }
                })

        } catch (error) {
            setLoading(false)
            return showMessage({
                message: "Failed to confirm delivery",
                description: "Something went wrong. Please try again.",
                type: "info",
                autoHide: true,
                duration: 3000,
                icon: "danger"
            })
        }

    }






    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{
                    paddingBottom: 100,
                    backgroundColor: COLORS.primaryBlackHex
                }}
            >
                {/* proof of delivery */}
                {item.status == "Completed" && (
                    <View>
                        <Text style={styles.title}>Proof of Delivery</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {item?.proof.map((item: string, index: number) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.imageContainer}
                                    >
                                        <Image
                                            source={{ uri: `${DELIVERY_STORAGE}${item}` }}
                                            style={styles.image}
                                        />
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                )}

                {/* proof of delivery */}

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
                        {item?.product?.name} {item.owner_status}
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
                        {item?.community.name}
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
                        {item?.payment?.status}
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
                        {item?.payment?.amount}
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
                        {formattedDate(item?.pickup_date)}
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
                        {formattedDate(item?.delivery_date)}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>
                {
                    item?.status != "Pending"
                        ?
                        <View style={styles.cardViewStyles}>
                            <Text
                                style={{
                                    color: COLORS.primaryWhiteHex,
                                    padding: 2,
                                }}>
                                Confirmed Delivery
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
                                Not  Confirmed
                            </Text>
                            <View style={[styles.bottom]} />
                        </View>
                }

                {
                    item?.status != "Completed"
                        ?
                        <View style={styles.cardViewStyles}>
                            <Text
                                style={{
                                    color: COLORS.primaryWhiteHex,
                                    padding: 2,
                                }}>
                                Not Delivered
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
                    item.status == "Pending" && (<TouchableOpacity
                        disabled={loading}
                        style={[generalStyles.loginContainer, {
                            marginTop: 5,
                            marginBottom: 20
                        }]}
                        onPress={() => onConfirmDelivery()}>
                        <Text style={generalStyles.loginText}>{'Confirm Delivery'}</Text>
                    </TouchableOpacity>)
                }
                {loading && <ActivityIndicator />}




                {/* card */}
            </ScrollView>
        </KeyboardAwareScrollView>
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
    },
});
