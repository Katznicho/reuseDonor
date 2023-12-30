import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../navigators/AuthStack';
import { useFirebase } from '../hooks/useFirebase';
import { AppDispatch, RootState } from '../redux/store/dev';
import { useDispatch, useSelector } from 'react-redux';
import DrawerNavigator from '../navigators/DrawerNavigator';
import { updateProfilePicture } from '../redux/store/slices/UserSlice';


const Stack = createNativeStackNavigator();

const Base = () => {
    const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const { getCurrentUser, getUserByUid } = useFirebase();


    const fetchCurrentUser = async () => {
        try {
            await getCurrentUser();

        } catch (error) {
            // Handle any errors that might occur during the process
        }
    };
    // useEffect to get the current logged-in user on component mount
    useEffect(() => {
        fetchCurrentUser();
        if (isLoggedIn) {
            getUserByUid(user?.UID)
                .then((userData) => {
                    if (userData != null) {
                        if (userData?.photoURL) {
                            dispatch(updateProfilePicture(userData?.photoURL));
                        }
                    }

                })
                .catch((error) => {
                    // Handle any errors from the API call

                });
        }
    }, []);

    useEffect(() => {
    }, [isLoggedIn])



    return (
        <NavigationContainer>
            {
                isLoggedIn ?
                    <DrawerNavigator />
                    : <AuthStack />
            }


        </NavigationContainer>
    )
}

export default Base

