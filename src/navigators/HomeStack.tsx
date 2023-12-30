import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import CreatePin from '../screens/CreatePin';
import Deposit from '../screens/Deposit';
import { generalStyles } from '../screens/utils/generatStyles';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import { COLORS } from '../theme/theme';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    const navigation = useNavigation<any>();
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"

        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ animation: 'slide_from_bottom', headerShown: false }}>

            </Stack.Screen>
            <Stack.Screen
                name="CreateWallet"
                component={CreatePin}
                // options={{ animation: 'slide_from_bottom' }}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Add Wallet',
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
            >

            </Stack.Screen>
            <Stack.Screen
                name="Deposit"
                component={Deposit}
                options={{
                    animation: 'slide_from_bottom',
                    title: 'Deposit',
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
                }}>

            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default HomeStack

