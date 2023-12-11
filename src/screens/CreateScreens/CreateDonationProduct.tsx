
import { SafeAreaView, Alert, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Wizard, WizardStepStates, } from 'react-native-ui-lib';
import { RootState } from '../../redux/store/dev';
import { useFirebase } from '../../hooks/useFirebase';
import { useSelector } from 'react-redux';
import { UploadImage } from '../../hooks/UploadImage';
import * as reactNativeFlashMessage from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import ProductDetails from './ProductDetails';
import ProductImages from './ProductImages';
import ProductLocation from './ProductLocation';
import { PRODUCT_STORAGE } from '../utils/constants/constants';
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';



interface State {
    activeIndex: number;
    completedStepIndex?: number;
    allTypesIndex: number;
    toastMessage?: string;
}



const CreateDonationProduct = () => {

    //product details
    const [showModal, setShowModal] = useState<boolean>(false);
    const [imagePath, setImagePath] = useState<any>(null);
    const { user } = useSelector((state: RootState) => state.user);
    const [uploadingImages, setUploadingImages] = useState<boolean>(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [communities, setCommunities] = useState<any[]>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const { createDonationProduct, getAllCategories, getAllCommunities } = useFirebase();


    const navigation = useNavigation<any>();

    useEffect(() => {
        getAllCategories().then((res) => {
            //create new array for the categories
            let categories: any = [];
            res.forEach((item: any) => {
                categories.push({
                    label: item.name,
                    value: item.id
                })
            })
            setCategories(categories);

        }).catch((err) => {
        })
    }, [])

    useEffect(() => {
        getAllCommunities()
            .then((res) => {
                let communities: any = [];
                res.forEach((item: any) => {
                    communities.push({
                        label: item.communityName,
                        value: item.id
                    })
                })
                setCommunities(communities);
            }).catch((err) => {

            })
    }, [])


    const [productDetials, setProductDetails] = useState<any>({
        title: "",
        description: "",
        category: "",
        quantity: 0,
        price: 0,
        images: [],
        coverImage: "",
        location: "",
        estimatedWeight: 0,
        pickupDate: "",
        isNegotiable: false,
        isFree: true,
        isDonation: true,
        isExchange: false,
        isDeliveryAvailable: false,
        isDeliveryFeeCovered: false,
        isPickupAvailable: false,
        isProductNew: false,
        isProductUsed: false,
        isProductAvailableForAll: false,
        isProductRefurbished: false,
        isProductDamaged: false,
        damageDescription: "",
        receiverCommunity: "",
        estimatedPickUp: "",
        status: "PENDING",
        isDeliverySet: false,
        paymentId: "",
        paymnetStatus: "",
        reason: "",
        totalAmount: ""

    });

    const [count, setCount] = useState<any>([
        {
            id: 1,
            showModal: false,
            imagePath: null,

        },
        {
            id: 2,
            showModal: false,
            imagePath: null
        },
        {
            id: 3,
            showModal: false,
            imagePath: null
        },
        {
            id: 4,
            showModal: false,
            imagePath: null
        },
    ])


    const uploadImagesAutomatically = useCallback(async () => {
        try {
            setUploadingImages(true);
            //first upload the cover image
            if (imagePath) {
                const { image, error } = await UploadImage(
                    user?.UID,
                    imagePath.imagePath,
                    PRODUCT_STORAGE
                );
                if (error) {
                    Alert.alert(`Error uploading image for cover image. Please try again.`);
                }
                if (image) {
                    // Update imagePath for the uploaded item
                    setProductDetails((prev: { coverImage: any; }) => {
                        return { ...prev, coverImage: image };
                    });
                }
            }
            //firs upload cover image
            const updatedCount = [...count];
            for (let index = 0; index < updatedCount.length; index++) {
                const item = updatedCount[index];
                if (item.imagePath) {
                    const { image, error } = await UploadImage(
                        user?.UID,
                        item.imagePath?.imagePath,
                        PRODUCT_STORAGE
                    );
                    if (error) {
                        Alert.alert(`Error uploading image for item ${item.id}. Please try again.`);
                    }
                    if (image) {

                        setProductDetails((prev: { images: any; }) => {
                            const updatedImages = [...prev.images];
                            updatedImages[index] = image; // Update image at the specific index
                            return { ...prev, images: updatedImages };
                        });

                    }
                }
            }
            setCount(updatedCount); // Update the state with the uploaded images

            setUploadingImages(false);
        } catch (error) {
            setUploadingImages(false);
        }
    }, [count, setCount]);

    //product details


    const [state, setState] = useState<State>({
        activeIndex: 0,
        completedStepIndex: undefined,
        allTypesIndex: 0,

    })
    const onActiveIndexChanged = (activeIndex: number) => {
        // Update the activeIndex in the state
        setState((prevState) => ({
            ...prevState,
            activeIndex,
        }));
    };



    const goToNextStep = () => {
        const { activeIndex: prevActiveIndex, completedStepIndex: prevCompletedStepIndex } = state;
        const reset = prevActiveIndex === 2;

        if (reset) {
        } else {
            const activeIndex = prevActiveIndex + 1;
            let completedStepIndex: number | undefined = prevCompletedStepIndex;

            if (!prevCompletedStepIndex || prevCompletedStepIndex < prevActiveIndex) {
                completedStepIndex = prevActiveIndex;
            }

            // Check if the activeIndex or completedStepIndex needs updating
            if (activeIndex !== prevActiveIndex || completedStepIndex !== prevCompletedStepIndex) {
                // Update the state to move to the next step
                setState((prevState) => ({
                    ...prevState,
                    activeIndex,
                    completedStepIndex,
                }));
            }
        }
    };


    const goBack = () => {
        const { activeIndex: prevActiveIndex } = state;
        const activeIndex = prevActiveIndex === 0 ? 0 : prevActiveIndex - 1;

        setState((prevState) => ({
            ...prevState,
            activeIndex,
        }));
    };



    const createProduct = async () => {
        try {
            setLoading(true);
            await createDonationProduct(user?.UID, productDetials);
            setLoading(false);
            reactNativeFlashMessage.showMessage({
                message: 'Product created successfully',
                type: 'success',
                icon: 'success',
            })
            //reset the product details
            setProductDetails({
                title: "",
                description: "",
                category: "",
                quantity: 0,
                price: 0,
                images: [],
                coverImage: "",
                location: "",
                reason: "",
                totalAmount: "",
                estimatedWeight: 0,
                pickupDate: "",
                isNegotiable: false,
                isFree: false,
                isDonation: true,
                isExchange: false,
                isDeliveryAvailable: false,
                isDeliveryFeeCovered: false,
                isPickupAvailable: false,
                isProductNew: false,
                isProductUsed: false,
                isProductAvailableForAll: false,
                isProductRefurbished: false,
                isProductDamaged: false,
                damageDescription: "",
                receiverCommunity: "",
                estimatedPickUp: ""
            })

            navigation.navigate("Reuse");

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     console.log(productDetials)
    // }, [productDetials])




    const renderCurrentStep = () => {
        switch (state.activeIndex) {
            case 0:
                return <ProductImages
                    imagePath={imagePath}
                    setImagePath={setImagePath}
                    count={count}
                    setShowModal={setShowModal}
                    setCount={setCount}
                    showModal={showModal}
                    uploadImagesAutomatically={uploadImagesAutomatically}
                    uploadingImages={uploadingImages}
                    goToNextStep={goToNextStep}
                />
            case 1:
                return <ProductDetails
                    productDetials={productDetials}
                    setProductDetails={setProductDetails}
                    categories={categories}
                    communities={communities}
                    goBack={goBack}
                    goToNextStep={goToNextStep}


                />

            case 2:
                return <ProductLocation
                    setProductDetails={setProductDetails}
                    goBack={goBack}
                    loading={loading}
                    createProduct={createProduct}
                />
            default:
                return null;
        }
    };

    const getStepState = (index: number) => {
        const { activeIndex, completedStepIndex } = state;
        let stepState = Wizard.States.DISABLED;

        if (completedStepIndex && completedStepIndex > index - 1) {
            stepState = Wizard.States.COMPLETED;
        } else if (activeIndex === index || completedStepIndex === index - 1) {
            stepState = Wizard.States.ENABLED;
        }

        return stepState;
    };





    return (
        <SafeAreaView style={[generalStyles.ScreenContainer]} >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    marginVertical: 10,
                    marginHorizontal: 5
                }}
                keyboardShouldPersistTaps="always"
            >
                {/* Wizard for your main steps */}
                <Wizard testID={'uilib.wizard'}
                    activeIndex={state.activeIndex} onActiveIndexChanged={onActiveIndexChanged}
                    containerStyle={{
                        marginHorizontal: 0,
                        marginVertical: 10,
                        borderRadius: 20,
                        backgroundColor: COLORS.primaryWhiteHex
                    }}
                    activeConfig={
                        {
                            color: COLORS.primaryWhiteHex,
                            state: WizardStepStates.ENABLED,
                            circleSize: 30,
                            circleBackgroundColor: COLORS.primaryBlackHex,
                            circleColor: COLORS.primaryBlackHex,


                        }

                    }

                >
                    <Wizard.Step
                        state={getStepState(0)}
                        label={'Image Upload'}
                        enabled={true}

                    />
                    <Wizard.Step state={getStepState(1)} label={'Product Information'} />
                    <Wizard.Step state={getStepState(2)} label={'Pick Up'} />
                </Wizard>

                {/* Render the current step */}
                {renderCurrentStep()}

            </ScrollView>





        </SafeAreaView>
    )
}

export default CreateDonationProduct

