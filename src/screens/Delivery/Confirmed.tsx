import { StyleSheet, Text, View, SafeAreaView, FlatList, Pressable, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { useFirebase } from '../../hooks/useFirebase';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EmptyListAnimation from '../../components/EmptyListAnimation';

const Conifirmed = () => {

    const { user } = useSelector((state: RootState) => state.user);

    const { getConfirmedOrUnconfirmedDeliveryDetails } = useFirebase();
    const navigation = useNavigation<any>();

    const [loading, setLoading] = useState<boolean>(false);
    const [delivery, setDelivery] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        getConfirmedOrUnconfirmedDeliveryDetails(user.UID, true).then((userDeliveries) => {
            setDelivery(userDeliveries)
        }).catch((error) => {
        })
        setLoading(false);
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.primaryBlackHex,
            }}
        >
            {
                delivery.length > 0 ?
                    <FlatList
                        data={delivery}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => String(item.id)}
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
                                            uri: item?.product?.coverImage
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

                                    <Text style={styles.date}>{item?.product?.title}</Text>
                                    {/* <Text style={styles.status}>{item?.deliveryDate}</Text>
                                <Text style={styles.status}>{item?.pickUpDate}</Text> */}
                                    <Text style={styles.status}>{item?.status}</Text>
                                    <Text style={styles.status}>{item?.isConfirmed ? 'Confirmed' : 'Pending Confirmation'}</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                    }}
                                >
                                    {/* amount details */}
                                    <View>
                                        <Text style={styles.status}>{item?.receiver.communityName}</Text>
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
                    />

                    :
                    <View >
                        <EmptyListAnimation title={'You dont have any completed delivery yet'} />


                    </View>

            }

        </SafeAreaView>
    )
}

export default Conifirmed

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
});