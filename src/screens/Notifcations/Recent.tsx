import { SafeAreaView, ScrollView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import ReviewTypes from '../../components/ReviewTypes';
import NotificationCard from '../../components/NotificationCard';
import { useFirebase } from '../../hooks/useFirebase';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import EmptyListAnimation from '../../components/EmptyListAnimation';
import { COLORS } from '../../theme/theme';

/**
 * Renders the Recent component.
 *
 * @return {JSX.Element} The rendered Recent component.
 */
/**
 * Renders the Recent component.
 *
 * @return {JSX.Element} The rendered Recent component.
 */
const Recent = () => {

    const { user } = useSelector((state: RootState) => state.user);

    const [loading, setLoading] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<any[]>([])

    const { getAllNotifications } = useFirebase();

    const [details] = useState([
        {
            name: 'Recent',
            screen: 'Recent',
        },
        {
            name: 'Events',
            screen: 'Events',
        },
        {
            name: 'All',
            screen: 'All',
        },
    ]);


    useEffect(() => {
        setLoading(true);
        getAllNotifications(user?.UID).then((res) => {
            setNotifications(res);
            setLoading(false);
        }).catch((err) => {
            console.log(err)
            setLoading(false);
        })
    }, [])

    if (loading) return <SafeAreaView style={{ flex: 1, backgroundColor:COLORS.primaryBlackHex }}>
        <ActivityIndicator />
    </SafeAreaView>


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* notification type */}
                <ReviewTypes name="Recent" data={details} />

                {!loading && notifications.length > 0 ? notifications.slice(0, 10).map((item, index) => {
                    return (
                        <NotificationCard
                            key={item.id}
                            type={item.title}
                            description={item.description}
                            time={item.time}
                            id={item.id}
                        />
                    );
                }) :
                    <View >
                        <EmptyListAnimation title={'Yuou have no notifications'} />
                        <View>
                            {/* <Button
                                mode="contained"
                                buttonColor={reuseTheme.colors.preference.primaryForeground}
                                textColor={reuseTheme.colors.preference.primaryText}
                                onPress={() => navigation.navigate('CreateProducts')}
                            >
                                Create Products
                            </Button> */}
                        </View>

                    </View>
                }
                {/* notification details */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Recent
