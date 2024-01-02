import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,

    Dimensions
} from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import { generalStyles } from './utils/generatStyles';
import { COLORS } from '../theme/theme';


const { width } = Dimensions.get('window');

const TransactionDetails = () => {
    const { item } = useRoute<any>().params;


    return (
        <SafeAreaView style={generalStyles.ScreenContainer}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Payment Type
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {item?.type}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Payment Status
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
                        Amount
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        UGX  {item?.amount}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Payment Method
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {/* {`${item?.owner?.firstName} ${item?.owner?.lastName}`}
                         */}
                        {item?.payment_method}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>

                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Payment Mode
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryWhiteHex, padding: 5 }}>
                        {/* {`${item?.owner?.firstName} ${item?.owner?.lastName}`}
                         */}
                        {item?.payment_mode}
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

                {/* paid on */}
                <View style={styles.cardViewStyles}>
                    <Text
                        style={{
                            color: COLORS.primaryWhiteHex,
                            padding: 2,
                        }}>
                        Paid On
                    </Text>
                    <Text
                        style={{ color: COLORS.primaryLightGreyHex, padding: 5 }}>
                        {item.updated_at}
                    </Text>
                    <View style={[styles.bottom]} />
                </View>
                {/* paid on */}
                {/* card */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default TransactionDetails;

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
