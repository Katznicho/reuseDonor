import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyProducts from './MyProducts';
import Accepted from './Accepted';
import Pending from './Pending';
import Rejected from './Reject';
import { COLORS } from '../../theme/theme';


const Tab = createMaterialTopTabNavigator();
const ReuseTabs = () => {



    return (
        <Tab.Navigator
            initialRouteName="MyProducts"
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
                name="MyProducts"
                component={MyProducts}
                options={{
                    tabBarLabel: 'All',
                    tabBarAccessibilityLabel: 'MY PRODUCTS',
                    //add some styling here
                }}
            />

            <Tab.Screen
                name="Accepted"
                component={Accepted}
                options={{
                    tabBarLabel: 'Accepted',
                    tabBarAccessibilityLabel: 'Accepted',
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
                name="Rejected"
                component={Rejected}
                options={{
                    tabBarLabel: "Rejected",
                    tabBarAccessibilityLabel: 'Rejected',
                    //add some styling here
                }}
            />
        </Tab.Navigator>
    );
};

export default ReuseTabs;
