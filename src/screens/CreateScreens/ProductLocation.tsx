import { KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextField } from 'react-native-ui-lib';
import { generalStyles } from '../utils/generatStyles';
import { COLORS, FONTFAMILY } from '../../theme/theme';



const ProductLocation = ({ setProductDetails, goBack, loading, createProduct, productDetials }: any) => {



    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                marginVertical: 10,
                marginHorizontal: 20
            }}
            keyboardShouldPersistTaps="always"

        >

            <View >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1, width: '100%' }}

                >
                    <View>
                        {/* user location */}
                        <TextField
                            style={styles.fieldStyles}
                            placeholder={'enter product location'}
                            hint={"enter product location"}
                            labelStyle={styles.labelStyles}
                            label='Product Location'
                            labelColor={COLORS.primaryWhiteHex}
                            placeholderTextColor={COLORS.secondaryLightGreyHex}
                            color={COLORS.primaryWhiteHex}

                            onChangeText={text =>
                                setProductDetails((prev: any) => {
                                    return { ...prev, estimatedPickUp: text }
                                })

                            }
                            enableErrors
                            validate={['required']}
                            validationMessage={['Product location is required']}
                            showCharCounter
                            maxLength={30}
                        />


                        <View style={styles.buttonStyles}>

                            <TouchableOpacity
                                style={[generalStyles.loginContainer, {
                                    width: "50%",
                                    marginHorizontal: 10
                                }]}
                                onPress={goBack}

                            >
                                <Text style={generalStyles.loginText}>{'Prev'}</Text>
                            </TouchableOpacity>

                            {/* button */}

                            <TouchableOpacity
                                style={[generalStyles.loginContainer, {
                                    width: "50%",
                                    marginHorizontal: 10
                                }]}
                                onPress={createProduct}
                                disabled={loading || productDetials.estimatedPickUp == ""}
                            >
                                <Text style={generalStyles.loginText}>
                                    {loading ? "Creating ..." : "Create Product"}
                                </Text>
                            </TouchableOpacity>
                            {/* button */}

                        </View>



                    </View>

                </KeyboardAvoidingView>
            </View>

        </ScrollView>
    )
}

export default ProductLocation

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

})