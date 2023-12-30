import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { generalStyles } from './utils/generatStyles'
import { COLORS } from '../theme/theme'

const NoInternet = ({ checkInternet }: any) => {
    return (
        <View
            style={[
                generalStyles.ScreenContainer,

                generalStyles.centerContent,
            ]}
        >
            <Text style={[generalStyles.textStyle]}>Please Enable Internet Access and Restart the App</Text>
            <TouchableOpacity
                activeOpacity={1}
                style={generalStyles.loginContainer}
                onPress={checkInternet}>
                <Text style={generalStyles.loginText}>{'Retry'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NoInternet

const styles = StyleSheet.create({})