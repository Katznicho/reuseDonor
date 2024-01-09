import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { ActivityIndicator } from './ActivityIndicator'
import { FlatList } from 'react-native-gesture-handler'
import { COLORS, FONTFAMILY } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'


const DeliveryFlatlist = ({ deliveryData, loadMoreData, isFetching }: any) => {

    const navigation = useNavigation<any>();

    if (deliveryData == undefined || deliveryData == null) {
        return <ActivityIndicator />
    }
    return (
        <FlatList
            data={deliveryData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item?.id)}
            renderItem={({ item, index }) => (
                <Pressable style={styles.container} key={index}
                    onPress={() => navigation.navigate('DeliveryDetails', {
                        item
                    })}
                >
                    <View>
                        {/* icon */}
                        <Image
                            source={{
                                uri: item?.product?.cover_image
                            }}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 20,
                            }}
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: 'column',
                            flex: 1,
                            marginHorizontal: 10,
                            marginTop: 10,
                        }}
                    >

                        <Text style={styles.date}>{item?.product?.name}</Text>
                        {/* <Text style={styles.status}>{item?.deliveryDate}</Text>
                    <Text style={styles.status}>{item?.pickUpDate}</Text> */}
                        <Text style={styles.status}>{item?.status}</Text>
                        <Text style={styles.status}>{item?.status == "Pending" ? 'Pending Confirmation' : 'Confirmed'}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                        }}
                    >
                        {/* amount details */}
                        <View>
                            <Text style={styles.status}>{item?.user?.name}</Text>
                        </View>
                        {/* amoun details */}
                    </View>
                    <Pressable>
                        {/* add chevron icon */}
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color={COLORS.primaryWhiteHex}
                        />
                        {/* icon */}
                    </Pressable>
                </Pressable>
            )}
            onEndReached={() => {
                loadMoreData()
            }}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={isFetching && <ActivityIndicator />}
            // refreshControl={isFetching && <ActivityIndicator />}
            onRefresh={loadMoreData}
            refreshing={isFetching}
            contentContainerStyle={{ paddingBottom: 50 }}
        />
    )
}

export default DeliveryFlatlist

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.primaryBlackHex,
        borderRadius: 10,
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
        marginHorizontal: 5
    },

    date: {
        fontSize: 12,
        color: COLORS.primaryWhiteHex,
        marginVertical: 2,
        fontFamily: FONTFAMILY.poppins_light
    },
    status: {
        fontSize: 12,
        color: 'gray',
        marginVertical: 2,
        fontFamily: FONTFAMILY.poppins_light
    },
});