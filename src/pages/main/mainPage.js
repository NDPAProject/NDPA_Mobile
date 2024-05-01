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
  ScrollView,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';

import Footer from '../../components/footer';
import CustomStepModal from '../../components/stepModal';

const h_icon = require('../../../assets/icons/h_icon.png');
const person_ico = require('../../../assets/icons/learn/person_ico.png');
const fship_ico = require('../../../assets/icons/learn/fship_ico.png');
const choice_ico = require('../../../assets/icons/learn/choice_ico.png');
const indep_ico = require('../../../assets/icons/learn/indep_ico.png');
const sep_ico = require('../../../assets/icons/learn/sep_ico.png');
const loss_ico = require('../../../assets/icons/learn/loss_ico.png');
const withdrawal_ico = require('../../../assets/icons/learn/withdrawl_ico.png');
const sadness_ico = require('../../../assets/icons/learn/sadness_ico.png');
const worry_ico = require('../../../assets/icons/learn/worry_ico.png');
const emotional_ico = require('../../../assets/icons/learn/emotional_ico.png');
const peer_ico = require('../../../assets/icons/learn/peer_ico.png');
const handle_ico = require('../../../assets/icons/hand_ico.png');
const empathy_ico = require('../../../assets/icons/learn/empathy.png');
const overall_ico = require('../../../assets/icons/learn/overall.png');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const boxData = [
  [
    {
      icon: person_ico,
      text: 'Personal\n Identity',
      nav: 'MainLearningSection',
    },
    {icon: fship_ico, text: 'Friendship', nav: 'MainFriendShipSection'},
  ],
  [
    {icon: choice_ico, text: 'Choice', nav: 'MainChoiceSection'},
    {icon: indep_ico, text: 'Independence', nav: 'MainIndependenceSection'},
  ],
  [
    {icon: sep_ico, text: 'Separation', nav: 'MainSeparationSection'},
    {icon: loss_ico, text: 'Loss', nav: 'MainLossSection'},
  ],
  [
    {icon: withdrawal_ico, text: 'Withdrawal', nav: 'MainWithdrawalSection'},
    {icon: sadness_ico, text: 'Sadness', nav: 'MainSadnessSection'},
  ],
  [
    {icon: worry_ico, text: 'Worry', nav: 'MainWorrySection'},
    {
      icon: emotional_ico,
      text: 'Emotional\nOutbursts',
      nav: 'MainEmotionalSection',
    },
  ],
  [
    {icon: peer_ico, text: '     Peer Difficulties', nav: 'MainPeerSection'},
    {
      icon: overall_ico,
      text: '    Overall Wellbeing',
      nav: 'MainOverallSection',
    },
  ],
  [{icon: empathy_ico, text: 'Empathy', nav: 'MainEmpathySection'}],
];

const MainPage = ({route}) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [step_1, setStep_1] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {param} = route?.params;

  console.log('-==param---------------------', param);

  const navigation = useNavigation();

  const handleClick = async () => {
    try {
      setStep_1(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickSkip = async () => {
    try {
      setModalVisible(false);
      setStep_1(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    if (step_1) {
      setModalVisible(false);
      timer = setTimeout(() => {
        setStep_1(true);
        timer = setTimeout(() => {
          setShowImage(true);
        }, 1000);
      }, 1200); // 400 milliseconds = 0.4 seconds
    } else {
      setStep_1(false);
    }

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or step_1 changes
  }, [step_1]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={step_1}
        onRequestClose={() => handleClickSkip}>
        <LinearGradient
          style={{flex: 1}}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(255, 218, 185, 0.4)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(224, 208, 193, 0.5)',
            }}>
            <View style={{position: 'absolute', top: 150, left: 20}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('TypingTutorSection')}>
                <View style={styles.boxBackground}>
                  <Image source={boxData[0][0].icon} style={styles.icon} />
                  <Text style={styles.text}>{boxData[0][0].text}</Text>
                </View>
              </TouchableOpacity>
              {showImage && (
                <Image
                  source={handle_ico}
                  style={{
                    position: 'absolute',
                    top: (screenWidth * 2.1) / 5 - 25,
                    left: (screenWidth * 2.1) / 5 - 60,
                  }}
                />
              )}
            </View>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: 360,
                height: 102,
                padding: 20,
              }}>
              <Text style={styles.text_m2}>1/5</Text>
              <Text style={styles.text_m}>
                Let's choose a topic for conversation.{'\n'}Tap on the screen.
              </Text>
              <TouchableOpacity
                style={styles.text_m3}
                onPress={handleClickSkip}>
                <Text>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible && !param}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BlurView
            style={[
              styles.blurView,
              {backgroundColor: 'rgba(255, 218, 185, 0.4)'},
            ]}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              width: 349,
              height: 354,
              padding: 20,
            }}>
            <Image source={require('../../../assets/icons/hello_ico.png')} />
            <Text style={styles.text_m}>
              Let's learn {'\n'}how to use the app!
            </Text>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 280,
                height: 57,
                marginTop: 20,
                borderRadius: 45,
                backgroundColor: '#F08080',
              }}
              // onPress={handleClick}
            >
              <Text style={styles.b3_text}>Let's Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 280,
                height: 57,
                borderColor: '#F08080',
                borderWidth: 1,
                marginTop: 16,
                borderRadius: 45,
                backgroundColor: 'white',
              }}
              onPress={handleClickSkip}>
              <Text style={styles.b4_text}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.textBackground}>
        <Image
          source={h_icon}
          style={{bottom: 0, position: 'absolute', marginLeft: 10}}
        />
        <Text style={styles.title}>
          What do you want {'\n'}to talk about today?
        </Text>
      </View>
      <ScrollView>
        <View style={styles.container_s}>
          {boxData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  onPress={() => navigation.navigate(item.nav)}>
                  <View style={styles.boxBackground}>
                    <Image source={item.icon} style={styles.icon} />
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <Footer state={0} />
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container_s: {
    padding: 10,
    marginBottom: 100,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    marginLeft: (screenWidth * 1.1) / 3,
    // textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
    // textAlign: 'left',
  },
  text_m: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginTop: 6,
    // alignItems: 'center',
  },
  text_m2: {
    color: 'black',
    fontSize: 10,
    fontFamily: 'OpenSans-Medium',
    position: 'absolute',
    top: 5,
    left: 8,
  },
  text_m3: {
    color: '#9D9C9D',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    textDecorationLine: 'underline',
    position: 'absolute',
    bottom: 5,
    right: 8,
  },
  b3_text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
  },
  b4_text: {
    color: '#F08080',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
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
    marginTop: 30,
    borderRadius: 20,
    width: (screenWidth * 2.1) / 5,
    height: (screenWidth * 2) / 5,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
