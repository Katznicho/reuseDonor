import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { COLORS } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import PaymentStack from '../screens/payments/PaymentStack';
import { generalStyles } from '../screens/utils/generatStyles';
import HeadProfileCard from '../components/HeadProfileCard';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/dev';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DeliveryStack from '../screens/Delivery/DeliveryStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  const { user } = useSelector((state: RootState) => state.user);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        overlayColor: 'transparent',
        drawerStatusBarAnimation: 'slide',
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.primaryBlackHex,
          borderTopColor: COLORS.primaryBlackHex,
          borderTopWidth: 0,
          width: 250


        },
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: COLORS.primaryWhiteHex,
        },
        drawerItemStyle: {
          marginVertical: 10,
          marginHorizontal: 20,
          borderRadius: 20,
        },
        drawerActiveBackgroundColor: COLORS.primaryOrangeHex,
        drawerActiveTintColor: COLORS.primaryWhiteHex,
        drawerInactiveBackgroundColor: COLORS.primaryBlackHex,
        drawerInactiveTintColor: COLORS.primaryWhiteHex,
        header: ({ navigation, route, options }) => {
          return <View
            style={{
              marginVertical: 10,
              // marginHorizontal: 20,
              borderRadius: 20,
            }}
          >
            <HeadProfileCard />
            <View>
              <Text style={[generalStyles.loginText]}>{user.username}</Text>
            </View>


          </View>;
        }
      }}

    >
      <Drawer.Screen name="Home"
        component={TabNavigator}

        options={{
          drawerIcon: ({ focused, color, size }) => (
            <CustomIcon
              name="home"
              size={25}
              color={COLORS.primaryWhiteHex}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Payments"
        component={PaymentStack}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <AntDesign
              name="creditcard"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Deliveries"
        component={DeliveryStack}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="truck-delivery"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

