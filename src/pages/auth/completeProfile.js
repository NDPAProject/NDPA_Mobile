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

  const [isLoading, setIsLoading] = useState(false);

  const {message, error} = useSelector(state => state.user);

  useEffect(() => {
    const userData = {
      fullName: name,
      pEmail: pemail,
      phoneNumber: number,
      country: country,
      bday: date,
    };
    console.log('isLoading:', isLoading, userData, users.id);
    if (isLoading) {
      dispatch(createProfile(userData, users.id));
    }
  }, [isLoading]);

  useEffect(() => {
    console.log('message:', message, error);
    if (message?.code === 200) {
      setIsLoading(false);
      navigation.navigate('Profiledone');
    } else if (error) {
      setIsLoading(false);
    }
  }, [message, error]);

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

  const handleClose = async () => {
    try {
      setOpen(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleSelect = async () => {
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
    // Regex to match YYYY-MM-DD format
    const datePattern =
      /^(19|20)\d{2}-((0[1-9]|1[0-2]))-((0[1-9]|[12][0-9]|3[01]))$/;

    // If you want to allow progressive input (e.g., "2020-", "2020-04-", "2020-04-0")
    const progressiveDatePattern =
      /^(19|20)\d{0,2}(-((0[1-9]|1[0-2])?(-((0[1-9]|[12][0-9]|3[01])?)?)?)?)?$/;

    // Check if the full date is valid
    if (datePattern.test(inputDate)) {
      console.log('Full date is valid.');
      return datePattern.test(inputDate);
    } else if (progressiveDatePattern.test(inputDate)) {
      console.log('Progressive date input is valid.');
      // return false;  // Return false but indicate it's still a valid progression
    } else {
      console.log('Invalid date input.');
      // return false;
    }
  };

  const handleDateChange = inputDate => {
    if (validateDate(inputDate)) {
      setDate(inputDate);
      // Proceed with any further actions after validation
    } else {
      // Handle invalid date format
      console.warn('Invalid date format');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Profile</Text>
      <View style={styles.container_in}>
        <Text style={styles.b0_text}>Full Name</Text>
        <TextInput
          style={[styles.input]}
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
          style={[styles.input]}
          placeholder="Phone Number"
          placeholderTextColor="#969596"
          value={number}
          onChangeText={text => {
            setNumber(text);
          }}
          autoCapitalize="none"
        />

        <Text style={styles.b0_text}>Parents Email</Text>
        <TextInput
          style={[
            styles.input,
            isValidEmail && pemail.length > 0 ? styles.validEmail : {},
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
            placeholder="dd/mm/yyyy"
            placeholderTextColor="#969596"
            value={date}
            onChangeText={handleDateChange}
            keyboardType="numeric" // Ensures only numeric keyboard is shown
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
            onDateSelected={handleDateChange}
          />
        </View>
        <Text style={styles.b0_text}>Country</Text>
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
          marginTop: 51,
          borderRadius: 45,
          backgroundColor: '#F08080',
          opacity: isLoading ? 0.5 : 1,
        }}
        onPress={handleSave}
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
  validEmail: {
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
