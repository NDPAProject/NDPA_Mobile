import 'react-native-gesture-handler';

// Import React and Component
import React, {useState} from 'react';

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

import Header from '../../../components/header';
import MoveDialog from '../../../components/moveDialog';

const account_ico = require('../../../../assets/icons/profile/setting/account_ico.png');
const card = require('../../../../assets/icons/profile/setting/card.png');
const docum_ico = require('../../../../assets/icons/profile/setting/docum_ico.png');
const help_ico = require('../../../../assets/icons/profile/setting/help_ico.png');
const id_card = require('../../../../assets/icons/profile/setting/id_card.png');
const mdi_book = require('../../../../assets/icons/profile/setting/mdi_book-lock-outline.png');
const mdi_web = require('../../../../assets/icons/profile/setting/mdi_web.png');
const notification_ico = require('../../../../assets/icons/profile/setting/notification_ico.png');
const passport = require('../../../../assets/icons/profile/setting/passport.png');
const lock_ico = require('../../../../assets/icons/profile/setting/lock_ico.png');
const perimeter_ico = require('../../../../assets/icons/profile/setting/perimeter_ico.png');
const sand_clock = require('../../../../assets/icons/profile/setting/sand_clock.png');
const right_arrow_ico = require('../../../../assets/icons/profile/setting/right_arrow_ico.png');
const mdi_logout = require('../../../../assets/icons/profile/setting/mdi_logout.png');
const out_ico = require('../../../../assets/icons/profile/setting/out_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const boxData = [
  {icon: account_ico, text: 'Personal Information', nav: 'PersonalInfoPage'},
  {icon: passport, text: 'SEN Passport', nav: 'SENPassportPage'},
  {icon: lock_ico, text: 'Change Password', nav: 'ChangePwdPage'},
  {icon: id_card, text: 'ID Verification', nav: 'IdVerificationPage'},
  {icon: sand_clock, text: 'Time support', nav: 'TimeSupportPage'},
  {icon: perimeter_ico, text: 'Perimeter safety', nav: ''},
  {icon: card, text: 'Payment details', nav: ''},
  {icon: notification_ico, text: 'Notifications', nav: 'NotificationPage'},
  {icon: mdi_book, text: 'Privacy policy', nav: 'PrivacyPage'},
  {icon: docum_ico, text: 'Terms and Conditions', nav: 'TermsPage'},
  {icon: help_ico, text: 'Help', nav: 'HelpPage'},
  {icon: mdi_web, text: 'Language & Country', nav: 'LanguagePage'},
];

const SettingPage = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleClick = async () => {
    try {
      setModalVisible(true);
      console.log('=-=-=-=-=--', modalVisible);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickSkip = async () => {
    try {
      navigation.goBack();
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickMove = async () => {
    try {
      navigation.navigate('Signin');
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MoveDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        handleClickSkip={handleClickSkip}
        text="Are you sure NNwant to log out?"
        icon={out_ico}
        visible={false}
        type={true}
      />
      <Header
        visible={false}
        text={'Settings'}
        color={'white'}
        editalbe={false}
      />
      <ScrollView>
        <View style={styles.container_s}>
          {boxData.map((row, rowIndex) => (
            <TouchableOpacity
              key={rowIndex}
              onPress={() => navigation.navigate(row.nav)}>
              <View style={styles.boxBackground}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 25}}>
                  <Image source={row.icon} style={styles.icon} />
                  <Text style={styles.text}>{row.text}</Text>
                </View>
                <Image source={right_arrow_ico} />
              </View>
              <View style={styles.underline} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={handleClick}>
            <View style={styles.boxBackground}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 25}}>
                <Image source={mdi_logout} style={styles.icon} />
                <Text style={styles.text}>Sign out</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  container_s: {
    marginTop: 25,
    gap: 20,
    marginBottom: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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

  icon: {
    justifyContent: 'center',
    width: 32,
    height: 32,
  },

  boxBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    height: 50,
  },

  underline: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#1E1D2033',
    width: '100%',
    // marginTop: 1,
  },
});
