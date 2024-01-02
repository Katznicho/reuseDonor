import { StyleSheet, Text, View, Pressable, FlatList, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY } from '../theme/theme'
import { ActivityIndicator } from './ActivityIndicator'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { limitDescription } from '../screens/utils/helpers/helpers';
import { useNavigation } from '@react-navigation/native';

const ProductFlatlist = ({ productData, loadMoreData, isFetching }: any) => {
    const navigation = useNavigation<any>();
    if (productData == undefined || productData == null) {
        return <ActivityIndicator />
    }
    return (
        <FlatList
            data={productData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
                <Pressable
                    style={styles.container} key={index}
                    onPress={() => navigation.navigate('MyProductDetails', {
                        item
                    })}
                >
                    <View>
                        {/* icon */}
                        <Image
                            source={{
                                uri: item?.coverImage,
                            }}
                            style={{
                                width: 60,
                                height: 60,
                                borderRadius: 10,
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

                        <Text style={styles.date}>{item?.title}</Text>
                        <Text style={styles.status}>{item?.estimatedPickUp}</Text>
                        <Text style={styles.date}>{limitDescription(item?.description, 15)}</Text>


                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                        }}
                    >
                        {/* amount details */}
                        <View>
                            <Text style={styles.status}>{item?.status}</Text>
                        </View>
                        {/* amoun details */}
                    </View>
                    <Pressable>
                        {/* add chevron icon */}
                        <Ionicons
                            name="chevron-forward"
                            size={24}
                            color={COLORS.primaryBlackHex}
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

export default ProductFlatlist

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