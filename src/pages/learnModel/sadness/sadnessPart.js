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
import {ScrollView} from 'react-native-gesture-handler';
import {sadness_1, sadness_2} from '../../../utils/content';

const task_ico = require('../../../../assets/icons/infor.png');
const dash_icon = require('../../../../assets/icons/learn/sadness/sadness_1.png');
const das_icon = require('../../../../assets/icons/learn/sadness/sadness_2.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const content =
  "Sabrina had a special friend, a maltipoo (half Maltese, half poodle), who brought joy and companionship into her life. Unfortunately, her furry friend developed a condition similar to heart disease and, despite efforts to help, Sabrina had to make the difficult decision to say goodbye. Losing her dog was incredibly heartbreaking for Sabrina, and she's struggling with a mix of emotions right now.";

const LossSection = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [move, setMove] = useState(false);
  const [comment, setComment] = useState('');
  const [progress, setProgress] = useState(0.5);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMove(false);
      setShowModal(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleContinue = () => {
    if (step) {
      setMove(true);
    } else {
      setProgress(1);
      setStep(true);
    }
  };

  const handleClick = async () => {
    setModalVisible(false);
  };

  const handleClickMove = async () => {
    console.log('-------------data--------------');
    navigation.navigate('HelpSadnessSection');
  };

  const handleClickItem = (rowIndex, itemIndex, itemText) => {
    const index = selectedItems.findIndex(
      item => item.row === rowIndex && item.item === itemIndex,
    );

    if (index >= 0) {
      setSelectedItems(selectedItems.filter((_, i) => i !== index));
    } else {
      setSelectedItems([
        ...selectedItems,
        {row: rowIndex, item: itemIndex, text: itemText},
      ]);
    }
  };

  const isSelected = (rowIndex, itemIndex) =>
    selectedItems.some(
      item => item.row === rowIndex && item.item === itemIndex,
    );

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={task_ico}
        title="Step 1. Information"
        description="Let’s read the information about sadness"
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
        text={'Separation'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      {!step ? (
        <>
          <Image source={dash_icon} style={styles.avatar} />
          <View style={[styles.input]}>
            {sadness_1.map((content, index) => (
              <Text
                style={[styles.text, , {textAlign: 'left', fontSize: 17}]}
                key={index}>
                {content}
              </Text>
            ))}
          </View>
        </>
      ) : (
        <>
          <Image source={das_icon} style={styles.avatar} />
          <View style={[styles.input]}>
            <Text style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
              {sadness_2}
            </Text>
          </View>
        </>
      )}

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
        onPress={() => handleContinue(step)}>
        <Text style={styles.b3_text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LossSection;

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
