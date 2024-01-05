
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Recent from '../screens/Notifcations/Recent';
import All from '../screens/Notifcations/All';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';


const Stack = createNativeStackNavigator();

/**
 * Generates the function comment for the given function body.
 *
 * @return {JSX.Element} The JSX element representing the NotificationStack component.
 */


const MyNotificationStack = (): JSX.Element => {

  return (
    <Stack.Navigator
      initialRouteName="All"
    >

      <Stack.Screen
        name="Recent"
        component={Recent}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: COLORS.primaryOrangeHex
          },
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTitleAlign: 'center',
          headerTintColor: COLORS.primaryBlackHex,
        }}

      />

      <Stack.Screen
        name="Events"
        component={Recent}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: COLORS.primaryOrangeHex
          },
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTitleAlign: 'center',
          headerTintColor: COLORS.primaryBlackHex,
        }}

      />

      <Stack.Screen
        name="All"
        component={All}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: COLORS.primaryOrangeHex
          },
          headerTitleStyle: generalStyles.titleHeaderStyles,
          headerTitleAlign: 'center',
          headerTintColor: COLORS.primaryBlackHex,
        }}

      />
    </Stack.Navigator>
  );
};

export default MyNotificationStack;
