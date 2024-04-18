// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
import Header from '../../../components/header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const lucide_scan = require('../../../../assets/icons/profile/setting/lucide_scan.png');
const passport_ico = require('../../../../assets/icons/profile/setting/passport_ico.png');

const IdVerificationPage = () => {
  const navigation = useNavigation();

  const [success, setSuccess] = useState(false);

  const handleCreatePass = async () => {
    try {
      console.log('clicked');
      setSuccess(true);
    } catch (error) {
      console.log(error);
      // setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickOk = async () => {
    try {
      navigation.navigate('IdVerificationList');
    } catch (error) {
      console.log(error);
    }
  };

  const takePicture = async camera => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
  };

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'ID Verification'}
        color={'white'}
        editalbe={false}
      />
      <View style={styles.container_in}>
        <Image source={success ? passport_ico : lucide_scan} />
        {/* <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}>
          {({camera, status}) => {
            if (status !== 'READY') return <View />;
            return (
              <View
                style={{
                  flex: 0,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.capture}>
                  <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera> */}
        {success && <Text style={styles.b2_text}>Success</Text>}
        {success ? (
          <Text style={styles.text}>
            You have successfully {'\n'}verified your passport
          </Text>
        ) : (
          <Text style={styles.text}>Use your phone to scan passport</Text>
        )}
      </View>
      {success ? (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 286,
            height: 57,
            marginTop: 51,
            borderRadius: 45,
            backgroundColor: '#F08080',
          }}
          onPress={handleClickOk}>
          <Text style={styles.b3_text}>OK</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 286,
            height: 57,
            marginTop: 51,
            borderRadius: 45,
            backgroundColor: '#F08080',
          }}
          onPress={handleCreatePass}>
          <Text style={styles.b3_text}>Start</Text>
        </TouchableOpacity>
      )}
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
    marginTop: screenHeight / 5,
  },
  preview: {flex: 1},
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
});
