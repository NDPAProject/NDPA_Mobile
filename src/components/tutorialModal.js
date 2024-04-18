import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const screenWidth = Dimensions.get('window').width;

const TutorialModal = ({modalVisible, onRequestClose, image, handleClick}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="black"
        />
        <View style={styles.modalContent}>
          <Image source={image} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.text_m}>
              Let's learn {'\n'}how to use the map!
            </Text>
            <TouchableOpacity style={styles.startButton} onPress={handleClick}>
              <Text style={styles.startButtonText}>Let's Start</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.skipButton}>
              <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 218, 185, 0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    padding: 24,
    gap: 22,
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
  },
  text_m: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 27.24,
    color: '#1E1D20',
    textAlign: 'center',
    alignSelf: 'center',
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 96,
    height: 48,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
  startButtonText: {
    fontWeight: '600',
    fontSize: 21,
    lineHeight: 28.6,
    color: 'white',
  },
  skipButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth - 96,
    height: 48,
    borderRadius: 45,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F08080',
  },
  skipButtonText: {
    fontWeight: '600',
    fontSize: 21,
    lineHeight: 28.6,
    color: '#F08080',
  },
});

export default TutorialModal;
