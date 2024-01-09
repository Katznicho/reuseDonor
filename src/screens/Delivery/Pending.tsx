import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import EmptyListAnimation from '../../components/EmptyListAnimation';
import { generalStyles } from '../utils/generatStyles';
import { useNavigation } from '@react-navigation/native';
import useFetchInfinite from '../../hooks/useFetchInfinite';
import { DELIVERY_STATUS } from '../utils/constants/constants';
import { USERDELIVERIES } from '../utils/constants/routes';
import DeliveryFlatlist from '../../components/DeliveryFlatlist';


//https://wix.github.io/react-native-ui-lib/docs/components/overlays/FeatureHighlight
//tamagui

const Pending = () => {

    const navigation = useNavigation<any>();

    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite(`${DELIVERY_STATUS.PENDING} DELIVERY `, USERDELIVERIES, DELIVERY_STATUS.PENDING);
    console.log("=========== data=========================")
    console.log(data?.pages[0].total)
    console.log("==========data=====================")









    //flat the data
    // const flattenedData = data?.pages.flatMap(page => page.results) || [];
    const productData = data?.pages.flatMap(page => page.data);

    console.log("=============payment data length==========================")
    console.log(productData?.length);





    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== productData?.length) return fetchNextPage()
    };


    console.log("====================================")
    console.log(hasNextPage)
    console.log("===============================")


    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]} >

            {
                data && productData?.length === 0 && <View style={[generalStyles.centerContent]} >
                    <EmptyListAnimation
                        title={'You dont have any pending deliveries'}
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

            <DeliveryFlatlist
                productData={productData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />

        </SafeAreaView>
    );
};

export default Pending;


