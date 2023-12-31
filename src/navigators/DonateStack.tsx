import { TouchableOpacity } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import Donate from '../screens/DonateScreens/Donate';
import MyWebView from '../screens/MyWebView';
import Entypo from 'react-native-vector-icons/Entypo';



const Stack = createNativeStackNavigator();

const DonateStack = () => {
    const navigation = useNavigation<any>();

    return (
        <Stack.Navigator initialRouteName="DonateScreen">
            <Stack.Screen

                name="DonateScreen"
                component={Donate}
                options={{
                    title: 'Donate',
                    headerStyle: generalStyles.headerStyle,
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTintColor: COLORS.primaryBlackHex,
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.goBack()}
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
