import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';





const NotificationCard = ({
  // id,
  type,
  time,
  description,
}: any) => {




  return (
    <View style={[generalStyles.flexStyles, styles.containerStyles]}>
      <View>
        <View>
          <Text style={[styles.textColor, { fontWeight: 'bold' }]}>{type}</Text>
        </View>
        <View style={[generalStyles.resideViews, styles.textStyles]}>
          <Text>{description}</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.textColor]}> {time}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  containerStyles: {
    justifyContent: 'space-between',
    // alignItems:"center" ,
    marginHorizontal: 10,
    borderBottomColor:COLORS.primaryDarkGreyHex,
    borderWidth: 1,
    borderTopColor: COLORS.primaryDarkGreyHex,
    paddingVertical: 10,
  },
  textColor: {
    color: COLORS.primaryWhiteHex,
  },
  textStyles: {
    width: '80%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
