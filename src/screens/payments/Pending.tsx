import { SafeAreaView } from 'react-native'
import React from 'react'
import { PAYMENT_STATUS } from '../utils/constants/constants';
import EmptyListAnimation from '../../components/EmptyListAnimation';
import useFetchInfinite from '../../hooks/useFetchInfinite';
import { USERPAYMENTS } from '../utils/constants/routes';
import { generalStyles } from '../utils/generatStyles';
import PaymentFlatList from '../../components/PaymentFlatList';


const Pending = () => {

    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite(PAYMENT_STATUS.PENDING, USERPAYMENTS, PAYMENT_STATUS.PENDING);
    console.log("=========== data=========================")
    console.log(data?.pages[0].total)
    console.log("==========data=====================")





    //flat the data
    // const flattenedData = data?.pages.flatMap(page => page.results) || [];
    const paymentData = data?.pages.flatMap(page => page.data);

    console.log("=============payment data length==========================")
    console.log(paymentData?.length);





    const loadMoreData = () => {
        if (hasNextPage && !isFetching && data?.pages[0].total !== paymentData?.length) return fetchNextPage()
    };


    console.log("====================================")
    console.log(hasNextPage)
    console.log("===============================")




    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>
            {
                data && paymentData?.length === 0 && <EmptyListAnimation
                    title={'No Pending Transactions'} />
            }
            <PaymentFlatList
                paymentData={paymentData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />

        </SafeAreaView >
    )
}

export default Pending

