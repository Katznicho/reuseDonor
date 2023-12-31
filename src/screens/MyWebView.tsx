import { Text, View, SafeAreaView, StatusBar, Button } from 'react-native'
import React, { useRef } from 'react'
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { showMessage } from 'react-native-flash-message';
import { generalStyles } from './utils/generatStyles';
import { ActivityIndicator } from '../components/ActivityIndicator';


const MyWebView = () => {
    const { params } = useRoute<any>();
    const navigation = useNavigation<any>();


    const webRef = useRef<any>();

    const handleNavigationStateChange = (event: any) => {
        console.log("======================================")
        console.log(event)
        console.log("======================================")

        //navigat back home if the url is https://testemail.rapharm.shop/finishPayment
        if (event.title == 'reuse.risidev.com/finishPayment' || event.url === 'https://reuse.risidev.com/finishPayment' || event.url.includes('https://reuse.risidev.com/finishPayment')) {
            showMessage({
                message: 'Payment Successful',
                description: 'Your payment has been successful',
                type: 'success',
                icon: 'success'
            })
            navigation.navigate('HomeTab')
        }


    }
    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]}>

            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginTop: 10
            }}>
                <Text style={[generalStyles.ScreenTitle, { fontSize: 18 }]}>Please Choose Payment Method</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5, marginHorizontal: 10 }}>

                <Button title="Reload"
                    onPress={() => webRef.current?.reload()}
                    color={COLORS.primaryOrangeHex}
                />

                <Button title="Home"
                    onPress={() => navigation.navigate('HomeTab')}
                    color={COLORS.primaryOrangeHex}
                />

                {/* back to home screen */}

            </View>


            <WebView
                ref={webRef}
                source={{ uri: params?.url }}
                onNavigationStateChange={handleNavigationStateChange}
                style={{ flex: 1 }}
                allowFileAccess
                startInLoadingState
                renderLoading={() => {
                    return <View style={{ flex: 1, }}>
                        <ActivityIndicator />
                    </View>
                }}
            />
        </SafeAreaView >
    )
}

export default MyWebView

