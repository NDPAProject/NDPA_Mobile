// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useContext} from 'react';
import {Image, View, StyleSheet, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

const appIcon = require('../../../assets/icons/pwd_done.png');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Pwddone = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={appIcon}
        resizeMode={'contain'}
        style={{
          height: 180,
          width: 180,
          marginLeft: 30,
        }}
      />
      <Text style={styles.b1_text}>Well Done</Text>
      <Text style={styles.text}>
        You have successfully {'\n'} {'   '}change password.
      </Text>
      <Button
        style={{
          justifyContent: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          marginTop: 40,
          borderRadius: 45,
          backgroundColor: '#F08080',
        }}
        onPress={() => navigation.navigate('Signin')}>
        <Text style={styles.b3_text}>Log In</Text>
      </Button>
    </View>
  );
};

export default Pwddone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    color: '#8F8E8F',
    fontSize: 32,
    fontFamily: 'OpenSans-Bold',
  },
  text: {
    paddingTop: 20,
    color: '#8F8E8F',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
  b1_text: {
    color: '#F08080',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b2_text: {
    color: '#F08080',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-SemiBold',
  },
});
