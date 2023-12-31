import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { generalStyles } from '../screens/utils/generatStyles';
import HeadProfileCard from './HeadProfileCard';
import CustomIcon from './CustomIcon';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const DrawerContent = (props: any) => {
    const { user } = useSelector((state: RootState) => state.user);
    const [selectedItem, setSelectedItem] = useState<string>('Home');
    const navigation = useNavigation<any>()
    return (
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
            {/* drawer section */}
        </DrawerContentScrollView>
    )
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
    }
})