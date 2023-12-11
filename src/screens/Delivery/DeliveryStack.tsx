import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../../theme/theme';
import DeliveryDetails from './DeliveryDetails';
import AllDetails from './AllDetails';
import DeliveryTabs from './DeliveryTabs';

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
                        backgroundColor: COLORS.primaryBlackHex
                    },
                    headerTitleStyle: {
                        fontSize: 25,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryWhiteHex,
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

const styles = StyleSheet.create({})