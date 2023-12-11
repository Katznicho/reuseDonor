import { Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/theme';



const TextComponent = ({ text }: any) => {



    return (
        <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Text style={{ color: COLORS.primaryWhiteHex, fontSize: 16 }}>
                {text}
            </Text>
        </View>
    );
};

export default TextComponent;
