import { SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { ABOUTUS } from '../utils/constants/constants';
import { COLORS } from '../../theme/theme';
import TextComponent from '../../components/TextComponent';



const AboutUs = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor:COLORS.primaryBlackHex }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextComponent  text={ABOUTUS}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUs;
