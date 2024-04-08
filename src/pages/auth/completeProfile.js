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
  Modal,
} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import CountryPicker, {Country} from 'react-native-country-picker-modal';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Completeprofile = () => {
  const [pemail, setPemail] = useState('');
  const [date, setDate] = useState < string > '';
  const [open, setOpen] = useState < boolean > false;
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState < string > '';
  const [countryCode, setCountryCode] = useState < string > 'US';
  const [pickerVisible, setPickerVisible] = useState < boolean > false;
  const [isValidEmail, setIsValidEmail] = useState(false);

  const navigation = useNavigation();

  const isValidEmailT = email => {
    return /\S+@\S+\.\S+/.test(email);
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
    const datePattern =
      /^([0-2][0-9]|(3)[0-1])\/(((0)[0-9])|((1)[0-2]))\/\d{4}$/;
    return datePattern.test(inputDate);
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
            <Image
              source={require('../../../assets/icons/calend_ico.png')}
              style={{marginTop: 9}}
            />
          </TouchableOpacity>
          <Modal transparent={true} visible={open} animationType="slide">
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(237,226,216,0.5)',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderTopRightRadius: 25,
                  borderTopLeftRadius: 25,
                  padding: 20,
                  position: 'absolute',
                  bottom: 0,
                  width: screenWidth,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.b2_text}>Date of Birth</Text>
                  <TouchableOpacity
                    onPress={() => setOpen(false)}
                    style={{
                      marginTop: 5,
                    }}>
                    <Image
                      source={require('../../../assets/icons/close_ico.png')}
                    />
                  </TouchableOpacity>
                </View>
                {/* Replace DatePicker with Calendar from react-native-calendars */}
                <Calendar
                  onDayPress={day => {
                    setDate(day.dateString);
                    setOpen(false);
                  }}
                  // You can customize the Calendar further as needed
                />
              </View>
            </View>
          </Modal>
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
      <Button
        style={{
          justifyContent: 'center',
          width: (screenWidth * 9) / 10,
          height: 57,
          marginTop: 40,
          borderRadius: 45,
          backgroundColor: '#F08080',
        }}
        onPress={() => navigation.navigate('Profiledone')}>
        <Text style={styles.b3_text}>Save</Text>
      </Button>
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
    marginTop: screenHeight / 20,
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
