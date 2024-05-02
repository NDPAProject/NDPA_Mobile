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
import Svg, {Circle} from 'react-native-svg';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import RateModal from '../../../components/rateModal';

const task_ico = require('../../../../assets/icons/work.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const TimerWorkSection = ({route}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);
  const [move, setMove] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const {param} = route.params;
  const [running, setRunning] = useState(false);

  const date = new Date(param);

  const [hour, setHour] = useState(date.getHours());
  const [minutes, setMinutes] = useState(date.getMinutes());

  useEffect(() => {
    let timer;

    if (running) {
      timer = setInterval(() => {
        if (minutes === 0) {
          if (hour === 0) {
            setRunning(false);
            clearInterval(timer);
          } else {
            setHour(hour - 1);
            setMinutes(59);
          }
        } else {
          setMinutes(minutes - 1);
        }
      }, 0.01); // 1 minute interval
    }

    return () => clearInterval(timer);
  }, [running, hour, minutes]);

  const formattedHour = hour < 10 ? '0' + hour : hour;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  const totalMinutes = hour * 60 + minutes;
  const progressPercentage = (totalMinutes / 60) * 100;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMove(false);
      setShowModal(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (formattedHour === '00' && formattedMinutes === '00') {
      console.log('0000000000000000000000000');
      setFeedback(true);
      setSuccess(true);
    }
  });

  const handleContinue = () => {
    // setFeedback(true);
    if (running) {
      setRunning(false);
      setFeedback(true);
      return;
    }
    setRunning(true);
  };

  const handleClick = async () => {
    setModalVisible(false);
  };

  const handleClickMove = async () => {
    navigation.navigate('PercentIndependenceSection', {param: success});
  };
  const handleRating = (rating, comment) => {
    setStarRating(rating);
    setDescription(comment);
    setModalVisible(false);
    setMove(true);
    console.log('Rating received:', rating, comment);
  };
  const handleClickClose = async () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <RateModal
        modalVisible={feedback}
        setModalVisible={setModalVisible}
        handleClickClose={handleClickClose}
        handleClick={handleRating}
        title="Great Job!"
        description="Rate how the task went"
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
        buttonText="Finish"
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
        <Svg height="250" width="250" viewBox="0 0 250 250">
          <Circle
            cx="125"
            cy="125"
            r="120"
            stroke="#D3D3D3"
            strokeWidth="4"
            fill="transparent"
          />
          <Circle
            cx="125"
            cy="125"
            r="120"
            stroke="#F08080"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 120}`}
            strokeDashoffset={
              ((100 - progressPercentage) / 100) * 2 * Math.PI * 120
            }
            fill="transparent"
            transform={`rotate(-90 125 125)`}
          />
          <Text
            style={{
              fontSize: 56,
              color: '#F08080',
              position: 'absolute',
              top: 80,
              left: 50,
            }}>
            {formattedHour + ':' + formattedMinutes}
          </Text>
        </Svg>

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
          <Text style={styles.b3_text}>{!running ? 'Start' : 'Finish'}</Text>
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
