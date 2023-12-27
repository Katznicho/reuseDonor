import { SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { COLORS } from '../../theme/theme';
import TextComponent from '../../components/TextComponent';
import { PRIVACYPOLICY } from '../utils/constants/constants';
import { generalStyles } from '../utils/generatStyles';



const PrivatePolicy = () => {


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={generalStyles.scrollViewContentPadding}>
        <TextComponent text={PRIVACYPOLICY} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivatePolicy;
