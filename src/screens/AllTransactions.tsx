import { SafeAreaView } from 'react-native'
import React from 'react'
import useFetchInfinite from '../hooks/useFetchInfinite';
import PaymentFlatList from '../components/PaymentFlatList';
import { generalStyles } from './utils/generatStyles';
import EmptyListAnimation from '../components/EmptyListAnimation';
import { USERPAYMENTS } from './utils/constants/routes';


const AllTransactions = () => {
    const { isError, data, error, fetchNextPage, hasNextPage, isFetching } = useFetchInfinite("payments", USERPAYMENTS);
    console.log("=========== data=========================")
    console.log(data?.pages[0].data)
    console.log("==========data=====================")




    //flat the data
    // const flattenedData = data?.pages.flatMap(page => page.results) || [];
    const paymentData = data?.pages.flatMap(page => page.data);

    console.log("=============payment data length==========================")
    console.log(paymentData);





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
                    title={'No Transactions'} />
            }
            <PaymentFlatList
                paymentData={paymentData}
                loadMoreData={loadMoreData}
                isFetching={isFetching}
            />

        </SafeAreaView >
    )
}

export default AllTransactions

