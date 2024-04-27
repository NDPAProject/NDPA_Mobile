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
import {useDispatch, useSelector} from 'react-redux';

import Sound from 'react-native-sound';
import RNFS from 'react-native-fs';
import {textToSpeech} from '../../../redux/slices/audio';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/header';
import CustomDialog from '../../../components/dialogModal';
import RewardDialog from '../../../components/rewardModal';
import ChatBox from '../../../components/chatBox';

const qualities_ico = require('../../../../assets/icons/qualities_ico.png');
const addcolor_ico = require('../../../../assets/icons/learn/appearance/addcolor_ico.png');

const t_icon = require('../../../../assets/icons/tom_ico.png');
const me_icon = require('../../../../assets/icons/me.png');
const turtle_ico = require('../../../../assets/icons/turtle_ico.png');
const sound_ico = require('../../../../assets/icons/charm_sound-up.png');
const message = require('../../../../assets/icons/tchat_b.png');
const mechat_b = require('../../../../assets/icons/mechat_b.png');
const reward_ico = require('../../../../assets/icons/main/reward.png');
const mico_ico = require('../../../../assets/icons/mico.png');

const diligent = require('../../../../assets/icons/learn/qualities/diligent.png');
const tolerant = require('../../../../assets/icons/learn/qualities/tolerant.png');
const kind = require('../../../../assets/icons/learn/qualities/kind.png');
const funny = require('../../../../assets/icons/learn/qualities/funny.png');
const honest = require('../../../../assets/icons/learn/qualities/honest.png');
const loyal = require('../../../../assets/icons/learn/qualities/loyal.png');

const msg_send_passive = require('../../../../assets/icons/msg_send_passive.png');
const msg_send_active = require('../../../../assets/icons/msg_send_active.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const QualitiesSecton = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {txtAudio} = useSelector(state => state.audio);
  const [modalVisible, setModalVisible] = useState(true);
  const [showReward, setShowReward] = useState(false);
  const [hair, setHair] = useState('');
  const [eye, setEye] = useState('');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [progress, setProgress] = useState(0.125);
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  const [isLoading, setIsLoading] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(false);
  const [showSendButton, setShowSendButton] = useState(false);

  const {param} = route.params;

  console.log('-----------param------------', param);

  const qualities = [
    {label: 'Kind', image: kind},
    {label: 'Tolerant', image: tolerant},
    {label: 'Funny', image: funny},
    {label: 'Loyal', image: loyal},
    {label: 'Honest', image: honest},
    {label: 'Creative', image: diligent},
    {label: 'Positive', image: diligent},
    {label: 'Kind', image: kind},
    {label: 'Tolerant', image: tolerant},
    {label: 'Funny', image: funny},
    {label: 'Loyal', image: loyal},
    {label: 'Honest', image: honest},
  ];
  const [text, setText] = useState('');
  const messageIcon = text ? msg_send_active : msg_send_passive;

  const [errorMsg, setErrorMsg] = useState('');

  const handleChangeText = text => {
    try {
      if (text.length < 11) {
        setText(text);
      }
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleSend = () => {
    try {
      setShowContinueButton(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleClickContinue = () => {
    console.log('------currentStep-----', currentStep);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setShowContinueButton(false);
      setProgress(0.125 * (currentStep + 1));
    } else {
      setShowReward(true);
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

  const handleSelect = label => {
    setShowSendButton(true);
    setSelectedLabels(prevSelectedLabels => {
      if (prevSelectedLabels.includes(label)) {
        return prevSelectedLabels.filter(l => l !== label);
      } else {
        return [...prevSelectedLabels, label];
      }
    });
  };

  const handleShowButton = () => {
    setShowSendButton(false);
    setShowContinueButton(true);
  };

  const handleClickMove = async () => {
    try {
      const data = {
        name: text,
        hair: hair,
        eye: eye,
      };
      setCurrentStep(1);
      navigation.navigate('SpeakingSection', {param: data});
      // navigation.navigate('MainPage', {param: true});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
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
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: 9,
          position: 'absolute',
          top: 230,
          right: screenWidth / 20,
        }}>
        <TouchableOpacity onPress={() => handleClickSound(children)}>
          <Image source={sound_ico} />
        </TouchableOpacity>
        <Image source={turtle_ico} />
      </View>
    </>
  );

  const SelectButton = ({image, label, onPress, isSelected}) => {
    return (
      <TouchableOpacity
        style={{
          width: screenWidth / 5,
          height: 90,
          borderRadius: 10,
          borderColor: isSelected ? '#F08080' : '#D3D3D3',
          borderWidth: 2,
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'center',
        }}
        onPress={onPress}>
        <Image source={image} />
        <Text style={styles.colorTitle}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const EyeButton = ({image, label, onPress}) => {
    return (
      <View
        style={{
          width: screenWidth / 4,
          height: 90,
          borderRadius: 10,
          borderColor: '#D3D3D3',
          borderWidth: 1,
          alignItems: 'center',
          marginTop: 10,
          justifyContent: 'center',
        }}>
        {/* <TouchableOpacity onPress={onPress} style={[styles.circleButton]}>
          <Image source={image} />
        </TouchableOpacity> */}
        <Text style={styles.colorTitle}>{label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomDialog
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        icon={qualities_ico}
        title="Step 2. Qualities"
        description="Let's try to describe your friend's qualities."
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
        text={'Qualities'}
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
          <MessageBlock children={`What qualities does\n${param.name} have?`} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />
            <>
              <Text style={styles.m_title}>
                {`${param.name} is ${selectedLabels[0] || ''}\n${
                  selectedLabels.length > 1
                    ? selectedLabels.length > 4
                      ? `${selectedLabels.slice(1, 4).join(', ')}...`
                      : selectedLabels.slice(1).join(', ')
                    : '_______'
                }.`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() =>
                    handleClickSound(`${param.name} is ${selectedLabels}`)
                  }>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showContinueButton && (
            <View style={[styles.chatBackground]}>
              <Text
                style={[
                  styles.colorTitle,
                  {marginTop: 1, width: (screenWidth * 9) / 10},
                ]}>
                Select several qualities
              </Text>
              <ScrollView>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    marginTop: 15,
                  }}>
                  {qualities.map((qualitie, index) => (
                    <View key={index}>
                      <SelectButton
                        image={qualitie.image}
                        label={qualitie.label}
                        onPress={() => handleSelect(qualitie.label)}
                        isSelected={selectedLabels.includes(qualitie.label)}
                      />
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </>
      )}
      {currentStep === 2 && (
        <>
          <MessageBlock
            children={`Is there anything you\ndon't like about ${param.name}?`}
          />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />

            <>
              <Text style={[styles.m_title]}>
                {`${param.name} can be ${selectedLabels[0] || ''}\n${
                  selectedLabels.length > 1
                    ? selectedLabels.length > 4
                      ? `${selectedLabels.slice(1, 4).join(', ')}...`
                      : selectedLabels.slice(1).join(', ')
                    : '_______'
                }.`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() =>
                    handleClickSound(
                      `${param.name} can be ${selectedLabels || '______'}.`,
                    )
                  }>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
            </>
          </View>
          {!showContinueButton && (
            <View style={[styles.chatBackground]}>
              <Text
                style={[
                  styles.colorTitle,
                  {marginTop: 1, width: (screenWidth * 9) / 10},
                ]}>
                Select several qualities
              </Text>
              <ScrollView>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    alignItems: 'flex-start',
                    marginTop: 15,
                  }}>
                  {qualities.map((qualitie, index) => (
                    <View key={index}>
                      <SelectButton
                        image={qualitie.image}
                        label={qualitie.label}
                        onPress={() => handleSelect(qualitie.label)}
                        isSelected={selectedLabels.includes(qualitie.label)}
                      />
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </>
      )}
      {currentStep === 3 && (
        <>
          <MessageBlock children={`What do you look for\nin a friend?`} />

          <View style={styles.me_imageContainer}>
            <Image source={mechat_b} />

            <>
              <Text style={styles.m_title}>
                {`I value ${eye || '_______'}\nin a friend.`}
              </Text>
              <View style={styles.buttonIcon}>
                <TouchableOpacity
                  onPress={() => handleClickSound(`He has ${eye}`)}>
                  <Image source={sound_ico} />
                </TouchableOpacity>
                <Image source={turtle_ico} />
              </View>
              {!showContinueButton && (
                <View style={[styles.chatBackground]}>
                  <Text
                    style={[
                      styles.colorTitle,
                      {marginTop: 1, width: (screenWidth * 9) / 10},
                    ]}>
                    Select several qualities
                  </Text>
                  <ScrollView>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start',
                        marginTop: 15,
                      }}>
                      {qualities.map((qualitie, index) => (
                        <View key={index}>
                          <SelectButton
                            image={qualitie.image}
                            label={qualitie.label}
                            onPress={() => handleSelect(qualitie.label)}
                            isSelected={selectedLabels.includes(qualitie.label)}
                          />
                        </View>
                      ))}
                    </View>
                  </ScrollView>
                </View>
              )}
            </>
          </View>
        </>
      )}

      {showContinueButton && (
        <TouchableOpacity
          style={styles.clickButton}
          onPress={() => handleClickContinue()}>
          <Text style={styles.b1_text}>Continue</Text>
        </TouchableOpacity>
      )}

      {showSendButton && (
        <TouchableOpacity
          style={styles.clickButton}
          onPress={() => handleShowButton()}>
          <Text style={styles.b1_text}>Send</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QualitiesSecton;

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
    top: -100,
    left: 10,
    // textAlign: 'left',
  },
  colorTitle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
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
    flexWrap: 'wrap',
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
  clickButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (screenWidth * 8) / 10,
    height: 57,
    position: 'absolute',
    bottom: 40,
    borderRadius: 45,
    backgroundColor: '#F08080',
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
    height: 356,
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
