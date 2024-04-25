import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import CustomGreatModal from '../../../components/greatModal';

const activate_ico = require('../../../../assets/icons/learn/choice/activate_ico.png');
const thumb_icon = require('../../../../assets/icons/great_ico.png');
const check_circle_ico = require('../../../../assets/icons/check_circle.png');
const avatar_ico = require('../../../../assets/icons/learn/choice/avatar_ico.png');
const drawing_ico = require('../../../../assets/icons/learn/choice/drawing.png');
const bike_ico = require('../../../../assets/icons/learn/choice/bike.png');
const basketball_ico = require('../../../../assets/icons/learn/choice/basketball.png');
const reading_ico = require('../../../../assets/icons/learn/choice/reading.png');
const reset_ico = require('../../../../assets/icons/learn/choice/reset.png');
const sing_ico = require('../../../../assets/icons/learn/choice/sing.png');
const swimming_ico = require('../../../../assets/icons/learn/choice/swimming.png');
const tennis_ico = require('../../../../assets/icons/learn/choice/tennis.png');
const walking_ico = require('../../../../assets/icons/learn/choice/walking.png');
const watch_ico = require('../../../../assets/icons/learn/choice/watch.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');
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
      icon: basketball_ico,
      text: 'Play Basketball',
    },
  ],
  [
    {
      icon: tennis_ico,
      text: 'Tennis',
    },
    {
      icon: watch_ico,
      text: 'Watch movies',
    },
  ],
  [
    {
      icon: reset_ico,
      text: 'Reset',
    },
    {
      icon: walking_ico,
      text: 'Walking',
    },
  ],
  [
    {
      icon: bike_ico,
      text: 'Biking',
    },
    {
      icon: sing_ico,
      text: 'Singing',
    },
  ],
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const WeeklyActSection = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [move, setMove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  console.log('-----handleClickItem-------', selectedItems);
  const handleClickContinue = () => {
    setShowModal(true);
  };

  const handleContinue = () => {
    setMove(true);
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

  const handleClick = async () => {
    try {
      setModalVisible(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleClickMove = async () => {
    try {
      const data = selectedItems.map(item => item.text);
      console.log('-------------data--------------', data);
      navigation.navigate('WeeklyActPlanSection', {param: data});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
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
        icon={activate_ico}
        title="Step 1. Weekly activities"
        description="Let’s choose your weekly activities"
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
        text={'Weekly activities'}
        color={'#FFFBF8'}
        editalbe={false}
      />

      <Image source={avatar_ico} style={styles.avatar} />
      <Text style={styles.title}>
        {'What do you usually\ndo during the week?'}
      </Text>
      <ScrollView>
        <View style={styles.container_s}>
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
                          ? '#F08080'
                          : '#FBC4AB',
                      },
                    ]}>
                    {isSelected(rowIndex, itemIndex) && (
                      <Image
                        source={check_circle_ico}
                        style={[styles.icon, {opacity: 1}]}
                      />
                    )}
                    <Image source={item.icon} />
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          position: 'absolute',
          bottom: 20,
          borderRadius: 45,
          backgroundColor: '#F08080',
        }}
        onPress={handleClickContinue}>
        <Text style={styles.b3_text}>Continue</Text>
      </TouchableOpacity>

      <CustomGreatModal
        visible={showModal}
        icon={thumb_icon}
        handleClick={() => handleContinue()}
        buttonType={true}
        // onRequestClose={() => setStep_2(false)}
        message="Great job!"
      />
    </View>
  );
};

export default WeeklyActSection;

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
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    right: 5,
    top: 5,
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
