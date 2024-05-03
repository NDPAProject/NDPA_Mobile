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
} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import {emotional_2} from '../../../utils/content';
import {
  identify_ico,
  calm_ico,
  avoid_ico,
  scream_ico,
  selfcare_ico,
  journal_ico,
  seek_ico,
  positivity_ico,
} from '../../../utils/image';

const task_ico = require('../../../../assets/icons/help_ico.png');
const help_1 = require('../../../../assets/icons/learn/emotional/help_1.png');
const help_2 = require('../../../../assets/icons/learn/emotional/help_2.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');
const reading_ico = require('../../../../assets/icons/learn/choice/reading.png');
const sing_ico = require('../../../../assets/icons/learn/choice/sing.png');
const swimming_ico = require('../../../../assets/icons/learn/choice/swimming.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const boxData = [
  [
    {
      icon: identify_ico,
      text: 'Identify Triggers and Patterns',
    },
    {
      icon: calm_ico,
      text: 'Calm Yourself',
    },
  ],
  [
    {
      icon: avoid_ico,
      text: 'Avoid Triggers',
    },
    {
      icon: scream_ico,
      text: 'Scream and Shout',
    },
  ],
  [
    {
      icon: selfcare_ico,
      text: 'Practice\nSelf-Care',
    },
    {
      icon: journal_ico,
      text: 'Keep a Journal',
    },
  ],
  [
    {
      icon: seek_ico,
      text: 'Seek Support',
    },
    {
      icon: positivity_ico,
      text: 'Focus on Positivity',
    },
  ],
];

const HelpEmotionalSection = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [move, setMove] = useState(false);
  const [progress, setProgress] = useState(0.5);
  const [step_1, setStep_1] = useState(false);
  const [step_2, setStep_2] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
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
      setProgress(1);
      return;
    }
    if (step_2) {
      setProgress(1);
      setStep_2(false);
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
    navigation.navigate('PercentEmotionalSection');
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

  const getBorderColor = (rowIndex, itemIndex, itemText) => {
    if (isSelected(rowIndex, itemIndex) && itemText === 'Scream and Shout') {
      return '#FFC700';
    } else if (isSelected(rowIndex, itemIndex)) {
      return '#23B80C';
    } else {
      return '#FBC4AB';
    }
  };

  const ItemBlock = ({dash_icon, datas, content, title, type}) => (
    <>
      <Image source={dash_icon} style={styles.avatar} />

      <Text
        style={[
          styles.title,
          {textAlign: 'center', fontSize: 19, marginTop: 10},
        ]}>
        {title}
      </Text>

      {type ? (
        <ScrollView style={{marginTop: 100, bottom: 100}}>
          <View style={[styles.input]}>
            {content.map((item, index) => (
              <View key={index}>
                <Text
                  style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
                  {index + 1}. {item}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={{marginTop: 100, bottom: 100}}>
          {datas.map((row, rowIndex) => (
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
      )}
    </>
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
      {step_1 && (
        <ItemBlock
          dash_icon={help_1}
          type={true}
          title={'How to control the potential of\n having these breakdowns?'}
          content={emotional_2}
        />
      )}
      {step_2 && (
        <ItemBlock
          dash_icon={help_2}
          datas={boxData}
          type={false}
          title={'How to control the potential of\n having these breakdowns?'}
        />
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
        <Text style={styles.b3_text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HelpEmotionalSection;

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
