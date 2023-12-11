import RNLocation from 'react-native-location';
import { useEffect, useState } from 'react';

const useAskForLocationPermission = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const configureLocation = async () => {
            try {
                await RNLocation.configure({
                    distanceFilter: 5.0,
                    desiredAccuracy: {
                        ios: "best",
                        android: "balancedPowerAccuracy"
                    }
                });

                const permissionGranted = await RNLocation.requestPermission({
                    ios: "whenInUse",
                    android: {
                        detail: "fine",
                        rationale: {
                            title: "Location permission",
                            message: "We use your location to provide you with the best experience",
                            buttonPositive: "OK",
                            buttonNegative: "Cancel"
                        }
                    }
                });

                if (permissionGranted) {
                    const latestLocation = await RNLocation.getLatestLocation({ timeout: 60000 });
                    if (latestLocation) {
                        setLatitude(latestLocation.latitude);
                        setLongitude(latestLocation.longitude);
                    } else {
                        setLatitude(0);
                        setLongitude(0);
                    }
                }
            } catch (error) {
                console.error("Error fetching location:", error);
            } finally {
                setLoading(false);
            }
        };

        configureLocation();
    }, []);

    return { latitude, longitude, loading };
};

export default useAskForLocationPermission;
