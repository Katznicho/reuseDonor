import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextField, Picker, Switch, DateTimePicker, NumberInput, NumberInputData } from 'react-native-ui-lib';
import { COLORS, FONTFAMILY } from '../../theme/theme';
import { generalStyles } from '../utils/generatStyles';
import TextArea from '../../components/TextArea';

const ProductDetails = ({ productDetials, setProductDetails, categories, communities, goBack, goToNextStep }: any) => {



    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                marginVertical: 10,
                marginHorizontal: 5
            }}
            keyboardShouldPersistTaps="always"
            style={{
                backgroundColor: COLORS.primaryBlackHex,
                paddingBottom: 100
            }}
        >

            <View
                style={styles.viewStyles}
            >
                <TextField
                    style={styles.fieldStyles}
                    placeholder={'enter product name'}
                    hint={"enter product name"}

                    labelStyle={styles.labelStyles}
                    label='Product Name'
                    labelColor={COLORS.primaryWhiteHex}
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    color={COLORS.primaryWhiteHex}

                    onChangeText={text =>
                        setProductDetails((prev: any) => {
                            return { ...prev, title: text }
                        })

                    }
                    enableErrors
                    validate={['required']}
                    validationMessage={['Product name is required']}
                    showCharCounter
                    maxLength={30}
                />

            </View>


            {/* category */}
            <View
                style={styles.viewStyles}
            >
                <Picker
                    style={styles.fieldStyles}
                    placeholder=" enter product category"
                    // floatingPlaceholder
                    label='Product Category'
                    labelColor={COLORS.primaryWhiteHex}
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    value={productDetials.category_id}
                    enableModalBlur={false}
                    onChange={item => {
                        setProductDetails((prev: any) => {
                            return { ...prev, category_id: item }
                        })

                    }}
                    labelStyle={styles.labelStyles}
                    color={COLORS.primaryWhiteHex}
                    topBarProps={{ title: 'Product Categories' }}

                    showSearch
                    searchPlaceholder={'Search a product category'}
                    searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
                // onSearchChange={value => console.warn('value', value)}
                >
                    {categories.map((item: any) => (
                        <Picker.Item key={item.id}
                            value={item.id}
                            label={item.name}
                        />
                    ))}
                </Picker>
            </View>
            {/* category */}

            {/* switches  */}

            {/* free product */}
            <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>

                <Switch
                    width={80}
                    height={45}
                    thumbSize={30}
                    thumbColor={COLORS.primaryBlackHex}
                    value={productDetials.isFree}
                    onValueChange={
                        () => {
                            setProductDetails((prev: { isFree: any; }) => {
                                return { ...prev, isFree: !prev.isFree }
                            })
                        }
                    }
                    onColor={COLORS.primaryOrangeHex}

                />
                <Text style={[{ marginHorizontal: 10 }, styles.labelStyles]}>Is Product free of Charge  ?</Text>
            </View>

            {/* free product */}

            {
                !productDetials.isFree && (<View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>

                    <Switch
                        width={80}
                        height={45}
                        thumbSize={30}
                        thumbColor={COLORS.primaryBlackHex}
                        value={productDetials.isDeliveryFeeCovered}
                        onValueChange={
                            () => {
                                setProductDetails((prev: { isDeliveryFeeCovered: any; }) => {
                                    return { ...prev, isDeliveryFeeCovered: !prev.isDeliveryFeeCovered }
                                })
                            }
                        }
                        onColor={COLORS.primaryOrangeHex}
                    />
                    <Text style={[{ marginHorizontal: 10 }, styles.labelStyles]}>Is  Delivery Fee  Covered    ?</Text>
                </View>)
            }


            {/* for all */}
            <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
                <Switch
                    width={80}
                    height={45}
                    thumbSize={30}
                    thumbColor={COLORS.primaryBlackHex}
                    value={productDetials.isProductAvailableForAll}
                    onValueChange={
                        () => {
                            setProductDetails((prev: { isProductAvailableForAll: any; }) => {
                                return { ...prev, isProductAvailableForAll: !prev.isProductAvailableForAll }
                            })
                        }
                    }
                    onColor={COLORS.primaryOrangeHex}
                />
                <Text style={[{ marginHorizontal: 10 }, styles.labelStyles]}>Is Product Available For All ?</Text>
            </View>
            {/* for all */}

            {/* product new */}
            <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
                <Switch
                    width={80}
                    height={45}
                    thumbSize={30}
                    thumbColor={COLORS.primaryBlackHex}
                    value={productDetials.isProductNew}
                    onValueChange={
                        () => {
                            setProductDetails((prev: { isProductNew: any; }) => {
                                return { ...prev, isProductNew: !prev.isProductNew }
                            })
                        }
                    }
                    onColor={COLORS.primaryOrangeHex}
                />
                <Text style={[{ marginHorizontal: 10 }, styles.labelStyles]}>Is the Created Product New ?</Text>
            </View>
            {/* product new */}

            {/* damages */}
            <View style={[generalStyles.flexStyles, { alignItems: "center", justifyContent: "center", marginVertical: 10 }]}>
                <Switch
                    width={80}
                    height={45}
                    thumbSize={30}
                    thumbColor={COLORS.primaryBlackHex}
                    value={productDetials.isProductDamaged}
                    onValueChange={
                        () => {
                            setProductDetails((prev: { isProductDamaged: any; }) => {
                                return { ...prev, isProductDamaged: !prev.isProductDamaged }
                            })
                        }
                    }
                    onColor={COLORS.primaryBlackHex}
                />
                <Text style={[{ marginHorizontal: 10 }, styles.labelStyles]}> Product has any damages ?</Text>
            </View>
            {/* damages */}

            {/* switches */}

            <View>
                {
                    productDetials.isProductDamaged && (
                        <TextArea
                            placeholder="Tell us about the damage"
                            text={productDetials.damageDescription}
                            setText={(text: any) => {
                                setProductDetails((prev: any) => {
                                    return { ...prev, damageDescription: text }
                                })
                            }
                            }
                        />
                    )

                }
            </View>

            {/* product price  */}
            {
                !productDetials.isFree && (
                    <View style={styles.viewStyles}>
                        <NumberInput

                            leadingText={"shs"}
                            leadingTextStyle={{
                                fontSize: 30,
                                color: COLORS.primaryWhiteHex,
                                marginRight: 10

                            }}
                            textFieldProps={{
                                label: "Price",
                                labelColor: COLORS.primaryWhiteHex,
                                //style: styles.fieldStyles,
                                color: COLORS.primaryWhiteHex


                            }}
                            // fractionDigits={2}
                            // initialNumber={productDetials.price}
                            onChangeNumber={(data: any) => {
                                setProductDetails((prev: any) => {
                                    return { ...prev, price: data.number }
                                })

                            }}
                            containerStyle={styles.fieldStyles}

                        />

                    </View>
                )
            }
            {/* product price */}

            {/* community */}
            {
                !productDetials.isProductAvailableForAll && (<View
                    style={styles.viewStyles}
                >
                    <Picker
                        style={styles.fieldStyles}
                        placeholder="enter reuse community "
                        label='Community'
                        labelColor={COLORS.primaryWhiteHex}
                        labelStyle={styles.labelStyles}

                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        value={productDetials.community_id}
                        enableModalBlur={false}
                        onChange={item => {
                            setProductDetails((prev: any) => {
                                return { ...prev, community_id: item }
                            })
                        }}
                        color={COLORS.primaryWhiteHex}
                        topBarProps={{ title: 'Available Communities' }}

                        showSearch
                        searchPlaceholder={'Search for a community'}
                        searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}

                    >
                        {communities.map((item: any) => (
                            <Picker.Item key={item.id}
                                value={item.id}
                                label={item.name}
                            //   disabled={option.disabled}
                            />
                        ))}
                    </Picker>
                </View>)

            }


            {/* community */}

            {/* estimated weight */}
            <View
                style={styles.viewStyles}
            >
                <TextField
                    style={styles.fieldStyles}
                    placeholder={'enter estimated weight in(kgs)'}
                    hint={"enter estimated  weight"}

                    labelStyle={styles.labelStyles}
                    label='Estimated Weight(kgs)'
                    labelColor={COLORS.primaryWhiteHex}
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    color={COLORS.primaryWhiteHex}

                    onChangeText={text =>
                        setProductDetails((prev: any) => {
                            return { ...prev, estimatedWeight: text }
                        })

                    }
                    enableErrors
                    validate={['required']}
                    validationMessage={['Estimated  weight name is required']}
                    showCharCounter
                    keyboardType='number-pad'
                    maxLength={30}
                />

            </View>

            {/* estimated weight */}

            {/* estimated pick up date */}
            <View style={styles.viewStyles}>

                <TextField
                    style={styles.fieldStyles}
                    placeholder={'format dd/mm/yyyy'}
                    hint={"pick up date format dd/mm/yyyy"}

                    labelStyle={styles.labelStyles}
                    label='Estimated Pick Up Date'
                    labelColor={COLORS.primaryWhiteHex}
                    placeholderTextColor={COLORS.primaryLightGreyHex}
                    color={COLORS.primaryWhiteHex}

                    onChangeText={text =>
                        setProductDetails((prev: any) => {
                            return { ...prev, estimatedPickUpDate: text }
                        })

                    }
                    enableErrors
                    validate={['required']}
                    validationMessage={['Estimated  weight name is required']}
                    showCharCounter
                    maxLength={30}
                />
            </View>

            {/* estimated pick up  date*/}

            <View>
                <View>
                    <Text style={[styles.labelStyles, { marginHorizontal: 20 }]}>
                        Product Description</Text>
                </View>
                <TextArea
                    placeholder="Tell us about your product"
                    text={productDetials.description}
                    setText={(text: any) => {
                        setProductDetails((prev: any) => {
                            return { ...prev, description: text }
                        })
                    }
                    }
                />
            </View>

            <View style={styles.buttonStyles}>

                <TouchableOpacity
                    style={[generalStyles.loginContainer,
                    {
                        width: "50%",
                        marginHorizontal: 10
                    }
                    ]}
                    onPress={goBack}

                >
                    <Text style={generalStyles.loginText}>{'Prev'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[generalStyles.loginContainer, {
                        width: "30%",
                        marginHorizontal: 10
                    }]}
                    onPress={goToNextStep}
                    disabled={
                        productDetials.title === '' || productDetials.description === ''
                    }
                >
                    <Text style={generalStyles.loginText}>{'Next'}</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>

    )
}

export default ProductDetails

const styles = StyleSheet.create({


    buttonStyles: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginHorizontal: 20
    },
    buttonSpaceStyles: {
        marginHorizontal: 10
    },

    fieldStyles: {
        borderBottomColor: COLORS.primaryWhiteHex,
        borderBottomWidth: 2,
        // height: 45
        fontSize: 15,
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex
    },
    labelStyles: {
        color: COLORS.primaryWhiteHex,
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 15
    },
    viewStyles: {
        marginHorizontal: 20,
        marginVertical: 10,
        height: 80
    }
})