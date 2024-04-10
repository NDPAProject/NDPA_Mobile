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
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import Footer from '../../components/footer';

const h_icon = require('../../../assets/icons/h_icon.png');
const person_ico = require('../../../assets/icons/learn/person_ico.png');
const fship_ico = require('../../../assets/icons/learn/fship_ico.png');
const choice_ico = require('../../../assets/icons/learn/choice_ico.png');
const indep_ico = require('../../../assets/icons/learn/fship_ico.png');
const sep_ico = require('../../../assets/icons/learn/fship_ico.png');
const loss_ico = require('../../../assets/icons/learn/fship_ico.png');
const withdrawal_ico = require('../../../assets/icons/learn/fship_ico.png');
const sadness_ico = require('../../../assets/icons/learn/fship_ico.png');
const worry_ico = require('../../../assets/icons/learn/fship_ico.png');
const emotional_ico = require('../../../assets/icons/learn/fship_ico.png');
const peer_ico = require('../../../assets/icons/learn/fship_ico.png');
const handle_ico = require('../../../assets/icons/hand_ico.png');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const boxData = [
  [
    {icon: person_ico, text: 'Personal\n Identity', nav: 'TypingSection'},
    {icon: fship_ico, text: 'Friendship', nav: ''},
  ],
  [
    {icon: choice_ico, text: 'Choice', nav: ''},
    {icon: indep_ico, text: 'Independence', nav: ''},
  ],
  [
    {icon: sep_ico, text: 'Separation', nav: ''},
    {icon: loss_ico, text: 'Loss', nav: ''},
  ],
  [
    {icon: withdrawal_ico, text: 'Withdrawal', nav: ''},
    {icon: sadness_ico, text: 'Sadness', nav: ''},
  ],
  [
    {icon: worry_ico, text: 'Worry', nav: ''},
    {icon: emotional_ico, text: 'Emotional\nOutbursts', nav: ''},
  ],
  [{icon: peer_ico, text: '     Peer Difficulties', nav: ''}],
];

const MainPage = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [step_1, setStep_1] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigation = useNavigation();

  const handleClick = async () => {
    try {
      setStep_1(true);
      console.log('=-=-=-=-=--', step_1, modalVisible);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    let timer;
    console.log('------------------', step_1, modalVisible);
    // Check if step_1 is true, then set a timer to show the modal after 0.4 sec
    if (step_1) {
      setModalVisible(false);
      timer = setTimeout(() => {
        setStep_1(true);
        timer = setTimeout(() => {
          setShowImage(true);
        }, 800);
      }, 1000); // 400 milliseconds = 0.4 seconds
    } else {
      // If step_1 is false, make sure to hide the modal
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
        onRequestClose={() => {
          setStep_1(!step_1);
        }}>
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
                onPress={() => navigation.navigate(boxData[0][0].nav)}>
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
              <Text style={styles.text_m3}>Skip</Text>
            </View>
          </View>
        </LinearGradient>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
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
            <Button
              style={{
                justifyContent: 'center',
                width: 280,
                height: 57,
                marginTop: 20,
                borderRadius: 45,
                backgroundColor: '#F08080',
              }}
              onPress={handleClick}>
              <Text style={styles.b3_text}>Let's Start</Text>
            </Button>
            <Button
              style={{
                justifyContent: 'center',
                width: 280,
                height: 57,
                borderColor: '#F08080',
                borderWidth: 1,
                marginTop: 16,
                borderRadius: 45,
                backgroundColor: 'white',
              }}
              onPress={setModalVisible}>
              <Text style={styles.b4_text}>Skip</Text>
            </Button>
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
