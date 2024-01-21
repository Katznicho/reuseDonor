import { Alert } from 'react-native'
import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { UPDATE_USER_LOCATION } from '../screens/utils/constants/routes';



const useGetUserLocation = () => {

    const { authToken } = useSelector((state: RootState) => state.user);


    const [position, setPosition] = React.useState<any>(null)

    const getCurrentPosition = () => {
        Geolocation.getCurrentPosition(
            (pos: { coords: { latitude: any; longitude: any; }; }) => {

                const { latitude, longitude } = pos.coords;
                const headers = new Headers();
                headers.append('Accept', 'application/json');
                headers.append('Authorization', `Bearer ${authToken}`);
                const body = new FormData();
                body.append('lat', latitude);
                body.append('long', longitude);
                fetch(`${UPDATE_USER_LOCATION}`, {
                    method: 'POST',
                    headers,
                    body,
                }).then((response) => response.json())
                    .then((result) => {
                        // console.log("============================")
                        // console.log(result)
                        // console.log("============================")
                    })
                    .catch((error) => {
                        console.log("=======error=====================")
                        console.log(error)
                    })

                setPosition({ latitude, longitude });
            },
            (error: any) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
            { enableHighAccuracy: true, }
        );
    };

    React.useEffect(() => {
        getCurrentPosition();
        return () => {

        }
    }, [])

    return {
        position
    }
}

export default useGetUserLocation

