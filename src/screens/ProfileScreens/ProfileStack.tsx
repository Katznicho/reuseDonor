import { } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile';
import { useNavigation } from '@react-navigation/native';
import PrivatePolicy from './PrivatePolicy';
import AboutUs from './AboutUs';
import { COLORS } from '../../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SupportScreen from './SupportScreen';
import EditProfile from './EditProfile';
import { generalStyles } from '../utils/generatStyles';



const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  const navigation = useNavigation<any>();

  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen

        name="ProfileScreen"
        component={Profile}
        options={{
          title: 'Your Profile',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',

        }}
      />
      <Stack.Screen
        name="PrivatePolicy"
        component={PrivatePolicy}
        options={{
          title: 'Private Policy',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={{ marginLeft: 10 }}
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
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'About Us',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={{ marginLeft: 10 }}
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
        name="Support"
        component={SupportScreen}
        options={{
          title: 'Support',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={{ marginLeft: 10 }}
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
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit Profile',
          headerStyle: generalStyles.headerStyle,
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTintColor: COLORS.primaryBlackHex,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
              style={{ marginLeft: 10 }}
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

    </Stack.Navigator>
  );
};

export default ProfileStack;
