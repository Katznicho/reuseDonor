import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Completed from './Completed';
import Pending from './Pending';
import Failed from './Failed';
import { COLORS } from '../../theme/theme';



const Tab = createMaterialTopTabNavigator();
const PaymentTabs = () => {



    return (
        <Tab.Navigator
            initialRouteName="My Payments"
            backBehavior="order"
            sceneContainerStyle={{
                backgroundColor: COLORS.primaryBlackHex,
                flex: 1,
            }}
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.primaryBlackHex,
                    elevation: 0, // Remove shadow on Android
                    shadowOpacity: 0, // Remove shadow on iOS
                    borderBottomWidth: 0, // Remove the bottom border
                    borderTopWidth: 0,
                    borderColor: COLORS.primaryBlackHex,
                    // paddingHorizontal: 20,
                },
                tabBarAndroidRipple: { borderless: true },
                tabBarActiveTintColor: COLORS.primaryWhiteHex,
                tabBarInactiveTintColor: COLORS.primaryWhiteHex,

                tabBarIndicatorStyle: {
                    backgroundColor: COLORS.primaryOrangeHex,
                    height: 4,
                    marginHorizontal: 25,
                },
                tabBarPressColor: COLORS.primaryBlackHex,
                tabBarScrollEnabled: true,
                tabBarShowIcon: true,
                tabBarShowLabel: true,
            }}
        >

            <Tab.Screen
                name="Completed"
                component={Completed}
                options={{
                    tabBarLabel: 'Completed',
                    tabBarAccessibilityLabel: 'Completed',
                    //add some styling here
                }}
            />

            <Tab.Screen
                name="Pending"
                component={Pending}
                options={{
                    tabBarLabel: 'Pending',
                    tabBarAccessibilityLabel: 'Pending',
                    //add some styling here
                }}
            />
            <Tab.Screen
                name="Failed"
                component={Failed}
                options={{
                    tabBarLabel: 'Failed',
                    tabBarAccessibilityLabel: 'Failed',
                    //add some styling here
                }}
            />

        </Tab.Navigator>
    );
};

export default PaymentTabs;
