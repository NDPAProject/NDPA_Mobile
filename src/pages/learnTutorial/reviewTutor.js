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
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../components/header';
import CustomStepModal from '../../components/stepModal';
import CustomDialog from '../../components/dialogModal';
import CustomGreatModal from '../../components/greatModal';
import MoveDialog from '../../components/moveDialog';

const review_ico = require('../../../assets/icons/review_ico.png');
const hand_ico = require('../../../assets/icons/hand_ico.png');
const msg_send_passive = require('../../../assets/icons/msg_send_passive.png');
const msg_send_active = require('../../../assets/icons/msg_send_active.png');

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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ReviewSection = ({route}) => {
  const navigation = useNavigation();
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

  const {param} = route.params;

  const messageIcon = text ? msg_send_active : msg_send_passive;

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
      navigation.navigate('MainPage', {param: true});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    try {
      console.log('--------clicked---------------');
      setStep_5(true);
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
      setShowHand(false);
      setStep_3(true);
      setStep_2(false);
      setShowImage(false);
      console.log('=-=-=Clicked Inputfield=-=--', step_2, modalVisible, step_3);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(
      '=--------------------------===========',
      step_2,
      modalVisible,
      step_3,
    );
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

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        title="Step 3. Review"
        icon={review_ico}
        hand_ico={hand_ico}
        showImage={showImage}
      />

      <MoveDialog
        modalVisible={step_5}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        text="Great job! Now you areNN ready to use the app!"
        icon={welcome_ico}
        visible={true}
      />

      <CustomStepModal
        visible={step_2}
        onRequestClose={() => setStep_2(false)}
        stepText="5/5"
        message="Let's review the conversation.NNTap on the button to repeat."
      />

      <Header
        visible={false}
        text={'Introducing yourself'}
        color={'#FFFBF8'}
        editalbe={false}
      />

      <Image
        source={tom_s_ico}
        style={{position: 'absolute', left: screenWidth / 20, top: 130}}
      />
      <Image
        source={me_icon}
        style={{position: 'absolute', right: screenWidth / 20, top: 230}}
      />

      {/* <Modal visible={!modalVisible} transparent={true}> */}
      <View style={styles.imageContainer}>
        <Image source={message} />
        <Text style={styles.title}>
          Hi! My name is Tom. {'\n'}What is your name?
        </Text>
      </View>
      {/* </Modal> */}

      <View
        style={{
          flexDirection: 'row',
          gap: 9,
          position: 'absolute',
          top: 180,
          left: screenWidth / 20 + 210,
        }}>
        <Image source={sound_ico} />
        <Image source={turtle_ico} />
      </View>

      <Modal visible={!modalVisible} transparent={true}>
        <View style={styles.me_imageContainer}>
          {step_4 ? <Image source={verify_msg} /> : <Image source={mechat} />}
          <>
            {step_4 ? (
              <Text style={styles.s_title}>Hi! My name is {param}.</Text>
            ) : (
              <Text style={styles.m_title}>Hi! My name is {param}.</Text>
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

      <Modal visible={!modalVisible} transparent={true}>
        <TouchableOpacity
          onPress={handleInput}
          style={{
            position: 'absolute',
            bottom: 40,
            right: screenWidth / 2 - 50,
          }}>
          <Image source={repeat_ico} />
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

      <Modal visible={step_3} transparent={true}>
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
        <TouchableOpacity
          onPress={handleSend}
          style={{
            position: 'absolute',
            bottom: 40,
            right: screenWidth / 2 - 50,
          }}>
          <Image source={repeat_ico} />
        </TouchableOpacity>
        <Text style={styles.text_m}>Press to speak</Text>
      </Modal>

      <CustomGreatModal
        visible={step_4}
        hand_ico={hand_ico}
        icon={thumb_icon}
        showImage={showImage}
        handleClick={handleContinue}
        onRequestClose={() => setStep_2(false)}
        message="Great job!"
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
    // textAlign: 'left',
  },

  s_title: {
    color: '#23B80C',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -48,
    right: 10,
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
