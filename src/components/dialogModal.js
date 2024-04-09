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

const CustomDialog = ({
  modalVisible,
  setModalVisible,
  handleClick,
  phone_ico,
  close_ico,
  hand_ico,
  showImage,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(!modalVisible)}>
    <View style={styles.centeredView}>
      <BlurView
        style={[styles.blurView, {backgroundColor: 'rgba(255, 218, 185, 0.4)'}]}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
      <View style={styles.modalView}>
        <Image source={phone_ico} style={styles.icon} />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}>
          <Image source={close_ico} />
        </TouchableOpacity>
        <Text style={styles.text_m}>Step 1. Typing</Text>
        <TouchableOpacity style={styles.startButton} onPress={handleClick}>
          <Text style={styles.b3_text}>Let's Start</Text>
        </TouchableOpacity>
        {showImage && <Image source={hand_ico} style={styles.handIcon} />}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 240,
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
    width: 72,
    height: 72,
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
  text_m: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginTop: 6,
    // alignItems: 'center',
  },
  b3_text: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
});

export default CustomDialog;
