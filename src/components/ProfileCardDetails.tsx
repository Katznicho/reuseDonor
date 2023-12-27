import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import Entypo from "react-native-vector-icons/Entypo";
import Share from 'react-native-share';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import { LOGOUT } from '../screens/utils/constants/routes';
import { logoutUser } from '../redux/store/slices/UserSlice';


const ProfileDetailsCard = ({
    details,
}: any) => {
    const { authToken } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<any>()


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
            // await logout();   
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', `Bearer ${authToken}`);
            fetch(`${LOGOUT}`, {
                headers,
                method: 'POST',
            })
                .then(a => a.json())
                .then(result => {
                    dispatch(logoutUser());
                })
                .catch(error => {
                });



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
                            activeOpacity={1}
                            style={[generalStyles.flexStyles, styles.containerStyle]}
                            key={index}
                            onPress={onSignOut}
                        >
                            <View style={styles.viewStyle}>
                                <Text style={[styles.textStyle, { color: COLORS.primaryRedHex }]}>
                                    {item.name}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ) : (item.name == "Share App" ? (<TouchableOpacity
                        style={[generalStyles.flexStyles, styles.containerStyle, { borderBottomWidth: 0.5, borderBottomColor: COLORS.secondaryLightGreyHex }]}
                        key={index}
                        onPress={() => handleShareApp()}
                    >
                        <View style={styles.viewStyle}>
                            <Text style={[styles.textStyle, { color: COLORS.primaryWhiteHex }]}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>) :
                        (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={1}
                                onPress={() => navigation.navigate(item.screen)}
                                style={[generalStyles.flexStyles, styles.containerStyle, { borderBottomWidth: 0.5, borderBottomColor: COLORS.secondaryLightGreyHex }]}
                            >
                                <View style={styles.viewStyle}>
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
                                        style={{
                                            fontFamily: FONTFAMILY.poppins_light,
                                        }}
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
        borderBottomColor: "red",
        borderBottowWidth: 10,
    },
    textStyle: {
        // fontWeight: 'bold',
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: 15,
    },
    viewStyle: {
        paddingVertical: 10,

    }
});
