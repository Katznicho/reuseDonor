import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { usePostQuery } from '../hooks/usePostQuery'

const Totals = () => {
    //totals
    const { data, error, isLoading } = usePostQuery<any>({
        endpoint: '/getDonorTotals',
        params: {
            "total": "getDonorTotals"
        },
        queryOptions: {
            enabled: true,
            refetchInterval: 4000,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
        },
    })
    //totals
    console.log('==========community totals==========================')
    console.log(data)
    console.log('===========community totals=========================')
    return (
        <View>
            <Text>Totals</Text>
        </View>
    )
}

export default Totals

const styles = StyleSheet.create({})