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
import {useDispatch, useSelector} from 'react-redux';

import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import {textToSpeech} from '../../../redux/slices/audio';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import CustomGreatModal from '../../../components/greatModal';

const plan_ico = require('../../../../assets/icons/plan_ico.png');

const t_icon = require('../../../../assets/icons/tom_ico.png');
const me_icon = require('../../../../assets/icons/me.png');
const turtle_ico = require('../../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../../assets/icons/charm_sound-up.png');
const message = require('../../../../assets/icons/message.png');
const mechat_b = require('../../../../assets/icons/mechat_b.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');
const thumb_icon = require('../../../../assets/icons/great_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const WeeklyActPlanSection = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {txtAudio} = useSelector(state => state.audio);
  const [modalVisible, setModalVisible] = useState(true);
  const [showGreat, setShowGreat] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [progress, setProgress] = useState(0.125);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 7;

  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState('');
  const [data, setData] = useState([]);
  const [activities, setActivities] = useState([]);

  const [errorMsg, setErrorMsg] = useState('');

  const {param} = route.params;

  console.log('-----------param------', param);

  useEffect(() => {
    if (param) {
      const newActivities = [];
      for (let i = 0; i < param.length; i += 2) {
        if (i + 1 < param.length) {
          newActivities.push([param[i], param[i + 1]]);
        } else {
          newActivities.push([param[i]]);
        }
      }
      setActivities(newActivities);
    }
  }, [param]);

  const handlePress = label => {
    setSelectedActivity(label);
    setData([...data, label]);
    const updatedActivities = activities.map(row =>
      row.filter(activity => activity !== label),
    );
    setActivities(updatedActivities);
    console.log('Selected Activity:', label);
    console.log('Selected datas:', data);
    setShowButton(true);
  };

  const handleClickContinue = () => {
    console.log('------currentStep-----', currentStep);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setShowButton(false);
      setSelectedActivity('');
      setProgress(0.125 * (currentStep + 1));
    } else {
      setShowGreat(true);
      // setShowReward(true);
    }
  };

  const handleClick = async () => {
    try {
      setCurrentStep(1);
      setModalVisible(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleModalClick = () => {
    setShowReward(true);
  };

  const handleClickMove = async () => {
    console.log('=====selectedActivity====', data);
    const param = {
      data: data,
    };
    navigation.navigate('ReviewActSection', {param: param});
    // navigation.navigate('MainPage', {param: true});
    // try {
    // const data = {
    //   name: text,
    //   selectedActivity: selectedActivity,
    //   selectedActivity: selectedActivity,
    //   selectedActivity: selectedActivity,
    // };
    //   setStep_2(true);
    //   navigation.navigate('SpeakingSection', {param: data});
    //   // navigation.navigate('MainPage', {param: true});
    // } catch (error) {
    //   setErrorMsg((error && error.error) || 'Something went wrong.');
    // }
  };

  const handleClickSound = async txt => {
    try {
      console.log('----------txt----------', txt);
      await dispatch(textToSpeech(txt));
      console.log('----------finished-----------------');
      setIsLoading(true);
      console.log('------------useEffect', isLoading);
      // dispatch(setStateFunc);
    } catch (error) {
      console.log('-----------error----------', error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      console.log('-----------audio playing--------------');
      playAudio(txtAudio);
    }
  }, [isLoading, playAudio, txtAudio]);

  const playAudio = async audioBase64 => {
    console.log('---------playAudio---------');

    const audioPath = `${RNFS.TemporaryDirectoryPath}tempaudio.mp3`;

    const base64String = audioBase64.replace('data:audio/mp3;base64,', '');

    await RNFS.writeFile(audioPath, base64String, 'base64')
      .then(() => {
        console.log('File written');
      })
      .catch(error => {
        console.error('Error writing file', error);
      });

    const sound = new Sound(audioPath, '', error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      // Play the sound if loaded successfully
      sound.play(success => {
        if (success) {
          console.log('Successfully finished playing');
          setIsLoading(false);
        } else {
          console.log('Playback failed due to audio decoding errors');
          setIsLoading(false);
        }
      });
    });
  };

  const MessageBlock = ({children}) => (
    <>
      <View style={styles.imageContainer}>
        <Image source={message} />
        <Text style={styles.title}>{children}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 9,
          position: 'absolute',
          top: 205,
          right: screenWidth / 20,
        }}>
        <TouchableOpacity onPress={() => handleClickSound(children)}>
          <Image source={sound_ico} />
        </TouchableOpacity>
        <Image source={turtle_ico} />
      </View>
    </>
  );

  const ActivityButton = ({label, onPress}) => (
    <TouchableOpacity style={styles.clickStyle} onPress={() => onPress(label)}>
      <Text style={styles.b2_text}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={plan_ico}
        title="Step 2. Create a plan"
        description="Let's create a plan for your week."
      />

      <RewardDialog
        modalVisible={showReward}
        setModalVisible={setModalVisible}
        handleClick={handleClickMove}
        title="Great job!"
        text="You've finished typing level!NN  Claim your reward."
        buttonText="Go to Step 2"
        icon={reward_ico}
      />

      <Header
        visible={true}
        text={'Weekly Plan'}
        color={'#FFFBF8'}
        editalbe={false}
        progress={progress}
      />

      <Image
        source={t_icon}
        style={{position: 'absolute', left: screenWidth / 20, top: 130}}
      />
      <Image
        source={me_icon}
        style={{position: 'absolute', right: screenWidth / 20, top: 330}}
      />

      {currentStep === 1 && (
        <>
          <MessageBlock children={'What would you like \nto do on Monday?'} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />
            <>
              <Text style={styles.m_title}>
                {`On Monday, I usually\nlike to ${
                  selectedActivity || '____________ .'
                }`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() =>
                    handleClickSound(
                      `On Monday, I usually like to ${selectedActivity}`,
                    )
                  }>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showButton && (
            <View style={[styles.chatBackground]}>
              {activities.map(
                (row, index) =>
                  row.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 15,
                        marginTop: index === 0 ? 0 : 18,
                        width: (screenWidth * 9) / 10,
                      }}
                      key={index}>
                      {row.map(activity => (
                        <ActivityButton
                          key={activity}
                          label={activity}
                          onPress={handlePress}
                        />
                      ))}
                    </View>
                  ),
              )}
            </View>
          )}
        </>
      )}
      {currentStep === 2 && (
        <>
          <MessageBlock children={'What about Tuesday?'} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />

            <>
              <Text style={styles.m_title}>
                {`On Tuesday, I would\nlike to ${
                  selectedActivity || '____________ .'
                }`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() =>
                    handleClickSound(`I'm ${selectedActivity} years old.`)
                  }>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showButton && (
            <View style={[styles.chatBackground]}>
              {activities.map(
                (row, index) =>
                  row.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 15,
                        marginTop: index === 0 ? 0 : 18,
                        width: (screenWidth * 9) / 10,
                      }}
                      key={index}>
                      {row.map(activity => (
                        <ActivityButton
                          key={activity}
                          label={activity}
                          onPress={handlePress}
                        />
                      ))}
                    </View>
                  ),
              )}
            </View>
          )}
        </>
      )}
      {currentStep === 3 && (
        <>
          <MessageBlock children={'What about \nWednesday?'} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />

            <>
              <Text style={styles.m_title}>
                {`On Wednesday, I always\nlike to ${
                  selectedActivity || '____________ .'
                }`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() =>
                    handleClickSound(`I have ${selectedActivity}`)
                  }>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showButton && (
            <View style={[styles.chatBackground]}>
              {activities.map(
                (row, index) =>
                  row.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 15,
                        marginTop: index === 0 ? 0 : 18,
                        width: (screenWidth * 9) / 10,
                      }}
                      key={index}>
                      {row.map(activity => (
                        <ActivityButton
                          key={activity}
                          label={activity}
                          onPress={handlePress}
                        />
                      ))}
                    </View>
                  ),
              )}
            </View>
          )}
        </>
      )}
      {currentStep === 4 && (
        <>
          <MessageBlock children={'How about Thursday?'} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />

            <>
              <Text style={styles.m_title}>
                {`On Thursday, I always\nlike to ${
                  selectedActivity || '____________ .'
                }`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() =>
                    handleClickSound(
                      `I selectedActivity as ${selectedActivity}`,
                    )
                  }>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showButton && (
            <View style={[styles.chatBackground]}>
              {activities.map(
                (row, index) =>
                  row.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 15,
                        marginTop: index === 0 ? 0 : 18,
                        width: (screenWidth * 9) / 10,
                      }}
                      key={index}>
                      {row.map(activity => (
                        <ActivityButton
                          key={activity}
                          label={activity}
                          onPress={handlePress}
                        />
                      ))}
                    </View>
                  ),
              )}
            </View>
          )}
        </>
      )}
      {currentStep === 5 && (
        <>
          <MessageBlock children={'What about Friday?'} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />

            <>
              <Text style={styles.m_title}>
                {`On Friday, I usually\nlike to ${
                  selectedActivity || '____________ .'
                }`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() =>
                    handleClickSound(
                      `I selectedActivity as ${selectedActivity}`,
                    )
                  }>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showButton && (
            <View style={[styles.chatBackground]}>
              {activities.map(
                (row, index) =>
                  row.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 15,
                        marginTop: index === 0 ? 0 : 18,
                        width: (screenWidth * 9) / 10,
                      }}
                      key={index}>
                      {row.map(activity => (
                        <ActivityButton
                          key={activity}
                          label={activity}
                          onPress={handlePress}
                        />
                      ))}
                    </View>
                  ),
              )}
            </View>
          )}
        </>
      )}
      {currentStep === 6 && (
        <>
          <MessageBlock children={'What would you like\nto do on Saturday?'} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />

            <>
              <Text style={styles.m_title}>
                {`On Saturday, I would\nlike to ${
                  selectedActivity || '____________ .'
                }`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() =>
                    handleClickSound(
                      `I selectedActivity as ${selectedActivity}`,
                    )
                  }>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showButton && (
            <View style={[styles.chatBackground]}>
              {activities.map(
                (row, index) =>
                  row.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 15,
                        marginTop: index === 0 ? 0 : 18,
                        width: (screenWidth * 9) / 10,
                      }}
                      key={index}>
                      {row.map(activity => (
                        <ActivityButton
                          key={activity}
                          label={activity}
                          onPress={handlePress}
                        />
                      ))}
                    </View>
                  ),
              )}
            </View>
          )}
        </>
      )}
      {currentStep === 7 && (
        <>
          <MessageBlock children={'What about Sunday?'} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />

            <>
              <Text style={styles.m_title}>
                {`On Sunday, \nI like to ${
                  selectedActivity || '____________ .'
                }`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() =>
                    handleClickSound(
                      `I selectedActivity as ${selectedActivity}`,
                    )
                  }>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showButton && (
            <View style={[styles.chatBackground]}>
              {activities.map(
                (row, index) =>
                  row.length > 0 && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        gap: 15,
                        marginTop: index === 0 ? 0 : 18,
                        width: (screenWidth * 9) / 10,
                      }}
                      key={index}>
                      {row.map(activity => (
                        <ActivityButton
                          key={activity}
                          label={activity}
                          onPress={handlePress}
                        />
                      ))}
                    </View>
                  ),
              )}
            </View>
          )}
        </>
      )}
      {showButton && (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: (screenWidth * 8) / 10,
            height: 57,
            position: 'absolute',
            bottom: 40,
            borderRadius: 45,
            backgroundColor: '#F08080',
          }}
          onPress={() => handleClickContinue()}>
          <Text style={styles.b1_text}>Continue</Text>
        </TouchableOpacity>
      )}
      <CustomGreatModal
        visible={showGreat}
        icon={thumb_icon}
        buttonType={true}
        handleClick={() => handleModalClick()}
        message="Great job!"
      />
    </View>
  );
};

export default WeeklyActPlanSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
    height: screenHeight,
    width: screenWidth,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -75,
    left: 10,
    // textAlign: 'left',
  },
  m_title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    position: 'relative',
    top: -67,
    right: 10,
    // textAlign: 'left',
  },
  b1_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b2_text: {
    color: '#F08080',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  imageContainer: {
    position: 'absolute',
    right: screenWidth / 20,
    top: 130,
    alignItems: 'center',
  },
  me_imageContainer: {
    position: 'absolute',
    left: screenWidth / 20,
    top: 320,
    alignItems: 'center',
  },
  icon: {
    justifyContent: 'center',
    width: 72,
    height: 72,
  },
  buttonIcon: {
    flexDirection: 'row',
    gap: 9,
    position: 'absolute',
    top: 70,
    left: 0,
  },
  clickStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width: '45%',
    height: 47,
    borderColor: '#F08080',
    borderWidth: 1,
    marginTop: 5,
    borderRadius: 45,
    backgroundColor: 'white',
  },
  chatBackground: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 25,
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: 340,
    bottom: 0,
    position: 'absolute',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 15,
  },
});
