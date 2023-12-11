import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import Entypo from "react-native-vector-icons/Entypo";
import Share from 'react-native-share';
import { useFirebase } from '../hooks/useFirebase';


const ProfileDetailsCard = ({
    details,
}: any) => {
    const { logout } = useFirebase();


    const handleShareApp = async () => {

        try {
            const result = await Share.open({
                title: 'Install Reuse App',
                message: 'Check out Reuse App and install it',
                url: 'https://play.google.com/apps/internaltest/4699919634175995763',
            });
            console.log(result);
        } catch (error) {

        }
    }



    const navigation = useNavigation<any>()



    const handleSignOut = async () => {
        try {

            // Handle any additional actions after the user is signed out
            await logout();

        } catch (error) {
        }
    };


    const onSignOut = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },

                {
                    text: 'OK',
                    onPress: () => handleSignOut(),
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <View style={{ backgroundColor: COLORS.primaryBlackHex }}>
            {details.map((item: any, index: any) => {
                return item.name === 'Sign Out' ?
                    (
                        <TouchableOpacity
                            style={[generalStyles.flexStyles, styles.containerStyle]}
                            key={index}
                            onPress={onSignOut}
                        >
                            <View style={{ paddingVertical: 20 }}>
                                <Text style={[styles.textStyle, { color: COLORS.primaryRedHex }]}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ) : (item.name == "Share App" ? (<TouchableOpacity
                        style={[generalStyles.flexStyles, styles.containerStyle]}
                        key={index}
                        onPress={() => handleShareApp()}
                    >
                        <View style={{ paddingVertical: 20 }}>
                            <Text style={[styles.textStyle, { color: COLORS.primaryWhiteHex }]}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>) :
                        (
                            <TouchableOpacity
                                key={index}
                                onPress={() => navigation.navigate(item.screen)}
                                style={[generalStyles.flexStyles, styles.containerStyle]}
                            >
                                <View style={{ paddingVertical: 20 }}>
                                    <Text style={styles.textStyle}>{item.name}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ProfileScreen')}
                                    style={{ marginLeft: 10 }}
                                >
                                    <Entypo
                                        name="chevron-right"
                                        color={COLORS.primaryWhiteHex}
                                        size={28}
                                    />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ));
            })}
        </View>

    );
};

export default ProfileDetailsCard;

const styles = StyleSheet.create({
    containerStyle: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        // borderBottomColor: COLORS.primaryGreyHex,
        borderBottowWidth: 0.5,

    },
    textStyle: {
        fontWeight: 'bold',
        color: COLORS.primaryWhiteHex,
        fontSize: 18,
    },
});
