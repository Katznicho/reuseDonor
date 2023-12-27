import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import axiosInstance from '../axios/axios';

// Type for the parameters that can be passed to the useApi hook
type ApiParams = {
  endpoint: string; // API endpoint
  params?: any; // Optional query parameters to be passed to the API endpoint
  queryOptions?: QueryOptions; // Options for the useQuery hook
};

// Type for the response object returned by the useApi hook
type ApiResponse<T> = {
  data: T | null; // API response data
  error: Error | null; // Error object if an error occurred, otherwise null
  isLoading: boolean; // Boolean flag indicating if the API request is currently loading
  refetch: () => void; // Function to refetch the API data
};

// Type for the options that can be passed to the useQuery hook
type QueryOptions = {
  enabled?: boolean; // Boolean flag indicating if the query should be enabled or not
  cacheTime?: number; // Number indicating the time (in milliseconds) that the query data should be cached
  staleTime?: number; // Number indicating the time (in milliseconds) that the query data should be considered stale
  refetchOnWindowFocus?: boolean; // Boolean flag indicating if the query should be refetched when the window regains focus
  refetchOnMount?: boolean; // Boolean flag indicating if the query should be refetched when the component mounts
  refetchInterval?: number | false; // Number indicating the interval at which the query should be refetched (in milliseconds), or false to disable automatic refetching
  retry?: number; // Number indicating the number of times the query should be retried if it fails
  retryDelay?: number; // Number indicating the delay (in milliseconds) between query retries
  onError?: (error: AxiosError) => void; // Function to handle errors returned by the API,
  onSuccess?: (response: AxiosResponse) => void; // Function to handle successful responses from the API
onSettled?: (data: any, error: AxiosError | null) => void; // Function to handle responses from the API regardless of success or error

};

/**
 * Custom hook for making API requests with React Query and Axios
 * @param {object} params - The parameters for the API request
 * @param {string} params.endpoint - The endpoint for the API request
 * @param {object} params.params - Optional parameters for the API request
 * @param {object} params.queryOptions - Optional options for the useQuery hook
 * @param {object} params.postOptions - Optional options for the useMutation hook for POST requests
 * @param {object} params.putOptions - Optional options for the useMutation hook for PUT requests
 * @param {object} params.deleteOptions - Optional options for the useMutation hook for DELETE requests
 * @returns {object} An object containing the data, error, isLoading, refetch, mutate, mutatePut, and mutateDelete functions
 */


export  function useApi<T>({ endpoint, params, queryOptions }: ApiParams): ApiResponse<T> {
    /**
   * Fetches the data from the API endpoint using Axios
   * @returns {Promise} A Promise that resolves to the data from the API endpoint
   * @throws {Error} If there is an error fetching the data
   */
  const fetcher = async (): Promise<any> => {
    try {
      const {data} = await axiosInstance.get<T>(endpoint, { params });
      return data;
    } catch (error:any) {
      
      throw new Error(error.response?.data?.error || 'There was an error fetching data');
    }
  };

  /**
   * Calls the useQuery hook to fetch data from the API endpoint
   */

  const { data, isLoading, isError, refetch } = useQuery<T>(endpoint, fetcher,{
    enabled: queryOptions?.enabled,
    refetchOnWindowFocus: queryOptions?.refetchOnWindowFocus,
    refetchOnMount: queryOptions?.refetchOnMount,
    refetchInterval: queryOptions?.refetchInterval,
    retry: queryOptions?.retry,
    staleTime:queryOptions?.staleTime,
    cacheTime:queryOptions?.cacheTime
  });
  
  return {
    data: data || null,
    error: isError ? new Error('Something went wrong') : null,
    isLoading,
    refetch

  };
}

