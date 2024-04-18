import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

const close_ico = require('../../assets/icons/close_ico.png');

const CalendarModal = ({visible, onClose, onDateSelected}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer, {width: screenWidth}]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Date of Birth</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Image source={close_ico} />
            </TouchableOpacity>
          </View>
          <Calendar
            onDayPress={day => {
              onDateSelected(day.dateString);
              onClose();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(237, 226, 216, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    padding: 20,
    position: 'absolute',
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 5,
  },
});

export default CalendarModal;
