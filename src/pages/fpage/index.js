// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useContext} from 'react';
import {Image, View, StyleSheet, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';

const appIcon = require('../../../assets/icons/app_logo.png');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Fpage = () => {
  const [animating, setAnimating] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      // navigation.navigate('Main');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={appIcon}
        resizeMode={'contain'}
        style={{
          height: 346,
          width: 361,
          bottom: screenHeight / 2,
          position: 'absolute',
          // padding: iconPadding,
        }}
      />
      <View style={styles.textBackground}>
        <Text style={styles.title}>Join us today</Text>
        <Text style={styles.text}>Enter your details to proceed further</Text>
        <Button
          style={{
            justifyContent: 'center',
            width: (screenWidth * 8) / 10,
            height: 57,
            marginTop: 51,
            borderRadius: 45,
            backgroundColor: '#F08080',
          }}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.b1_text}>Get Started</Text>
        </Button>
        <Button
          style={{
            justifyContent: 'center',
            width: (screenWidth * 8) / 10,
            height: 57,
            borderColor: '#F08080',
            borderWidth: 1,
            marginTop: 16,
            borderRadius: 45,
            backgroundColor: 'white',
          }}
          onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.b2_text}>Sign In</Text>
        </Button>
      </View>
    </View>
  );
};

export default Fpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
  },
  title: {
    color: 'black',
    fontSize: 32,
    fontFamily: 'OpenSans-Bold',
  },
  text: {
    paddingTop: 20,
    color: '#8F8E8F',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
  },
  b1_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b2_text: {
    color: '#F08080',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  textBackground: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 59,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: screenHeight / 2,
    bottom: 0,
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
});
