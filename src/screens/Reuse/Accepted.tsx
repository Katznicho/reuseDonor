import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../theme/theme';
import EmptyListAnimation from '../../components/EmptyListAnimation';
import { generalStyles } from '../utils/generatStyles';
import ProductFlatlist from '../../components/ProductFlatlist';
import { useNavigation } from '@react-navigation/native';
import useFetchInfinite from '../../hooks/useFetchInfinite';
import { USERPRODUCTS } from '../utils/constants/routes';
import { PRODUCT_STATUS } from '../utils/constants/constants';



//https://wix.github.io/react-native-ui-lib/docs/components/overlays/FeatureHighlight
//tamagui

const Accepted = () => {

    const navigation = useNavigation<any>();

    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite(`${PRODUCT_STATUS.ACCEPTED}PRODUCTS `, USERPRODUCTS, PRODUCT_STATUS.ACCEPTED);
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
                        title={'You dont have any products'}
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

            <ProductFlatlist
                productData={productData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />

        </SafeAreaView>
    );
};

export default Accepted;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: 8,
        padding: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },

    date: {
        fontSize: 12,
        color: COLORS.primaryBlackHex,
        marginVertical: 2,
    },
    status: {
        fontSize: 12,
        color: 'gray',
        marginVertical: 2,
    },
    statusActive: {
        fontSize: 12,
        color: 'green',
        marginVertical: 2,
    },
    statusRejected: {
        fontSize: 12,
        color: 'red',
        marginVertical: 2,
    }
});
