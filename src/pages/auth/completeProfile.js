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
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import CalendarModal from '../../components/calendaModal';
import CountryPicker, {Country} from 'react-native-country-picker-modal';

import {useAuth} from '../../contexts/AuthContext';
import {createProfile} from '../../redux/slices/user';

const calend_ico = require('../../../assets/icons/calend_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Completeprofile = () => {
  const {users} = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pemail, setPemail] = useState('');
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const {message, error} = useSelector(state => state.user);

  useEffect(() => {
    async function fetchData() {
      if (isLoading) {
        console.log('Preparing to fetch data...');
        const userData = {
          fullName: name,
          pEmail: pemail,
          phoneNumber: number,
          country: country,
          bday: date,
        };

        try {
          const result = await dispatch(createProfile(userData, users.id));
          console.log('Dispatch result:', result);

          if (message.code === 200) {
            setIsLoading(false);
            navigation.navigate('Profiledone');
          }
        } catch (error) {
          console.error('Error during fetch:', error);
          setIsLoading(false);
        }
      }
    }

    fetchData();
    // Potentially problematic cleanup if used incorrectly elsewhere
    return () => {
      console.log('Cleanup function');
      // Make sure this is a function and does nothing harmful or incorrect
    };
  }, [
    isLoading,
    name,
    pemail,
    number,
    country,
    date,
    users.id,
    dispatch,
    message,
    navigation,
  ]);

  const handleSave = async () => {
    try {
      setIsLoading(true);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      setIsLoading(false);
    }
  };

  const isValidEmailT = email => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isSaveDisabled =
    isLoading ||
    name.trim().length === 0 ||
    pemail.trim().length === 0 ||
    number.trim().length === 0 ||
    country.trim().length === 0 ||
    !isValidEmailT(pemail) ||
    !isValid;

  const handleClose = async () => {
    try {
      setOpen(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const onSelect = country => {
    const countryName = typeof country.name === 'string' ? country.name : '';
    setCountryCode(country.cca2);
    setCountry(countryName);
    setPickerVisible(false); // Close picker after selection
  };

  const validateEmail = text => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(text);
    setIsValidEmail(isValid);
  };

  const validateDate = inputDate => {
    const dateParts = inputDate.split('-').map(Number);
    if (dateParts.length === 3) {
      let [year, month, day] = dateParts;
      if (
        year < 1000 ||
        year > 9999 ||
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31
      ) {
        return false;
      }

      const monthLengths = [
        31,
        (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
      ];
      return day <= monthLengths[month - 1];
    }
    return false;
  };

  const handleDateChange = newInput => {
    if (newInput.length <= 10) {
      // Limit input length to 10 characters
      let updatedInput = newInput.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
      if (updatedInput.length > 4 && updatedInput.length <= 6) {
        updatedInput = updatedInput.slice(0, 4) + '-' + updatedInput.slice(4);
      }
      if (updatedInput.length > 6) {
        updatedInput =
          updatedInput.slice(0, 4) +
          '-' +
          updatedInput.slice(4, 6) +
          '-' +
          updatedInput.slice(6);
      }

      setDate(updatedInput);

      // Validate date when length reaches 10 characters (YYYY-MM-DD)
      if (updatedInput.length === 10) {
        setIsValid(validateDate(updatedInput));
      } else {
        setIsValid(true); // Assume valid until proven otherwise
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Profile</Text>
      <View style={styles.container_in}>
        <Text style={styles.b0_text}>Full Name</Text>
        <TextInput
          style={[styles.input, styles.validValue]}
          placeholder="Full Name"
          placeholderTextColor="#969596"
          value={name}
          onChangeText={text => {
            setName(text);
          }}
          autoCapitalize="none"
        />

        <Text style={styles.b0_text}>Phone Number</Text>
        <TextInput
          style={[styles.input, styles.validValue]}
          placeholder="Phone Number"
          placeholderTextColor="#969596"
          value={number}
          keyboardType="numeric"
          onChangeText={text => {
            setNumber(text);
          }}
          autoCapitalize="none"
        />

        <Text style={styles.b0_text}>Parents Email</Text>
        <TextInput
          style={[
            styles.input,
            isValidEmail && pemail.length > 0 ? styles.validValue : {},
          ]}
          placeholder="Parents Email"
          placeholderTextColor="#969596"
          value={pemail}
          onChangeText={text => {
            setPemail(text);
            validateEmail(text); // Validate email whenever the text changes
          }}
          autoCapitalize="none"
        />
        {!isValidEmailT(pemail) && pemail.length > 0 && (
          <Text style={styles.errorText}>Invalid email format</Text>
        )}

        <Text style={styles.b0_text}>Date of Birth</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={[
              styles.validValue,
              {
                borderWidth: 1,
                borderColor: '#F08080',
                padding: 10,
                paddingLeft: 30,
                marginTop: 15,
                marginBottom: 10,
                borderRadius: 40,
                fontFamily: 'OpenSans-Regular',
                width: (screenWidth * 9) / 10,
              },
            ]}
            placeholder="yyyy-mm-dd"
            placeholderTextColor="#969596"
            value={date}
            onChangeText={handleDateChange}
            keyboardType="numeric"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              marginLeft: (screenWidth * 8) / 10,
              marginTop: 15, // Align with TextInput
            }}
            onPress={() => setOpen(true)}>
            <Image source={calend_ico} style={{marginTop: 9}} />
          </TouchableOpacity>
          <CalendarModal
            visible={open}
            onClose={handleClose}
            onDateSelected={selectedDate => {
              handleDateChange(selectedDate);
            }}
          />
        </View>
        {!isValid && <Text style={styles.errorText}>Invalid Date</Text>}
        <Text style={styles.b0_text}>Country</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={[
              styles.validValue,
              {
                borderWidth: 1,
                borderColor: '#F08080',
                padding: 10,
                paddingLeft: 30,
                marginTop: 15,
                marginBottom: 10,
                borderRadius: 40,
                fontFamily: 'OpenSans-Regular',
                width: (screenWidth * 9) / 10,
              },
            ]}
            placeholder="Country"
            placeholderTextColor="#969596"
            value={country}
            onChangeText={text => {
              setCountry(text);
            }}
            onFocus={() => setPickerVisible(true)} // Open picker on input focus
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              marginLeft: (screenWidth * 8) / 10,
            }}
            onPress={() => setPickerVisible(true)} // Also open picker when the icon is clicked
          >
            <Image
              source={require('../../../assets/icons/narrow_ico.png')}
              style={{marginTop: 9}}
            />
          </TouchableOpacity>
          <View style={{width: 0, height: 0, overflow: 'hidden'}}>
            <CountryPicker
              countryCode={countryCode} // Temporary workaround for type assertion
              withFilter={true}
              withFlag={false} // Ensure flags are not displayed within the picker
              withCountryNameButton={true}
              withAlphaFilter={true}
              withCallingCode={false}
              onSelect={onSelect}
              visible={pickerVisible}
              onClose={() => setPickerVisible(false)}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          marginTop: 40,
          borderRadius: 45,
          backgroundColor: '#F08080',
          opacity: isSaveDisabled ? 0.5 : 1,
        }}
        onPress={handleSave}
        disabled={isSaveDisabled}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.b3_text}>Save</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Completeprofile;

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
    letterSpacing: -2,
    marginTop: screenHeight / 20,
    fontFamily: 'OpenSans-Bold',
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
  validValue: {
    color: '#F08080', // Change text color to red when email is valid
  },
  b0_text: {
    marginTop: screenHeight / 30,
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
  },
  b2_text: {
    marginTop: 5,
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
  },
  b3_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
