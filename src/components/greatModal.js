import {type} from 'microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common.speech/SpeechServiceConfig';
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const CustomGreatModal = ({
  visible,
  icon,
  message,
  showImage,
  buttonType,
  hand_ico,
  handleClick,
}) => (
  <Modal animationType="fade" transparent={true} visible={visible}>
    <LinearGradient
      style={styles.flexContainer}
      colors={['rgba(0, 0, 0, 0.2)', 'rgba(255, 218, 185, 0.4)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Image
            source={icon}
            style={{position: 'absolute', left: screenWidth / 20, top: 15}}
          />
          <Text style={styles.text_m}>
            {message.split('NN').map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index !== message.split('NN').length - 1 && (
                  <Text>{'\n'}</Text>
                )}
              </React.Fragment>
            ))}
          </Text>
          {buttonType ? (
            <TouchableOpacity style={styles.startButton} onPress={handleClick}>
              <Text style={styles.b3_text}>Continue</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.tryButton} onPress={handleClick}>
              <Text style={styles.b4_text}>Try again</Text>
            </TouchableOpacity>
          )}

          {showImage && <Image source={hand_ico} style={styles.handIcon} />}
        </View>
      </View>
    </LinearGradient>
  </Modal>
);

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(224, 208, 193, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: 135,
    padding: 15,
  },
  text_m: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    // textAlign: 'center',
    marginLeft: screenWidth / 20 + 45,
    marginTop: 6,
    // alignItems: 'center',
  },
  text_m2: {
    color: 'black',
    fontSize: 10,
    fontFamily: 'OpenSans-Medium',
    position: 'absolute',
    top: 5,
    left: 8,
  },
  handIcon: {
    position: 'absolute',
    bottom: -15,
    right: screenWidth / 15,
  },
  text_m3: {
    color: '#9D9C9D',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    textDecorationLine: 'underline',
    position: 'absolute',
    bottom: -25,
    right: -8,
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (screenWidth * 9.3) / 10,
    height: 57,
    marginTop: 20,
    borderRadius: 45,
    backgroundColor: '#23B80C',
  },
  tryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: (screenWidth * 9.3) / 10,
    height: 57,
    marginTop: 20,
    borderRadius: 45,
    backgroundColor: '#FFC700',
  },
  b3_text: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
  b4_text: {
    color: 'black',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
});

export default CustomGreatModal;
