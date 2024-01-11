import { View, TouchableOpacity, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/dev';
import UploadComponent from './UploadComponent';
import { updateProfilePicture } from '../redux/store/slices/UserSlice';
import { UploadImage } from '../hooks/UploadImage';
import { DEFAULT_USER_PROFILE, PROFILE_STORAGE } from '../screens/utils/constants/constants';
import { generalStyles } from '../screens/utils/generatStyles';
import { COLORS } from '../theme/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { UPDATEUSERAVATAR } from '../screens/utils/constants/routes';

const HeadProfileCard = () => {


    const { user, isLoggedIn, authToken } = useSelector((state: RootState) => state.user);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [imagePath, setImagePath] = useState<any>(null);



    const dispatch = useDispatch<AppDispatch>();

    const handleUpload = async () => {
        try {
            const { error, image } = await UploadImage(
                user?.UID,
                imagePath.imagePath,
                PROFILE_STORAGE,
                true
            );
            if (error) {
                Alert.alert('Something went wrong please try aagin');
            }
            if (image) {

                const headers = new Headers();
                headers.append('Accept', 'application/json');
                headers.append('Authorization', `Bearer ${authToken}`);
                const body = new FormData();
                body.append('avatar', image);
                fetch(`${UPDATEUSERAVATAR}`, {
                    method: 'POST',
                    headers,
                    body
                }).then(response => response.json())
                    .then(async result => {
                        console.log('result image update', result)
                        console.log(result)
                        if (result.response === 'failure') {
                            showMessage({
                                message: 'Something went wrong please try again',
                                type: 'danger',
                                icon: 'danger',
                                duration: 3000,
                                floating: true,
                            });
                        }
                        else {
                            dispatch(updateProfilePicture(image));
                            showMessage({
                                message: 'Profile picture updated successfully',
                                type: 'success',
                                icon: 'success',
                                duration: 3000,
                                floating: true,
                            });
                        }

                        setImagePath(null);
                    }).catch(error => {
                        showMessage({
                            message: 'Something went wrong please try again',
                            type: 'danger',
                            icon: 'danger',
                            duration: 3000,
                            floating: true,
                        });
                    })
            }
        } catch (error: any) {
            showMessage({
                message: error.response.data.message,
                description: error.response.data.error,
                type: 'danger',
                icon: 'danger',
                duration: 3000,
                floating: true,
            });
        }
    };

    useEffect(() => {

    }, [imagePath]);

    return (
        <View style={[generalStyles.flexStyles]}>
            <TouchableOpacity
                style={[{ marginHorizontal: 20, marginVertical: 10 }]}
                onPress={() => {
                    if (isLoggedIn) {
                        setShowModal(!showModal);
                    }
                }}
            >
                {imagePath ? (
                    <View>
                        <Image
                            style={{ width: 80, height: 80, borderRadius: 40 }}
                            source={{
                                uri: `${imagePath.imagePath}`,
                            }}
                        />
                        <View
                            style={[generalStyles.absoluteStyles, { bottom: -6, right: -15 }]}
                        >


                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLORS.primaryOrangeHex,
                                    width: 40,
                                    height: 40,
                                    borderRadius: 35,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={handleUpload}>
                                <AntDesign
                                    name="upload"
                                    color={COLORS.primaryWhiteHex}
                                    size={25}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                ) : (
                    <Image
                        style={{ width: 80, height: 80, borderRadius: 40 }}
                        source={{
                            uri: `${user?.displayPicture || DEFAULT_USER_PROFILE
                                }
            `,
                        }}
                    />
                )}
            </TouchableOpacity>



            {/* modal section */}
            {showModal && (
                <UploadComponent
                    image={imagePath}
                    setImage={setImagePath}
                    setModal={setShowModal}
                    showModal={showModal}
                    selectDocument={false}
                />
            )}

            {/* modal section */}
        </View>
    );
};

export default HeadProfileCard;


