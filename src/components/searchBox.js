import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const hand_ico = require('../../assets/icons/hand_ico.png');
const screenWidth = Dimensions.get('window').width;

const SearchBox = ({
  showHand,
  handleInput,
  text,
  handleSend,
  messageIcon,
  handleChangeText,
  bottom,
}) => {
  console.log('--------SearchBox----------------', showHand, text);
  return (
    <>
      <View style={[styles.chatBackground, {top: bottom}]}>
        <TextInput
          style={[styles.input]}
          placeholder=" Search"
          placeholderTextColor="#969596"
          value={text}
          onFocus={handleInput}
          onChangeText={handleChangeText}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 27.5,
            left: 30,
          }}
          onPress={text.length !== 0 ? handleSend : undefined}>
          <Image source={messageIcon} style={{width: 24, height: 24}} />
          {showHand && (
            <Image
              animationType="slide"
              source={hand_ico}
              style={{
                position: 'absolute',
                bottom: -50,
                right: screenWidth / 3,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  chatBackground: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 59,
    width: screenWidth,
    height: 135,
    position: 'absolute',
  },

  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    width: (screenWidth * 9) / 10,
    marginTop: -40,
    padding: 1,
    paddingLeft: 30,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
  },
});

export default SearchBox;
