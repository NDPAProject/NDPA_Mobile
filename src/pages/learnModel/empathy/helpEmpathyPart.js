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

const task_ico = require('../../../../assets/icons/help_ico.png');
const help_1 = require('../../../../assets/icons/learn/empathy/help_1.png');
const help_2 = require('../../../../assets/icons/learn/empathy/help_2.png');
const help_3 = require('../../../../assets/icons/learn/empathy/help_3.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const content =
  'Ronald’s mother and father, who have been married for over a decade, have recently decided to split up. Their decision comes after months of ongoing arguments and challenges in their relationship, which have gradually taken a toll on their family dynamics.';

const HelpEmpathySection = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [move, setMove] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [step_1, setStep_1] = useState(false);
  const [step_2, setStep_2] = useState(false);
  const [step_3, setStep_3] = useState(false);

  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       setMove(false);
  //       setModalVisible(false);
  //     });

  //     return unsubscribe;
  //   }, [navigation]);

  const handleContinue = () => {
    if (step_1) {
      setStep_1(false);
      setStep_2(true);
      setProgress(0.7);
      return;
    }
    if (step_2) {
      setProgress(1);
      setStep_2(false);
      setStep_3(true);
      return;
    }
    if (step_3) {
      setStep_3(false);
      setMove(true);
      return;
    }
  };

  const handleClick = async () => {
    console.log('-------------clicked--------------------');
    setModalVisible(false);
    setStep_1(true);
    console.log('clicked');
  };

  const handleClickMove = async () => {
    console.log('-------------data--------------');
    navigation.navigate('PracticeEmpathySection');
  };

  const StepItem = ({avatar, content}) => (
    <View style={[styles.input]}>
      <Image source={avatar} style={styles.avatar} />
      <Text style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
        {content}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={task_ico}
        title="Step 2. Help"
        description="Let’s think how we can help in this situation"
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
        visible={true}
        text={'Help'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />
      {step_1 && <StepItem avatar={help_1} content={content} />}
      {step_2 && <StepItem avatar={help_2} content={content} />}
      {step_3 && <StepItem avatar={help_3} content={content} />}

      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          position: 'absolute',
          bottom: 100,
          borderRadius: 45,
          backgroundColor: '#F08080',
        }}
        onPress={() => handleContinue()}>
        <Text style={styles.b3_text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpEmpathySection;

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
    height: 270,
    margin: 12,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  boxBackground: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 20,
    borderRadius: 20,
    width: (screenWidth * 2.1) / 5,
    height: (screenWidth * 2) / 5,
  },
});
