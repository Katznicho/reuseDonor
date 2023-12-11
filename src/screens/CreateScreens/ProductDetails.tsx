import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TextField, Picker, Switch, DateTimePicker, NumberInput, NumberInputData } from 'react-native-ui-lib';
import { COLORS } from '../../theme/theme';
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
                    labelStyle={{
                        marginHorizontal: 10
                    }}
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
                    value={productDetials.category}
                    enableModalBlur={false}
                    onChange={item => {
                        setProductDetails((prev: any) => {
                            return { ...prev, category: item }
                        })

                    }}
                    color={COLORS.primaryWhiteHex}
                    topBarProps={{ title: 'Product Categories' }}

                    showSearch
                    searchPlaceholder={'Search a product category'}
                    searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}
                // onSearchChange={value => console.warn('value', value)}
                >
                    {categories.map((item: any) => (
                        <Picker.Item key={item.value}
                            value={item.value}
                            label={item.label}
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
                <Text style={{ marginHorizontal: 10 }}>Is Product free of Charge  ?</Text>
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
                    <Text style={{ marginHorizontal: 10 }}>Is  Delivery Fee  Covered    ?</Text>
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
                <Text style={{ marginHorizontal: 10 }}>Is Product Available For All ?</Text>
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
                <Text style={{ marginHorizontal: 10 }}>Is the Created Product New ?</Text>
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
                <Text style={{ marginHorizontal: 10 }}> Product has any damages ?</Text>
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
                            onChangeNumber={(data: NumberInputData) => {
                                setProductDetails((prev: any) => {
                                    return { ...prev, price: data }
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
                        placeholder="enter community "
                        // floatingPlaceholder
                        label='Community'
                        labelColor={COLORS.primaryWhiteHex}

                        placeholderTextColor={COLORS.primaryLightGreyHex}
                        value={productDetials.receiverCommunity}
                        enableModalBlur={false}
                        onChange={item => {
                            setProductDetails((prev: any) => {
                                return { ...prev, receiverCommunity: item }
                            })
                        }}
                        color={COLORS.primaryWhiteHex}
                        topBarProps={{ title: 'Available Communities' }}

                        showSearch
                        searchPlaceholder={'Search for a community'}
                        searchStyle={{ color: COLORS.primaryBlackHex, placeholderTextColor: COLORS.primaryLightGreyHex }}

                    >
                        {communities.map((item: any) => (
                            <Picker.Item key={item.value}
                                value={item.value}
                                label={item.label}
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
                    labelStyle={{
                        marginHorizontal: 10
                    }}
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
                    labelStyle={{
                        marginHorizontal: 10
                    }}
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
    },
    viewStyles: {
        marginHorizontal: 20,
        marginVertical: 10,
        height: 80
    }
})