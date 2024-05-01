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
import {ScrollView} from 'react-native-gesture-handler';

const task_ico = require('../../../../assets/icons/practice_ico.png');
const practice_1 = require('../../../../assets/icons/learn/empathy/help_1.png');
const practice_2 = require('../../../../assets/icons/learn/empathy/help_2.png');
const practice_3 = require('../../../../assets/icons/learn/empathy/help_3.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');
const drawing_ico = require('../../../../assets/icons/learn/choice/drawing.png');
const reading_ico = require('../../../../assets/icons/learn/choice/reading.png');
const sing_ico = require('../../../../assets/icons/learn/choice/sing.png');
const swimming_ico = require('../../../../assets/icons/learn/choice/swimming.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const content =
  'Ronald’s mother and father, who have been married for over a decade, have recently decided to split up. Their decision comes after months of ongoing arguments and challenges in their relationship, which have gradually taken a toll on their family dynamics.';
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

const PracticeEmpathySection = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [move, setMove] = useState(false);
  const [progress, setProgress] = useState(0.35);
  const [step_1, setStep_1] = useState(false);
  const [step_2, setStep_2] = useState(false);
  const [step_3, setStep_3] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMove(false);
      setShowModal(false);
    });

    return unsubscribe;
  }, [navigation]);

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
    setModalVisible(false);
    setStep_1(true);
  };

  const handleClickMove = async () => {
    console.log('-------------data--------------');
    navigation.navigate('PercentEmpathySection');
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

  const ItemBlock = ({dash_icon, datas}) => (
    <>
      <Image source={dash_icon} style={styles.avatar} />

      <Text
        style={[
          styles.text,
          {textAlign: 'center', fontSize: 19, marginTop: 10},
        ]}>
        {'How do you ensure strong wellbeing\nperformance?'}
      </Text>
      <ScrollView>
        {datas.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                onPress={() => handleClickItem(rowIndex, itemIndex, item.text)}>
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
                  <Text style={[styles.text, {fontSize: 17}]}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </>
  );

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={task_ico}
        title="Step 2. Practice"
        description="Let’s summarize all information about peer difficulties"
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
        text={'Practice'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      {step_1 && <ItemBlock dash_icon={practice_1} datas={boxData} />}
      {step_2 && <ItemBlock dash_icon={practice_2} datas={boxData} />}
      {step_3 && <ItemBlock dash_icon={practice_3} datas={boxData} />}

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

export default PracticeEmpathySection;

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
