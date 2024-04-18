import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {useAuth} from '../../../contexts/AuthContext';
import {useDispatch, useSelector} from 'react-redux';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CountryPicker, {Country} from 'react-native-country-picker-modal';

import Header from '../../../components/header';
import CalendarModal from '../../../components/calendaModal';

import {updateUserInfo, getUserInfo} from '../../../redux/slices/user';

const calend_ico = require('../../../../assets/icons/calend_ico.png');
const narrow_ico = require('../../../../assets/icons/narrow_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const profileIco = require('../../../../assets/icons/profile/sample.png');
const cameraIco = require('../../../../assets/icons/profile/mdi_camera.png');

const initialState = {
  fullName: '',
  birthday: '',
  individualDifferences: '',
  phoneNumber: '',
  userEmail: '',
  parentEmail: '',
  city: '',
  street: '',
};

const PersonalInfoPage = () => {
  const {users} = useAuth();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [house, setHouse] = useState('');
  const [zip, setZip] = useState('');
  const [date, setDate] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const {up_message, error, userInfo} = useSelector(state => state.user);

  console.log('========userInfo========', userInfo);

  const handleSave = () => {
    try {
      console.log('clicked');
      setIsLoading(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    console.log('isLoading:', isLoading, users.id);
    if (isLoading) {
      const userData = {
        formData: formData,
        country: country,
        house: house,
        zip: zip,
      };
      dispatch(updateUserInfo(userData, users.id));
    } else {
      dispatch(getUserInfo(users.id));
    }
  }, [isLoading]);

  useEffect(() => {
    console.log('message:', up_message, error);
    if (up_message?.code === 200) {
      setIsLoading(false);
      setEditMode(false);
    } else if (error) {
      setIsLoading(false);
    }
  }, [up_message, error]);

  console.log('-------formData---------', formData);
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  const handleChange = (text, key) => {
    // if (text !== '') {
    setFormData(prev => ({...prev, [key]: text}));
    // }
  };

  const selectItem = item => {
    handleChange(item, 'selectedField');
    setDropdownOpen(false);
  };

  console.log('---------------', users);

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

  const handleClose = async () => {
    try {
      setOpen(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const handleDateChange = inputDate => {
    console.log('---------handleDateChange----------');
    if (validateDate(inputDate)) {
      setDate(inputDate);
      // Proceed with any further actions after validation
    } else {
      // Handle invalid date format
      console.warn('Invalid date format');
    }
  };

  const onSelect = country => {
    const countryName = typeof country.name === 'string' ? country.name : '';
    setCountryCode(country.cca2);
    setCountry(countryName);
    setPickerVisible(false); // Close picker after selection
  };

  const generalData = [
    {text: 'Full Name', value: userInfo.data?.fullName, key: 'fullName'},
    {
      text: 'Date of Birth',
      value: userInfo.data?.birthday?.substring(0, 10),
      key: 'birthday',
    },
    {
      text: 'Individual Differences',
      value: 'Individual Differences',
      key: 'individualDifferences',
    },
  ];

  const contactData = [
    {
      text: 'Phone Number',
      value: userInfo.data?.phoneNumber,
      key: 'phoneNumber',
    },
    {text: 'Email', value: userInfo.data?.userEmail, key: 'userEmail'},
    {
      text: 'Parents Email',
      value: userInfo.data?.parentEmail,
      key: 'parentEmail',
    },
  ];

  const addressData = [
    {text: 'Country', value: userInfo.data?.country, key: 'country'},
    {text: 'City', value: 'City', key: 'city'},
    {text: 'Street', value: 'Street', key: 'street'},
  ];

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'Personal Information'}
        color={'white'}
        editalbe={true}
        setEdit={setEditMode}
      />
      <ScrollView>
        <View style={styles.centerContainer}>
          {editMode ? (
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: '#F08080',
                borderStyle: 'dotted',
              }}
            />
          ) : (
            <Image
              source={profileIco}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }}
            />
          )}
          <Image
            source={cameraIco}
            style={{position: 'absolute', bottom: 0, left: screenWidth / 2}}
          />
        </View>

        <View style={styles.container_s}>
          <Text style={styles.text}>General</Text>
          {generalData.map((row, rowIndex) => (
            <View style={styles.boxBackground} key={rowIndex}>
              <View style={{flexDirection: 'col', gap: 10}}>
                <Text style={styles.title}>{row.text}</Text>
                {editMode ? (
                  <>
                    {row.key === 'fullName' && (
                      <TextInput
                        style={[styles.input]}
                        placeholder={row.value}
                        placeholderTextColor="#F08080"
                        value={formData[row.key]}
                        onChangeText={text => handleChange(text, row.key)}
                        autoCapitalize="none"
                      />
                    )}

                    {row.key === 'birthday' && (
                      <>
                        <TextInput
                          style={[styles.input]}
                          placeholder={row.value}
                          placeholderTextColor="#F08080"
                          value={date}
                          onChangeText={handleDateChange}
                          autoCapitalize="none"
                        />
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            top: 40,
                            right: 10,
                          }}
                          onPress={() => setOpen(true)}>
                          <Image
                            source={calend_ico}
                            // style={{position: 'absolute', top: 40, right: 10}}
                          />
                        </TouchableOpacity>
                        <CalendarModal
                          visible={open}
                          onClose={handleClose}
                          onDateSelected={handleDateChange}
                        />
                      </>
                    )}

                    {row.key === 'individualDifferences' && (
                      <>
                        <TextInput
                          style={[styles.input]}
                          placeholder={row.value}
                          placeholderTextColor="#F08080"
                          value={formData[row.key]}
                          onChangeText={text => handleChange(text, row.key)}
                          autoCapitalize="none"
                        />
                        <Image
                          source={narrow_ico}
                          style={{position: 'absolute', top: 40, right: 10}}
                        />
                        {/* <TextInput
                          style={[styles.input]}
                          placeholder={row.value}
                          placeholderTextColor="#F08080"
                          value={formData.selectedField}
                          editable={false} // Make the TextInput non-editable
                          onTouchStart={() => setDropdownOpen(true)} // Open dropdown on touch
                        />
                        <TouchableOpacity
                          style={{position: 'absolute', top: 40, right: 10}}
                          onPress={() => setDropdownOpen(true)}>
                          <Image source={narrow_ico} />
                        </TouchableOpacity> */}
                        {/* <Modal
                          visible={isDropdownOpen}
                          transparent={true}
                          animationType="fade"
                          onRequestClose={() => setDropdownOpen(false)}>
                          <View style={styles.selectBackground}>
                            {items.map((item, index) => (
                              <TouchableOpacity
                                style={styles.select}
                                key={index}
                                onPress={() => selectItem(item)}
                                activeOpacity={1}>
                                <Text style={styles.text_m}>{item}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </Modal> */}
                      </>
                    )}
                  </>
                ) : (
                  <Text style={styles.text}>{row.value}</Text>
                )}
              </View>
              {!editMode && <View style={styles.underline} />}
            </View>
          ))}
          <Text style={[styles.text, {marginTop: 35}]}>Contacts</Text>
          {contactData.map((row, rowIndex) => (
            <View key={rowIndex}>
              <View style={styles.boxBackground}>
                <View style={{flexDirection: 'col', gap: 10}}>
                  <Text style={styles.title}>{row.text}</Text>
                  {editMode ? (
                    <TextInput
                      style={[styles.input]}
                      placeholder={row.value}
                      placeholderTextColor="#F08080"
                      value={formData[row.key]}
                      onChangeText={text => handleChange(text, row.key)}
                      autoCapitalize="none"
                    />
                  ) : (
                    <Text style={styles.text}>{row.value}</Text>
                  )}
                </View>
              </View>
              {!editMode && <View style={styles.underline} />}
            </View>
          ))}
          <Text style={[styles.text, {marginTop: 35}]}>Address</Text>
          {addressData.map((row, rowIndex) => (
            <View style={styles.boxBackground} key={rowIndex}>
              <View style={{flexDirection: 'col', gap: 10}}>
                <Text style={styles.title}>{row.text}</Text>
                {editMode ? (
                  <>
                    {row.key === 'country' ? (
                      <>
                        <TextInput
                          style={[styles.input]}
                          placeholder={row.value}
                          placeholderTextColor="#F08080"
                          value={country}
                          onChangeText={text => {
                            setCountry(text);
                          }}
                          autoCapitalize="none"
                          onFocus={() => setPickerVisible(true)}
                        />
                        <TouchableOpacity
                          style={{position: 'absolute', top: 40, right: 10}}
                          onPress={() => setPickerVisible(true)}>
                          <Image source={narrow_ico} />
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
                      </>
                    ) : (
                      <TextInput
                        style={[styles.input]}
                        placeholder={row.value}
                        placeholderTextColor="#F08080"
                        value={formData[row.key]}
                        onChangeText={text => handleChange(text, row.key)}
                        autoCapitalize="none"
                      />
                    )}
                  </>
                ) : (
                  <Text style={styles.text}>{row.value}</Text>
                )}
              </View>
              {!editMode && <View style={styles.underline} />}
            </View>
          ))}
          <View
            style={{
              width: (screenWidth * 9) / 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View style={{width: (screenWidth * 2) / 5}}>
              <View style={{flexDirection: 'col', gap: 10}}>
                <Text style={styles.title}>House</Text>
                {editMode ? (
                  <TextInput
                    style={[styles.input]}
                    placeholder="Number"
                    placeholderTextColor="#F08080"
                    value={house}
                    onChangeText={text => {
                      setHouse(text);
                    }}
                    autoCapitalize="none"
                  />
                ) : (
                  <Text style={styles.text}>Number</Text>
                )}
              </View>
              {!editMode && <View style={styles.underline} />}
            </View>
            <View style={{width: (screenWidth * 2) / 5}}>
              <View style={{flexDirection: 'col', gap: 10}}>
                <Text style={styles.title}>ZIP Code</Text>
                {editMode ? (
                  <TextInput
                    style={[styles.input]}
                    placeholder="ZIP"
                    placeholderTextColor="#F08080"
                    value={zip}
                    onChangeText={text => {
                      setZip(text);
                    }}
                    autoCapitalize="none"
                  />
                ) : (
                  <Text style={styles.text}>ZIP</Text>
                )}
              </View>
              {!editMode && <View style={styles.underline} />}
            </View>
          </View>
          {editMode && (
            <TouchableOpacity
              style={styles.startButton}
              onPress={handleSave}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.b3_text}>Save</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonalInfoPage;

const styles = StyleSheet.create({
  container_s: {
    marginTop: 25,
    gap: 20,
    marginBottom: 100,
  },
  centerContainer: {
    marginTop: 35,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    padding: 10,
    paddingLeft: 30,
    borderRadius: 40,
    height: 46,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  title: {
    color: '#F08080',
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    // textAlign: 'left',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    // textAlign: 'left',
  },

  icon: {
    justifyContent: 'center',
    width: 32,
    height: 32,
  },

  boxBackground: {
    width: (screenWidth * 9) / 10,
    height: 50,
    marginTop: 10,
    textAlign: 'left',
  },

  underline: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#1E1D2033',
    width: '100%',
    // marginTop: 1,
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 57,
    marginTop: 20,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
  b3_text: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
  select: {
    borderWidth: 1,
    borderColor: '#F08080',
    height: 46,
    width: (screenWidth * 9) / 10,
    // marginTop: 5,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
  },
  text_m: {
    color: '#F08080',
    fontSize: 21,
    fontFamily: 'OpenSans-bold',
    textAlign: 'center',
    marginTop: 3,
    // alignItems: 'center',
  },
  selectBackground: {
    gap: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: (screenHeight * 1.25) / 3,
    bottom: 0,
    position: 'absolute',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 15,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(237, 226, 216, 0.5)',
  },
});
