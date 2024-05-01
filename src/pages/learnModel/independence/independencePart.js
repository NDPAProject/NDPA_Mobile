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
import CustomGreatModal from '../../../components/greatModal';
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

  const [modalVisible, setModalVisible] = useState(true);
  const [move, setMove] = useState(false);
  const [comment, setComment] = useState('');
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const messageIcon = comment ? msg_send_active : msg_send_passive;

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
      navigation.navigate('SetTimeSection');
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleSend = () => {
    setContent(comment);
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
        <Text style={styles.text}>{content}</Text>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          position: 'absolute',
          bottom: 150,
          borderRadius: 45,
          backgroundColor: '#F08080',
        }}
        onPress={() => handleContinue()}>
        <Text style={styles.b3_text}>Continue</Text>
      </TouchableOpacity>
      <ChatBox
        text={comment}
        handleChangeText={setComment}
        handleSend={handleSend}
        messageIcon={messageIcon}
        bottom={0}
        mico={true}
      />
      <TouchableOpacity style={{position: 'absolute', bottom: 60, right: 15}}>
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
