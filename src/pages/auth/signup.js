// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useContext} from 'react';
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
const screenHeight = Dimensions.get('window').height;

const Signup = () => {
  const {register, isRegister, data, clearData} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isCpasswordVisible, setIsCpasswordVisible] = useState(false);
  const [reason, setReason] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    try {
      console.log('Clicked-----', password.length, cpassword, email);
      setIsLoading(true);
      setReason('');
      if (email.length === 0) {
        setIsLoading(false);
        setReason('Please enter email.');
        return;
      }
      if (password.length === 0) {
        console.log('222222222222s');
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
      await register(email, password);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      setIsLoading(false);
    }
  };
  const navigation = useNavigation();

  useEffect(() => {
    clearData();
    console.log('Component mounted, data cleared');
  }, [clearData]);

  useEffect(() => {
    console.log('====', data);
    if (data?.code === 201) {
      navigation.navigate('Signin');
    }
  }, [data, navigation]);

  const handlePress = () => {
    console.log('Apple icon clicked!');
    // You can navigate or trigger any action here
  };

  const isValidEmailT = email => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validateEmail = text => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(text);
    setIsValidEmail(isValid);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.text}>Enter your details to proceed further</Text>
      <View style={styles.container_in}>
        <Text style={styles.b0_text}>Email</Text>
        <TextInput
          style={[
            styles.input,
            isValidEmail && email.length > 0 ? styles.validEmail : {},
          ]}
          placeholder="Enter email"
          placeholderTextColor="#969596"
          value={email}
          onChangeText={text => {
            setEmail(text);
            validateEmail(text); // Validate email whenever the text changes
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {!isValidEmailT(email) && email.length > 0 && (
          <Text style={styles.errorText}>Invalid email format</Text>
        )}
        {isRegister && <Text style={styles.errorText}>{data.message}</Text>}
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
            onChangeText={text => setPassword(text)}
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
            onChangeText={text => setCpassword(text)}
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
        {!isLoading && <Text style={styles.errorText}>{reason}</Text>}
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          borderRadius: 45,
          backgroundColor: '#F08080',
          opacity: isLoading ? 0.5 : 1,
        }}
        onPress={handleSignup}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.b3_text}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.dividerLine} />
      </View>
      <View style={styles.social}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../../../assets/icons/google_ico.png')}
            style={{width: 50, height: 50}} // Adjust the size as needed
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../../../assets/icons/face_ico.png')}
            style={{width: 50, height: 50}} // Adjust the size as needed
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../../../assets/icons/apple_ico.png')}
            style={{width: 50, height: 50}} // Adjust the size as needed
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 18,
        }}>
        <Text style={styles.b4_text}>Have an account </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.b5_text}>Sign In</Text>
          <View style={styles.underline} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: screenHeight,
  },
  container_in: {
    width: (screenWidth * 9) / 10,
    backgroundColor: 'white',
  },
  title: {
    color: '#F08080',
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight / 10,
    fontFamily: 'OpenSans-Bold',
  },
  text: {
    paddingTop: 15,
    color: '#8F8E8F',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
  },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    padding: 10,
    paddingLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
  },
  validEmail: {
    color: '#F08080', // Change text color to red when email is valid
  },
  b0_text: {
    marginTop: 30,
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
  },
  b1_text: {
    marginTop: 10,
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
  },
  b2_text: {
    marginLeft: (screenWidth * 6) / 10,
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    textDecorationLine: 'underline',
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
    // textDecorationLine: 'underline',
  },
  underline: {
    height: 2,
    backgroundColor: '#F08080',
    width: '100%',
    // marginTop: 1,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  eyeIcon: {
    marginLeft: 'auto',
  },
  dividerContainer: {
    width: (screenWidth * 9) / 10,
    justifyContent: 'space-between',
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    marginVertical: 20, // Add some vertical margin
  },
  social: {
    width: (screenWidth * 2.3) / 5,
    justifyContent: 'space-between',
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    // marginTop: 2,
  },
  dividerLine: {
    flex: 1, // Take up equal space
    height: 1, // 1 pixel high line
    backgroundColor: '#F08080', // Line color
  },
  dividerText: {
    marginHorizontal: 10, // Add horizontal margin around the text
    color: '#1E1D20',
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    // Any additional text styling here
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
