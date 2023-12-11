import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import appTheme from '../../theme/theme';
import Login from './Login';
import { COLORS } from '../../theme/theme';
import Register from './Register';


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
                        backgroundColor: COLORS.primaryBlackHex
                    },
                    headerTitleStyle: {
                        fontSize: 25,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryWhiteHex,
                }}
            />

            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Register',
                    headerStyle: {
                        backgroundColor: COLORS.primaryBlackHex
                    },
                    headerTitleStyle: {
                        fontSize: 25,
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.primaryWhiteHex,
                }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})