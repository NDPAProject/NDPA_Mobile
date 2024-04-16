import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const DeleteDialog = ({modalVisible, handleClick, text}) => (
  <Modal animationType="slide" transparent={true} visible={modalVisible}>
    <View style={styles.centeredView}>
      <BlurView
        style={[styles.blurView, {backgroundColor: 'rgba(255, 218, 185, 0.4)'}]}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.modalView}>
        <Text style={styles.text_m}>
          {text.split('NN').map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index !== text.split('NN').length - 1 && <Text>{'\n'}</Text>}
            </React.Fragment>
          ))}
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => handleClick(!modalVisible)}>
          <Text style={styles.b3_text}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => handleClick(!modalVisible)}>
          <Text style={styles.b4_text}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0D2C4',
  },
  blurView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 349,
    height: 300,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
  },
  icon: {
    width: 100,
    height: 100,
  },
  handIcon: {
    position: 'absolute',
    bottom: -35,
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 57,
    marginTop: 20,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
  skipButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 57,
    marginTop: 20,
    borderRadius: 45,
    borderWidth: 1,
    borderColor: '#F08080',
    backgroundColor: 'white',
  },
  text_m: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 6,
    // alignItems: 'center',
  },
  b3_text: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
  b4_text: {
    color: '#F08080',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
});

export default DeleteDialog;
