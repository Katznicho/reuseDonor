import { } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/ProfileScreens/Profile';
import { useNavigation } from '@react-navigation/native';
import PrivatePolicy from '../screens/ProfileScreens/PrivatePolicy';
import AboutUs from '../screens/ProfileScreens/AboutUs';
import { COLORS } from '../theme/theme';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SupportScreen from '../screens/ProfileScreens/SupportScreen';
import EditProfile from '../screens/ProfileScreens/EditProfile';
import { generalStyles } from '../screens/utils/generatStyles';
import VerificationScreen from '../screens/ProfileScreens/VerificationScreen';
import Donate from '../screens/DonateScreens/Donate';
import MyWebView from '../screens/MyWebView';



const Stack = createNativeStackNavigator();

const DonateStack = () => {
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="Donate">
            <Stack.Screen

                name="Donate"
                component={Donate}
                options={{
                    title: 'Donate',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',

                }}
            />
            <Stack.Screen
                name="MyWebView"
                component={MyWebView}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
};

export default DonateStack;
