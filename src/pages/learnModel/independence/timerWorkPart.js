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
} from 'react-native';
import AnimatedCircularProgress from 'react-native-circular-progress-indicator';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import DatePicker from 'react-native-date-picker';
import FeedbackModal from '../../../components/feedbackModal';

const task_ico = require('../../../../assets/icons/work.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const TimerWorkSection = () => {
  const navigation = useNavigation();
  const totalDuration = 2000;
  const [modalVisible, setModalVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [move, setMove] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [date, setDate] = useState(new Date());
  const [seconds, setSeconds] = useState(totalDuration);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMove(false);
      setShowModal(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleContinue = () => {
    setFeedback(true);
  };

  const handleClick = async () => {
    setModalVisible(false);
  };

  const handleClickMove = async () => {
    try {
      console.log('-------------data--------------');
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };
  const handleRating = rating => {
    setStarRating(rating);
    setExplainModal(true);
    setModalVisible(false);
    console.log('Rating received:', rating);
  };
  const handleClickClose = async () => {
    try {
      setModalVisible(false);
      setExplainModal(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };
  const fill = (seconds / totalDuration) * 100;
  return (
    <View style={styles.container}>
      <FeedbackModal
        modalVisible={feedback}
        setModalVisible={setModalVisible}
        handleClickClose={handleClickClose}
        handleRating={handleRating}
        title="Give Us Feedback"
        description="Are you having funNN using the app?"
      />
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={task_ico}
        title="Step 3. Work"
        description="Let's get started on working through your task"
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
        text={'Work'}
        color={'#FFFBF8'}
        editalbe={false}
      />
      <View
        style={{
          marginTop: 50,
          alignItems: 'center',
          flex: 1,
          gap: 30,
        }}>
        <Text style={styles.title}>{'Turn on the timer to start'}</Text>
        <AnimatedCircularProgress
          size={screenWidth / 3}
          width={15}
          fill={fill}
          tintColor="#F08080"
          backgroundColor="#F08080"
          backgroundWidth={4}
          lineCap="round"
          rotation={0}>
          {() => (
            <Text style={{fontSize: 20, color: 'black'}}>
              {/* {`${Math.floor(seconds / 60)}:${
                seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60
              }`} */}
              20:00
            </Text>
          )}
        </AnimatedCircularProgress>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: (screenWidth * 9) / 10,
            height: 57,
            marginTop: 50,
            borderRadius: 45,
            backgroundColor: '#F08080',
          }}
          onPress={() => handleContinue()}>
          <Text style={styles.b3_text}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerWorkSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
    width: screenWidth,
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
