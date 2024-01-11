
import { SafeAreaView, Alert, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAwareScrollView, Wizard, WizardStepStates, } from 'react-native-ui-lib';
import { RootState } from '../../redux/store/dev';
import { useSelector } from 'react-redux';
import { UploadImage } from '../../hooks/UploadImage';
import { useNavigation } from '@react-navigation/native';
import ProductDetails from './ProductDetails';
import ProductImages from './ProductImages';
import ProductLocation from './ProductLocation';
import { PRODUCT_STORAGE } from '../utils/constants/constants';
import { COLORS } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';
import { CREATE_PRODUCT, GET_ALL_CATEGORIES, GET_ALL_COMMUNITIES } from '../utils/constants/routes';
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from '../../components/ActivityIndicator';



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
    const { user, authToken } = useSelector((state: RootState) => state.user);
    const [uploadingImages, setUploadingImages] = useState<boolean>(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [communities, setCommunities] = useState<any[]>([]);

    const [errors, setErrors] = useState<any>({});

    const [loading, setLoading] = useState<boolean>(false);



    const navigation = useNavigation<any>();

    useEffect(() => {

        fetch(GET_ALL_CATEGORIES, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {

            res.json().then((data) => {

                setCategories(data.data);
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })

        fetch(GET_ALL_COMMUNITIES, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {

            res.json().then((data) => {

                setCommunities(data?.data);
            })
        }).catch((err) => {
            console.log(err)
        })
    }, [])



    const [productDetials, setProductDetails] = useState<any>({
        title: "",
        community_id: "",
        description: "",
        category_id: "",
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
        isDeliveryAvailable: false,
        isDeliveryFeeCovered: false,
        isPickupAvailable: false,
        isProductNew: false,
        isProductUsed: false,
        isProductAvailableForAll: false,
        isProductRefurbished: false,
        isProductDamaged: false,
        damageDescription: "",
        estimatedPickUp: "",
        isDeliverySet: false,


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
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Authorization', `Bearer ${authToken}`);

            const body = new FormData();
            body.append('name', productDetials.title);
            body.append('community_id', productDetials.community_id ? productDetials.community_id : "");
            body.append('description', productDetials.description);
            body.append('category_id', productDetials.category_id);
            body.append('price', productDetials.price);
            body.append('cover_image', productDetials.coverImage);
            productDetials.images.forEach((image: any) => {
                body.append("images[]", image);
            })
            body.append('is_delivery_available', productDetials.isDeliveryAvailable ? 1 : 0);
            body.append('is_pickup_available', productDetials.isPickupAvailable ? 1 : 0);
            body.append('is_free', productDetials.isFree ? 1 : 0);
            body.append("is_product_new", productDetials.isProductNew ? 1 : 0);
            body.append("is_product_damaged", productDetials.isProductDamaged ? 1 : 0);
            body.append("is_product_available_for_all", productDetials.isProductAvailableForAll ? 1 : 0);
            body.append("damage_description", productDetials.damageDescription);
            body.append("weight", productDetials.estimatedWeight);
            body.append("pick_up_location", productDetials.estimatedPickUp);
            body.append("pickup_date", productDetials.pickupDate);
            body.append("is_donation", productDetials.isDonation ? 1 : 0);

            fetch(`${CREATE_PRODUCT}`, {
                method: 'POST',
                headers,
                body,
            }).then(response => response.json())
                .then(async result => {
                    console.log("===================result=====================")
                    console.log(result)
                    console.log("===================result=====================")
                    setLoading(false)
                    if (result?.errors) {
                        showMessage({
                            message: 'Failed to create product',
                            type: 'info',
                            icon: 'info',
                        })
                        return setErrors(result.errors);

                    }
                    if (result.success === false) {
                        setErrors({
                            // email: [result?.message],
                            password: [result?.message],
                        });
                        return showMessage({
                            message: "Failed to create product",
                            description: "Something went wrong. Please try again.",
                            type: "info",
                            autoHide: true,
                            duration: 3000,
                            icon: "danger"
                        })

                    }
                    if (result.success === true) {
                        //reset the product details
                        setProductDetails({
                            title: "",
                            community_id: "",
                            description: "",
                            category_id: "",
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
                        showMessage({
                            message: "Product Created",
                            description: "Product created successfully.",
                            type: "info",
                            autoHide: true,
                            duration: 3000,
                            icon: "success"
                        })
                        //refresh this screen

                        return navigation.navigate("Reuse")
                    }



                }).catch((error) => {
                    setLoading(false)
                    return showMessage({
                        message: "Failed to create product",
                        description: "Something went wrong. Please try again.",
                        type: "info",
                        autoHide: true,
                        duration: 3000,
                        icon: "danger"
                    })

                })


        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }




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
                    productDetials={productDetials}
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
        <KeyboardAwareScrollView
            style={[{ flex: 1, width: '100%' }, generalStyles.ScreenContainer]}
            keyboardShouldPersistTaps="always"
        >
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
                {loading && <ActivityIndicator />}

            </ScrollView>


        </KeyboardAwareScrollView>
    )
}

export default CreateDonationProduct

