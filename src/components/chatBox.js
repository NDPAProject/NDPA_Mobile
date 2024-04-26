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

const ChatBox = ({
  showHand,
  handleInput,
  text,
  handleSend,
  messageIcon,
  handleChangeText,
  bottom,
  mico,
}) => {
  console.log('--------ChatBox----------------', showHand, text);
  return (
    <>
      <View style={[styles.chatBackground, {bottom: bottom}]}>
        <TextInput
          style={[
            styles.input,
            {
              right: mico ? 20 : 0,
              width: mico ? (screenWidth * 8.5) / 10 : (screenWidth * 9) / 10,
            },
          ]}
          placeholder="Write here..."
          placeholderTextColor="#969596"
          value={text}
          onFocus={handleInput}
          onChangeText={handleChangeText}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 23, right: mico ? 55 : 25}}
          onPress={text?.length !== 0 ? handleSend : undefined}
          disabled={text?.length !== 0 ? false : true}>
          <Image source={messageIcon} />
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
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: 100,
    position: 'absolute',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    height: 40,

    marginTop: -40,
    padding: 1,
    paddingLeft: 30,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
  },
});

export default ChatBox;
