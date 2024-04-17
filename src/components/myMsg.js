import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';

const mechat = require('../../assets/icons/mechat.png');
const turtle_ico = require('../../assets/icons/turtle_ico.png');
const sound_ico = require('../../assets/icons/charm_sound-up.png');

const screenWidth = Dimensions.get('window').width;

const MyMessage = ({sendClick, text}) => (
  <>
    <View style={styles.me_imageContainer}>
      <Image source={mechat} />
      {sendClick ? (
        <>
          <Text style={styles.m_title}>Hi! My name is {text}.</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 9,
              position: 'absolute',
              top: 54,
              left: 0,
            }}>
            <Image source={sound_ico} />
            <Image source={turtle_ico} />
          </View>
        </>
      ) : (
        <Text style={styles.m_title}>Hi! My name is ____.</Text>
      )}
    </View>
  </>
);

const styles = StyleSheet.create({
  me_imageContainer: {
    position: 'absolute',
    left: screenWidth / 20,
    top: 320,
    alignItems: 'center',
  },

  m_title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -48,
    right: 10,
    // textAlign: 'left',
  },
});

export default MyMessage;
