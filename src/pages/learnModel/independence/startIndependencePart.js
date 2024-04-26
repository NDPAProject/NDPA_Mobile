import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import Footer from '../../../components/footer';
const arrow = require('../../../../assets/icons/left_ico.png');

const intro_ico = require('../../../../assets/icons/learn/indep_ico.png');
const check_pos_ico = require('../../../../assets/icons/learn/check_pos_ico.png');
const be_pos_ico = require('../../../../assets/icons/learn/be_pos_ico.png');
const pos_ico = require('../../../../assets/icons/learn/pos_ico.png');
const road_ico = require('../../../../assets/icons/learn/choice/road.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const StartIndependenceSection = () => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    console.log('clicked');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleBackPress}
        style={{
          position: 'absolute',
          left: screenWidth / 20,
          top: 10,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 2,
        }}>
        <Image source={arrow} />
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
      <View style={styles.textBackground}>
        <Image source={intro_ico} />
        <Text style={styles.title}>Independence</Text>
      </View>
      <Image style={styles.road} source={road_ico} />
      <TouchableOpacity
        style={[
          styles.checkPos,
          {
            top: (screenHeight * 1) / 3 - 85,
            left: (screenWidth * 2) / 3 - 80,
          },
        ]}
        onPress={() => navigation.navigate('IndependenceSection')}>
        <Image source={pos_ico} />
      </TouchableOpacity>

      <Image
        style={[
          styles.checkPos,
          {
            top: (screenHeight * 3) / 5 - 155,
            left: (screenWidth * 2) / 5 - 40,
          },
        ]}
        source={be_pos_ico}
      />
      <Image
        style={[
          styles.checkPos,
          {
            top: (screenHeight * 2) / 3 - 150,
            left: (screenWidth * 5) / 7 + 10,
          },
        ]}
        source={be_pos_ico}
      />
      <Image
        style={[
          styles.checkPos,
          {
            top: (screenHeight * 5) / 8 + 50,
            left: (screenWidth * 2) / 5 - 3,
          },
        ]}
        source={be_pos_ico}
      />
      <Image
        style={[
          styles.checkPos,
          {
            top: (screenHeight * 4) / 5 - 40,
            left: (screenWidth * 5) / 7 - 10,
          },
        ]}
        source={be_pos_ico}
      />
      <Footer state={0} />
    </View>
  );
};

export default StartIndependenceSection;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    height: screenHeight,
    backgroundColor: '#FFFBF8',
  },
  title: {
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  road: {
    position: 'absolute',
    bottom: 48,
    height: (screenHeight * 2) / 3,
    width: (screenWidth * 2) / 3,
  },
  checkPos: {
    position: 'absolute',
    // height: 50,
    // width: 50,
  },
  text: {
    fontFamily: 'OpenSans-Regular',
    // marginTop: 0.7,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 16,
    color: '#F08080',
  },
  icon: {
    justifyContent: 'center',
    width: 72,
    height: 72,
  },
  textBackground: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: 30,
    marginTop: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FBC4AB',
    width: (screenWidth * 9) / 10,
    height: 100,
  },
});
