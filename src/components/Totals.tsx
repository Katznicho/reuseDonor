import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { usePostQuery } from '../hooks/usePostQuery'
import { generalStyles } from '../screens/utils/generatStyles'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../theme/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Totals = () => {

    const navigation = useNavigation<any>();

    const { data, error, isLoading } = usePostQuery<any>({
        endpoint: '/getDonorTotals',
        params: {
            "total": "getDonorTotals"
        },
        queryOptions: {
            enabled: true,
            refetchInterval: 5000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })
    //totals
    console.log('==========community totals==========================')
    console.log(data)
    console.log('===========community totals=========================')
    return (
        <View>

            <View style={[generalStyles.flexStyles]}>

                <TouchableOpacity style={[styles.cardStyles]}
                    onPress={
                        () => navigation.navigate('Payments')
                    }
                >

                    <View>
                        <FontAwesome name="refresh"
                            style={[styles.iconStyles]}
                            size={50}
                            color={COLORS.primaryWhiteHex}
                        />
                    </View>

                    <Text style={[styles.textStyles]}>{data?.data?.total_payments} Total Payments</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.cardStyles]}
                    onPress={
                        () => navigation.navigate('Payments')
                    }
                >

                    <View>
                        <FontAwesome name="product-hunt"
                            style={[styles.iconStyles]}
                            size={50}
                            color={COLORS.primaryWhiteHex}
                        />
                    </View>

                    <Text style={[styles.textStyles]}>{data?.data?.total_products} Total Products</Text>
                </TouchableOpacity>

            </View>

            <View style={[generalStyles.flexStyles]}>

                <TouchableOpacity style={[styles.cardStyles]}
                    onPress={
                        () => navigation.navigate('Payments')
                    }
                >

                    <View>
                        <FontAwesome name="users"
                            style={[styles.iconStyles]}
                            size={50}
                            color={COLORS.primaryWhiteHex}
                        />
                    </View>

                    <Text style={[styles.textStyles]}>{data?.data?.total_communities} Total Communities</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.cardStyles]}
                    onPress={
                        () => navigation.navigate('Deliveries')
                    }
                >

                    <View>
                        <MaterialCommunityIcons name="truck-delivery-outline"
                            style={[styles.iconStyles]}
                            size={50}
                            color={COLORS.primaryWhiteHex}
                        />
                    </View>

                    <Text style={[styles.textStyles]}>{data?.data?.total_deliveries} Delivered Products</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Totals

const styles = StyleSheet.create({
    cardStyles: {
        borderWidth: 1,
        borderColor: COLORS.primaryBlackHex,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        backgroundColor: COLORS.primaryBlackHex,
        width: 150,
        height: 150,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: "center",
        elevation: 5,
        color: COLORS.primaryWhiteHex

    },
    textStyles: {
        fontWeight: "bold",
        color: COLORS.primaryWhiteHex
        // fontSize: 18
    },
    iconStyles: {
        marginBottom: 10
    }
})