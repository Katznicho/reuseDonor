import { SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { ABOUTUS } from '../utils/constants/constants';
import { COLORS } from '../../theme/theme';
import TextComponent from '../../components/TextComponent';
import { generalStyles } from '../utils/generatStyles';



const AboutUs = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={generalStyles.scrollViewContentPadding}>
        <TextComponent text={ABOUTUS} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
