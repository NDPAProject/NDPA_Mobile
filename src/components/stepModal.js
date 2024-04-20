import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import MessageTom from './tomMsg';
import ChatBox from './chatBox';
import MyMessage from './myMsg';

const CustomStepModal = ({
  visible,
  onRequestClose,
  stepText,
  message,
  handleInput,
  text,
  handleSend,
  messageIcon,
  handleChangeText,
  showHand,
  sendClick,
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onRequestClose}>
    <LinearGradient
      style={styles.flexContainer}
      colors={['rgba(0, 0, 0, 0.2)', 'rgba(255, 218, 185, 0.4)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.text_m2}>{stepText}</Text>
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
          <TouchableOpacity
            onPress={onRequestClose}
            style={{position: 'absolute', bottom: 5, right: 8, zIndex: 3}}>
            <Text style={styles.text_m3}>Skip</Text>
          </TouchableOpacity>
        </View>
        {stepText === '2/5' && (
          <MessageTom
            children={' Hi! My name is Tom. \nWhat is your name?'}
            type={false}
          />
        )}
        {stepText === '3/5' && <MyMessage sendClick={sendClick} text={text} />}
        <ChatBox
          showHand={showHand}
          handleInput={handleInput}
          text={text}
          handleChangeText={handleChangeText}
          handleSend={handleSend}
          messageIcon={messageIcon}
          bottom={0}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 208, 193, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 360,
    height: 102,
    padding: 15,
  },
  text_m: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginTop: 6,
    zIndex: 1,
    // alignItems: 'center',
  },
  text_m2: {
    color: 'black',
    fontSize: 10,
    fontFamily: 'OpenSans-Medium',
    position: 'absolute',
    top: 5,
    left: 8,
    zIndex: 1,
  },
  text_m3: {
    color: '#9D9C9D',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    textDecorationLine: 'underline',
  },
});

export default CustomStepModal;
