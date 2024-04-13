import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {textToSpeech} from '../../redux/slices/audio';
import {BlurView} from '@react-native-community/blur';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/header';
import CustomStepModal from '../../components/stepModal';
import CustomDialog from '../../components/dialogModal';
import CustomGreatModal from '../../components/greatModal';
import MoveDialog from '../../components/moveDialog';

const phone_ico = require('../../../assets/icons/phone_ico.png');
const close_ico = require('../../../assets/icons/m_close_ico.png');
const hand_ico = require('../../../assets/icons/hand_ico.png');
const msg_send_passive = require('../../../assets/icons/msg_send_passive.png');
const msg_send_active = require('../../../assets/icons/msg_send_active.png');

const t_icon = require('../../../assets/icons/tom_ico.png');
const me_icon = require('../../../assets/icons/me.png');
const turtle_ico = require('../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../assets/icons/charm_sound-up.png');
const message = require('../../../assets/icons/message.png');
const mechat = require('../../../assets/icons/mechat.png');
const thumb_icon = require('../../../assets/icons/great_ico.png');
const welcome_ico = require('../../../assets/icons/welcome_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const TypingSection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {txtAudio, isloading} = useSelector(state => state.audio);
  const [modalVisible, setModalVisible] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [sendClick, setSendClick] = useState(false);
  const [showHand, setShowHand] = useState(false);
  const [step_2, setStep_2] = useState(false);
  const [step_3, setStep_3] = useState(false);
  const [step_4, setStep_4] = useState(false);
  const [step_5, setStep_5] = useState(false);
  const [text, setText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const initialBottom = Dimensions.get('window').height / 2 - 50;
  const [bottomPadding, setBottomPadding] = useState(initialBottom);

  const messageIcon = text ? msg_send_active : msg_send_passive;

  const handleContinue = async () => {
    try {
      console.log('--------clicked---------------');
      setStep_5(true);
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

  const handleSend = async () => {
    try {
      setSendClick(true);
      setStep_4(true);
      setStep_3(false);
      // setModalVisible(false);
      console.log('=-=-=handleSend-=-=--', step_4, sendClick);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleInput = async () => {
    try {
      // setModalVisible(false);
      setStep_3(true);
      setStep_2(false);
      setShowImage(false);
      console.log('=-=-=Clicked Inputfield=-=--', step_2, modalVisible, step_3);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickSkip = async () => {
    try {
      console.log(
        '=-=-=Clicked handleClickSkip=-=--',
        step_2,
        modalVisible,
        step_3,
      );
      navigation.navigate('MainPage', {param: true});
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
      setModalVisible(false);
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
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        const keyboardHeight = e.endCoordinates.height;
        const newBottomPadding = initialBottom + keyboardHeight - 465; // Adjust accordingly
        console.log('......newBottomPadding....', newBottomPadding);
        setBottomPadding(newBottomPadding);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setBottomPadding(initialBottom);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (modalVisible) {
      const txt = 'Hi! My name is Tom. What is your name?';
      dispatch(textToSpeech(txt));
    }
  }, [modalVisible, dispatch]);

  useEffect(() => {
    if (txtAudio) {
      playAudio(txtAudio);
    }
  }, []);

  const playAudio = async audioBase64 => {
    console.log('---------playAudio---------');

    const path = `${RNFS.DocumentDirectoryPath}/ttsAudio.mp3`;

    await RNFS.writeFile(path, audioBase64, 'base64');

    new Player(path).play().on('ended', () => {});
  };

  return (
    <View style={styles.container}>
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
      />

      <MoveDialog
        modalVisible={step_5}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        text="Great job! Let's move NNto the speaking part"
        icon={welcome_ico}
      />

      <CustomStepModal
        visible={step_3}
        onRequestClose={() => setStep_3(false)}
        stepText="3/5"
        message="Use the keyboard to write your name.NNYou can also select from the options."
      />

      <Header visible={true} />

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
          <Image source={mechat} />
          {sendClick ? (
            <>
              <Text style={styles.m_title}>Hi! My name is {text}.</Text>
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
          ) : (
            <Text style={styles.m_title}>Hi! My name is ____.</Text>
          )}
        </View>
      </Modal>

      <Modal visible={!modalVisible && !step_4} transparent={true}>
        <View style={styles.chatBackground}>
          {!step_3 && (
            <TouchableOpacity
              onPress={handleClickSkip}
              style={{
                position: 'absolute',
                bottom: screenHeight / 2 - 50,
                right: screenWidth / 14,
                // padding: screenWidth / 20,
              }}>
              <Text style={styles.text_m3}>Skip</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.input}
            onPress={handleInput}
            activeOpacity={1} // Keeps the overlay visible
          >
            <Text style={styles.text_m}>Write here...</Text>
            <Image
              source={messageIcon}
              style={{position: 'absolute', top: 3, right: 3}}
            />
            {showHand && (
              <Image
                animationType="slide"
                source={hand_ico}
                style={{
                  position: 'absolute',
                  bottom: -50,
                  right: screenWidth / 3,
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={step_3} transparent={true}>
        <View style={[styles.chatBackground]}>
          <TextInput
            style={[styles.input]}
            placeholder="Write here..."
            placeholderTextColor="#969596"
            value={text}
            onChangeText={text => {
              setText(text);
            }}
            autoCapitalize="none"
          />
          {step_3 && (
            <TouchableOpacity
              // onPress={navigation.navigate('MainPage')}
              style={{
                position: 'absolute',
                // bottom: screenHeight / 2 - 50,
                bottom: bottomPadding,
                right: screenWidth / 14,
              }}>
              <Text style={styles.text_m3}>Skip</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{position: 'absolute', top: 23, right: 25}}
            onPress={handleSend}>
            <Image source={messageIcon} />
          </TouchableOpacity>
        </View>
      </Modal>

      <CustomGreatModal
        visible={step_4}
        hand_ico={hand_ico}
        icon={thumb_icon}
        showImage={showImage}
        buttonType={true}
        handleClick={handleContinue}
        onRequestClose={() => setStep_2(false)}
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
  },
  overlay: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    height: 40,
    width: (screenWidth * 9) / 10,
    marginTop: -40,
    padding: 1,
    paddingLeft: 30,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
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
    color: '#969596',
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'left',
    marginTop: 6,
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
  chatBackground: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 59,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: 135,
    bottom: 0,
    position: 'absolute',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 15,
  },
});
