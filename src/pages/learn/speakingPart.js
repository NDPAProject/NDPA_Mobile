import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
// Import React and Component
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RewardDialog from '../../components/rewardModal';
import {
  textToSpeech,
  transcribeAudio,
  setStateFunc,
} from '../../redux/slices/audio';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';

//
import Header from '../../components/header';
import CustomDialog from '../../components/dialogModal';
import CustomGreatModal from '../../components/greatModal';

const speaking_ico = require('../../../assets/icons/speaking_ico.png');
const hand_ico = require('../../../assets/icons/hand_ico.png');

const mic_ico = require('../../../assets/icons/mic_ico.png');
const mic_frame = require('../../../assets/icons/mic_frame.png');
const t_icon = require('../../../assets/icons/tom_ico.png');
const me_icon = require('../../../assets/icons/me.png');
const turtle_ico = require('../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../assets/icons/charm_sound-up.png');
const message = require('../../../assets/icons/message.png');
const mechat = require('../../../assets/icons/mechat.png');
const thumb_icon = require('../../../assets/icons/great_ico.png');
const reward_ico = require('../../../assets/icons/main/reward.png');
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
  const [step_6, setStep_6] = useState(false);
  const [step_7, setStep_7] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [progress, setProgress] = useState(0.25);
  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState(false);
  const [imageSource, setImageSource] = useState(mechat);
  const [showButton, setShowButton] = useState(false);
  const [content, setContent] = useState('');
  const [count, setCount] = useState(0);

  const {audioTxt, txtAudio} = useSelector(state => state.audio);

  const audioRecorderPlayer = new AudioRecorderPlayer();

  const {param} = route.params;

  // const param = 'test';

  console.log('-----------------audioTxt---------------', audioTxt, param);

  const handleClick = async () => {
    try {
      setStep_2(true);
      setModalVisible(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleClickContinue = async () => {
    try {
      setContent('');
      setCount(0);
      if (step_2) {
        setStep_2(false);
        setShowButton(false);
        setProgress(0.5);
        setStep_3(true);
      }
      if (step_3) {
        setStep_3(false);
        setShowButton(false);
        setProgress(0.75);
        setStep_4(true);
      }
      if (step_4) {
        setStep_4(false);
        setShowButton(false);
        setProgress(1);
        setStep_5(true);
      }
      if (step_5) {
        // setStep_5(false);
        setShowButton(false);
        setStep_6(true);
      }
      if (step_6) {
        console.log('-----------============------------');
        setStep_6(false);
        setShowButton(false);
        setStep_7(true);
      }
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleClickMove = async () => {
    try {
      setStep_2(true);
      // navigation.navigate('Main');
      navigation.navigate('ReviewSection', {param: param});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleSend = async () => {
    try {
      setIsLoading(true);
      setContent('');
      await onStartRecord();
      console.log('-------audioPath--------', audioPath);
      // setStep_2(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const onStartRecord = async () => {
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
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
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
          console.log('exists ', exists);
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

  const handleClickSound = async txt => {
    try {
      await dispatch(textToSpeech(txt));
      setSound(true);
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
          setIsLoading(false);
        } else {
          console.log('Playback failed due to audio decoding errors');
          setIsLoading(false);
        }
      });
    });
  };

  useEffect(() => {
    console.log('Updated audioPath:', audioPath);
    if (audioPath) {
      setTimeout(async () => {
        dispatch(transcribeAudio(audioPath));
        setAudioPath('');
      }, 200);
    }
  }, [audioPath]);

  useEffect(() => {
    if (audioTxt !== null) {
      const strName = param.name
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strAge = param.age
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strIdentify = param.identify
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strSymptom = param.symptom
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strText = audioTxt?.DisplayText.toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      setContent(audioTxt?.DisplayText);
      const tryCount = count;
      setCount(tryCount + 1);
      if (step_2 && strName === strText) {
        console.log('here 2 >>>');
        setImageSource(mechat);
        setShowButton(true);
        setIsLoading(false);
        return;
      }
      if (step_3 && strAge === strText) {
        console.log('here 3 >>>');
        setImageSource(mechat);
        setShowButton(true);
        setIsLoading(false);
        return;
      }
      if (step_4 && strIdentify === strText) {
        console.log('here 4 >>>');
        setImageSource(mechat);
        setShowButton(true);
        setIsLoading(false);
        return;
      }
      if (step_5 && strSymptom === strText) {
        console.log('here 5 >>>');
        setImageSource(mechat);
        setShowButton(true);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setImageSource(wrong_msg_ico);
    } else {
      setImageSource(mechat);
    }
  }, [param.name, audioTxt]);

  useEffect(() => {
    console.log('------------step_7------------:', step_6);
    if (step_6) {
      dispatch(setStateFunc(null));
    }
  }, [step_6]);

  useEffect(() => {
    console.log('count >>>', count);
    if (count == 2) {
      setContent('');
      setCount(0);
      if (step_2) {
        setStep_2(false);
        setShowButton(false);
        setProgress(0.5);
        setStep_3(true);
        setImageSource(mechat);
        return;
      }
      if (step_3) {
        setStep_3(false);
        setShowButton(false);
        setProgress(0.75);
        setStep_4(true);
        setImageSource(mechat);
        return;
      }
      if (step_4) {
        setStep_4(false);
        setShowButton(false);
        setProgress(1);
        setStep_5(true);
        setImageSource(mechat);
        return;
      }
      if (step_5) {
        // setStep_5(false);
        setShowButton(false);
        setStep_6(true);
      }
      if (step_6) {
        console.log('-----------============------------');
        setStep_6(false);
        setShowButton(false);
        setStep_7(true);
      }
    }
  }, [count]);

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
          top: 205,
          right: screenWidth / 20,
        }}>
        <TouchableOpacity onPress={() => handleClickSound(children)}>
          <Image source={sound_ico} />
        </TouchableOpacity>
        <Image source={turtle_ico} />
      </View>
    </>
  );

  const RecordButton = () => (
    <>
      <TouchableOpacity
        onPress={handleSend}
        disabled={isLoading}
        style={{
          position: 'absolute',
          bottom: 40,
          right: screenWidth / 2 - 50,
        }}>
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 40,
            }}>
            <ActivityIndicator size="large" color="#F08080" />
          </View>
        ) : (
          <>
            <Image source={mic_ico} />
            <Text style={styles.text_m}>Press to speak</Text>
          </>
        )}
      </TouchableOpacity>
    </>
  );

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

      <RewardDialog
        modalVisible={step_7}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        title="Great job!"
        text="You've finished speaking level!NN  Claim your reward."
        buttonText="Go to Step 3"
        icon={reward_ico}
      />

      <Header
        visible={true}
        text={'Introducing yourself'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      <Image
        source={t_icon}
        style={{position: 'absolute', left: screenWidth / 20, top: 130}}
      />
      <Image
        source={me_icon}
        style={{position: 'absolute', right: screenWidth / 20, top: 330}}
      />

      {step_2 && (
        <>
          <MessageBlock
            children={' Hi! My name is Tom. \nWhat is your name?'}
          />

          <View style={styles.me_imageContainer}>
            <Image source={imageSource} />

            <>
              <Text style={styles.m_title}>
                Hi! My name is {content || '___'} .
              </Text>
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
          {!showButton && <RecordButton />}
        </>
      )}

      {step_3 && (
        <>
          <MessageBlock children={' Nice to meet you! \nHow old are you?'} />

          <View style={styles.me_imageContainer}>
            <Image source={imageSource} />

            <>
              <Text style={styles.m_title}>
                I'm {content || '___'} years old.
              </Text>
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
          {!showButton && <RecordButton />}
        </>
      )}

      {step_4 && (
        <>
          <MessageBlock children={'I have ADHD. \nWhat about you?'} />

          <View style={styles.me_imageContainer}>
            <Image source={imageSource} />

            <>
              <Text style={styles.m_title}>I have {content || '___'}.</Text>
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
          {!showButton && <RecordButton />}
        </>
      )}

      {step_5 && (
        <>
          <MessageBlock children={"What's your gender \nidentity?"} />

          <View style={styles.me_imageContainer}>
            <Image source={imageSource} />

            <>
              <Text style={styles.m_title}>
                I identify as {content || '___'}.
              </Text>
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
          {!showButton && <RecordButton />}
        </>
      )}

      {showButton && (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: (screenWidth * 8) / 10,
            height: 57,
            position: 'absolute',
            bottom: 40,
            borderRadius: 45,
            backgroundColor: '#F08080',
          }}
          onPress={() => handleClickContinue()}>
          <Text style={styles.b1_text}>Continue</Text>
        </TouchableOpacity>
      )}

      <CustomGreatModal
        visible={step_6}
        hand_ico={hand_ico}
        icon={thumb_icon}
        showImage={showImage}
        buttonType={true}
        handleClick={() => handleClickContinue()}
        onRequestClose={() => handleClickContinue()}
        message="Great job!"
      />
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

  b1_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    width: (screenWidth * 9) / 10,
    height: 57,
    borderRadius: 45,
    backgroundColor: '#F08080',
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
  b3_text: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
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
