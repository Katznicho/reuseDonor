import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import CustomIcon from '../components/CustomIcon';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import ProfileStack from '../screens/ProfileScreens/ProfileStack';
import MyNotificationStack from '../screens/Notifcations/MyNotificationStack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CreateDonationProduct from '../screens/CreateScreens/CreateDonationProduct';
import ReuseStack from '../screens/Reuse/ReuseStack';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {

  const { isLoggedIn, user } = useSelector(
    (state: RootState) => state.user,
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.BlurViewStyles}
          />
        ),
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcon
              name="home"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Reuse"
        component={CreateDonationProduct}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="pluscircleo"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Favorite"
        component={ReuseStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcon
              name="like"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="History"
        component={MyNotificationStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcon
              name="bell"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign
              name="user"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;
