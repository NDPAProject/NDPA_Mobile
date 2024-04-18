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
import {textToSpeech} from '../../redux/slices/audio';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/header';
import CustomDialog from '../../components/dialogModal';
import RewardDialog from '../../components/rewardModal';

const phone_ico = require('../../../assets/icons/phone_ico.png');
const hand_ico = require('../../../assets/icons/hand_ico.png');
const msg_send_passive = require('../../../assets/icons/msg_send_passive.png');
const msg_send_active = require('../../../assets/icons/msg_send_active.png');

const t_icon = require('../../../assets/icons/tom_ico.png');
const me_icon = require('../../../assets/icons/me.png');
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

const TypingSection = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {txtAudio, isloading} = useSelector(state => state.audio);
  const [modalVisible, setModalVisible] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [sendClick, setSendClick] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [step_2, setStep_2] = useState(false);
  const [step_3, setStep_3] = useState(false);
  const [step_4, setStep_4] = useState(false);
  const [step_5, setStep_5] = useState(false);
  const [step_6, setStep_6] = useState(false);

  const [text, setText] = useState('');
  const [age, setAge] = useState('');
  const [symptom, setSymptom] = useState('');
  const [identify, setIdentify] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const initialBottom = Dimensions.get('window').height / 2 - 50;
  const [bottomPadding, setBottomPadding] = useState(initialBottom);

  const messageIcon = text ? msg_send_active : msg_send_passive;
  const sendIcon = age ? msg_send_active : msg_send_passive;
  const symptomIcon = symptom ? msg_send_active : msg_send_passive;
  const identifyIcon = identify ? msg_send_active : msg_send_passive;

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
      // navigation.navigate('SpeakingSection', {param: text});
       navigation.navigate('MainPage', {param: true});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleSendName = async () => {
    try {
      setStep_3(true);
      setStep_2(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleSendAge = async () => {
    try {
      setStep_4(true);
      setStep_3(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleSendSymptom = async symptom => {
    try {
      console.log('=-=-=Clicked Inputfield=-=--', symptom);
      if (symptom !== 'Enter another variant') {
        setSymptom(symptom);
        setShowKeyboard(false);
        setStep_4(false);
        setStep_5(true);
      }
      setShowKeyboard(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickSym = async () => {
    try {
      setStep_4(false);
      setShowKeyboard(false);
      setStep_5(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleSendIdentify = async identify => {
    try {
      console.log('=-=-=Clicked Inputfield=-=--', identify);
      if (identify !== 'Enter another variant') {
        setIdentify(identify);
        setStep_5(false);
        setStep_6(true);
        setShowKeyboard(false);
      }
      setShowKeyboard(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickIden = async () => {
    try {
      setStep_5(false);
      setShowKeyboard(true);
      setStep_6(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

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

  //   useEffect(() => {
  //     if (modalVisible) {
  //       const txt = 'Hi! My name is Tom. What is your name?';
  //       dispatch(textToSpeech(txt));
  //     }
  //   }, [modalVisible, dispatch]);

  //   useEffect(() => {
  //     if (txtAudio) {
  //       playAudio(txtAudio);
  //     }
  //   }, []);

  const playAudio = async audioBase64 => {
    console.log('---------playAudio---------');

    const path = `${RNFS.DocumentDirectoryPath}/ttsAudio.mp3`;

    await RNFS.writeFile(path, audioBase64, 'base64');

    new Player(path).play().on('ended', () => {});
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
          top: 205,
          right: screenWidth / 20,
        }}>
        <Image source={sound_ico} />
        <Image source={turtle_ico} />
      </View>
    </>
  );

  const SelectableButton = ({label, onPress}) => (
    <TouchableOpacity style={styles.select} onPress={onPress} activeOpacity={1}>
      <Text style={styles.text_m}>{label}</Text>
    </TouchableOpacity>
  );

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

      {step_2 && (
        <>
          <MessageBlock
            children={' Hi! My name is Tom. \nWhat is your name?'}
          />

          <View style={styles.me_imageContainer}>
            <Image source={mechat} />

            <>
              <Text style={styles.m_title}>
                Hi! My name is {text || '___'} .
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

            <TouchableOpacity
              style={{position: 'absolute', top: 23, right: 25}}
              onPress={handleSendName}>
              <Image source={messageIcon} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {step_3 && (
        <>
          <MessageBlock children={' Nice to meet you! \nHow old are you?'} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat} />

            <>
              <Text style={styles.m_title}>I'm {age || '___'} years old.</Text>
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
          <View style={[styles.chatBackground]}>
            <TextInput
              style={[styles.input]}
              placeholder="Write here..."
              placeholderTextColor="#969596"
              value={age}
              onChangeText={age => {
                setAge(age);
              }}
              autoCapitalize="none"
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={{position: 'absolute', top: 23, right: 25}}
              onPress={handleSendAge}>
              <Image source={sendIcon} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {step_4 && (
        <>
          <MessageBlock children={'I have ADHD. \nWhat about you?'} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat} />

            <>
              <Text style={styles.m_title}>I have {symptom || '_____'}.</Text>
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

          {showKeyboard ? (
            <View style={[styles.chatBackground]}>
              <TextInput
                style={[styles.input]}
                placeholder="Write here..."
                placeholderTextColor="#969596"
                value={symptom}
                onChangeText={symptom => {
                  setSymptom(symptom);
                }}
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={{position: 'absolute', top: 23, right: 25}}
                onPress={handleClickSym}>
                <Image source={symptomIcon} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.selectBackground]}>
              {conditions.map(condition => (
                <SelectableButton
                  key={condition.id}
                  label={condition.label}
                  onPress={() => handleSendSymptom(condition.label)}
                />
              ))}
            </View>
          )}
        </>
      )}
      {step_5 && (
        <>
          <MessageBlock children={"What's your gender \nidentity?"} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat} />

            <>
              <Text style={styles.m_title}>
                I identify as {identify || '_____'} .
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

          {!showKeyboard ? (
            <View style={[styles.chatBackground]}>
              <TextInput
                style={[styles.input]}
                placeholder="Write here..."
                placeholderTextColor="#969596"
                value={identify}
                onChangeText={identify => {
                  setIdentify(identify);
                }}
                autoCapitalize="none"
              />

              <TouchableOpacity
                style={{position: 'absolute', top: 23, right: 25}}
                onPress={handleClickIden}>
                <Image source={identifyIcon} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.selectBackground]}>
              {identifys.map(condition => (
                <SelectableButton
                  key={condition.id}
                  label={condition.label}
                  onPress={() => handleSendIdentify(condition.label)}
                />
              ))}
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default TypingSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
    width: screenWidth,
  },
  overlay: {
    flex: 1,
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
  select: {
    borderWidth: 1,
    borderColor: '#F08080',
    height: 46,
    width: (screenWidth * 9) / 10,
    // marginTop: 5,
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
    color: '#F08080',
    fontSize: 21,
    fontFamily: 'OpenSans-bold',
    textAlign: 'center',
    marginTop: 3,
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

  selectBackground: {
    gap: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: (screenHeight * 1.25) / 3,
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
