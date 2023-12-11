import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store/dev';
import { useFirebase } from '../../hooks/useFirebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { PAYMENT_STATUS } from '../utils/constants/constants';
import { COLORS } from '../../theme/theme';
import EmptyListAnimation from '../../components/EmptyListAnimation';


const Pending = () => {
    const { user } = useSelector((state: RootState) => state.user);

    const { getPaymentsByUserIdAndStatus } = useFirebase();
    const navigation = useNavigation<any>();

    const [loading, setLoading] = useState<boolean>(false);
    const [payments, setPayments] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);
        getPaymentsByUserIdAndStatus(user.UID, PAYMENT_STATUS.PENDING).then((userpayments) => {
            setPayments(userpayments)
        }).catch((error) => {
        })
        setLoading(false);
    })


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.primaryBlackHex,
            }}
        >
            {
                payments.length > 0 ?
                    <FlatList
                        data={payments}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => (
                            <Pressable style={styles.container} key={index}
                                onPress={() => navigation.navigate('PaymentDetails', {
                                    item
                                })}
                            >
                                <View>
                                    {/* icon */}
                                    <Image
                                        source={require("../../assets/images/reuse.png")}
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

                                    <Text style={styles.date}>{item?.productName}</Text>
                                    <Text style={styles.status}>{item?.paidTo}</Text>
                                    <Text style={styles.status}>{item?.paymentMethod}</Text>
                                    <Text style={styles.status}>{item?.status}</Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                    }}
                                >
                                    {/* amount details */}
                                    <View>
                                        <Text style={styles.status}>{item?.totalAmount}</Text>
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
                        <EmptyListAnimation title={'You dont have any pending payments'} />


                    </View>

            }

        </SafeAreaView>
    )
}

export default Pending

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