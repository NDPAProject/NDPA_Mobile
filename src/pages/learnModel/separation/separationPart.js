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
import {separation_1} from '../../../utils/content';
import {
  sadness_ico2,
  loneliness_ico,
  regret_ico,
  excitement_ico,
  joy_ico,
  despair_ico,
  thumb_icon,
  try_again_ico,
  reward_ico,
} from '../../../utils/image';

const task_ico = require('../../../../assets/icons/situation.png');
const dash_icon = require('../../../../assets/icons/learn/separation/separation.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const boxData = [
  [
    {
      icon: sadness_ico2,
      text: 'Sadness',
    },
    {
      icon: loneliness_ico,
      text: 'Loneliness',
    },
  ],
  [
    {
      icon: regret_ico,
      text: 'Regret',
    },
    {
      icon: excitement_ico,
      text: 'Excitement',
    },
  ],
  [
    {
      icon: joy_ico,
      text: 'Joy',
    },
    {
      icon: despair_ico,
      text: 'Despair',
    },
  ],
];
const SeparationSection = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [move, setMove] = useState(false);
  const [buttonType, setButtonType] = useState(Boolean);
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
      setShowModal(true);
      return;
    }
    setProgress(1);
    setStep(true);
  };

  const handleClick = async () => {
    setModalVisible(false);
  };

  const handleMove = async () => {
    if (buttonType) {
      setMove(true);
      return;
    }
    setShowModal(false);
  };

  const handleClickMove = async () => {
    console.log('-------------data--------------');
    navigation.navigate('HelpSeparationSection');
  };

  const handleClickItem = (rowIndex, itemIndex, itemText) => {
    const index = selectedItems.findIndex(
      item => item.row === rowIndex && item.item === itemIndex,
    );

    console.log('------index---', index, itemText);

    if (index >= 0) {
      setSelectedItems(selectedItems.filter((_, i) => i !== index));
      if (
        selectedItems[index].text === 'Excitement' ||
        selectedItems[index].text === 'Joy'
      ) {
        setButtonType(false);
      }
    } else {
      setSelectedItems([
        ...selectedItems,
        {row: rowIndex, item: itemIndex, text: itemText},
      ]);
      if (itemText === 'Excitement' || itemText === 'Joy') {
        setButtonType(false);
      } else {
        setButtonType(true);
      }
    }
  };

  const isSelected = (rowIndex, itemIndex) =>
    selectedItems.some(
      item => item.row === rowIndex && item.item === itemIndex,
    );

  const getBorderColor = (rowIndex, itemIndex, itemText) => {
    if (
      (isSelected(rowIndex, itemIndex) && itemText === 'Excitement') ||
      (isSelected(rowIndex, itemIndex) && itemText === 'Joy')
    ) {
      return '#FFC700';
    } else if (isSelected(rowIndex, itemIndex)) {
      return '#23B80C';
    } else {
      return '#FBC4AB';
    }
  };

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
        text={'Separation'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      <Image source={dash_icon} style={styles.avatar} />
      {!step ? (
        <View style={[styles.input]}>
          <Text style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
            {separation_1}
          </Text>
        </View>
      ) : (
        <>
          <Text
            style={[
              styles.text,
              {textAlign: 'center', fontSize: 19, marginTop: 10},
            ]}>
            How does Ronald feel?
          </Text>
          <ScrollView style={{marginTop: 100, bottom: 100}}>
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
                          borderColor: getBorderColor(
                            rowIndex,
                            itemIndex,
                            item.text,
                          ),
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
      <CustomGreatModal
        visible={showModal}
        icon={buttonType ? thumb_icon : try_again_ico}
        handleClick={() => handleMove()}
        buttonType={buttonType}
        message={buttonType ? 'Great job!' : "Don't give up"}
      />
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          position: 'absolute',
          bottom: 10,
          borderRadius: 45,
          backgroundColor: '#F08080',
        }}
        onPress={() => handleContinue()}>
        <Text style={styles.b3_text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SeparationSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
    width: screenWidth,
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
    textAlign: 'center',
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
