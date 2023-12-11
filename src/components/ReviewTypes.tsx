import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';



const ReviewTypes = ({ data, name }: any) => {
  const navigation = useNavigation<any>();


  return (
    <View style={[styles.containerStyle, generalStyles.flexStyles]}>
      {data.map(
        (
          detail: {
            name: string,
            screen: any;
          },
          index: number,
          array: string | any[],
        ) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabStyle,
              generalStyles.centerContent,
              {
                backgroundColor:
                  name === detail.name
                    ? COLORS.primaryOrangeHex
                    : COLORS.primaryGreyHex,
                marginLeft: index === 0 ? -5 : 10,
                marginRight: index === array.length - 1 ? -5 : 0,
                paddingHorizontal: index === array.length - 1 ? 5 : 0,
              },
            ]}
            onPress={() => navigation.navigate(detail.screen)}
          >
            <Text
              style={{
                color:
                  name === detail.name
                    ? COLORS.primaryWhiteHex
                    : COLORS.primaryWhiteHex,
                fontSize: 15,
                fontWeight: 'bold',
                paddingHorizontal: index === array.length - 1 ? 5 : 0,
              }}
            >
              {detail.name}
            </Text>
          </TouchableOpacity>
        ),
      )}
    </View>
  );
};

export default ReviewTypes;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 20,
    justifyContent: 'space-evenly',
  },
  tabStyle: {
    height: 40,
    width: 100,
    borderRadius: 20,
    overflow: 'hidden',
  },
});
