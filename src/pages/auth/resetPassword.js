// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../contexts/AuthContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const eye_show = require('../../../assets/icons/eye_show.png');

const Resetpwd = () => {
  const {forgotPassword, isForgotPassword} = useAuth();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    console.log('isForgotPassword', isForgotPassword);
    if (isForgotPassword) {
      navigation.navigate('Verifyemail');
    }
  }, [isForgotPassword, navigation]);

  const handleSendOTP = async () => {
    try {
      console.log('0000000000000000', email);
      setIsLoading(true);
      setReason('');
      if (email.length === 0) {
        setIsLoading(false);
        setReason('Please enter email.');
        return;
      }
      await forgotPassword(email);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setErrorMsg(
        (error && error.response && error.response.data.error) ||
          'Something went wrong.',
      );
      setIsLoading(false);
    }
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
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.text}>
        Please enter your email address {'\n'} {'  '}to receive a verification
        code
      </Text>
      <View style={styles.container_in}>
        <Text style={styles.b1_text}>Email</Text>
        <TextInput
          style={[
            styles.input,
            isValidEmail && email.length > 0 ? styles.validEmail : {},
          ]}
          placeholder="Enter email"
          placeholderTextColor="#969596"
          value={email}
          onChangeText={email => {
            setEmail(email);
            validateEmail(email); // Validate email whenever the text changes
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {!isValidEmailT(email) && email.length > 0 && (
          <Text style={styles.errorText}>Invalid email format</Text>
        )}
        {!isLoading && <Text style={styles.errorText}>{reason}</Text>}
      </View>
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
        onPress={handleSendOTP}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.b3_text}>Send</Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Text style={styles.b4_text}>Don`t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.b5_text}>Sign Up</Text>
          <View style={styles.underline} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Resetpwd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container_in: {
    width: (screenWidth * 9) / 10,
    backgroundColor: 'white',
    marginTop: 70,
  },
  title: {
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
    borderColor: '#F08080',
    padding: 10,
    paddingLeft: 30,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
  },
  b1_text: {
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
    height: 2, // Thickness of the underline
    backgroundColor: '#F08080', // Match the color with the text or as desired
    width: '100%', // Match the width with the text. Adjust if necessary
    // marginTop: 1, // Adjust the spacing between the text and the underline as needed
  },
  validEmail: {
    color: '#F08080', // Change text color to red when email is valid
  },

  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
