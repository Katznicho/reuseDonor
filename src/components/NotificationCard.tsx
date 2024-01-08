import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { generalStyles } from '../screens/utils/generatStyles';
import { formattedDate } from '../screens/utils/helpers/helpers';





const NotificationCard = ({
  // id,
  type,
  time,
  description,
}: any) => {

  console.log("description", time)


  return (
    <View style={[generalStyles.flexStyles, styles.containerStyles]}>
      <View>
        <View>
          <Text style={[styles.textColor, { fontFamily: FONTFAMILY.poppins_semibold }]}>{type}</Text>
        </View>
        <View style={[generalStyles.resideViews, styles.textStyles]}>
          <Text style={[{ fontFamily: FONTFAMILY.poppins_regular, color: COLORS.primaryWhiteHex }]}>{description}</Text>
        </View>
      </View>
      <View>
        <Text style={[styles.textColor]}> {formattedDate(time)}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  containerStyles: {
    justifyContent: 'space-between',
    alignItems: "center",
    // marginHorizontal: 10,
    borderBottomColor: COLORS.secondaryDarkGreyHex,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: COLORS.secondaryDarkGreyHex,
    paddingVertical: 10,
  },
  textColor: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: 12,
  },
  textStyles: {
    width: '70%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    color: COLORS.primaryWhiteHex,
  },
});
