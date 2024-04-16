import 'react-native-gesture-handler';

// Import React and Component
import React, {useState} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Button,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import {Picker} from '@react-native-picker/picker';
import TimerPicker from '../../../components/timePicker';

import Header from '../../../components/header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const dayData = [
  {
    id: 1,
    day: 'Mon',
  },
  {
    id: 2,
    day: 'Tue',
  },
  {
    id: 3,
    day: 'Wed',
  },
  {
    id: 4,
    day: 'Thu',
  },
  {
    id: 5,
    day: 'Fri',
  },
  {
    id: 6,
    day: 'Sat',
  },
  {
    id: 0,
    day: 'Sun',
  },
];

const TimeSetting = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [name, setName] = useState('');
  const [hours, setHours] = useState(6);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const handleBackPress = () => {
    console.log('clicked');
    navigation.goBack();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  const handlePress = id => {
    if (selectedDays.includes(id)) {
      setSelectedDays(selectedDays.filter(dayId => dayId !== id));
    } else {
      setSelectedDays([...selectedDays, id]);
    }
  };
  const decrement = (unit, setter, max) => {
    setter(prev => (prev - 1 + max) % max);
  };

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'Time Support'}
        color={'white'}
        editalbe={false}
      />
      <View style={styles.container_s}>
        <Text style={styles.title}>Set your time</Text>
        <Text style={styles.text}>
          Select how often would you like to receive a reminder
        </Text>
        {/* <TimerPicker /> */}
        <DatePicker
          date={date}
          onDateChange={setDate}
          //   mode="time"
          locale="en-GB" // Ensures 24-hour format if desired
          is24hourSource="locale" // Use this to enforce 24-hour time based on locale
          minuteInterval={1} // You can specify minute intervals
          androidVariant="iosClone" // Use this for iOS-like appearance on Android
          timeZoneOffsetInMinutes={0} // Adjust time zone if necessary
        />

        <Text style={styles.title}>Select Days</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {dayData.map(day => (
            <TouchableOpacity
              key={day.id}
              style={[
                styles.dayButton,
                {
                  borderColor: selectedDays.includes(day.id)
                    ? '#F08080'
                    : '#1E1D20',
                  backgroundColor: selectedDays.includes(day.id)
                    ? '#F08080'
                    : 'white',
                },
              ]}
              onPress={() => handlePress(day.id)}>
              <Text
                style={[
                  styles.dText,
                  {
                    color: selectedDays.includes(day.id)
                      ? '#FFFFFF'
                      : '#1E1D2080',
                  },
                ]}>
                {day.day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.title}>Name Reminder</Text>
        <TextInput
          style={[styles.input]}
          placeholder="Enter Name"
          placeholderTextColor="#969596"
          value={name}
          onChangeText={text => {
            setName(text);
          }}
          autoCapitalize="none"
        />

        <View style={{gap: 20}}>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.b3_text}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleBackPress}>
            <Text style={styles.b2_text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TimeSetting;

const styles = StyleSheet.create({
  container_s: {
    marginTop: 25,
    gap: 20,
    marginBottom: 100,
    width: (screenWidth * 9) / 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    height: screenHeight,
    backgroundColor: 'white',
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    // textAlign: 'left',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    // textAlign: 'left',
  },
  dayButton: {
    borderRadius: 5,
    borderWidth: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    textAlign: 'center',
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 57,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
  b3_text: {
    color: 'white',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
  cancelButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F08080',
    height: 57,
    borderRadius: 45,
    backgroundColor: 'white',
  },
  b2_text: {
    color: '#F08080',
    fontSize: 21,
    fontFamily: 'OpenSans-Medium',
  },
  iconCal: {
    justifyContent: 'center',
    width: 18,
    height: 20,
    marginLeft: 2,
  },
  iconClock: {
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  boxBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    height: 50,
  },

  underline: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#1E1D2033',
    width: '92%',
    // marginTop: 1,
  },
});
