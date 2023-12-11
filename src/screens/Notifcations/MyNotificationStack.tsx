
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Recent from './Recent';
import { COLORS } from '../../theme/theme';


const Stack = createNativeStackNavigator();

/**
 * Generates the function comment for the given function body.
 *
 * @return {JSX.Element} The JSX element representing the NotificationStack component.
 */


const MyNotificationStack = (): JSX.Element => {

  return (
    <Stack.Navigator
      initialRouteName="Recent"
    >

      <Stack.Screen
        name="Recent"
        component={Recent}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: COLORS.primaryBlackHex,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTintColor: COLORS.primaryWhiteHex,
        }}

      />

      <Stack.Screen
        name="Events"
        component={Recent}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: COLORS.primaryBlackHex,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTintColor: COLORS.primaryWhiteHex,
        }}

      />

      <Stack.Screen
        name="All"
        component={Recent}
        options={{
          title: 'Notifications',
          headerStyle: {
            backgroundColor: COLORS.primaryBlackHex,
          },
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center',
          headerTintColor: COLORS.primaryWhiteHex,
        }}

      />
    </Stack.Navigator>
  );
};

export default MyNotificationStack;
