// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAuth} from '../../../contexts/AuthContext';
import Header from '../../../components/header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const appIcon = require('../../../../assets/icons/lock_ico.png');

const ChangePwd = () => {
  const {changePassword, isChangePwd, email} = useAuth('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCpasswordVisible, setIsCpasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handleCreatePass = async () => {
    console.log('clicked', password, cpassword);
    try {
      console.log('=-=-=-=-=--', email, password);
      if (password === cpassword) {
        // setIsLoading(true);
        console.log('=-=-=-=-=--', email, password);
        await changePassword(email, password);
        // setIsLoading(false);
      } else {
        setIsValidPassword(false);
      }
    } catch (error) {
      console.log(error);
      // setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('isChangePwd', isChangePwd);
    if (isChangePwd) {
      navigation.navigate('pwdDone');
    }
  }, [isChangePwd, navigation]);

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'Change Password'}
        color={'white'}
        editalbe={false}
      />
      <View style={styles.container_in}>
        <Text style={styles.text}>
          Your new password must be different from{'\n'}previously used.
        </Text>
        <Text style={styles.b1_text}>New Password</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#F08080',
              padding: 10,
              paddingLeft: 30,
              marginTop: 15,
              marginBottom: 10,
              borderRadius: 40,
              fontFamily: 'OpenSans-Regular',
              width: (screenWidth * 9) / 10,
            }}
            placeholder="Password"
            placeholderTextColor="#969596"
            value={password}
            onChangeText={password => setPassword(password)}
            secureTextEntry={!isPasswordVisible} // Toggle between true/false based on isPasswordVisible
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              marginLeft: (screenWidth * 8) / 10,
            }}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Image
              source={require('../../../../assets/icons/eye_show.png')}
              style={{justifyContent: 'center'}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.b1_text}>New Confirm Password</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#F08080',
              padding: 10,
              paddingLeft: 30,
              marginTop: 15,
              marginBottom: 10,
              borderRadius: 40,
              fontFamily: 'OpenSans-Regular',
              width: (screenWidth * 9) / 10,
            }}
            placeholder="Password"
            placeholderTextColor="#969596"
            value={cpassword}
            onChangeText={cpassword => setCpassword(cpassword)}
            secureTextEntry={!isCpasswordVisible} // Toggle between true/false based on isPasswordVisible
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              marginLeft: (screenWidth * 8) / 10,
            }}
            onPress={() => setIsCpasswordVisible(!isCpasswordVisible)}>
            <Image
              source={require('../../../../assets/icons/eye_show.png')}
              style={{justifyContent: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {password === '' || cpassword === '' ? (
        <Button
          style={{
            justifyContent: 'center',
            width: (screenWidth * 9) / 10,
            height: 57,
            marginTop: 51,
            borderRadius: 45,
            backgroundColor: '#E9E9E9',
          }}>
          <Text style={styles.b2_text}>Save</Text>
        </Button>
      ) : (
        <Button
          style={{
            justifyContent: 'center',
            width: (screenWidth * 9) / 10,
            height: 57,
            marginTop: 51,
            borderRadius: 45,
            backgroundColor: '#F08080',
          }}
          onPress={handleCreatePass}>
          <Text style={styles.b3_text}>Save</Text>
        </Button>
      )}
    </View>
  );
};

export default ChangePwd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: screenHeight,
  },
  container_in: {
    width: (screenWidth * 9) / 10,
    marginTop: 40,
  },

  text: {
    textAlign: 'left',
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },

  b1_text: {
    marginTop: 25,
    color: '#F08080',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  b2_text: {
    color: '#838384',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
});
