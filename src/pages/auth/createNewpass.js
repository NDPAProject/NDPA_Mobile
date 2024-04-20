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
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAuth} from '../../contexts/AuthContext';

const screenWidth = Dimensions.get('window').width;

const appIcon = require('../../../assets/icons/lock_ico.png');

const Createpwd = () => {
  const {changePassword, isChangePwd, email} = useAuth();
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [reason, setReason] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCpasswordVisible, setIsCpasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleCreatePass = async () => {
    console.log('clicked', password, cpassword);
    try {
      setIsLoading(true);
      if (password.length === 0) {
        setIsLoading(false);
        setReason('Password cannot be empty.');
        return;
      }
      if (cpassword.length === 0) {
        setIsLoading(false);
        setReason('ConfirmPassword cannot be empty.');
        return;
      }
      if (password !== cpassword) {
        setIsLoading(false);
        setReason('Passwords do not match.');
        return;
      }
      await changePassword(email, password);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      // setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('isChangePwd', isChangePwd);
    if (isChangePwd) {
      navigation.navigate('Pwddone');
    }
  }, [isChangePwd, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={appIcon}
        resizeMode={'contain'}
        style={{
          height: 180,
          width: 180,
        }}
      />
      <Text style={styles.title}>Create New Password</Text>
      <Text style={styles.text}>
        {' '}
        Your new password must be {'\n'}different from previously used
      </Text>
      <View style={styles.container_in}>
        <Text style={styles.b1_text}>Password</Text>
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
              source={require('../../../assets/icons/eye_show.png')}
              style={{justifyContent: 'center'}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.b1_text}>Confirm Password</Text>
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
              source={require('../../../assets/icons/eye_show.png')}
              style={{justifyContent: 'center'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {!isLoading && <Text style={styles.errorText}>{reason}</Text>}
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          marginTop: 51,
          borderRadius: 45,
          backgroundColor: '#F08080',
        }}
        onPress={handleCreatePass}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.b3_text}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Createpwd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container_in: {
    width: (screenWidth * 9) / 10,
    marginTop: 40,
  },
  title: {
    marginTop: 25,
    letterSpacing: -1,
    color: '#F08080',
    fontSize: 32,
    fontFamily: 'OpenSans-Bold',
  },
  text: {
    paddingTop: 20,
    color: '#8F8E8F',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BBBBBC',
    width: 46,
    height: 46,
    paddingLeft: 18,
    borderRadius: 5,
    fontSize: 20,
    fontFamily: 'OpenSans-Regular',
  },
  b1_text: {
    marginTop: 5,
    color: '#F08080',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },

  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b4_text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
  },
  b5_text: {
    color: '#F08080',
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
