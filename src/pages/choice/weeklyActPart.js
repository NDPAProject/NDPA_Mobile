import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import {setStateFunc, textToSpeech} from '../../redux/slices/audio';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/header';
import CustomDialog from '../../components/dialogModal';
import RewardDialog from '../../components/rewardModal';

const activate_ico = require('../../../assets/icons/learn/choice/activate_ico.png');
const hand_ico = require('../../../assets/icons/hand_ico.png');
const msg_send_passive = require('../../../assets/icons/msg_send_passive.png');
const msg_send_active = require('../../../assets/icons/msg_send_active.png');

const avatar_ico = require('../../../assets/icons/learn/choice/avatar_ico.png');
const turtle_ico = require('../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../assets/icons/charm_sound-up.png');
const message = require('../../../assets/icons/message.png');
const mechat = require('../../../assets/icons/mechat.png');
const reward_ico = require('../../../assets/icons/main/reward.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const conditions = [
  {id: 'autism', label: 'Autism'},
  {id: 'adhd', label: 'ADHD'},
  {id: 'dyslexia', label: 'Dyslexia'},
  {id: 'Enter', label: 'Enter another variant'},
];

const identifys = [
  {id: 'autism', label: 'Male'},
  {id: 'adhd', label: 'Female'},
  {id: 'dyslexia', label: 'Non-binary'},
  {id: 'Enter', label: 'Enter another variant'},
];

const WeeklyActSection = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(true);
  const [showImage, setShowImage] = useState(false);

  const [progress, setProgress] = useState(0.25);
  const [step_2, setStep_2] = useState(false);
  const [step_6, setStep_6] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [text, setText] = useState('');
  const [age, setAge] = useState('');
  const [symptom, setSymptom] = useState('');
  const [identify, setIdentify] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const handleClick = async () => {
    try {
      setStep_2(true);
      setModalVisible(false);
      console.log('=-=-=-=-=--', step_2, modalVisible);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleClickMove = async () => {
    try {
      const data = {
        name: text,
        age: age,
        symptom: symptom,
        identify: identify,
      };
      setStep_2(true);
      navigation.navigate('SpeakingSection', {param: data});
      // navigation.navigate('MainPage', {param: true});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={activate_ico}
        title="Step 1. Weekly activities"
        description="Let’s choose your weekly activities"
        hand_ico={hand_ico}
        showImage={showImage}
      />

      <RewardDialog
        modalVisible={step_6}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        title="Great job!"
        text="You've finished typing level!NN  Claim your reward."
        buttonText="Go to Step 2"
        icon={reward_ico}
      />

      <Header
        visible={false}
        text={'Weekly activities'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      <Image source={avatar_ico} style={styles.avatar} />
      <Text style={styles.title}>
        {'What do you usually\ndo during the week?'}
      </Text>
    </View>
  );
};

export default WeeklyActSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
    width: screenWidth,
  },
  avatar: {
    alignItems: 'center',
    marginTop: 20,
    width: 150,
    height: 150,
  },
  title: {
    color: 'black',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    fontWeight: '700',
    fontFamily: 'OpenSans-Medium',
  },
});
