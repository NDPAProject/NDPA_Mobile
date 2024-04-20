import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import RNFS from 'react-native-fs';
// Import React and Component
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {transcribeAudio, setStateFunc} from '../../redux/slices/audio';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

//
import Header from '../../components/header';
import CustomStepModal from '../../components/stepModal';
import CustomDialog from '../../components/dialogModal';
import CustomGreatModal from '../../components/greatModal';
import MoveDialog from '../../components/moveDialog';

const speaking_ico = require('../../../assets/icons/speaking_ico.png');
const hand_ico = require('../../../assets/icons/hand_ico.png');
const msg_send_passive = require('../../../assets/icons/msg_send_passive.png');
const msg_send_active = require('../../../assets/icons/msg_send_active.png');

const mic_ico = require('../../../assets/icons/mic_ico.png');
const mic_frame = require('../../../assets/icons/mic_frame.png');
const t_icon = require('../../../assets/icons/tom_ico.png');
const me_icon = require('../../../assets/icons/me.png');
const turtle_ico = require('../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../assets/icons/charm_sound-up.png');
const message = require('../../../assets/icons/message.png');
const mechat = require('../../../assets/icons/mechat.png');
const thumb_icon = require('../../../assets/icons/great_ico.png');
const try_again_ico = require('../../../assets/icons/try_again_ico.png');
const welcome_ico = require('../../../assets/icons/welcome_ico.png');
const wrong_msg_ico = require('../../../assets/icons/wrong_msg.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SpeakingSection = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [sendClick, setSendClick] = useState(false);
  const [showHand, setShowHand] = useState(false);
  const [step_2, setStep_2] = useState(false);
  const [step_3, setStep_3] = useState(false);
  const [step_4, setStep_4] = useState(false);
  const [step_5, setStep_5] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [text, setText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const {audioTxt, isloading} = useSelector(state => state.audio);

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const messageIcon = text ? msg_send_active : msg_send_passive;

  const {param} = route.params;

  console.log('-----------------audioTxt---------------', audioTxt, param);

  const handleClick = async () => {
    try {
      setStep_2(true);
      setModalVisible(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickMove = async () => {
    try {
      setText(param);
      navigation.navigate('ReviewSection', {param: text});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    try {
      setStep_5(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickTry = async () => {
    try {
      setStep_3(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleSend = async () => {
    try {
      await onStartRecord();
      console.log('-------audioPath--------', audioPath);
      // dispatch(transcribeAudio(audioPath));
      setStep_4(true);
      setStep_3(false);

      // setModalVisible(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleInput = async () => {
    try {
      // setModalVisible(false);
      setShowHand(false);
      setStep_3(true);
      setStep_2(false);
      setShowImage(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const onStartRecord = async () => {
    console.log('startRecord');

    const path = `${RNFS.DocumentDirectoryPath}/hello.wav`;

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Audio Recording Permission',
          message: 'App needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Recording permission denied');
        return;
      }
    }

    const audioSet = {
      SampleRate: 44100,
      Channels: 1,
      AudioQuality: 'High',
      AudioEncoding: 'wav',
    };

    try {
      console.log('Preparing to record');
      const result = await audioRecorderPlayer.startRecorder(path, audioSet);
      console.log('Recording started', result);

      setTimeout(async () => {
        console.log('Stopping recording...');
        const res = await audioRecorderPlayer.stopRecorder();
        console.log('stopped recording', res);
        console.log('Recorded Audio File Path:', path);
        setAudioPath(path);
        // No need to remove the recorder path since you might want to access the file later.
      }, 5000); // Stop after 5 seconds
    } catch (error) {
      console.error('Recording error:', error);
    }
  };

  useEffect(() => {
    let timer;
    if (modalVisible) {
      timer = setTimeout(() => {
        setShowImage(true);
      }, 1000);
    } else if (step_2) {
      setModalVisible(false);
      timer = setTimeout(() => {
        setShowHand(true);
      }, 1200);
    }
    //  else if (step_4) {
    //   timer = setTimeout(() => {
    //     setShowImage(true);
    //   }, 800);
    // }
    return () => clearTimeout(timer);
  }, [step_2, modalVisible]);

  useEffect(() => {
    console.log('Updated audioPath:', audioPath);
    if (audioPath) {
      dispatch(setStateFunc);
      dispatch(transcribeAudio(audioPath));
    }
  }, [audioPath]);

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        title="Step 2. Speaking"
        icon={speaking_ico}
        hand_ico={hand_ico}
        showImage={showImage}
      />

      <MoveDialog
        modalVisible={step_5}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        text="Great job! Let's move NNto the review part"
        icon={welcome_ico}
      />

      <CustomStepModal
        visible={step_2}
        onRequestClose={() => setStep_2(false)}
        stepText="4/5"
        message="Let's answer the question.Tap on theNN microphone and tell your name."
      />

      <Header
        visible={true}
        text={'Introducing yourself'}
        color={'#FFFBF8'}
        editalbe={false}
      />

      <Image
        source={t_icon}
        style={{position: 'absolute', left: screenWidth / 20, top: 130}}
      />
      <Image
        source={me_icon}
        style={{position: 'absolute', right: screenWidth / 20, top: 330}}
      />

      <Modal visible={!modalVisible} transparent={true}>
        <View style={styles.imageContainer}>
          <Image source={message} />
          <Text style={styles.title}>
            Hi! My name is Tom. {'\n'}What is your name?
          </Text>
        </View>
      </Modal>

      <View
        style={{
          flexDirection: 'row',
          gap: 9,
          position: 'absolute',
          top: 205,
          right: screenWidth / 20,
        }}>
        <Image source={sound_ico} />
        <Image source={turtle_ico} />
      </View>

      <Modal visible={step_3 || step_4} transparent={true}>
        <View style={styles.me_imageContainer}>
          <>
            {isloading ? (
              <>
                <Image
                  source={
                    param === audioTxt?.DisplayText ? mechat : wrong_msg_ico
                  }
                />
                <Text style={styles.m_title}>
                  Hi! My name is{' '}
                  {param === audioTxt?.DisplayText
                    ? audioTxt.DisplayText
                    : '_____'}
                  .
                </Text>
              </>
            ) : (
              <>
                <Image source={mechat} />
                <Text style={styles.m_title}>Hi! My name is _____.</Text>
              </>
            )}

            <View
              style={{
                flexDirection: 'row',
                gap: 9,
                position: 'absolute',
                top: 54,
                left: 0,
              }}>
              <Image source={sound_ico} />
              <Image source={turtle_ico} />
            </View>
          </>
        </View>
      </Modal>

      <Modal visible={!modalVisible && !step_4} transparent={true}>
        {/* {!sendClick ||
          (step_3 && (
            <Image
              source={mic_frame}
              style={{
                position: 'absolute',
                bottom: 150,
                width: (screenWidth * 9) / 10,
                marginLeft: screenWidth / 20,
                marginRight: screenWidth / 20,
              }}
            />
          ))} */}

        <TouchableOpacity
          onPress={handleInput}
          style={{
            position: 'absolute',
            bottom: 40,
            right: screenWidth / 2 - 50,
          }}>
          <Image source={mic_ico} />
        </TouchableOpacity>
        <Text style={styles.text_m}>Press to speak</Text>
        {showHand && (
          <Image
            animationType="slide"
            source={hand_ico}
            style={{
              position: 'absolute',
              bottom: 10,
              right: screenWidth / 3 - 9,
            }}
          />
        )}
      </Modal>
      <Image
        source={mic_frame}
        visible={step_4}
        style={{
          position: 'absolute',
          bottom: 150,
          width: (screenWidth * 9) / 10,
          marginLeft: screenWidth / 20,
          marginRight: screenWidth / 20,
          opacity: isloading ? 0 : 1,
        }}
      />
      <Modal visible={step_3} transparent={true}>
        <TouchableOpacity
          onPress={handleSend}
          style={{
            position: 'absolute',
            bottom: 40,
            right: screenWidth / 2 - 50,
          }}>
          <Image source={mic_ico} />
        </TouchableOpacity>
        <Text style={styles.text_m}>Press to speak</Text>
      </Modal>

      {param === audioTxt?.DisplayText ? (
        <CustomGreatModal
          visible={isloading && !step_3 && !modalVisible && !step_2}
          hand_ico={hand_ico}
          icon={thumb_icon}
          showImage={showImage}
          buttonType={true}
          handleClick={handleContinue}
          onRequestClose={() => setStep_2(false)}
          message="Great job!"
        />
      ) : (
        <CustomGreatModal
          visible={isloading && !step_3 && !modalVisible && !step_2}
          hand_ico={hand_ico}
          icon={try_again_ico}
          showImage={showImage}
          buttonType={false}
          handleClick={handleContinue}
          // handleClick={handleClickTry}
          onRequestClose={() => setStep_2(false)}
          message="Don't give up"
        />
      )}
    </View>
  );
};

export default SpeakingSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    width: screenWidth,
    height: screenHeight,
  },
  overlay: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -75,
    left: 10,
    // textAlign: 'left',
  },
  m_title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -48,
    right: 10,
    // textAlign: 'left',
  },
  text_m: {
    color: '#1E1D2080',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    position: 'absolute',
    bottom: 20,
    marginTop: 2,
    marginLeft: screenWidth / 2 - 41,
    // alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    // textAlign: 'left',
  },
  imageContainer: {
    position: 'absolute',
    right: screenWidth / 20,
    top: 130,
    alignItems: 'center',
  },
  me_imageContainer: {
    position: 'absolute',
    left: screenWidth / 20,
    top: 320,
    alignItems: 'center',
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
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
