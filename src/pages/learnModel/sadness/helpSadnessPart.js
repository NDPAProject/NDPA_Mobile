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

const task_ico = require('../../../../assets/icons/help_ico.png');
const help_png = require('../../../../assets/icons/learn/separation/help.png');
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

const HelpSadnessSection = () => {
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
    navigation.navigate('PercentSadnessSection');
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

  const ItemBlock = ({dash_icon, datas, title, content, type}) => (
    <>
      <Image source={dash_icon} style={styles.avatar} />

      <Text
        style={[
          styles.text,
          {textAlign: 'center', fontSize: 19, marginTop: 10},
        ]}>
        {title}
      </Text>
      {type ? (
        <Text style={[styles.text, , {textAlign: 'left', fontSize: 17}]}>
          {content}
        </Text>
      ) : (
        <ScrollView>
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
          dash_icon={help_png}
          type={true}
          content={'How can you help yourself?'}
          title={content}
        />
      )}
      {step_2 && (
        <ItemBlock
          dash_icon={help_png}
          type={false}
          content={'Key advice for anxiety includes:'}
          datas={boxData}
        />
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

export default HelpSadnessSection;

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
