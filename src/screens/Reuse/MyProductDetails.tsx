import { Image, ImageBackground, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Switch } from 'react-native-ui-lib';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';
import { DEFAULT_USER_PROFILE, PRODUCT_STATUS } from '../utils/constants/constants';
import Entypo from "react-native-vector-icons/Entypo";


const { width } = Dimensions.get('window');

const MyProductDetails = () => {



    const [ownerDetails, setOwnerDetails] = useState<any>();


    const navigation = useNavigation<any>();
    const { params } = useRoute<any>();






    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={[{
                // marginBottom: 100
            },
            generalStyles.ScreenContainer
            ]}
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 100
            }}
        >
            {/* header section */}
            <ImageBackground
                source={{ uri: params.item?.cover_image }}
                style={{ width: '100%', height: 300 }}
                resizeMode="cover"
            >
                <View style={{ marginHorizontal: 10, marginVertical: 20 }}>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 10 }}
                    >
                        <Entypo
                            name="chevron-left"
                            color={COLORS.primaryWhiteHex}
                            size={28}
                        />
                    </TouchableOpacity>
                </View>

                {
                    params.item.status == PRODUCT_STATUS.ACCEPTED &&
                    <View >


                        <TouchableOpacity
                            style={generalStyles.loginContainer}
                            // onPress={() => onPressLogin()}
                            onPress={() => navigation.navigate('PaymentSummary', {
                                item: params.item,
                                ownerDetails: params.item.user
                            })}
                        >
                            <Text style={generalStyles.loginText}>{'Make Payment'}</Text>
                        </TouchableOpacity>
                    </View>



                }
            </ImageBackground>

            <View style={[generalStyles.flexStyles, { marginHorizontal: 10, marginVertical: 10, justifyContent: "space-between", alignItems: "center" }]}>
                <View>
                    <View>
                        <Text
                            style={styles.title}
                        >
                            {params.item?.name}
                        </Text>
                    </View>
                    <View style={[generalStyles.flexStyles, { marginHorizontal: 10 }]}>
                        {
                            Array(params.item.rating).fill(params.item.rating).map((item, index) => (
                                <AntDesign
                                    name="star"
                                    color={COLORS.primaryOrangeHex}
                                    size={15}
                                    key={index}
                                />
                            ))
                        }
                    </View>

                </View>

                {/* owner details */}
                <View >
                    <View style={[{ marginHorizontal: 20 }]}>
                        <Image
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                            }}
                            source={{
                                uri: ownerDetails?.photoURL || DEFAULT_USER_PROFILE,
                            }}
                        />
                    </View>
                    <View >
                        <Text style={styles.nameStyle}>{`${"Owner"}`}</Text>
                    </View>



                </View>
                {/* owner details */}




            </View>
            {/* header section */}


            {/* description card */}
            <View
                style={[
                    generalStyles.centerContent,
                    { marginHorizontal: 10, marginVertical: 20 },
                ]}
            >
                <View
                    style={styles.description}
                >
                    <Text style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {params.item?.description}

                    </Text>
                </View>
            </View>
            {/* description card */}

            {/* more pictures */}
            <View>
                <Text style={styles.title}>More Images</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {params?.item?.images.map((item: string, index: number) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.imageContainer}
                            >
                                <Image
                                    source={{ uri: item }}
                                    style={styles.image}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
            {/* more pictures */}


            {/* more product details */}
            <View
                style={[
                    // generalstyles.centerContent,

                    styles.description,
                    { elevation: 20, marginHorizontal: 10, borderRadius: 20, marginVertical: 20, padding: 10, backgroundColor: COLORS.primaryBlackHex },
                ]}
            >
                {/* reason */}
                <View
                    style={[
                        generalStyles.centerContent,
                        { marginHorizontal: 10, marginVertical: 20 },
                    ]}
                >
                    <View
                        style={styles.description}
                    >
                        <Text style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                            {params.item.reason}

                        </Text>
                    </View>
                </View>
                {/* reason */}
                {/* staus */}
                <View style={styles.cardViewStyles}>
                    <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                        <Text style={{ color: COLORS.primaryWhiteHex, padding: 2 }}>Status</Text>
                        <Text style={{ color: COLORS.primaryLightGreyHex, padding: 5 }}>
                            {params.item?.status}

                        </Text>

                    </View>

                    <View style={[styles.bottom]} />
                </View>
                {/* status */}

                {/* price attached */}
                <View style={styles.cardViewStyles}>
                    <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                        <Text style={{ color: COLORS.primaryWhiteHex, padding: 2 }}>Price Attached</Text>
                        <Text style={{ color: COLORS.primaryLightGreyHex, padding: 5 }}>
                            shs {params.item?.price}

                        </Text>

                    </View>

                    <View style={[styles.bottom]} />
                </View>
                {/* price attached */}

                {/* total price */}
                <View style={styles.cardViewStyles}>
                    <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                        <Text style={{ color: COLORS.primaryWhiteHex, padding: 2 }}>Total Amount</Text>
                        <Text style={{ color: COLORS.primaryLightGreyHex, padding: 5 }}>
                            {params.item?.totalAmount}

                        </Text>

                    </View>

                    <View style={[styles.bottom]} />
                </View>
                {/* total price */}


                <View style={styles.cardViewStyles}>
                    <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                        <Text style={{ color: COLORS.primaryWhiteHex, padding: 2 }}>Location</Text>
                        <Text style={{ color: COLORS.primaryLightGreyHex, padding: 5 }}>
                            {params.item?.pick_up_location}

                        </Text>

                    </View>

                    <View style={[styles.bottom]} />
                </View>

                {/* estimated weight */}
                <View style={styles.cardViewStyles}>
                    <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                        <Text style={{ color: COLORS.primaryWhiteHex, padding: 2 }}>Estimated Weight(Kgs)</Text>
                        <Text style={{ color: COLORS.primaryLightGreyHex, padding: 5 }}>
                            {params.item?.weight}

                        </Text>

                    </View>

                    <View style={[styles.bottom]} />
                </View>
                {/* estimated weight */}

                <View style={styles.cardViewStyles}>
                    <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                        <Text style={{ color: COLORS.primaryWhiteHex, padding: 2 }}>Available For All</Text>
                        <Switch
                            width={80}
                            height={38}
                            thumbSize={34}
                            thumbColor={COLORS.primaryBlackHex}
                            value={params.item.is_product_available_for_all}
                            onColor={COLORS.primaryOrangeHex}
                        />

                    </View>

                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                        <Text style={{ color: COLORS.primaryWhiteHex, padding: 2 }}>Delivery Fee Included</Text>
                        <Switch
                            width={80}
                            height={38}
                            thumbSize={34}
                            thumbColor={COLORS.primaryBlackHex}
                            value={params.item.is_delivery_fee_covered}
                            onColor={COLORS.primaryOrangeHex}
                        />

                    </View>

                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                        <Text style={{ color: COLORS.primaryWhiteHex, padding: 2 }}>Product Is New</Text>
                        <Switch
                            width={80}
                            height={38}
                            thumbSize={34}
                            thumbColor={COLORS.primaryBlackHex}
                            value={params.item.is_product_new}
                            onColor={COLORS.primaryOrangeHex}
                        />

                    </View>

                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <View style={[generalStyles.flexStyles, { justifyContent: "space-between", alignItems: "center" }]}>
                        <Text style={{ color: COLORS.primaryWhiteHex, padding: 2 }}>Product Has Damages</Text>
                        <Switch
                            width={80}
                            height={38}
                            thumbSize={34}
                            thumbColor={COLORS.primaryBlackHex}
                            value={params.item.is_product_damaged}
                            onColor={COLORS.primaryOrangeHex}
                        />

                    </View>

                    <View style={[styles.bottom]} />
                </View>


            </View>
            {/* more product details */}


            {
                params.item.status == PRODUCT_STATUS.ACCEPTED &&
                <View style={[generalStyles.absoluteStyles, { bottom: 10, right: 10 }]}>


                    <TouchableOpacity
                        style={generalStyles.loginContainer}
                        // onPress={() => onPressLogin()}
                        onPress={() => navigation.navigate('PaymentSummary', {
                            item: params.item,
                            ownerDetails: ownerDetails
                        })}
                    >
                        <Text style={generalStyles.loginText}>{'Make Payment'}</Text>
                    </TouchableOpacity>
                </View>



            }



        </ScrollView>

    )
}

export default MyProductDetails

const styles = StyleSheet.create({
    nameStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: COLORS.primaryWhiteHex,
        marginLeft: 20
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
        backgroundColor: COLORS.primaryBlackHex,
        elevation: 10,
        padding: 5,
        borderRadius: 10,
    },
    bottom: {
        borderBottomColor: COLORS.primaryWhiteHex,
        borderBottomWidth: 0.5,
        marginVertical: 5
    },
    cardViewStyles:
    {
        marginVertical: 10, padding: 5
    }
});