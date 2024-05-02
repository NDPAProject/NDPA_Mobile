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
import {textToSpeech, transcribeAudio} from '../../../redux/slices/audio';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import CustomGreatModal from '../../../components/greatModal';
import RewardDialog from '../../../components/rewardModal';

const review_ico = require('../../../../assets/icons/review_ico.png');

const tom_s_ico = require('../../../../assets/icons/tom_s.png');
const repeat_ico = require('../../../../assets/icons/repeact_ico.png');
const mic_frame = require('../../../../assets/icons/mic_frame.png');
const me_icon = require('../../../../assets/icons/me_ico.png');
const turtle_ico = require('../../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../../assets/icons/charm_sound-up.png');
const message = require('../../../../assets/icons/message_b.png');
const mechat = require('../../../../assets/icons/mechat_b.png');
const thumb_icon = require('../../../../assets/icons/great_ico.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');
const welcome_ico = require('../../../../assets/icons/welcome_ico.png');
const verify_msg = require('../../../../assets/icons/verify_msg.png');
const wrong_msg_ico = require('../../../../assets/icons/wrong_msg.png');
const try_again_ico = require('../../../../assets/icons/try_again_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ReviewFriendSection = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [moveModal, setMoveModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [againModal, setAgainModal] = useState(false);
  const [step_2, setStep_2] = useState(false);
  const [step_4, setStep_4] = useState(false);
  const [step_5, setStep_5] = useState(false);
  const [step_6, setStep_6] = useState(false);
  const [step_7, setStep_7] = useState(false);
  const [step_8, setStep_8] = useState(false);
  const [sound, setSound] = useState(false);
  const [nameSuccess, setNameSuccess] = useState(0);
  const [hairSuccess, setHairSuccess] = useState(0);
  const [eyeSuccess, setEyeSuccess] = useState(0);
  const [likeSuccess, setLikeSuccess] = useState(0);
  const [dislikeSuccess, setDislikeSuccess] = useState(0);
  const [lookSuccess, setLookSuccess] = useState(0);
  const [sundaySuccess, setSundaySuccess] = useState(0);
  const [audioPath, setAudioPath] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
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
        hairSuccess: hairSuccess,
        eyeSuccess: eyeSuccess,
        likeSuccess: likeSuccess,
        dislikeSuccess: dislikeSuccess,
        lookSuccess: lookSuccess,
        sundaySuccess: sundaySuccess,
      };
      // navigation.navigate('MainPage', {param: true});
      navigation.navigate('PercentFriendShipSection', {param: data});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    if (step_2 && step_4 && step_5 && step_6 && step_7 && step_8 && step_9) {
      setShowModal(false);
      setMoveModal(true);
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
      const strOriginName = `My best friend is ${param.param.name}.`;
      const strOriginHair = `He has ${param.param.hair} hair.`;
      const strOriginEye = `He has ${param.param.eye} eyes.`;
      const strOriginQualities = `${param.param.name} is ${param.friendLike}.`;
      const strOriginLikes = `${param.param.name} can be ${param.friendDislike}.`;
      const strOriginDislikes = `I value ${param.look}.`;
      const strName = strOriginName
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strHair = strOriginHair
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strEye = strOriginEye
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strQua = strOriginQualities
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strLikes = strOriginLikes
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strDislikes = strOriginDislikes
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      console.log('strText >>> ', strText);
      const tryCount = count + 1;
      setCount(tryCount);
      if (step_2 && !step_4 && !step_5 && !step_6 && !step_7 && !step_8) {
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
      if (step_2 && step_4 && !step_5 && !step_6 && !step_7 && !step_8) {
        console.log('22222222222222222222222');
        if (strText === strHair) {
          setStep_5(true);
          setShowButton(true);
          setHairSuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setHairSuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (step_2 && step_4 && step_5 && !step_6 && !step_7 && !step_8) {
        {
          console.log('33333333333333333333');
          if (strText === strEye) {
            setStep_6(true);
            setShowButton(true);
            setEyeSuccess(1);
            setShowModal(true);
            setCount(0);
            return;
          } else {
            setIsLoading(false);
            setShowButton(false);
            setEyeSuccess(2);
            setAgainModal(true);
            return;
          }
        }
      }
      if (step_2 && step_4 && step_5 && step_6 && !step_7 && !step_8) {
        console.log('44444444444444444444444');
        if (strText === strQua) {
          setStep_7(true);
          setShowButton(true);
          setLikeSuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setLikeSuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (step_2 && step_4 && step_5 && step_6 && step_7 && !step_8) {
        console.log('44444444444444444444444');
        if (strText === strLikes) {
          setStep_8(true);
          setShowButton(true);
          setDislikeSuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setDislikeSuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (step_2 && step_4 && step_5 && step_6 && step_7 && step_8) {
        console.log('44444444444444444444444');
        if (strText === strDislikes) {
          setShowButton(true);
          setLookSuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setLookSuccess(2);
          setAgainModal(true);
          return;
        }
      }
    }
  }, [param, audioTxt]);

  useEffect(() => {
    console.log('count >>>', count);
    if (count == 2) {
      setAgainModal(false);
      setCount(0);
      if (step_2 && !step_4 && !step_5 && !step_6 && !step_7 && !step_8) {
        setShowButton(false);
        setStep_4(true);
        setNameSuccess(2);
        return;
      }
      if (step_2 && step_4 && !step_5 && !step_6 && !step_7 && !step_8) {
        setShowButton(false);
        setStep_5(true);
        setHairSuccess(2);
        return;
      }
      if (step_2 && step_4 && step_5 && !step_6 && !step_7 && !step_8) {
        setShowButton(false);
        setStep_6(true);
        setEyeSuccess(2);
      }
      if (step_2 && step_4 && step_5 && step_6 && !step_7 && !step_8) {
        setShowButton(false);
        setStep_7(true);
        setLikeSuccess(2);
      }
      if (step_2 && step_4 && step_5 && step_6 && step_7 && !step_8) {
        setShowButton(false);
        setStep_8(true);
        setDislikeSuccess(2);
      }
      if (step_2 && step_4 && step_5 && step_6 && step_7 && step_8) {
        setShowButton(false);
        setMoveModal(true);
        setLookSuccess(2);
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

  const ItemBlock = children => (
    <View
      style={{
        flexDirection: 'row',
        gap: 9,
        position: 'absolute',
        top: 70,
        left: 0,
      }}>
      <TouchableOpacity onPress={() => handleClickSound(children)}>
        <Image source={sound_ico} />
      </TouchableOpacity>
      <Image source={turtle_ico} />
    </View>
  );

  const MessageBlock = ({children, tomTop, meTop, top}) => (
    <>
      <Image
        source={tom_s_ico}
        style={{
          position: 'absolute',
          left: screenWidth / 20,
          top: tomTop,
        }}
      />
      <Image
        source={me_icon}
        style={{
          position: 'absolute',
          right: screenWidth / 20,
          top: meTop,
        }}
      />
      <View style={[styles.imageContainer, {top: top}]}>
        <Image source={message} />
        <Text style={styles.title}>{children}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 9,
          position: 'absolute',
          top: top + 80,
          left: screenWidth / 20 + 210,
        }}>
        <TouchableOpacity onPress={() => handleClickSound(children)}>
          <Image source={sound_ico} />
        </TouchableOpacity>
        <Image source={turtle_ico} />
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={() => handleClick()}
        title="Step 3. Review"
        description="Let’s review information about
        your friend together!"
        icon={review_ico}
      />

      <RewardDialog
        modalVisible={moveModal}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        title="Great job!"
        text="You've finished typing level!NN  Claim your reward."
        buttonText="Go to Step 3"
        icon={reward_ico}
      />

      <Header
        visible={false}
        text={'My Friend'}
        color={'#FFFBF8'}
        editalbe={false}
      />
      <ScrollView style={{bottom: 150, marginTop: 150}}>
        <View
          style={{
            width: screenWidth,
            height: screenHeight * 2,
          }}>
          {step_2 && (
            <>
              <MessageBlock
                children={
                  "Hey, I wanted to ask\nyou about your friend.\nWhat's his/her name?"
                }
                top={55}
                tomTop={80}
                meTop={180}
              />
              <View style={[styles.me_imageContainer, {top: 170}]}>
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
                  {`My best friend is ${param.param.name}.`}
                </Text>
                <ItemBlock
                  children={`My best friend is ${param.param.name}.`}
                />
              </View>
            </>
          )}
          {step_4 && (
            <>
              <MessageBlock
                children={`Cool. What does ${param.param.name}\nlook like? Describe\nhis hair.`}
                top={275}
                tomTop={300}
                meTop={400}
              />

              <View style={[styles.me_imageContainer, {top: 390}]}>
                <Image
                  source={
                    hairSuccess === 0
                      ? mechat
                      : hairSuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        hairSuccess === 0
                          ? 'black'
                          : hairSuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`He has ${param.param.hair} hair.`}
                </Text>
                <ItemBlock children={`He has ${param.param.hair} hair.`} />
              </View>
            </>
          )}
          {step_5 && (
            <>
              <MessageBlock
                children={`How about ${param.param.name} eyes?`}
                top={495}
                tomTop={520}
                meTop={620}
              />

              <View style={[styles.me_imageContainer, {top: 610}]}>
                <Image
                  source={
                    eyeSuccess === 0
                      ? mechat
                      : eyeSuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        eyeSuccess === 0
                          ? 'black'
                          : eyeSuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`He has ${param.param.eye} eyes.`}
                </Text>

                <ItemBlock children={`He has ${param.param.eye} eyes.`} />
              </View>
            </>
          )}
          {step_6 && (
            <>
              <MessageBlock
                children={`What qualities does\n${param.param.name} have?`}
                top={715}
                tomTop={740}
                meTop={840}
              />
              <View style={[styles.me_imageContainer, {top: 830}]}>
                <Image
                  source={
                    likeSuccess === 0
                      ? mechat
                      : likeSuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        likeSuccess === 0
                          ? 'black'
                          : likeSuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`${param.param.name} is ${param.friendLike.slice(
                    0,
                    3,
                  )}\n${param.friendLike.slice(3)}`}
                </Text>

                <ItemBlock
                  children={`${param.param.name} is ${param.friendLike}`}
                />
              </View>
            </>
          )}
          {step_7 && (
            <>
              <MessageBlock
                children={`Is there anything you\ndon't like about ${param.param.name}?`}
                top={935}
                tomTop={960}
                meTop={1060}
              />
              <View style={[styles.me_imageContainer, {top: 1050}]}>
                <Image
                  source={
                    dislikeSuccess === 0
                      ? mechat
                      : dislikeSuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        dislikeSuccess === 0
                          ? 'black'
                          : dislikeSuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`${param.param.name} can be ${param.friendDislike.slice(
                    0,
                    2,
                  )}\n ${param.friendDislike.slice(2)}.`}
                </Text>

                <ItemBlock
                  children={`${param.param.name} can be ${param.friendDislike}.`}
                />
              </View>
            </>
          )}
          {step_8 && (
            <>
              <MessageBlock
                children={'What do you look for\nin a friend?'}
                top={1155}
                tomTop={1180}
                meTop={1280}
              />
              <View style={[styles.me_imageContainer, {top: 1270}]}>
                <Image
                  source={
                    lookSuccess === 0
                      ? mechat
                      : lookSuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        lookSuccess === 0
                          ? 'black'
                          : lookSuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`I value ${param.look.slice(0, 2)} \n ${param.look.slice(
                    2,
                  )}.`}
                </Text>

                <ItemBlock children={`I value ${param.look}.`} />
              </View>
            </>
          )}
        </View>
      </ScrollView>
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

export default ReviewFriendSection;

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
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -75,
    left: 10,
  },

  s_title: {
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    bottom: 55,
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
    alignItems: 'center',
  },
  me_imageContainer: {
    position: 'absolute',
    right: screenWidth / 20 + 50,
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
