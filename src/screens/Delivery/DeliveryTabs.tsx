import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS } from '../../theme/theme';
import Completed from './Completed';
import Pending from './Pending';
import UnConfirmed from './UnConfirmed';
import Confirmed from './Confirmed';





const Tab = createMaterialTopTabNavigator();
const DeliveryTabs = () => {



    return (
        <Tab.Navigator
            initialRouteName="My Deliveries"
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
                name="UnConfirmed"
                component={UnConfirmed}
                options={{
                    tabBarLabel: 'UnConfirmed',
                    tabBarAccessibilityLabel: 'UnConfirmed',
                    //add some styling here
                }}
            />

            <Tab.Screen
                name="ConfirmedDelivery"
                component={Confirmed}
                options={{
                    tabBarLabel: 'Confirmed',
                    tabBarAccessibilityLabel: 'Confirmed',
                    //add some styling here
                }}
            />

        </Tab.Navigator>
    );
};

export default DeliveryTabs;
