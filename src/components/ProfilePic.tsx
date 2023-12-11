import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { RootState } from '../redux/store/dev';
import { useSelector } from 'react-redux';
import { DEFAULT_USER_PROFILE } from '../screens/utils/constants/constants';

const ProfilePic = () => {

  const { user } = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.ImageContainer}>
      <Image
        source={{
          uri: `${user?.displayPicture || DEFAULT_USER_PROFILE}`
        }}
        style={styles.Image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: SPACING.space_36,
    width: SPACING.space_36,
    borderRadius: SPACING.space_12,
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  Image: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
});

export default ProfilePic;
