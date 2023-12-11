import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import { Dimensions } from 'react-native';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { useShowGreeting } from '../hooks/useShowGreetings';
import { useFirebase } from '../hooks/useFirebase';
import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
import { generalStyles } from './utils/generatStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';





const HomeScreen = ({ navigation }: any) => {

  const { updateUserLocation, updateUserDeviceId, getUserTotals, getAllCommunities } = useFirebase();
  const [position, setPosition] = useState<any>(null);

  const [loading, setLoading] = useState(false)

  const [totals, setTotal] = useState<any>(null)
  const [communityTotal, setCommunityTotal] = useState<any>(null)

  const { user } = useSelector(
    (state: RootState) => state.user,
  );

  let greetings = useShowGreeting()

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos: any) => {

        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
      },
      (error: any) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true, }
    );
  };



  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {

      const fcmToken = await messaging().getToken();

      updateUserDeviceId(user?.UID, fcmToken)

    }
    else {

    }
  }


  useEffect(() => {
    setLoading(true);

    setLoading(false);
    getCurrentPosition();
    if (position) {
      updateUserLocation(user?.UID, position.latitude, position.longitude);
    }

    requestUserPermission();
    getUserTotals(user?.UID).then((data: any) => {
      setTotal(data)
    })

    getAllCommunities().then((data: any) => {
      setCommunityTotal(data)
    })






  }, []);


  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        {/* App Header */}
        <HeaderBar />
        {/* header */}
        <View style={{
          marginVertical: 10,
          marginHorizontal: 15,
          elevation: 5,
          borderRadius: 10,
          paddingBottom: 20,
          backgroundColor: COLORS.primaryDarkGreyHex
        }} >
          <Text style={{
            fontSize: 20,
            marginVertical: 10,
            fontFamily: FONTFAMILY.poppins_semibold,
            color: COLORS.primaryWhiteHex,
            paddingLeft: SPACING.space_30,
          }}>
            {greetings} {`${user?.fname} ${user?.lname}`}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: FONTFAMILY.poppins_medium,
              color: COLORS.primaryWhiteHex,
              paddingLeft: SPACING.space_30,
            }}
          >
            {`Your Dashboard   on ${new Date().toDateString()}`}
          </Text>

        </View>

        <View style={[generalStyles.flexStyles]}>

          <TouchableOpacity style={[styles.cardStyles]}
            onPress={
              () => navigation.navigate('Payments')
            }
          >

            <View>
              <FontAwesome name="refresh"
                style={[styles.iconStyles]}
                size={50}
                color={COLORS.primaryWhiteHex}
              />
            </View>

            <Text style={[styles.textStyles]}>{totals?.totalPaymentDocuments} Total Payments</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cardStyles]}
            onPress={
              () => navigation.navigate('Payments')
            }
          >

            <View>
              <FontAwesome name="product-hunt"
                style={[styles.iconStyles]}
                size={50}
                color={COLORS.primaryWhiteHex}
              />
            </View>

            <Text style={[styles.textStyles]}>{totals?.totalProductDocuments} Total Products</Text>
          </TouchableOpacity>

        </View>

        <View style={[generalStyles.flexStyles]}>

          <TouchableOpacity style={[styles.cardStyles]}
            onPress={
              () => navigation.navigate('Payments')
            }
          >

            <View>
              <FontAwesome name="users"
                style={[styles.iconStyles]}
                size={50}
                color={COLORS.primaryWhiteHex}
              />
            </View>

            <Text style={[styles.textStyles]}>{communityTotal?.length} Total Communities</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.cardStyles]}
            onPress={
              () => navigation.navigate('Deliveries')
            }
          >

            <View>
              <MaterialCommunityIcons name="truck-delivery-outline"
                style={[styles.iconStyles]}
                size={50}
                color={COLORS.primaryWhiteHex}
              />
            </View>

            <Text style={[styles.textStyles]}>{totals?.totalDeliveryDocuments} Delivered Products</Text>
          </TouchableOpacity>

        </View>




      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  cardStyles: {
    borderWidth: 1,
    borderColor: COLORS.primaryOrangeHex,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: COLORS.primaryOrangeHex,
    width: 150,
    height: 150,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: "center",
    elevation: 5,
    color: COLORS.primaryWhiteHex

  },
  textStyles: {
    fontWeight: "bold",
    color: COLORS.primaryWhiteHex
    // fontSize: 18
  },
  iconStyles: {
    marginBottom: 10
  }
});

export default HomeScreen;
