import { useInfiniteQuery } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetcher = async (limit: number = 20, pageNumber: number = 1, queryUrl: string, status = null) => {
    try {
        const headers = new Headers();
        headers.append('Accept', 'application/json');
        const token = await AsyncStorage.getItem('token');
        headers.append('Authorization', `Bearer ${token}`);

        // Build the URL based on the presence of the status parameter
        let url = `${queryUrl}?limit=${limit}&page=${pageNumber}`;
        if (status !== null) {
            url += `&status=${status}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers,
        });

        const data = await response.json();

        console.log('notifications data', data);

        return {
            data: data?.data?.data,
            nextPage: data?.data?.pagination?.current_page + 1,
            total: data?.data?.pagination?.total,
            currentPage: data?.data?.pagination?.current_page,
            lastPage: data?.data?.pagination?.total,
            pageParam: data?.data?.pagination?.current_page + 1,
        };
    } catch (error) {
        if (error instanceof Error) throw new Error(error.message);
        else throw new Error('Something went wrong.');
    }
};


// const fetcher = async (pageNumber: number = 1) => {
//     try {
//         console.log("pageNumber", pageNumber)
//         const headers = new Headers();
//         headers.append('Accept', 'application/json');
//         const token = await AsyncStorage.getItem('token');
//         headers.append('Authorization', `Bearer ${token}`);

//         // Build the URL based on the presence of the status parameter
//         let url = `https://api.thecatapi.com/v1/breeds?limit=${10}&page=${pageNumber}`;
//         // if (status !== null) {
//         //     url += `&status=${status}`;
//         // }

//         const response = await fetch(url, {
//             method: 'GET',
//             headers,
//         });

//         const data = await response.json();



//         return {
//             data: data,
//             // nextPage: data?.data?.pagination?.current_page + 1,
//             total: data.length,
//             nextPage: pageNumber + 1,
//             currentPage: pageNumber,
//             lastPage: data.length,
//             // currentPage: data?.data?.pagination?.current_page,
//             // lastPage: data?.data?.pagination?.total,
//             // pageParam: data?.data?.pagination?.current_page + 1,
//         };
//     } catch (error) {
//         if (error instanceof Error) throw new Error(error.message);
//         else throw new Error('Something went wrong.');
//     }
// };

/**
 * Fetches data using the useInfiniteQuery hook and returns the fetched data, loading and error states, and functions for pagination.
 *
 * @return {object} An object containing the fetched data, loading and error states, and functions for pagination.
 */
export default function useFetchInfinite(queryKey: string, url: string, status: any = null) {
    const {
        data,
        isError,
        isLoading,
        error,
        isFetching,
        hasNextPage,
        fetchNextPage,

    } = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({ pageParam = 1 }) => fetcher(20, pageParam, url, status),
        getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
        getPreviousPageParam: (firstPage, allPages) => firstPage.currentPage - 1,
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 10000,
    });

    return {
        data,
        isError,
        isLoading,
        error,
        isFetching,
        hasNextPage,
        fetchNextPage,
    };
}