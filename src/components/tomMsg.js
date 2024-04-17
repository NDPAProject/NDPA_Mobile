import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';

const message = require('../../assets/icons/message.png');
const turtle_ico = require('../../assets/icons/turtle_ico.png');
const sound_ico = require('../../assets/icons/charm_sound-up.png');

const screenWidth = Dimensions.get('window').width;

const MessageTom = ({children, type}) => (
  <>
    <View style={styles.imageContainer}>
      <Image source={message} />
      <Text style={styles.title}>{children}</Text>
    </View>
    <View
      style={{
        flexDirection: 'row',
        gap: 9,
        position: 'absolute',
        top: 205,
        right: screenWidth / 20,
      }}>
      {type && (
        <>
          <Image source={sound_ico} />
          <Image source={turtle_ico} />
        </>
      )}
    </View>
  </>
);

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    right: screenWidth / 20,
    top: 130,
    alignItems: 'center',
    zIndex: 1000,
  },

  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -75,
    left: 10,
    // textAlign: 'left',
  },
});

export default MessageTom;
