import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import { COLORS } from '../../theme/theme';
import Register from './Register';
import { generalStyles } from '../utils/generatStyles';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: 'Login',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,

                }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Register',
                    headerStyle: {
                        backgroundColor: COLORS.primaryOrangeHex
                    },
                    headerTitleStyle: generalStyles.titleHeaderStyles,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryBlackHex,
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})