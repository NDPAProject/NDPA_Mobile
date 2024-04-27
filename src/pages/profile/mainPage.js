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
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const access_menu = require('../../../assets/icons/profile/access_menu.png');
const call_keyworker = require('../../../assets/icons/profile/call_keyworker.png');
const edit_avatar = require('../../../assets/icons/profile/edit_avatar.png');
const sen_passport = require('../../../assets/icons/profile/sen_passport.png');
const setting = require('../../../assets/icons/profile/setting.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const boxData = [
  [
    {
      icon: edit_avatar,
      text: 'Edit Avatar',
      nav: '',
    },
    {icon: call_keyworker, text: '       Call\nKey Worker', nav: ''},
  ],
  [
    {icon: access_menu, text: 'Accessibility\n      Menu', nav: 'AccessMenu'},
    {icon: sen_passport, text: 'SEN Passport', nav: ''},
  ],
  [{icon: setting, text: 'Settings', nav: 'SettingPart'}],
];

const MainPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textBackground}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <ScrollView>
        <View style={styles.container_s}>
          {boxData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  onPress={() => navigation.navigate(item.nav)}>
                  <View style={styles.boxBackground}>
                    <Image source={item.icon} style={styles.icon} />
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container_s: {
    padding: 10,
    marginBottom: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    // textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
    // textAlign: 'left',
  },
  text_m: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginTop: 6,
    // alignItems: 'center',
  },
  text_m2: {
    color: 'black',
    fontSize: 10,
    fontFamily: 'OpenSans-Medium',
    position: 'absolute',
    top: 5,
    left: 8,
  },
  text_m3: {
    color: '#9D9C9D',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    textDecorationLine: 'underline',
    position: 'absolute',
    bottom: 5,
    right: 8,
  },
  b3_text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
  },
  b4_text: {
    color: '#F08080',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
  },
  icon: {
    justifyContent: 'center',
    width: 72,
    height: 72,
  },
  textBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: (screenWidth * 9) / 10,
    height: 100,
  },
  boxBackground: {
    flexDirection: 'column',
    backgroundColor: '#FFDAB91A',
    borderWidth: 1,
    borderColor: '#FBC4AB',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 20,
    borderRadius: 20,
    width: (screenWidth * 2.1) / 5,
    height: (screenWidth * 2) / 5,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
