import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {Image, View, StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';

import {setisLoading, textToSpeech} from '../../redux/slices/audio';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/header';
import CustomStepModal from '../../components/stepModal';
import CustomDialog from '../../components/dialogModal';
import CustomGreatModal from '../../components/greatModal';
import MoveDialog from '../../components/moveDialog';

import MessageTom from '../../components/tomMsg';
import MyMessage from '../../components/myMsg';

const phone_ico = require('../../../assets/icons/phone_ico.png');
const hand_ico = require('../../../assets/icons/hand_ico.png');
const msg_send_passive = require('../../../assets/icons/msg_send_passive.png');
const msg_send_active = require('../../../assets/icons/msg_send_active.png');

const t_icon = require('../../../assets/icons/tom_ico.png');
const me_icon = require('../../../assets/icons/me.png');
const thumb_icon = require('../../../assets/icons/great_ico.png');
const welcome_ico = require('../../../assets/icons/welcome_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const TypingSection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {txtAudio} = useSelector(state => state.audio);
  const [modalVisible, setModalVisible] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [sendClick, setSendClick] = useState(false);
  const [showHand, setShowHand] = useState(false);
  const [step_2, setStep_2] = useState(false);
  const [step_3, setStep_3] = useState(false);
  const [step_4, setStep_4] = useState(false);
  const [step_5, setStep_5] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const initialBottom = Dimensions.get('window').height / 2 - 50;
  const [bottomPadding, setBottomPadding] = useState(initialBottom);

  const messageIcon = text ? msg_send_active : msg_send_passive;

  const handleContinue = async () => {
    try {
      console.log('--------clicked---------------');
      setStep_5(true);
      setStep_4(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClick = async () => {
    try {
      setStep_2(true);
      setModalVisible(false);
      console.log('=-=-=-=-=--', step_2, modalVisible);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickMove = async () => {
    try {
      navigation.navigate('SpeakingSection', {param: text});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickSkip = async () => {
    try {
      console.log('-------click----------------');
      navigation.navigate('MainPage', {param: true});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleSend = async () => {
    try {
      setSendClick(true);
      setStep_3(false);
      setStep_4(true);
      console.log('=-=-=handleSend-=-=--', step_4, sendClick);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleInput = async () => {
    try {
      setStep_2(false);
      setStep_3(true);
      setShowHand(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleChangeText = async text => {
    try {
      setText(text);
      return;
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  useEffect(() => {
    let timer;
    if (modalVisible) {
      timer = setTimeout(() => {
        setShowImage(true);
      }, 1000);
    } else if (step_2) {
      timer = setTimeout(() => {
        setShowHand(true);
      }, 1200);
    } else if (step_4) {
      timer = setTimeout(() => {
        setShowImage(true);
      }, 800);
    }
    return () => clearTimeout(timer);
  }, [step_2, modalVisible]);

  useEffect(() => {
    if (modalVisible && txtAudio === null) {
      console.log('11111111modalVisible111111');
      const txt = 'Hi! My name is Tom. What is your name?';
      dispatch(textToSpeech(txt));
      setIsLoading(true);
    }
  }, [modalVisible, txtAudio, dispatch]);

  useEffect(() => {
    if (isLoading) {
      console.log('--------------PlayAUDIODIO--------');
      playAudio(txtAudio);
      setisLoading(false);
    }
  }, [isLoading, playAudio]);

  const playAudio = async audioBase64 => {
    console.log('---------playAudio---------');

    const audioPath = `${RNFS.TemporaryDirectoryPath}tempaudio.mp3`;

    const base64String = audioBase64.replace('data:audio/mp3;base64,', '');

    await RNFS.writeFile(audioPath, base64String, 'base64')
      .then(() => {
        console.log('File written');
      })
      .catch(error => {
        console.error('Error writing file', error);
      });

    const sound = new Sound(audioPath, '', error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // Play the sound if loaded successfully
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.log('Playback failed due to audio decoding errors');
        }
      });
    });
  };

  return (
    <View style={styles.container}>
      <Header
        visible={true}
        text={'Introducing yourself'}
        color={'#FFFBF8'}
        editalbe={false}
      />

      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={phone_ico}
        title="Step 1. Typing"
        hand_ico={hand_ico}
        showImage={showImage}
      />

      <CustomStepModal
        visible={step_2}
        onRequestClose={handleClickSkip}
        stepText="2/5"
        message="Let's answer the question.NNTap on the field and enter your name."
        handleInput={handleInput}
        handleChangeText={handleChangeText}
        text={text}
        handleSend={handleSend}
        messageIcon={messageIcon}
        showHand={showHand}
      />

      <CustomStepModal
        visible={step_3}
        onRequestClose={handleClickSkip}
        stepText="3/5"
        message="Use the keyboard to write your name.NN You can also select from the options."
        handleInput={handleInput}
        handleChangeText={handleChangeText}
        text={text}
        handleSend={handleSend}
        messageIcon={messageIcon}
        showHand={showHand}
        sendClick={sendClick}
      />

      <MoveDialog
        modalVisible={step_5}
        setModalVisible={setModalVisible}
        // handleClick={handleClickMove}
        handleClick={handleClickSkip}
        handleClickSkip={handleClickSkip}
        text="Great job! Let's move NNto the speaking part"
        icon={welcome_ico}
      />

      <Image
        source={t_icon}
        style={{position: 'absolute', left: screenWidth / 20, top: 130}}
      />
      <Image
        source={me_icon}
        style={{position: 'absolute', right: screenWidth / 20, top: 330}}
      />

      <MessageTom
        children={' Hi! My name is Tom. \nWhat is your name?'}
        type={true}
      />

      <MyMessage sendClick={false} text={text} />

      <CustomGreatModal
        visible={step_4}
        hand_ico={hand_ico}
        icon={thumb_icon}
        showImage={showImage}
        buttonType={true}
        handleClick={handleContinue}
        message="Great job!"
      />
    </View>
  );
};

export default TypingSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    width: screenWidth,
    height: screenHeight,
  },

  icon: {
    justifyContent: 'center',
    width: 72,
    height: 72,
  },
});
