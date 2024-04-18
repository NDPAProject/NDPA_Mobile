import React from 'react';
import {Dimensions, StyleSheet, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const ModalContainer = ({visible, onRequestClose, children}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onRequestClose}>
    <LinearGradient
      style={styles.flex}
      colors={['rgba(0, 0, 0, 0.2)', 'rgba(255, 218, 185, 0.4)']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      {children}
    </LinearGradient>
  </Modal>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 208, 193, 0.5)',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 140,
    width: screenWidth,
    paddingTop: 32,
    paddingBottom: 10,
    backgroundColor: 'white',
    paddingHorizontal: 24,
  },
  image: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  text: {
    color: '#1E1D20',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: 400,
  },
});

export default ModalContainer;
