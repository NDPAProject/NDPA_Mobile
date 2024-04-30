import 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
// Import React and Component
import React, {useState, useEffect} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import {textToSpeech, transcribeAudio} from '../../redux/slices/audio';
import Header from '../../components/header';
import CustomDialog from '../../components/dialogModal';
import CustomGreatModal from '../../components/greatModal';
import MoveDialog from '../../components/moveDialog';

const review_ico = require('../../../assets/icons/review_ico.png');
const hand_ico = require('../../../assets/icons/hand_ico.png');

const mic_ico = require('../../../assets/icons/mic_ico.png');
const tom_s_ico = require('../../../assets/icons/tom_s.png');
const repeat_ico = require('../../../assets/icons/repeact_ico.png');
const mic_frame = require('../../../assets/icons/mic_frame.png');
const t_icon = require('../../../assets/icons/tom_ico.png');
const me_icon = require('../../../assets/icons/me_ico.png');
const turtle_ico = require('../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../assets/icons/charm_sound-up.png');
const message = require('../../../assets/icons/message.png');
const mechat = require('../../../assets/icons/mechat.png');
const thumb_icon = require('../../../assets/icons/great_ico.png');
const welcome_ico = require('../../../assets/icons/welcome_ico.png');
const verify_msg = require('../../../assets/icons/verify_msg.png');
const wrong_msg_ico = require('../../../assets/icons/wrong_msg.png');
const try_again_ico = require('../../../assets/icons/try_again_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ReviewSection = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [againModal, setAgainModal] = useState(false);
  const [step_2, setStep_2] = useState(true);
  const [step_4, setStep_4] = useState(false);
  const [step_5, setStep_5] = useState(false);
  const [step_6, setStep_6] = useState(false);
  const [step_7, setStep_7] = useState(false);
  const [sound, setSound] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(0);
  const [ageSuccess, setAgeSuccess] = useState(0);
  const [identifySuccess, setIdentifySuccess] = useState(0);
  const [symptomSuccess, setSymptomSuccess] = useState(0);
  const [audioPath, setAudioPath] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const {audioTxt, txtAudio} = useSelector(state => state.audio);

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const {param} = route.params;

  console.log('-----------ReviewPart---------------------', param, audioTxt);

  const handleClick = () => {
    console.log('handleClick');
    setStep_2(true);
    setModalVisible(false);
    console.log('=-=-=-=-=--', step_2, modalVisible);
  };

  const handleClickMove = async () => {
    try {
      const data = {
        param: param,
        nameSuccess: nameSuccess,
        ageSuccess: ageSuccess,
        identifySuccess: identifySuccess,
        symptomSuccess: symptomSuccess,
      };
      // navigation.navigate('MainPage', {param: true});
      navigation.navigate('PercentSection', {param: data});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleContinue = () => {
    if (step_5 && step_6) {
      setShowModal(false);
      setStep_7(true);
      return;
    }
    setShowModal(false);
  };

  const handleTry = () => {
    setAgainModal(false);
  };

  const handleSend = async () => {
    try {
      setIsLoading(true);
      await onStartRecord();
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const onStartRecord = async () => {
    console.log('startRecord');

    const path = `${RNFS.DocumentDirectoryPath}/hello.wav`;
    const wavFilePath = `${RNFS.DocumentDirectoryPath}/converted.wav`;

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
      const result = await audioRecorderPlayer.startRecorder(path, audioSet);

      setTimeout(async () => {
        const res = await audioRecorderPlayer.stopRecorder();

        RNFS.unlink(wavFilePath);
        const command = `-i ${path} -vn -acodec pcm_s16le -ar 16000 -ac 1 -b:a 256k ${wavFilePath}`;
        const session = await FFmpegKit.execute(command);
        const returnCode = await session.getReturnCode();
        if (ReturnCode.isSuccess(returnCode)) {
          const exists = await RNFS.exists(wavFilePath);
          if (exists) {
            setAudioPath(wavFilePath);
          } else {
            setAudioPath(path);
          }
        }
      }, 50);
    } catch (error) {
      console.error('Recording error:', error);
    }
  };

  useEffect(() => {
    console.log('Updated audioPath:', audioPath);
    if (audioPath) {
      dispatch(transcribeAudio(audioPath));
      setAudioPath('');
    }
  }, [audioPath]);

  useEffect(() => {
    if (audioTxt !== null && count !== 2) {
      const strText = audioTxt?.DisplayText.toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strOriginName = 'Hi! My name is ' + param.name;
      const strOriginAge = "I'm" + param.age + 'years old';
      const strOriginIdentify = 'I have' + param.identify;
      const strOriginSymptom = 'I identify as' + param.symptom;
      const strName = strOriginName
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strAge = strOriginAge
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strIdentify = strOriginIdentify
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strSymptom = strOriginSymptom
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      console.log('strText >>> ', strText);
      console.log('strName >>> ', strName);
      const tryCount = count + 1;
      setCount(tryCount);
      if (step_2 && !step_4) {
        console.log('1111111111111111111111');
        if (strText === strName) {
          setStep_4(true);
          setShowButton(true);
          setNameSuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setNameSuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (step_2 && step_4) {
        console.log('22222222222222222222222');
        if (strText === strAge) {
          setStep_5(true);
          setShowButton(true);
          setAgeSuccess(1);
          setShowModal(true);
          setCount(0);
          setStep_2(false);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setAgeSuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (step_5 && !step_6) {
        console.log('33333333333333333333');
        if (strText === strSymptom) {
          setStep_6(true);
          setShowButton(true);
          setSymptomSuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setSymptomSuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (step_5 && step_6) {
        console.log('44444444444444444444444');
        if (strText === strIdentify) {
          setShowButton(true);
          setIdentifySuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setIdentifySuccess(2);
          setAgainModal(true);
          return;
        }
      }
    }
  }, [param.name, audioTxt]);

  useEffect(() => {
    console.log('count >>>', count);
    if (count == 2) {
      setAgainModal(false);
      setCount(0);
      if (step_2 && !step_4) {
        setShowButton(false);
        setStep_4(true);
        setNameSuccess(2);
        return;
      }
      if (step_2 && step_4) {
        setShowButton(false);
        setStep_5(true);
        setAgeSuccess(2);
        setStep_2(false);
        return;
      }
      if (step_5 && !step_6) {
        // setStep_5(false);
        setShowButton(false);
        setStep_6(true);
      }
      if (step_5 && step_6) {
        console.log('-----------============------------');
        setStep_6(false);
        setShowButton(false);
        setStep_7(true);
      }
    }
  }, [count]);

  const handleClickSound = async txt => {
    try {
      console.log('----------txt----------', txt);
      await dispatch(textToSpeech(txt));
      console.log('----------finished-----------------');
      setSound(true);
      console.log('------------useEffect', isLoading);
      // dispatch(setStateFunc);
    } catch (error) {
      console.log('-----------error----------', error);
    }
  };

  useEffect(() => {
    if (sound) {
      console.log('-----------audio playing--------------');
      playAudio(txtAudio);
    }
  }, [sound]);

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

  const MessageBlock = ({children}) => (
    <>
      <View style={styles.imageContainer}>
        <Image source={message} />
        <Text style={styles.title}>{children}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 9,
          position: 'absolute',
          top: 180,
          left: screenWidth / 20 + 210,
        }}>
        <TouchableOpacity onPress={() => handleClickSound(children)}>
          <Image source={sound_ico} />
        </TouchableOpacity>
        <Image source={turtle_ico} />
      </View>
    </>
  );

  const MessageBlockT = ({children}) => (
    <>
      <View style={styles.imageContainer_t}>
        <Image source={message} />
        <Text style={styles.title}>{children}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 9,
          position: 'absolute',
          top: 400,
          left: screenWidth / 20 + 210,
        }}>
        <TouchableOpacity onPress={() => handleClickSound(children)}>
          <Image source={sound_ico} />
        </TouchableOpacity>
        <Image source={turtle_ico} />
      </View>
    </>
  );

  const ItemBlock = children => (
    <View
      style={{
        flexDirection: 'row',
        gap: 9,
        position: 'absolute',
        top: 54,
        left: 0,
      }}>
      <TouchableOpacity onPress={() => handleClickSound(children)}>
        <Image source={sound_ico} />
      </TouchableOpacity>
      <Image source={turtle_ico} />
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={() => handleClick()}
        title="Step 3. Review"
        icon={review_ico}
        hand_ico={hand_ico}
      />

      <MoveDialog
        modalVisible={step_7}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        text="Great job! Now you areNN ready to use the app!"
        icon={welcome_ico}
        visible={true}
      />

      <Header
        visible={false}
        text={'Introducing yourself'}
        color={'#FFFBF8'}
        editalbe={false}
      />
      {step_2 && (
        <>
          <Image
            source={tom_s_ico}
            style={{position: 'absolute', left: screenWidth / 20, top: 130}}
          />
          <Image
            source={me_icon}
            style={{position: 'absolute', right: screenWidth / 20, top: 230}}
          />
          <MessageBlock
            children={' Hi! My name is Tom. \nWhat is your name?'}
          />
          <View style={styles.me_imageContainer}>
            <Image
              source={
                nameSuccess === 0
                  ? mechat
                  : nameSuccess === 1
                  ? verify_msg
                  : wrong_msg_ico
              }
            />

            <Text
              style={[
                styles.s_title,
                {
                  color:
                    nameSuccess === 0
                      ? 'black'
                      : nameSuccess === 1
                      ? '#23B80C'
                      : '#FFC700',
                },
              ]}>
              Hi! My name is {param.name}.
            </Text>
            <ItemBlock children={`Hi! My name is ${param.name}`} />
          </View>
          {step_4 && (
            <>
              <Image
                source={tom_s_ico}
                style={{
                  position: 'absolute',
                  left: screenWidth / 20,
                  top: 350,
                }}
              />
              <Image
                source={me_icon}
                style={{
                  position: 'absolute',
                  right: screenWidth / 20,
                  top: 450,
                }}
              />
              <MessageBlockT
                children={' Nice to meet you! \nHow old are you?'}
              />

              <View style={styles.me_imageContainer_t}>
                <Image
                  source={
                    ageSuccess === 0
                      ? mechat
                      : ageSuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        ageSuccess === 0
                          ? 'black'
                          : ageSuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  I'm {param.age} years old.
                </Text>

                <ItemBlock children={`I'm ${param.age} years old.`} />
              </View>
            </>
          )}
        </>
      )}

      {step_5 && (
        <>
          <Image
            source={tom_s_ico}
            style={{position: 'absolute', left: screenWidth / 20, top: 130}}
          />
          <Image
            source={me_icon}
            style={{position: 'absolute', right: screenWidth / 20, top: 230}}
          />
          <MessageBlock children={'I have ADHD. \nWhat about you?'} />

          <View style={styles.me_imageContainer}>
            <Image
              source={
                symptomSuccess === 0
                  ? mechat
                  : symptomSuccess === 1
                  ? verify_msg
                  : wrong_msg_ico
              }
            />
            <Text
              style={[
                styles.s_title,
                {
                  color:
                    symptomSuccess === 0
                      ? 'black'
                      : symptomSuccess === 1
                      ? '#23B80C'
                      : '#FFC700',
                },
              ]}>
              I have {param.symptom}.
            </Text>
            <ItemBlock children={`I have ${param.symptom}.`} />
          </View>
          {step_6 && (
            <>
              <Image
                source={tom_s_ico}
                style={{
                  position: 'absolute',
                  left: screenWidth / 20,
                  top: 350,
                }}
              />
              <Image
                source={me_icon}
                style={{
                  position: 'absolute',
                  right: screenWidth / 20,
                  top: 450,
                }}
              />
              <MessageBlockT children={"What's your gender \nidentity?"} />

              <View style={styles.me_imageContainer_t}>
                <Image
                  source={
                    identifySuccess === 0
                      ? mechat
                      : identifySuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        identifySuccess === 0
                          ? 'black'
                          : identifySuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  I identify as {param.identify}.
                </Text>

                <ItemBlock children={`I identify as ${param.identify}.`} />
              </View>
            </>
          )}
        </>
      )}
      <Image
        source={mic_frame}
        style={{
          position: 'absolute',
          bottom: 150,
          width: (screenWidth * 9) / 10,
          marginLeft: screenWidth / 20,
          marginRight: screenWidth / 20,
          opacity: isLoading ? 1 : 0,
        }}
      />
      <TouchableOpacity
        onPress={() => handleSend()}
        disabled={isLoading}
        style={{
          position: 'absolute',
          bottom: 40,
          right: screenWidth / 2 - 50,
        }}>
        <Image source={repeat_ico} />
      </TouchableOpacity>
      <Text style={styles.text_m}>Press to speak</Text>

      <CustomGreatModal
        visible={showModal}
        icon={thumb_icon}
        handleClick={() => handleContinue()}
        buttonType={showButton}
        onRequestClose={() => setStep_2(false)}
        message="Great job!"
      />
      <CustomGreatModal
        visible={againModal}
        icon={try_again_ico}
        handleClick={() => handleTry()}
        buttonType={showButton}
        onRequestClose={() => setStep_2(false)}
        message="Don't give up"
      />
    </View>
  );
};

export default ReviewSection;

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
  },

  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -75,
    left: 10,
  },

  s_title: {
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -48,
    right: 10,
  },

  m_title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -48,
    right: 10,
  },
  text_m: {
    color: '#1E1D2080',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    position: 'absolute',
    bottom: 20,
    marginTop: 2,
    marginLeft: screenWidth / 2 - 41,
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
  },
  imageContainer: {
    position: 'absolute',
    left: screenWidth / 20 + 50,
    top: 100,
    alignItems: 'center',
  },
  me_imageContainer: {
    position: 'absolute',
    right: screenWidth / 20 + 50,
    top: 220,
    alignItems: 'center',
  },
  imageContainer_t: {
    position: 'absolute',
    left: screenWidth / 20 + 50,
    top: 320,
    alignItems: 'center',
  },
  me_imageContainer_t: {
    position: 'absolute',
    right: screenWidth / 20 + 50,
    top: 440,
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
