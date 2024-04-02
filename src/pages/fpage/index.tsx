// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useContext} from 'react';
import {Image, View, StyleSheet, Text, Dimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
// import AsyncStorage from '@react-native-community/async-storage';

const appIcon = require('../../../assets/icons/app_logo.png');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Fpage: React.FC<{navigation: any}> = () => {
  const [iconPadding, setIconPadding] = useState(0);
  const [animating, setAnimating] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.navigate('Main');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={appIcon}
        resizeMode={'contain'}
        style={{
          height: 220,
          width: 220,
          padding: iconPadding,
        }}
      />

      <Text style={styles.text}>Authentiq</Text>
    </View>
  );
};

export default Fpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#967BB6',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 120,
  },
  text: {
    color: 'white',
    // fontsize: '30px',
  },
});
