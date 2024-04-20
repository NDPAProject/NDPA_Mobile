import 'react-native-gesture-handler';

// Import React and useState hook
import React, {useState} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const arrow = require('../../assets/icons/left_ico.png');

const Header = ({visible, text, color, editalbe, setEdit}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    console.log('clicked');
    navigation.goBack();
  };

  const handleEditable = () => {
    setEdit(prev => !prev);
  };

  return (
    <>
      <View style={[styles.textBackground, {backgroundColor: color}]}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 2,
          }}>
          <Image source={arrow} />
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{text}</Text>
        {editalbe && (
          <TouchableOpacity style={styles.startButton} onPress={handleEditable}>
            <Text style={styles.b3_text}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      {visible && (
        <ProgressBar
          progress={0.3}
          color="#F08080"
          width={(screenWidth * 9) / 10}
          style={{marginTop: 20}}
        />
      )}
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  textBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    width: (screenWidth * 9) / 10,
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    fontSize: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    color: 'black',
    zIndex: 1,
    pointerEvents: 'none',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    marginTop: 0.7,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 16,
    color: '#F08080',
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 30,
    borderRadius: 45,
    backgroundColor: '#F08080',
    marginLeft: (screenWidth * 9) / 10 - 120,
    zIndex: 2,
  },
  b3_text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
});
