import { SafeAreaView, View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { COLORS } from '../../theme/theme';
import NotificationFlatList from '../../components/NotificationFlatList';
import { useNavigation } from '@react-navigation/native';
import { USERNOTIFICATIONS } from '../utils/constants/routes';
import useFetchInfinite from '../../hooks/useFetchInfinite';
import { generalStyles } from '../utils/generatStyles';
import EmptyListAnimation from '../../components/EmptyListAnimation';


/**
 * Renders the Recent component.
 *
 * @return {JSX.Element} The rendered Recent component.
 */
const All = (): JSX.Element => {

    const navigation = useNavigation<any>();

    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("allnotifications", USERNOTIFICATIONS);
    console.log("=========== data=========================")
    console.log(data?.pages[0].total)
    console.log("==========data=====================")


    //flat the data
    // const flattenedData = data?.pages.flatMap(page => page.results) || [];
    const notificationData = data?.pages.flatMap(page => page.data);

    console.log("=============notification data length==========================")
    console.log(notificationData?.length);


    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== notificationData?.length) return fetchNextPage()
    };


    console.log("====================================")
    console.log(hasNextPage)
    console.log("===============================")

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
            {
                data && notificationData?.length === 0 && <View style={[generalStyles.centerContent]} >
                    <EmptyListAnimation
                        title={'You dont have any notifications'}
                    />
                    <View>

                        <TouchableOpacity
                            style={generalStyles.loginContainer}
                            onPress={() => navigation.navigate('Create')}
                        >
                            <Text style={generalStyles.loginText}>{'Create Products'}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            }
            <NotificationFlatList
                notificationData={notificationData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />
        </SafeAreaView>
    )
}

export default All
