import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../theme/theme';
import DeliveryDetails from '../screens/Delivery/DeliveryDetails';
import DeliveryTabs from '../screens/Delivery/DeliveryTabs';
import { generalStyles } from '../screens/utils/generatStyles';

const Stack = createNativeStackNavigator();

const DeliveryStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="DeliveryTabs"
        >

            <Stack.Screen
                name="DeliveryTabs"
                component={DeliveryTabs}
                options={{
                    title: 'Deliveries',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,

                }}
            />

            <Stack.Screen
                name="DeliveryDetails"
                component={DeliveryDetails}
                options={{
                    title: 'Delivery Details',
                    headerStyle: {
                        backgroundColor: COLORS.primaryBlackHex
                    },
                    headerTitleStyle: {
                        fontSize: 25,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryWhiteHex,
                }}
            />
        </Stack.Navigator>
    )
}

export default DeliveryStack

