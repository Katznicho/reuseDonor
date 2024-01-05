import { StyleSheet, Text, View, TouchableOpacity, Alert, Linking } from 'react-native'
import React, { useState } from 'react';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import { RootState } from '../redux/store/dev';
import { useDispatch, useSelector } from 'react-redux';
import { generalStyles } from '../screens/utils/generatStyles';
import HeadProfileCard from './HeadProfileCard';
import CustomIcon from './CustomIcon';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ExpandableSection } from 'react-native-ui-lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Share from 'react-native-share';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { logoutUser } from '../redux/store/slices/UserSlice';
import { LOGOUT } from '../screens/utils/constants/routes';






const DrawerContent = (props: any) => {
    const { user, authToken } = useSelector((state: RootState) => state.user);
    const [selectedItem, setSelectedItem] = useState<string>('Home');
    const navigation = useNavigation<any>()
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch<any>();

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
        <View style={[generalStyles.ScreenContainer]}>
            <DrawerContentScrollView {...props}>
                {/* <DrawerItemList {...props} /> */}
                <View
                    style={{
                        marginVertical: 10,
                        marginHorizontal: 20,
                        borderRadius: 20,
                    }}
                >
                    <HeadProfileCard />
                    <View>
                        <Text style={[generalStyles.textStyle]}>{user.fname} {user.lname}</Text>
                    </View>

                </View>
                {/* drawer section */}
                <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
                <DrawerItem
                    label="Home"
                    icon={() => <CustomIcon
                        name="home"
                        size={25}
                        color={COLORS.primaryWhiteHex}
                    />}
                    onPress={() => {
                        setSelectedItem('Home');
                        // props.navigation.navigate('HomeDrawer')
                        navigation.navigate('Home');
                    }}
                    style={[{
                        backgroundColor:
                            selectedItem === 'Home'
                                ? COLORS.primaryOrangeHex
                                : COLORS.primaryBlackHex,


                    }, styles.tabStyles]}
                    labelStyle={styles.labelStyle}
                    activeBackgroundColor={COLORS.primaryOrangeHex}
                    activeTintColor={COLORS.primaryWhiteHex}
                    inactiveBackgroundColor={COLORS.primaryBlackHex}
                    inactiveTintColor={COLORS.primaryWhiteHex}
                />
                <DrawerItem
                    label="Payments"
                    icon={() => <AntDesign
                        name="creditcard"
                        size={25}
                        color={COLORS.primaryWhiteHex}

                    />}
                    onPress={() => {
                        setSelectedItem('Payments');
                        // props.navigation.navigate('HomeDrawer')
                        navigation.navigate('Payments');
                    }}
                    style={[{
                        backgroundColor:
                            selectedItem === 'Payments'
                                ? COLORS.primaryOrangeHex
                                : COLORS.primaryBlackHex,


                    }, styles.tabStyles]}
                    labelStyle={styles.labelStyle}
                    // active={selectedItem === 'Home'}
                    activeBackgroundColor={COLORS.primaryOrangeHex}
                    activeTintColor={COLORS.primaryWhiteHex}
                    inactiveBackgroundColor={COLORS.primaryBlackHex}
                    inactiveTintColor={COLORS.primaryWhiteHex}
                />
                <DrawerItem
                    label="Deliveries"
                    icon={() => <MaterialCommunityIcons
                        name="truck-delivery"
                        size={25}
                        color={COLORS.primaryWhiteHex}
                    />
                    }
                    onPress={() => {
                        setSelectedItem('Deliveries');
                        // props.navigation.navigate('HomeDrawer')
                        navigation.navigate('Deliveries');
                    }}
                    style={[{
                        backgroundColor:
                            selectedItem === 'Deliveries'
                                ? COLORS.primaryOrangeHex
                                : COLORS.primaryBlackHex,

                    }, styles.tabStyles]}
                    labelStyle={styles.labelStyle}
                    // active={selectedItem === 'Home'}
                    activeBackgroundColor={COLORS.primaryOrangeHex}
                    activeTintColor={COLORS.primaryWhiteHex}
                    inactiveBackgroundColor={COLORS.primaryBlackHex}
                    inactiveTintColor={COLORS.primaryWhiteHex}
                />
                {/* donate */}
                <DrawerItem
                    label="Donate"
                    icon={() => <FontAwesome5
                        name="donate"
                        size={25}
                        color={COLORS.primaryWhiteHex}
                    />
                    }
                    onPress={() => {
                        setSelectedItem('Donate');
                        // props.navigation.navigate('HomeDrawer')
                        navigation.navigate('Donate');
                    }}
                    style={[{
                        backgroundColor:
                            selectedItem === 'Donate'
                                ? COLORS.primaryOrangeHex
                                : COLORS.primaryBlackHex,

                    }, styles.tabStyles]}
                    labelStyle={styles.labelStyle}
                    // active={selectedItem === 'Home'}
                    activeBackgroundColor={COLORS.primaryOrangeHex}
                    activeTintColor={COLORS.primaryWhiteHex}
                    inactiveBackgroundColor={COLORS.primaryBlackHex}
                    inactiveTintColor={COLORS.primaryWhiteHex}
                />
                {/* donate */}
                <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />
                {/* drawer section */}

                {/* another section */}
                <ExpandableSection
                    top={false}
                    expanded={expanded}
                    sectionHeader={<HeaderExpandableSection expanded={expanded} setExpanded={setExpanded} />}
                    onPress={() => setExpanded(!expanded)}
                >
                    {/* share app */}
                    <DrawerItem
                        label="Share App"
                        icon={() => <Entypo
                            name="share"
                            size={25}
                            color={COLORS.primaryWhiteHex}
                        />
                        }
                        onPress={() => {
                            setSelectedItem('Share App');
                            handleShareApp()
                        }}
                        style={[{
                            backgroundColor:
                                selectedItem === 'Share App'
                                    ? COLORS.primaryOrangeHex
                                    : COLORS.primaryBlackHex,

                        }, styles.tabStyles]}
                        labelStyle={styles.labelStyle}
                        activeBackgroundColor={COLORS.primaryOrangeHex}
                        activeTintColor={COLORS.primaryWhiteHex}
                        inactiveBackgroundColor={COLORS.primaryBlackHex}
                        inactiveTintColor={COLORS.primaryWhiteHex}
                    />
                    {/* share app */}

                    {/* support */}
                    <DrawerItem
                        label="Support"
                        icon={() => <MaterialIcons
                            name="support-agent"
                            size={25}
                            color={COLORS.primaryWhiteHex}
                        />
                        }
                        onPress={() => {
                            setSelectedItem('Support');
                            navigation.navigate('Support');
                        }}
                        style={[{
                            backgroundColor:
                                selectedItem === 'Support'
                                    ? COLORS.primaryOrangeHex
                                    : COLORS.primaryBlackHex,

                        }, styles.tabStyles]}
                        labelStyle={styles.labelStyle}
                        activeBackgroundColor={COLORS.primaryOrangeHex}
                        activeTintColor={COLORS.primaryWhiteHex}
                        inactiveBackgroundColor={COLORS.primaryBlackHex}
                        inactiveTintColor={COLORS.primaryWhiteHex}
                    />
                    {/* support */}

                    {/* website */}
                    <DrawerItem
                        label="Website"
                        icon={() => <MaterialCommunityIcons
                            name="web"
                            size={25}
                            color={COLORS.primaryWhiteHex}
                        />
                        }
                        onPress={() => {
                            setSelectedItem('Website');
                            Linking.openURL('https://reuseug.risidev.com');
                        }}
                        style={[{
                            backgroundColor:
                                selectedItem === 'Support'
                                    ? COLORS.primaryOrangeHex
                                    : COLORS.primaryBlackHex,

                        }, styles.tabStyles]}
                        labelStyle={styles.labelStyle}
                        activeBackgroundColor={COLORS.primaryOrangeHex}
                        activeTintColor={COLORS.primaryWhiteHex}
                        inactiveBackgroundColor={COLORS.primaryBlackHex}
                        inactiveTintColor={COLORS.primaryWhiteHex}
                    />
                    {/* website */}

                    {/* about us */}
                    <DrawerItem
                        label="AboutUs"
                        icon={() => <MaterialIcons
                            name="settings"
                            size={25}
                            color={COLORS.primaryWhiteHex}
                        />
                        }
                        onPress={() => {
                            setSelectedItem('AboutUs');
                            navigation.navigate('AboutUs');
                        }}
                        style={[{
                            backgroundColor:
                                selectedItem === 'AboutUs'
                                    ? COLORS.primaryOrangeHex
                                    : COLORS.primaryBlackHex,

                        }, styles.tabStyles]}
                        labelStyle={styles.labelStyle}
                        activeBackgroundColor={COLORS.primaryOrangeHex}
                        activeTintColor={COLORS.primaryWhiteHex}
                        inactiveBackgroundColor={COLORS.primaryBlackHex}
                        inactiveTintColor={COLORS.primaryWhiteHex}
                    />
                    {/* about us */}
                </ExpandableSection>
                {/* another section */}
                <View style={[generalStyles.bottomHairline, styles.hairLineStyles]} />

            </DrawerContentScrollView>

            {/* logout  */}
            <DrawerItem
                label="Logout"
                icon={() => <AntDesign
                    name="logout"
                    size={25}
                    color={COLORS.primaryWhiteHex}
                />
                }
                onPress={() => {
                    setSelectedItem('Logout');
                    onSignOut()
                }}
                style={[{
                    backgroundColor:
                        selectedItem === 'Logout'
                            ? COLORS.primaryOrangeHex
                            : COLORS.primaryBlackHex,

                }, styles.tabStyles, { bottom: 10 }]}
                labelStyle={styles.labelStyle}
                activeBackgroundColor={COLORS.primaryOrangeHex}
                activeTintColor={COLORS.primaryWhiteHex}
                inactiveBackgroundColor={COLORS.primaryBlackHex}
                inactiveTintColor={COLORS.primaryWhiteHex}
            />
            {/* logout */}

        </View>


    )
}

const HeaderExpandableSection = ({ expanded, setExpanded }: any) => {
    return <View>
        <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "space-between" }, styles.tabStyles]}>
            <View>
                <Text style={[styles.labelStyle, { fontFamily: FONTFAMILY.poppins_semibold, fontSize: 18 }]}>Settings & Support</Text>
            </View>
            <TouchableOpacity>
                <Ionicons name={expanded ? "chevron-up" : "chevron-down"}
                    size={25}
                    color={COLORS.primaryWhiteHex}
                    onPress={() => setExpanded(!expanded)}
                />

            </TouchableOpacity>
        </View>

    </View>
}

export default DrawerContent

const styles = StyleSheet.create({
    labelStyle: {
        color: COLORS.primaryWhiteHex, fontFamily: FONTFAMILY.poppins_light, fontSize: 14
    },
    tabStyles: {
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 20,
    },
    hairLineStyles: {
        width: "80%",
        marginHorizontal: 40
    }
})