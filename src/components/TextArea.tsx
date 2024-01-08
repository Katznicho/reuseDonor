import { StyleSheet, View, TextInput } from 'react-native';
import React from 'react'
import { COLORS } from '../theme/theme';



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TextArea = ({ placeholder, text, setText }: any) => {

  return (
    <View style={[styles.textareaContainer]}>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={4}
        placeholder={placeholder}
        placeholderTextColor={COLORS.primaryLightGreyHex}
        value={text}
        onChangeText={setText}
      />
    </View>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  textareaContainer: {
    height: 200,
    width: '88%',
    padding: 5,
    backgroundColor: COLORS.primaryBlackHex,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primaryGreyHex,
  },
  textInput: {
    height: 150,
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: COLORS.primaryWhiteHex,

  },
});
