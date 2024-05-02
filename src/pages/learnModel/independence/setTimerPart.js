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

import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import DatePicker from 'react-native-date-picker';

const task_ico = require('../../../../assets/icons/clock.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SetTimerSection = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [move, setMove] = useState(false);
  const [comment, setComment] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMove(false);
      setShowModal(false);
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
    const timestamp = date.getTime();
    console.log('-------------data--------------', timestamp);
    navigation.navigate('TimerWorkSection', {param: timestamp});
  };

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={task_ico}
        title="Step 2. Set timer"
        description="Let’s set a timer for the task"
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
        text={'Set Timer'}
        color={'#FFFBF8'}
        editalbe={false}
      />
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text style={styles.title}>{"Let's set a timer for the task"}</Text>
        <DatePicker
          date={date}
          onDateChange={setDate}
          mode="time"
          locale="en-GB" // Ensures 24-hour format if desired
          is24hourSource="locale" // Use this to enforce 24-hour time based on locale
          minuteInterval={1} // You can specify minute intervals
          androidVariant="iosClone" // Use this for iOS-like appearance on Android
          timeZoneOffsetInMinutes={0} // Adjust time zone if necessary
        />
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
          <Text style={styles.b3_text}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SetTimerSection;

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
