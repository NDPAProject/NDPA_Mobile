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
import {lossContent_1} from '../../../utils/content';
import {
  task_ico,
  thumb_icon,
  dash_icon,
  reward_ico,
  sadness_ico,
  misery_ico,
  happiness_ico,
  sorrow_ico,
  anguish_ico,
  gratitude_ico,
  woe_ico,
  dejection_ico,
  try_again_ico,
} from '../../../utils/image';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const boxData = [
  [
    {
      icon: sadness_ico,
      text: 'Desolation',
    },
    {
      icon: misery_ico,
      text: 'Misery',
    },
  ],
  [
    {
      icon: happiness_ico,
      text: 'Happiness',
    },
    {
      icon: sorrow_ico,
      text: 'Sorrow',
    },
  ],
  [
    {
      icon: anguish_ico,
      text: 'Anguish',
    },
    {
      icon: gratitude_ico,
      text: 'Gratitude',
    },
  ],
  [
    {
      icon: woe_ico,
      text: 'Woe',
    },
    {
      icon: dejection_ico,
      text: 'Dejection',
    },
  ],
];
const LossSection = () => {
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
    navigation.navigate('HelpLossSection');
  };

  const handleClickItem = (rowIndex, itemIndex, itemText) => {
    const index = selectedItems.findIndex(
      item => item.row === rowIndex && item.item === itemIndex,
    );

    console.log('------index---', index, itemText);

    if (index >= 0) {
      setSelectedItems(selectedItems.filter((_, i) => i !== index));
      if (
        selectedItems[index].text === 'Happiness' ||
        selectedItems[index].text === 'Gratitude'
      ) {
        setButtonType(true);
      }
    } else {
      setSelectedItems([
        ...selectedItems,
        {row: rowIndex, item: itemIndex, text: itemText},
      ]);
      if (itemText === 'Happiness' || itemText === 'Gratitude') {
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
      (isSelected(rowIndex, itemIndex) && itemText === 'Happiness') ||
      (isSelected(rowIndex, itemIndex) && itemText === 'Gratitude')
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
        text={'Loss'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      <Image source={dash_icon} style={styles.avatar} />
      {!step ? (
        <View style={[styles.input]}>
          <Text style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
            {lossContent_1}
          </Text>
        </View>
      ) : (
        <>
          <Text
            style={[
              styles.text,
              {textAlign: 'center', fontSize: 19, marginTop: 10},
            ]}>
            How does Sabrina feel?
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
        <Text style={styles.b3_text}>Continue</Text>
      </TouchableOpacity>
      <CustomGreatModal
        visible={showModal}
        icon={buttonType ? thumb_icon : try_again_ico}
        handleClick={() => handleMove()}
        buttonType={buttonType}
        message={buttonType ? 'Great job!' : "Don't give up"}
      />
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
    height: 300,
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
