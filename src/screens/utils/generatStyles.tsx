import { Dimensions, StyleSheet } from "react-native";
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../../theme/theme";

export const generalStyles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryWhiteHex,
    alignItems: 'center',
  },
  flexStyles: {
    display: 'flex',
    flexDirection: 'row',
  },
  absoluteStyles: {
    position: 'absolute',
    zIndex: 20,
  },
  resideViews: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    margin: 2,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomHairline: {
    borderBottomColor: COLORS.primaryWhiteHex,
    borderBottomWidth: 3,
    marginRight: 10,
    marginLeft: 20,
    width: 100,
  },
  authTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: COLORS.primaryOrangeHex,
    marginTop: 25,
    marginBottom: 10,
    alignSelf: 'stretch',
    textAlign: 'left',
    marginLeft: 30,
  },
  errorText: {
    color: COLORS.primaryRedHex,
    fontSize: 14,
    marginBottom: 5,
  },
  InputContainer: {
    height: 42,
    borderWidth: 1,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryDarkGreyHex,
    paddingLeft: 10,
    color: COLORS.primaryWhiteHex,
    width: '80%',
    alignSelf: 'center',
    marginVertical: 10,
    alignItems: 'center',
    elevation: 5,

    textAlign: "center"
  },
  loginContainer: {
    width: '70%',
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 25,
    padding: 10,
    marginTop: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  
  loginText: {
    color: '#ffffff',
  },

});