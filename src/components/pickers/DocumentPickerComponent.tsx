import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RBSheet from 'react-native-raw-bottom-sheet';
import { UploadImage } from '../../hooks/UploadImage';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import DocumentPicker from 'react-native-document-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { RootState } from '../../redux/store/dev';
import { COLORS } from '../../theme/theme';
import { USER_DOCUMENT_STORAGE } from '../../screens/utils/constants/constants';

type Props = {
    openPicker: boolean;
    setOpenPicker: (openPicker: boolean) => void;
    setMediaUrl: (mediaUrl: string) => void;
    field: string;
};

export default function DocumentPickerComponent({
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
    //
    const handleDocumentSelection = useCallback(async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
            });

            let path: any = res[0]?.fileCopyUri?.replace('file://', '');

            let document_details = {
                name: res[0].name,
                type: res[0].type,
                size: res[0].size,
                uri: res[0].uri,
                rnPdfPath: ReactNativeBlobUtil.wrap(path),
                pdfPath: path,
            };

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
                user?.UID,
                document_details.pdfPath,
                USER_DOCUMENT_STORAGE,
                true,
            );

            if (error) {
                console.log(error)
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

                // console.log(image);
                setMediaUrl(image);
            }
        } catch (err) {
            // setImage(null);
            setOpenPicker(false);
            console.log(err);

            // showMessage({
            //     message: '---Error...',
            //     description: 'An error occurred please try again',
            //     type: 'danger',
            //     icon: 'danger',
            //     autoHide: true,
            //     duration: 3000,
            // });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    backgroundColor: COLORS.primaryWhiteHex,
                },

                wrapper: {
                    backgroundColor: 'transparent',
                },
                draggableIcon: {
                    backgroundColor: '#000',
                },
            }}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Choose document</Text>

                <View>
                    <TouchableOpacity
                        activeOpacity={0.2}
                        onPress={handleDocumentSelection}>
                        <View style={styles.chooseStyles}>
                            <AntDesign
                                name={'addfile'}
                                size={30}
                                color={'#FFF'}
                            />

                            <Text style={{ color: COLORS.primaryBlackHex }}>
                                Choose File
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
        backgroundColor: COLORS.primaryWhiteHex,
        marginHorizontal: '30%',
        // borderColor: 'red',
        // borderWidth: 1,
    },

    modalTitle: {
        color: COLORS.primaryBlackHex,
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
        backgroundColor: COLORS.primaryRedHex,
        width: '70%',
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 20,
        alignSelf: 'center',
    },

    chooseStyles: { alignItems: 'center', marginTop: 10 },
});
