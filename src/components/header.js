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

const Header = props => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    console.log('clicked');
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.textBackground}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={arrow} />
          <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Introducing yourself</Text>
        <View style={{flexDirection: 'row'}}>{''}</View>
      </View>
      <ProgressBar
        progress={0.3}
        color="#F08080"
        width={(screenWidth * 9) / 10}
        style={{marginTop: 20}}
      />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  textBackground: {
    flexDirection: 'row',
    backgroundColor: '#FFFBF8',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    width: (screenWidth * 9) / 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    marginTop: 0.7,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 16,
    color: '#F08080',
  },
});
