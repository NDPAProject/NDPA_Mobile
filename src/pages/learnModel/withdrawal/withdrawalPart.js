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

const task_ico = require('../../../../assets/icons/situation.png');
const thumb_icon = require('../../../../assets/icons/great_ico.png');
const dash_icon = require('../../../../assets/icons/learn/withdrawal/withdrawal.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');
const drawing_ico = require('../../../../assets/icons/learn/choice/drawing.png');
const reading_ico = require('../../../../assets/icons/learn/choice/reading.png');
const sing_ico = require('../../../../assets/icons/learn/choice/sing.png');
const swimming_ico = require('../../../../assets/icons/learn/choice/swimming.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const content =
  "Have you ever experienced a disagreement with a friend that left you feeling upset and confused? Abdul recently found himself in such a situation with his friend Gary. They argued over a minor issue, like their favorite car, and it led to tension in their friendship.Gary's mom suggests that they should take a break from hanging out together every day. Abdul feels sad about this and finds it hard to think about changing his daily routine because of it.";
const boxData = [
  [
    {
      icon: drawing_ico,
      text: 'Drawing',
    },
    {
      icon: reading_ico,
      text: 'Reading',
    },
  ],
  [
    {
      icon: swimming_ico,
      text: 'Swimming',
    },
    {
      icon: sing_ico,
      text: 'Play Basketball',
    },
  ],
  [
    {
      icon: swimming_ico,
      text: 'Swimming',
    },
    {
      icon: sing_ico,
      text: 'Play Basketball',
    },
  ],
];
const WithdrawalSection = () => {
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
    }
    setProgress(1);
    setStep(true);
  };

  const handleClick = async () => {
    setModalVisible(false);
  };

  const handleClickMove = async () => {
    console.log('-------------data--------------');
    navigation.navigate('HelpWithdrawalSection');
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
        title="Step 1. Situation"
        description="Let’s consider the situation about separation"
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
        text={'Withdrawal'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      <Image source={dash_icon} style={styles.avatar} />
      {!step ? (
        <View style={[styles.input]}>
          <Text style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
            {content}
          </Text>
        </View>
      ) : (
        <>
          <Text
            style={[
              styles.text,
              {textAlign: 'center', fontSize: 19, marginTop: 10},
            ]}>
            How does Abdul feel?
          </Text>
          <ScrollView>
            {boxData.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    onPress={() =>
                      handleClickItem(rowIndex, itemIndex, item.text)
                    }>
                    <View
                      style={[
                        styles.boxBackground,
                        {
                          borderColor: isSelected(rowIndex, itemIndex)
                            ? '#23B80C'
                            : '#FBC4AB',
                        },
                      ]}>
                      <Image source={item.icon} />
                      <Text style={[styles.text, {fontSize: 17}]}>
                        {item.text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
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
        onPress={() => handleContinue()}>
        <Text style={styles.b3_text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithdrawalSection;

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
