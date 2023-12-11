import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CreateDonationProduct from './CreateDonationProduct';

import MyProducts from './MyProducts';
import { COLORS } from '../../theme/theme';

const Tab = createMaterialTopTabNavigator();
const ProductTabs = () => {



  return (
    <Tab.Navigator
      initialRouteName="CreateProducts"
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
          paddingHorizontal: 40,
        },
        tabBarAndroidRipple: { borderless: true },
        tabBarActiveTintColor: COLORS.primaryWhiteHex,
        tabBarInactiveTintColor: COLORS.primaryWhiteHex,

        tabBarIndicatorStyle: {
          backgroundColor: COLORS.primaryBlackHex,
          height: 4,
          marginHorizontal: 35,
        },
        tabBarPressColor: COLORS.primaryBlackHex,
        tabBarScrollEnabled: true,
        tabBarShowIcon: true,
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="CreateProducts"
        component={CreateDonationProduct}
        options={{
          tabBarLabel: 'Create',
        }}
      />
      <Tab.Screen
        name="MyProducts"
        component={MyProducts}
        options={{
          tabBarLabel: 'MY PRODUCTS',
          tabBarAccessibilityLabel: 'MY PRODUCTS',
          //add some styling here
        }}
      />
    </Tab.Navigator>
  );
};

export default ProductTabs;
