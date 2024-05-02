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
  PermissionsAndroid,
  Platform,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';

import {
  transcribeAudio,
  setStateFunc,
  setisLoading,
} from '../../../redux/slices/audio';

import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import ChatBox from '../../../components/chatBox';

const task_ico = require('../../../../assets/icons/learn/task.png');
const thumb_icon = require('../../../../assets/icons/great_ico.png');
const avatar_ico = require('../../../../assets/icons/learn/choice/avatar_ico.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');

const mico_ico = require('../../../../assets/icons/mico.png');
const msg_send_passive = require('../../../../assets/icons/msg_send_passive.png');
const msg_send_active = require('../../../../assets/icons/msg_send_active.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const IndependenceSection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {audioTxt, txtAudio} = useSelector(state => state.audio);
  const [modalVisible, setModalVisible] = useState(true);
  const [move, setMove] = useState(false);
  const [comment, setComment] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [audioPath, setAudioPath] = useState('');
  const messageIcon = comment ? msg_send_active : msg_send_passive;
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMove(false);
      setModalVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleContinue = () => {
    setMove(true);
  };

  const handleClick = async () => {
    try {
      setModalVisible(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleClickMove = async () => {
    try {
      console.log('-------------data--------------');
      dispatch(setStateFunc(null));
      navigation.navigate('SetTimeSection');
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
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
      setComment(audioTxt?.DisplayText);
      setIsLoading(false);
    }
  }, [audioTxt]);

  const onStartRecord = async () => {
    setIsLoading(true);
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
            console.log('--------wavFilePath----------------', wavFilePath);
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

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={task_ico}
        title="Step 1. Set tasks"
        description="Let’s define what do you want to do independently"
      />

      <RewardDialog
        modalVisible={move}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        title="Great job!"
        text="You've finished typing level!NN  Claim your reward."
        buttonText="Go to Step 2"
        icon={reward_ico}
      />

      <Header
        visible={false}
        text={'Independence'}
        color={'#FFFBF8'}
        editalbe={false}
      />

      <Image source={avatar_ico} style={styles.avatar} />
      <Text style={styles.title}>
        {'What do you want\nto do independently?'}
      </Text>
      <View style={styles.input}>
        <Text style={styles.text}>{comment}</Text>
      </View>

      <ChatBox
        text={comment}
        handleChangeText={setComment}
        handleSend={handleContinue}
        messageIcon={messageIcon}
        bottom={0}
        mico={true}
      />
      <TouchableOpacity
        style={{position: 'absolute', bottom: 60, right: 15}}
        disabled={isLoading}
        onPress={() => onStartRecord()}>
        <Image source={mico_ico} />
      </TouchableOpacity>
    </View>
  );
};

export default IndependenceSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
    width: screenWidth,
  },
  container_s: {
    padding: 10,
    marginBottom: 100,
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
  text: {
    color: 'black',
    alignItems: 'center',
    textAlign: 'left',
    fontSize: 16,
    padding: 5,
    fontWeight: '600',
    fontFamily: 'OpenSans-Medium',
  },
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  input: {
    width: (screenWidth * 9) / 10,
    height: 170,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 25,
    borderColor: '#F08080',
    backgroundColor: 'white',
  },
});
