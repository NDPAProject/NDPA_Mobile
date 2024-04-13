import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const RewardDialog = ({
  modalVisible,
  setModalVisible,
  handleClick,
  title,
  text,
  buttonText,
  icon,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(!modalVisible)}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text_m}>
          {text.split('NN').map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index !== text.split('NN').length - 1 && <Text>{'\n'}</Text>}
            </React.Fragment>
          ))}
        </Text>
      </View>
    </View>
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={styles.startButton} onPress={handleClick}>
        <Text style={styles.b3_text}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -150,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'OpenSans-bold',
    fontWeight: '600',
    marginTop: 30,
    // textAlign: 'left',
  },
  modalView: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 200,
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    width: 280,
    height: 57,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
  text_m: {
    color: '#1E1D2080',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 10,
    // alignItems: 'center',
  },
  b3_text: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
});

export default RewardDialog;
