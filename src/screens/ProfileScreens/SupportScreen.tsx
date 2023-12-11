import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import TextComponent from '../../components/TextComponent';
import call from 'react-native-phone-call'
import { COLORS } from '../../theme/theme';
import { SUPPORT_US } from '../utils/constants/constants';
import { generalStyles } from '../utils/generatStyles';




const SupportScreen = () => {


    const onMakeCall = () => {

        const args = {
            number: '2569983853', // String value with the number to call
            prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
            skipCanOpen: true // Skip the canOpenURL check
        }
        call(args).catch(console.error);


    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TextComponent text={SUPPORT_US} />

                {/* call immediately */}
                <View style={{ margin: 20 }}>

                    <TouchableOpacity
                        style={generalStyles.loginContainer}
                        onPress={() => onMakeCall()}>
                        <Text style={generalStyles.loginText}>{'Call Immediately'}</Text>
                    </TouchableOpacity>
                </View>
                {/* call immediately */}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SupportScreen;
