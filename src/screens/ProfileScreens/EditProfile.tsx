import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { generalStyles } from '../utils/generatStyles';
import { COLORS } from '../../theme/theme';
import { TouchableOpacity } from 'react-native';


const EditProfile = () => {

    const { user } = useSelector(
        (state: RootState) => state.user,
    );
    const [firstName, setFirstName] = React.useState<any>('');
    const [lastName, setLastName] = React.useState<any>('');

    const onEdit = () => {

    }

    return (
        <ScrollView
            style={[generalStyles.ScreenContainer]}
            showsVerticalScrollIndicator={false}
        >
            <View style={generalStyles.centerContent}>
                <Text style={{
                    fontSize: 20,
                    color: COLORS.primaryWhiteHex
                }}>
                    First Name</Text>
            </View>
            <TextInput
                style={generalStyles.InputContainer}
                placeholder={'enter first name'}
                placeholderTextColor={COLORS.primaryWhiteHex}
                //   onChange={}
                value={user?.fname}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />

            <View style={generalStyles.centerContent}>
                <Text style={{
                    fontSize: 20,
                    color: COLORS.primaryWhiteHex
                }}>
                    Last Name</Text>
            </View>
            <TextInput
                style={generalStyles.InputContainer}
                placeholder={'enter first name'}
                placeholderTextColor={COLORS.primaryWhiteHex}
                //   onChange={}
                value={user?.fname}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />

            <View style={generalStyles.centerContent}>
                <Text style={{
                    fontSize: 20,
                    color: COLORS.primaryWhiteHex
                }}>
                    Phone Number </Text>
            </View>

            <TextInput
                style={generalStyles.InputContainer}
                placeholder={'enter first name'}
                placeholderTextColor={COLORS.primaryWhiteHex}
                //   onChange={}
                value={user?.phone}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />

            <View style={generalStyles.centerContent}>
                <Text style={{
                    fontSize: 20,
                    color: COLORS.primaryWhiteHex
                }}>
                    User Name </Text>
            </View>

            <TextInput
                style={generalStyles.InputContainer}
                placeholder={'enter first name'}
                placeholderTextColor={COLORS.primaryWhiteHex}
                //   onChange={}
                value={user?.username}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />


            <TouchableOpacity
                style={generalStyles.loginContainer}
                onPress={() => onEdit()}>
                <Text style={generalStyles.loginText}>{'Edit Profile'}</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}

export default EditProfile

const styles = StyleSheet.create({})