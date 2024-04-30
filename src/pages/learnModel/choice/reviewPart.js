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
import MoveDialog from '../../../components/moveDialog';

const review_ico = require('../../../../assets/icons/review_ico.png');

const tom_s_ico = require('../../../../assets/icons/tom_s.png');
const repeat_ico = require('../../../../assets/icons/repeact_ico.png');
const mic_frame = require('../../../../assets/icons/mic_frame.png');
const me_icon = require('../../../../assets/icons/me_ico.png');
const turtle_ico = require('../../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../../assets/icons/charm_sound-up.png');
const message = require('../../../../assets/icons/message.png');
const mechat = require('../../../../assets/icons/mechat_b.png');
const thumb_icon = require('../../../../assets/icons/great_ico.png');
const welcome_ico = require('../../../../assets/icons/welcome_ico.png');
const verify_msg = require('../../../../assets/icons/verify_msg.png');
const wrong_msg_ico = require('../../../../assets/icons/wrong_msg.png');
const try_again_ico = require('../../../../assets/icons/try_again_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ReviewActSection = ({route}) => {
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
  const [step_9, setStep_9] = useState(false);
  const [sound, setSound] = useState(false);
  const [mondaySuccess, setMondaySuccess] = useState(0);
  const [tuesdaySuccess, setTuesdaySuccess] = useState(0);
  const [wednesdaySuccess, setWednesdaySuccess] = useState(0);
  const [thursdaySuccess, setThursdaySuccess] = useState(0);
  const [fridaySuccess, setFridaySuccess] = useState(0);
  const [saturdaySuccess, setSaturdaySuccess] = useState(0);
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
        mondaySuccess: mondaySuccess,
        tuesdaySuccess: tuesdaySuccess,
        wednesdaySuccess: wednesdaySuccess,
        thursdaySuccess: thursdaySuccess,
        fridaySuccess: fridaySuccess,
        saturdaySuccess: saturdaySuccess,
        sundaySuccess: sundaySuccess,
      };
      // navigation.navigate('MainPage', {param: true});
      navigation.navigate('PersonalChoiceSection', {param: data});
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
      const strOriginMonday = `On Monday,I usually like to ${param.data[0]}.`;
      const strOriginTuesday = `On Tuesday,I would like to ${param.data[1]}.`;
      const strOriginWednesday = `On Wednesday,I like to ${param.data[2]}.`;
      const strOriginThursday = `On Thursday, I like to ${param.data[3]}.`;
      const strOriginFriday = `On Friday, I usually like to ${param.data[4]}.`;
      const strOriginSaturday = `On Saturday, I would like to ${param.data[5]}.`;
      const strOriginSunday = `On Sunday, I like to ${param.data[6]}.`;
      const strMonday = strOriginMonday
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strTuesday = strOriginTuesday
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strWednesday = strOriginWednesday
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strThursday = strOriginThursday
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strFriday = strOriginFriday
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strSaturday = strOriginSaturday
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      const strSunday = strOriginSunday
        .toLowerCase()
        .replaceAll('.', '')
        .replaceAll('!', '')
        .replaceAll(',', '')
        .replaceAll(' ', '');
      console.log('strText >>> ', strText);
      const tryCount = count + 1;
      setCount(tryCount);
      if (
        step_2 &&
        !step_4 &&
        !step_5 &&
        !step_6 &&
        !step_7 &&
        !step_8 &&
        !step_9
      ) {
        console.log('1111111111111111111111');
        if (strText === strMonday) {
          setStep_4(true);
          setShowButton(true);
          setMondaySuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setMondaySuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (
        step_2 &&
        step_4 &&
        !step_5 &&
        !step_6 &&
        !step_7 &&
        !step_8 &&
        !step_9
      ) {
        console.log('22222222222222222222222');
        if (strText === strTuesday) {
          setStep_5(true);
          setShowButton(true);
          setTuesdaySuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setTuesdaySuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (
        step_2 &&
        step_4 &&
        step_5 &&
        !step_6 &&
        !step_7 &&
        !step_8 &&
        !step_9
      ) {
        {
          console.log('33333333333333333333');
          if (strText === strWednesday) {
            setStep_6(true);
            setShowButton(true);
            setWednesdaySuccess(1);
            setShowModal(true);
            setCount(0);
            return;
          } else {
            setIsLoading(false);
            setShowButton(false);
            setWednesdaySuccess(2);
            setAgainModal(true);
            return;
          }
        }
      }
      if (
        step_2 &&
        step_4 &&
        step_5 &&
        step_6 &&
        !step_7 &&
        !step_8 &&
        !step_9
      ) {
        console.log('44444444444444444444444');
        if (strText === strThursday) {
          setStep_7(true);
          setShowButton(true);
          setThursdaySuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setThursdaySuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (
        step_2 &&
        step_4 &&
        step_5 &&
        step_6 &&
        step_7 &&
        !step_8 &&
        !step_9
      ) {
        console.log('44444444444444444444444');
        if (strText === strFriday) {
          setStep_8(true);
          setShowButton(true);
          setFridaySuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setFridaySuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (step_2 && step_4 && step_5 && step_6 && step_7 && step_8 && !step_9) {
        console.log('44444444444444444444444');
        if (strText === strSaturday) {
          setStep_9(true);
          setShowButton(true);
          setSaturdaySuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setSaturdaySuccess(2);
          setAgainModal(true);
          return;
        }
      }
      if (step_2 && step_4 && step_5 && step_6 && step_7 && step_8 && step_9) {
        console.log('44444444444444444444444');
        if (strText === strSunday) {
          setShowButton(true);
          setSundaySuccess(1);
          setShowModal(true);
          setCount(0);
          return;
        } else {
          setIsLoading(false);
          setShowButton(false);
          setSundaySuccess(2);
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
      if (
        step_2 &&
        !step_4 &&
        !step_5 &&
        !step_6 &&
        !step_7 &&
        !step_8 &&
        !step_9
      ) {
        setShowButton(false);
        setStep_4(true);
        setMondaySuccess(2);
        return;
      }
      if (
        step_2 &&
        step_4 &&
        !step_5 &&
        !step_6 &&
        !step_7 &&
        !step_8 &&
        !step_9
      ) {
        setShowButton(false);
        setStep_5(true);
        setTuesdaySuccess(2);
        return;
      }
      if (
        step_2 &&
        step_4 &&
        step_5 &&
        !step_6 &&
        !step_7 &&
        !step_8 &&
        !step_9
      ) {
        setShowButton(false);
        setStep_6(true);
        setWednesdaySuccess(2);
      }
      if (
        step_2 &&
        step_4 &&
        step_5 &&
        step_6 &&
        !step_7 &&
        !step_8 &&
        !step_9
      ) {
        setShowButton(false);
        setStep_7(true);
        setThursdaySuccess(2);
      }
      if (
        step_2 &&
        step_4 &&
        step_5 &&
        step_6 &&
        step_7 &&
        !step_8 &&
        !step_9
      ) {
        setShowButton(false);
        setStep_8(true);
        setFridaySuccess(2);
      }
      if (step_2 && step_4 && step_5 && step_6 && step_7 && step_8 && !step_9) {
        setShowButton(false);
        setStep_9(true);
        setSaturdaySuccess(2);
      }
      if (step_2 && step_4 && step_5 && step_6 && step_7 && step_8 && step_9) {
        setShowButton(false);
        setMoveModal(true);
        setSundaySuccess(2);
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
        icon={review_ico}
      />

      <MoveDialog
        modalVisible={moveModal}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        text="Great job! Now you areNN ready to use the app!"
        icon={welcome_ico}
        visible={true}
      />

      <Header
        visible={false}
        text={'Weekly Plan'}
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
                children={'What would you like\nto do on Monday?'}
                top={55}
                tomTop={80}
                meTop={180}
              />
              <View style={[styles.me_imageContainer, {top: 170}]}>
                <Image
                  source={
                    mondaySuccess === 0
                      ? mechat
                      : mondaySuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />

                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        mondaySuccess === 0
                          ? 'black'
                          : mondaySuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`On Monday,I usually\nlike to ${param.data[0]}.`}
                </Text>
                <ItemBlock
                  children={`On Monday,I usually\nlike to ${param.data[0]}.`}
                />
              </View>
            </>
          )}
          {step_4 && (
            <>
              <MessageBlock
                children={'What about Tuesday?'}
                top={275}
                tomTop={300}
                meTop={400}
              />

              <View style={[styles.me_imageContainer, {top: 390}]}>
                <Image
                  source={
                    tuesdaySuccess === 0
                      ? mechat
                      : tuesdaySuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        tuesdaySuccess === 0
                          ? 'black'
                          : tuesdaySuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`On Tuesday,I would\nlike to ${param.data[1]}.`}
                </Text>
                <ItemBlock
                  children={`On Tuesday,I would\nlike to ${param.data[1]}.`}
                />
              </View>
            </>
          )}
          {step_5 && (
            <>
              <MessageBlock
                children={'What about \nWednesday?'}
                top={495}
                tomTop={520}
                meTop={620}
              />

              <View style={[styles.me_imageContainer, {top: 610}]}>
                <Image
                  source={
                    wednesdaySuccess === 0
                      ? mechat
                      : wednesdaySuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        wednesdaySuccess === 0
                          ? 'black'
                          : wednesdaySuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`On Wednesday,I \nlike to ${param.data[2]}.`}
                </Text>

                <ItemBlock
                  children={`On Wednesday,I \nlike to ${param.data[2]}.`}
                />
              </View>
            </>
          )}
          {step_6 && (
            <>
              <MessageBlock
                children={'How about Thursday?'}
                top={715}
                tomTop={740}
                meTop={840}
              />
              <View style={[styles.me_imageContainer, {top: 830}]}>
                <Image
                  source={
                    thursdaySuccess === 0
                      ? mechat
                      : thursdaySuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        thursdaySuccess === 0
                          ? 'black'
                          : thursdaySuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`On Thursday, I like\nto ${param.data[3]}.`}
                </Text>

                <ItemBlock
                  children={`On Thursday, I like\nto ${param.data[3]}.`}
                />
              </View>
            </>
          )}
          {step_7 && (
            <>
              <MessageBlock
                children={'What about Friday?'}
                top={935}
                tomTop={960}
                meTop={1060}
              />
              <View style={[styles.me_imageContainer, {top: 1050}]}>
                <Image
                  source={
                    fridaySuccess === 0
                      ? mechat
                      : fridaySuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        fridaySuccess === 0
                          ? 'black'
                          : fridaySuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`On Friday, I usually\nlike to ${param.data[4]}.`}
                </Text>

                <ItemBlock
                  children={`On Friday, I usually\nlike to ${param.data[4]}.`}
                />
              </View>
            </>
          )}
          {step_8 && (
            <>
              <MessageBlock
                children={'What would you like\nto do on Saturday?'}
                top={1155}
                tomTop={1180}
                meTop={1280}
              />
              <View style={[styles.me_imageContainer, {top: 1270}]}>
                <Image
                  source={
                    saturdaySuccess === 0
                      ? mechat
                      : saturdaySuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        saturdaySuccess === 0
                          ? 'black'
                          : saturdaySuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`On Saturday, I would\nlike to ${param.data[5]}.`}
                </Text>

                <ItemBlock
                  children={`On Saturday, I would\nlike to ${param.data[5]}.`}
                />
              </View>
            </>
          )}
          {step_9 && (
            <>
              <MessageBlock
                children={'What about Sunday?'}
                top={1375}
                tomTop={1400}
                meTop={1500}
              />
              <View style={[styles.me_imageContainer, {top: 1490}]}>
                <Image
                  source={
                    sundaySuccess === 0
                      ? mechat
                      : sundaySuccess === 1
                      ? verify_msg
                      : wrong_msg_ico
                  }
                />
                <Text
                  style={[
                    styles.s_title,
                    {
                      color:
                        sundaySuccess === 0
                          ? 'black'
                          : sundaySuccess === 1
                          ? '#23B80C'
                          : '#FFC700',
                    },
                  ]}>
                  {`On Sunday, I like to \n${param.data[6]}.`}
                </Text>

                <ItemBlock
                  children={`On Sunday, I like to \n${param.data[6]}.`}
                />
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

export default ReviewActSection;

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
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    bottom: 60,
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
