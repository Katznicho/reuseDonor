import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImageCropPicker from 'react-native-image-crop-picker';
import { UploadImage } from '../../hooks/UploadImage';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { RootState } from '../../redux/store/dev';
import { USER_DOCUMENT_STORAGE } from '../../screens/utils/constants/constants';
import { COLORS } from '../../theme/theme';

type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
    setMediaUrl: (mediaUrl: string) => void;
    field: string;
};

export default function PhotoPicker({
    openPicker,
    setOpenPicker,
    setMediaUrl,
    field,
}: Props) {
    const refRBSheet = useRef<RBSheet>(null);

    const { user } = useSelector((state: RootState) => state.user);

    //
    useEffect(() => {
        if (openPicker) {
            refRBSheet.current?.open();
        } else {
            refRBSheet.current?.close();
        }
    }, [openPicker]);

    //
    // Select image from gallery
    const pickImageHandler = async () => {
        try {
            const imageDetails = await ImageCropPicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
            });

            setOpenPicker(false);

            showMessage({
                message: `Uploading ${field} `,
                description: 'Please wait...',
                type: 'success',
                icon: 'success',
                autoHide: true,
                duration: 3000,
            });

            const { image, error } = await UploadImage(
                user?.id,
                imageDetails.path,
                USER_DOCUMENT_STORAGE,
                false,
            );

            if (error) {
                return showMessage({
                    message: 'Error...',
                    description: 'An error occurred please try again',
                    type: 'danger',
                    icon: 'danger',
                    autoHide: true,
                    duration: 3000,
                });
            }

            if (image) {
                showMessage({
                    message: 'Success...',
                    description: `${field} uploaded successfully`,
                    type: 'success',
                    icon: 'success',
                    autoHide: true,
                    duration: 2000,
                });

                console.log(image);
                setMediaUrl(image);
            }
        } catch (err) {
            setOpenPicker(false);
            // setImage(null);
            showMessage({
                message: 'Error...',
                description: 'An error occurred please try again',
                type: 'danger',
                icon: 'danger',
                autoHide: true,
                duration: 3000,
            });
        }
    };

    //
    // Take photo with camera
    const takeImage = async () => {
        try {
            const imageDetails = await ImageCropPicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
            });

            setOpenPicker(false);

            showMessage({
                message: `Uploading ${field}..`,
                description: 'Please wait...',
                type: 'success',
                icon: 'success',
                autoHide: true,
                duration: 3000,
            });

            const { image, error } = await UploadImage(
                user?.id,
                imageDetails.path,
                USER_DOCUMENT_STORAGE,
                false,
            );

            if (error) {
                return showMessage({
                    message: 'Error...',
                    description: 'An error occurred please try again',
                    type: 'danger',
                    icon: 'danger',
                    autoHide: true,
                    duration: 3000,
                });
            }

            if (image) {
                showMessage({
                    message: 'Success...',
                    description: `${field} uploaded successfully`,
                    type: 'success',
                    icon: 'success',
                    autoHide: true,
                    duration: 2000,
                });

                console.log(image);
                setMediaUrl(image);
            }
        } catch (err) {
            setOpenPicker(false);
            // setImage(null);
            showMessage({
                message: 'Error...',
                description: 'An error occurred please try again',
                type: 'danger',
                icon: 'danger',
                autoHide: true,
                duration: 3000,
            });
        }
    };

    //
    //
    return (
        <RBSheet
            ref={refRBSheet}
            height={200}
            closeOnDragDown={false}
            closeOnPressMask={false}
            // openDuration={250}
            customStyles={{
                container: {
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    backgroundColor: COLORS.primaryBlackHex,
                },

                wrapper: {
                    backgroundColor: 'transparent',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
            }}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Choose option</Text>

                <View style={styles.optionsRow}>
                    <TouchableOpacity
                        activeOpacity={0.2}
                        onPress={pickImageHandler}>
                        <View style={styles.optionsCard}>
                            <MaterialIcons
                                name="photo-library"
                                color={COLORS.primaryWhiteHex}
                                size={30}
                            />
                            <Text style={{ color: COLORS.primaryWhiteHex }}>
                                Gallery
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.2} onPress={takeImage}>
                        <View style={styles.optionsCard}>
                            <Entypo
                                name={'camera'}
                                size={30}
                                color={COLORS.primaryWhiteHex}
                            />
                            <Text style={{ color: COLORS.primaryWhiteHex }}>
                                Camera
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    // underlayColor="#fff"
                    style={styles.btnCancel}
                    onPress={() => {
                        setOpenPicker(false);
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        marginHorizontal: '30%',
        // borderColor: 'red',
        // borderWidth: 1,
    },

    modalTitle: {
        color: COLORS.primaryWhiteHex,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    textStyle: {
        color: COLORS.primaryBlackHex,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    btnCancel: {
        backgroundColor: 'white',
        width: '70%',
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'center',
    },

    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    optionsCard: { alignItems: 'center' },
});
