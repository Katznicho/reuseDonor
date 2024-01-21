import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { generalStyles } from '../utils/generatStyles'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import RNFetchBlob from 'rn-fetch-blob'
import { ActivityIndicator } from '../../components/ActivityIndicator'
import { showMessage } from 'react-native-flash-message';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../../theme/theme'
import DocumentPickerComponent from '../../components/pickers/DocumentPickerComponent';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { getErrorMessage } from '../utils/helpers/helpers'
import { RootState } from '../../redux/store/dev'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { VERIFY_DONOR } from '../utils/constants/routes'

const VerificationScreen = () => {

    const { authToken } = useSelector((state: RootState) => state.user);

    const navigation = useNavigation<any>();

    const fileUrl = "https://reuse.risidev.com/storage/app/public/reuse_agreement.docx";
    const [loading, setLoading] = useState<boolean>(false)

    const [uploadReuseAgreement, setUploadReuseAgreement] = useState<boolean>(false);
    const [reuseAgreementUrl, setReuseAgreementUrl] = useState<string>('');

    //community download
    const [uploadCommunityDocument, setUploadCommunityDocument] = useState<boolean>(false);
    const [communityDocumentUrl, setCommunityDocumentUrl] = useState<string>('');


    const [errors, setErrors] = useState<any>({});

    const rotation = useSharedValue(0);
    const ANGLE = 10;

    const errorStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: rotation.value,
                },
            ],
        };
    });

    function triggerErrorAnimation() {
        rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(ANGLE, { duration: 100 }), 4, true),
            withTiming(0, { duration: 50 }),
        );
    }

    /// grant permission in android
    const getDownloadPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'File Download Permission',
                    message: 'Your permission is required to save Files to your device',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
        } catch (err) {
            console.log('err', err);
        }
    };


    const downloadFile = async (url: string) => {
        setLoading(true)
        // Get the app's cache directory
        const { config, fs } = RNFetchBlob;
        const cacheDir = fs.dirs.DownloadDir;

        // Generate a unique filename for the downloaded image
        const filename = url.split('/').pop();
        const imagePath = `${cacheDir}/${filename}`;

        try {
            // Download the file and save it to the cache directory
            const configOptions = Platform.select({
                ios: {
                    fileCache: true,
                    path: imagePath,
                    appendExt: filename?.split('.').pop(),
                },
                android: {
                    fileCache: true,
                    path: imagePath,
                    appendExt: filename?.split('.').pop(),
                    addAndroidDownloads: {
                        // Related to the Android only
                        useDownloadManager: true,
                        notification: true,
                        path: imagePath,
                        description: 'File',
                    },
                },
            });

            const response = await RNFetchBlob.config(configOptions).fetch('GET', url);

            // Return the path to the downloaded file
            return response;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const tabBarHeight = useBottomTabBarHeight();


    const uploadDocuments = async () => {
        try {
            if (reuseAgreementUrl === '' || communityDocumentUrl === '') {
                return showMessage({
                    message: 'Error...',
                    description: 'Please select all documents',
                    type: 'info',
                    icon: 'info',
                    autoHide: true,
                    duration: 3000,
                })

            }
            else {
                setLoading(true);
                const headers = new Headers();
                headers.append('Accept', 'application/json');
                headers.append('Authorization', `Bearer ${authToken}`);
                const formData = new FormData();
                formData.append('reuse_agreement', reuseAgreementUrl);
                formData.append('community_document', communityDocumentUrl);
                const response = await fetch(`${VERIFY_COMMUNITY}`, {
                    method: 'POST',
                    headers,
                    body: formData
                });
                const result = await response.json();
                console.log(result);
                if (result?.response?.success) {
                    return navigation.navigate('MyWebView', {
                        url: result?.response?.message?.redirect_url
                    })
                }
                setLoading(false);
                return showMessage({
                    message: "Failed to Initiate Deposit",
                    description: "Please try again",
                    type: "info",
                    icon: "info",
                    duration: 3000,
                    autoHide: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log(reuseAgreementUrl);

    return (
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
            <ScrollView
                contentContainerStyle={{
                    margin: 20,
                    paddingBottom: tabBarHeight,
                }}
                keyboardShouldPersistTaps="always"
            >
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[{ fontSize: 20 }, generalStyles.textStyle]}>
                        Verify Your Account
                    </Text>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[generalStyles.textStyle]}>
                        Verify your account to use all the features of the application
                    </Text>
                </View>

                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[generalStyles.textStyle]}>1. Download and sign our reuse agreement:</Text>
                    <TouchableOpacity
                        style={[styles.btnStyle]}
                        onPress={() => {
                            if (Platform.OS === 'android') {
                                getDownloadPermissionAndroid().then(granted => {
                                    if (granted) {
                                        downloadFile(fileUrl).then(res => {
                                            setLoading(false)
                                            return showMessage({
                                                message: "Downloaded",
                                                description: "Reuse Agreement downloaded successfully",
                                                type: "success",
                                                icon: "success",
                                                duration: 3000,
                                                autoHide: true
                                            })


                                        }).catch((error) => {
                                            showMessage({
                                                message: "Failed to download",
                                                description: "Please try again",
                                                type: "info",
                                                icon: "info",
                                                duration: 3000,
                                                autoHide: true
                                            })
                                        });
                                    }
                                });
                            } else {
                                downloadFile(fileUrl).then(res => {
                                    setLoading(false)
                                    RNFetchBlob.ios.previewDocument(res?.path());
                                    return showMessage({
                                        message: "Downloaded",
                                        description: "Reuse Agreement downloaded successfully",
                                        type: "success",
                                        icon: "success",
                                        duration: 3000,
                                        autoHide: true
                                    })

                                }).catch((error) => {
                                    return showMessage({
                                        message: "Failed to download",
                                        description: "Please try again",
                                        type: "info",
                                        icon: "info",
                                        duration: 3000,
                                        autoHide: true
                                    })
                                });
                            }
                        }}>
                        <Text style={styles.textStyle}>Download</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Text style={[generalStyles.textStyle]}>
                        2. Upload any community document about your community:
                    </Text>
                </View>

                {/*  */}
                {loading && <ActivityIndicator />}


                {/* upload area */}
                {/* reuse signed document */}
                <>
                    {
                        reuseAgreementUrl ? (<View>
                            <View
                                style={[
                                    generalStyles.centerContent,
                                    styles.paddingStyles,
                                ]}>
                                <Text style={[generalStyles.textStyle,]}>
                                    Uploaded Document
                                </Text>
                            </View>
                        </View>) : (<View>
                            <View
                                style={[
                                    generalStyles.flexStyles,
                                    styles.containerStyles,
                                ]}>
                                <View
                                    style={[
                                        generalStyles.centerContent,
                                        styles.paddingStyles,
                                    ]}>
                                    <Text style={[generalStyles.textStyle]}>
                                        Reuse Agreement
                                    </Text>
                                </View>

                                <View style={[styles.paddingStyles]}>
                                    <AntDesign
                                        name="upload"
                                        size={30}
                                        color={COLORS.primaryOrangeHex}
                                        onPress={() => setUploadReuseAgreement(true)}
                                    />
                                </View>

                                <DocumentPickerComponent
                                    openPicker={uploadReuseAgreement}
                                    setOpenPicker={setUploadReuseAgreement}
                                    setMediaUrl={setReuseAgreementUrl}
                                    field="Reuse Agreement"
                                />
                            </View>

                            <Animated.Text style={[styles.errorColor, errorStyle]}>
                                {getErrorMessage(errors, 'reuse_agreement')}
                            </Animated.Text>
                        </View>)
                    }

                </>
                {/* reuse signed document */}

                {/* community document */}
                <>
                    {
                        communityDocumentUrl ? (<View>
                            <View
                                style={[
                                    generalStyles.centerContent,
                                    styles.paddingStyles,
                                ]}>
                                <Text style={[generalStyles.textStyle,]}>
                                    Uploaded Document
                                </Text>
                            </View>
                        </View>) : (
                            <View>
                                <View
                                    style={[
                                        generalStyles.flexStyles,
                                        styles.containerStyles,
                                    ]}>
                                    <View
                                        style={[
                                            generalStyles.centerContent,
                                            styles.paddingStyles,
                                        ]}>
                                        <Text style={[generalStyles.textStyle,]}>
                                            Community Document
                                        </Text>
                                    </View>

                                    <View style={[styles.paddingStyles]}>
                                        <AntDesign
                                            name="upload"
                                            size={30}
                                            color={COLORS.primaryOrangeHex}
                                            onPress={() => setUploadCommunityDocument(true)}
                                        />
                                    </View>

                                    <DocumentPickerComponent
                                        openPicker={uploadCommunityDocument}
                                        setOpenPicker={setUploadCommunityDocument}
                                        setMediaUrl={setCommunityDocumentUrl}
                                        field="Community Document"
                                    />
                                </View>

                                <Animated.Text style={[styles.errorColor, errorStyle]}>
                                    {getErrorMessage(errors, 'community_document')}
                                </Animated.Text>
                            </View>

                        )
                    }

                </>

                {/* community document */}

                {/* button */}
                <TouchableOpacity
                    activeOpacity={1}
                    style={generalStyles.loginContainer}
                    onPress={() => uploadDocuments()}>
                    <Text style={generalStyles.loginText}>{'Submit'}</Text>
                </TouchableOpacity>
                {/* button */}
                {/* button */}
                {/* upload area */}

            </ScrollView>

        </KeyboardAwareScrollView>
    )
}

export default VerificationScreen

const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        width: 150,
        height: 40,
    },
    textStyle: {
        color: 'white',
        fontSize: 14,
        paddingHorizontal: 25,
    },
    paddingStyles: { paddingBottom: 10 },
    errorColor: { color: '#EF4444', fontSize: 12, marginLeft: 40 },
    containerStyles: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 40,
        // marginVertical: 10,
        marginTop: 25,
        borderBottomColor: COLORS.primaryOrangeHex,
        borderBottomWidth: 2,
    },
});