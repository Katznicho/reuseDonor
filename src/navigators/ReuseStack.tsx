
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import ReuseTabs from '../screens/Reuse/ReuseTabs';
import MyProductDetails from '../screens/Reuse/MyProductDetails';
import PaymentSummary from '../screens/Reuse/PaymentSummary';
import DeliveryDetails from '../screens/Reuse/DeliveryDetails';
import { COLORS } from '../theme/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { generalStyles } from '../screens/utils/generatStyles';
import Entypo from "react-native-vector-icons/Entypo";
import { StyleSheet } from 'react-native';




const Stack = createNativeStackNavigator();

/**
 * Render and return the SupportStack component.
 *
 * @return {ReactNode} The rendered SupportStack component.
 */
function ReuseStack() {



    const navigation = useNavigation<any>();

    return (

        <Stack.Navigator
            initialRouteName='ReuseTabs'
        >

            <Stack.Screen
                name="ReuseTabs"
                component={ReuseTabs}
                options={{
                    title: 'My Products',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,

                    headerLeft: () => (

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[generalStyles.flexStyles, styles.containerStyle]}
                        >
                            <Entypo
                                name="chevron-left"
                                color={COLORS.primaryBlackHex}
                                size={28}
                            />

                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="MyProductDetails"
                component={MyProductDetails}
                options={{
                    title: 'Product Details',
                    headerStyle: {
                        backgroundColor: COLORS.primaryBlackHex,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: COLORS.primaryWhiteHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (

                        <TouchableOpacity
                            onPress={() => navigation.navigate('ReuseTabs')}
                            style={[generalStyles.flexStyles, styles.containerStyle]}
                        >
                            <Entypo
                                name="chevron-left"
                                color={COLORS.primaryWhiteHex}
                                size={28}
                            />

                        </TouchableOpacity>
                    ),
                }}
            />

            {/* delivery details */}
            <Stack.Screen
                name="DeliveryDetails"
                component={DeliveryDetails}
                options={{
                    title: 'Delivery Details',
                    headerStyle: {
                        backgroundColor: COLORS.primaryBlackHex,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: COLORS.primaryWhiteHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ReuseTabs')}
                            style={[generalStyles.flexStyles, styles.containerStyle]}
                        >
                            <Entypo
                                name="chevron-left"
                                color={COLORS.primaryWhiteHex}
                                size={28}
                            />

                        </TouchableOpacity>


                    ),
                }}
            />
            {/* delivery details */}

            <Stack.Screen
                name="PaymentSummary"
                component={PaymentSummary}
                options={{
                    title: 'Payment Summary',
                    headerStyle: {
                        backgroundColor: COLORS.primaryBlackHex,
                    },
                    headerTitleStyle: {
                        fontSize: 30,
                    },
                    headerTintColor: COLORS.primaryWhiteHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ReuseTabs')}
                            style={[generalStyles.flexStyles, styles.containerStyle]}
                        >
                            <Entypo
                                name="chevron-left"
                                color={COLORS.primaryWhiteHex}
                                size={28}
                            />

                        </TouchableOpacity>
                    ),
                }}
            />


        </Stack.Navigator>

    );
}

export default ReuseStack

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        // borderBottomColor: COLORS.primaryGreyHex,
        borderBottowWidth: 0.5,

    },

});