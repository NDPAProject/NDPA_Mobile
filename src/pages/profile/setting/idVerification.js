// https://aboutreact.com/react-native-login-and-signup/
// Import React and Component
import RNFS from 'react-native-fs';
import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {analyzeImage} from '../../../redux/slices/ocrApi';
import {useNavigation} from '@react-navigation/native';
import {
  Camera,
  useCameraPermission,
  useCameraDevice,
} from 'react-native-vision-camera';

import Header from '../../../components/header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const lucide_scan = require('../../../../assets/icons/profile/setting/lucide_scan.png');
const passport_ico = require('../../../../assets/icons/profile/setting/passport_ico.png');

const IdVerificationPage = () => {
  const navigation = useNavigation();
  const {hasPermission, requestPermission} = useCameraPermission();
  const dispatch = useDispatch();
  const device = useCameraDevice('back');

  const [success, setSuccess] = useState(false);
  const [click, setClick] = useState(false);
  const camera = useRef(null);
  const [imageBase64, setImageBase64] = useState('');

  const handleScanPass = async () => {
    try {
      console.log('clicked');
      const photo = await camera.current.takePhoto();
      console.log('--------photo---------', photo);
      RNFS.readFile(photo.path, 'base64')
        .then(base64String => {
          setImageBase64(base64String);
        })
        .catch(error => {
          console.error(error);
        });

      // Log or use base64String as needed
      await dispatch(analyzeImage(imageBase64));
      setSuccess(true);
    } catch (error) {
      console.log(error);
      // setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleStart = async () => {
    try {
      setClick(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOk = async () => {
    try {
      navigation.navigate('IdVerificationList');
    } catch (error) {
      console.log(error);
    }
  };

  if (device == null || !hasPermission) {
    return (
      <View style={styles.container}>
        <Text>No camera access or device found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'ID Verification'}
        color={'white'}
        editalbe={false}
      />
      <View style={styles.container_in}>
        {click ? (
          <>
            <Camera
              ref={camera}
              style={{width: (screenWidth * 9) / 10, height: screenHeight / 2}}
              device={device}
              isActive={true}
              photo={true}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleScanPass()}>
              <Text style={styles.b3_text}>Scan</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Image source={success ? passport_ico : lucide_scan} />
            <Text style={styles.text}>Use your phone to scan passport</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleStart()}>
              <Text style={styles.b3_text}>Start</Text>
            </TouchableOpacity>
          </>
        )}
        {/* {success && <Text style={styles.b2_text}>Success</Text>}
        {success ? (
          <Text style={styles.text}>
            You have successfully {'\n'}verified your passport
          </Text>
        ) : (
        
        )} */}
      </View>
    </View>
  );
};

export default IdVerificationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: screenHeight,
  },
  container_in: {
    width: (screenWidth * 9) / 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: -200,
  },
  text: {
    marginTop: 20,
    textAlign: 'left',
    color: '#8f8e8f',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
  b2_text: {
    marginTop: 20,
    color: '#F08080',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  camera: {
    width: 300,
    height: 400,
    borderRadius: 20,
    overflow: 'hidden',
  },
  preview: {flex: 1, justifyContent: 'flex-end', alignItems: 'center'},
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 286,
    height: 57,
    marginTop: 51,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
});
