import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { useShowGreeting } from '../hooks/useShowGreetings';
import messaging from '@react-native-firebase/messaging';
import Geolocation from '@react-native-community/geolocation';
import { generalStyles } from './utils/generatStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import { SAVE_DEVICE_INFO } from './utils/constants/routes';
import { usePostQuery } from '../hooks/usePostQuery';
import UserWallet from '../components/UserWallet';
import Totals from '../components/Totals';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';





const HomeScreen = ({ navigation }: any) => {

  const [position, setPosition] = useState<any>(null);

  const { data, error, isLoading, refetch } = usePostQuery<any>({
    endpoint: '/auth/hasWalletAccount',
    params: {
      "account": "hasWalletAccount"
    },
    queryOptions: {
      enabled: true,
      refetchInterval: 2000,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    },
  })



  const [totals, setTotal] = useState<any>(null)
  const [communityTotal, setCommunityTotal] = useState<any>(null)

  const { user, authToken } = useSelector((state: RootState) => state.user);

  let greetings = useShowGreeting()

  // const getCurrentPosition = () => {
  //   Geolocation.getCurrentPosition(
  //     (pos: any) => {

  //       const { latitude, longitude } = pos.coords;
  //       setPosition({ latitude, longitude });
  //     },
  //     (error: any) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
  //     { enableHighAccuracy: true, }
  //   );
  // };

  // useEffect(() => {
  //   getCurrentPosition();
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        let deviceId = DeviceInfo.getDeviceId();
        let model = DeviceInfo.getModel();
        const manufacture = await DeviceInfo.getManufacturer();
        let readableVersion = DeviceInfo.getReadableVersion();
        let systemName = DeviceInfo.getSystemName();
        let systemVersion = DeviceInfo.getSystemVersion();
        const userAgent = await DeviceInfo.getUserAgent();
        let type = DeviceInfo.getDeviceType();
        const devicePushToken = await messaging().getToken();

        console.log('devicePushToken', devicePushToken);

        if (
          deviceId &&
          model &&
          manufacture &&
          readableVersion &&
          systemName &&
          systemVersion &&
          userAgent &&
          type
        ) {
          saveDeviceInfo(
            devicePushToken,
            deviceId,
            model,
            manufacture,
            readableVersion,
            systemName,
            systemVersion,
            userAgent,
            type,
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveDeviceInfo(
    push_token: string,
    device_id: string,
    device_model: string,
    device_manufacturer: string,
    app_version: string,
    device_os: string,
    device_os_version: string,
    device_user_agent: string,
    device_type: string,
  ) {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', `Bearer ${authToken}`);

    const body = new FormData();
    body.append('push_token', push_token);
    body.append('device_id', device_id);
    body.append('device_model', device_model);
    body.append('device_manufacturer', device_manufacturer);
    body.append('app_version', app_version);
    body.append('device_os', device_os);
    body.append('device_os_version', device_os_version);
    body.append('device_user_agent', device_user_agent);
    body.append('device_type', device_type);


    fetch(`${SAVE_DEVICE_INFO}`, {
      headers,
      method: 'POST',
      body,
    })
      .then(a => a.json())
      .then(result => {

      })
      .catch(error => {
      });
  }


  return (
    <KeyboardAwareScrollView
      style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
      keyboardShouldPersistTaps="always"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"

      >
        {/* App Header */}
        <HeaderBar title={`${greetings} ${user?.fname} !`} />

        {/* wallet button */}
        {
          data?.response == "failure" && (<TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('CreateWallet')}
            style={generalStyles.loginContainer}
          >
            <Text style={generalStyles.loginText}>{'Add Wallet'}</Text>
          </TouchableOpacity>)
        }
        {/* wallet button */}

        {
          data?.response == "success" && (<UserWallet />)
        }
        {/* header */}


        {/* totals */}
        <Totals />
        {/* totals */}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};



export default HomeScreen;
