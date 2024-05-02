import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const close_ico = require('../../assets/icons/m_close_ico.png');
const act_star_ico = require('../../assets/icons/community/act_star.png');
const star_ico = require('../../assets/icons/community/star.png');

const RateModal = ({
  modalVisible,
  setModalVisible,
  handleClickClose,
  title,
  description,
  handleClick,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Image source={i <= rating ? act_star_ico : star_ico} />
        </TouchableOpacity>,
      );
    }
    return stars;
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}>
      <View style={styles.centeredView}>
        <BlurView
          style={[
            styles.blurView,
            {backgroundColor: 'rgba(255, 218, 185, 0.4)'},
          ]}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.modalView}>
          <Text style={styles.text_m}>{title}</Text>
          <TouchableOpacity onPress={handleClickClose} style={styles.icon}>
            <Image source={close_ico} />
          </TouchableOpacity>
          <Text style={styles.text_d}>
            {description.split('NN').map((part, index) => (
              <React.Fragment key={index}>
                {part}
                {index !== description.split('NN').length - 1 && (
                  <Text>{'\n'}</Text>
                )}
              </React.Fragment>
            ))}
          </Text>
          <View style={styles.starContainer}>{renderStars()}</View>
          <TextInput
            style={styles.input}
            onChangeText={setComment}
            value={comment}
            placeholder="Enter your comment..."
            placeholderTextColor={'#D2D2D2'}
            textAlignVertical="top"
            multiline={true}
          />
          {comment.length === 0 || rating === 0 ? (
            <View style={styles.passiveButton}>
              <Text style={styles.b3_text}>Send</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => handleClick(rating, comment)}>
              <Text style={styles.b3_text}>Send</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

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
    height: 329,
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
    position: 'absolute',
    right: 5,
    top: 5,
  },
  star: {
    marginTop: 5,
  },
  text_m: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginTop: 20,
    // alignItems: 'center',
  },
  text_d: {
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
    // alignItems: 'center',
  },
  b3_text: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    gap: 10,
    marginTop: 12,
  },
  passiveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 45,
    marginTop: 9,
    borderRadius: 45,
    bottom: 10,
    backgroundColor: '#D2D2D2',
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 280,
    height: 45,
    marginTop: 9,
    borderRadius: 45,
    bottom: 10,
    backgroundColor: '#F08080',
  },
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 280,
    borderRadius: 5,
    borderColor: '#D2D2D2',
  },
});

export default RateModal;
