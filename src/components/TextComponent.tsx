import { Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY } from '../theme/theme';



const TextComponent = ({ text }: any) => {



    return (
        <View style={{ marginHorizontal: 20 }}>
            <Text style={{ color: COLORS.primaryWhiteHex, fontSize: 16, fontFamily: FONTFAMILY.poppins_light, }}>
                {text}
            </Text>
        </View>
    );
};

export default TextComponent;
