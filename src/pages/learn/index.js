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

import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/header';

const h_icon = require('../../../assets/icons/h_icon.png');
const person_ico = require('../../../assets/icons/learn/person_ico.png');
const fship_ico = require('../../../assets/icons/learn/fship_ico.png');
const choice_ico = require('../../../assets/icons/learn/choice_ico.png');
const indep_ico = require('../../../assets/icons/learn/indep_ico.png');
const sep_ico = require('../../../assets/icons/learn/sep_ico.png');
const loss_ico = require('../../../assets/icons/learn/loss_ico.png');
const withdrawal_ico = require('../../../assets/icons/learn/withdrawl_ico.png');
const sadness_ico = require('../../../assets/icons/learn/sadness_ico.png');
const worry_ico = require('../../../assets/icons/learn/worry_ico.png');
const emotional_ico = require('../../../assets/icons/learn/fship_ico.png');
const peer_ico = require('../../../assets/icons/learn/peer_ico.png');
const screenWidth = Dimensions.get('window').width;

const LearnSection = () => {
  const navigation = useNavigation();

  const boxData = [
    [
      {icon: person_ico, text: 'Personal\nIdentity', nav: 'TutorSection'},
      {icon: fship_ico, text: 'Friendship', nav: ''},
    ],
    [
      {icon: choice_ico, text: 'Choice', nav: ''},
      {icon: indep_ico, text: 'Independence', nav: ''},
    ],
    [
      {icon: sep_ico, text: 'Separation', nav: ''},
      {icon: loss_ico, text: 'Loss', nav: ''},
    ],
    [
      {icon: withdrawal_ico, text: 'Withdrawal', nav: ''},
      {icon: sadness_ico, text: 'Sadness', nav: ''},
    ],
    [
      {icon: worry_ico, text: 'Worry', nav: ''},
      {icon: emotional_ico, text: 'Emotional\nOutbursts', nav: ''},
    ],
    [{icon: peer_ico, text: '     Peer Difficulties', nav: ''}],
  ];
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.textBackground}>
        <Image
          source={h_icon}
          style={{bottom: 0, position: 'absolute', marginLeft: 10}}
        />
        <Text style={styles.title}>
          What do you want {'\n'}to talk about today?
        </Text>
      </View>
    </View>
  );
};

export default LearnSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    marginLeft: (screenWidth * 1.1) / 3,
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
  icon: {
    justifyContent: 'center',
    width: 72,
    height: 72,
  },
  textBackground: {
    flexDirection: 'row',
    backgroundColor: '#FFEAD8',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    borderRadius: 20,
    width: (screenWidth * 9) / 10,
    height: 100,
  },
  boxBackground: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FBC4AB',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 20,
    borderRadius: 20,
    width: (screenWidth * 2.1) / 5,
    height: (screenWidth * 2.1) / 5,
  },
});
