import 'react-native-gesture-handler';

// Import React and Component
import React, {useState} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toggle from 'react-native-toggle-element';

import Header from '../../../components/header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const NotificationPage = () => {
  const [data, setData] = useState([
    {text: 'Tips and tutorials', state: false},
    {text: 'Messages from chats', state: false},
    {text: 'Likes and comments', state: false},
    {text: 'Announcements and updates ', state: true},
    {text: 'Reminders for schedule of activities', state: true},
    {text: 'New tasks', state: true},
    {text: 'Taking regular breaks while using\nthe app', state: false},
  ]);

  const [pData, setPdata] = useState([
    {
      text: 'Achievement or progress\nnotifications in completing tasks',
      state: false,
    },
    {text: 'Progress in specific skills or abilities', state: false},
    {
      text: 'Alerts when the child approaches a\nsafety perimeter',
      state: false,
    },
    {text: '⁠Alerts in the case of crisis.', state: true},
  ]);

  const navigation = useNavigation();

  const handleToggle = index => {
    const newData = [...data];
    newData[index].state = !newData[index].state;
    setData(newData);
  };

  const handleToggleP = index => {
    const newData = [...data];
    newData[index].state = !newData[index].state;
    setPdata(newData);
  };

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'Notifications'}
        color={'white'}
        editalbe={false}
      />
      <ScrollView>
        <View style={styles.container_s}>
          <Text style={styles.title}>In App</Text>
          {data.map((row, index) => (
            <View style={styles.boxBackground} key={index}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 25}}>
                <Text style={styles.text}>{row.text}</Text>
              </View>
              <Toggle
                value={row.state}
                onPress={() => handleToggle(index)}
                trackBarStyle={{
                  backgroundColor: row.state ? '#E5E5E5' : '#F08080',
                }}
                trackBar={{
                  borderWidth: 2,
                  width: 60,
                  height: 32,
                  radius: 25,
                }}
                thumbButton={{
                  width: 30,
                  height: 30,
                  radius: 30,
                }}
                thumbStyle={{
                  backgroundColor: 'white',
                }}
              />
            </View>
          ))}
          <View style={styles.underline} />
          <Text style={styles.title}>Parent Email</Text>
          {pData.map((row, index) => (
            <View style={styles.boxBackground} key={index}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 25}}>
                <Text style={styles.text}>{row.text}</Text>
              </View>
              <Toggle
                value={row.state}
                onPress={() => handleToggleP(index)}
                trackBarStyle={{
                  backgroundColor: row.state ? '#E5E5E5' : '#F08080',
                }}
                trackBar={{
                  borderWidth: 2,
                  width: 60,
                  height: 32,
                  radius: 25,
                }}
                thumbButton={{
                  width: 30,
                  height: 30,
                  radius: 30,
                }}
                thumbStyle={{
                  backgroundColor: 'white',
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default NotificationPage;

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
    backgroundColor: 'white',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'OpenSans-Medium',
    // textAlign: 'left',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    // textAlign: 'left',
  },
  icon: {
    justifyContent: 'center',
    width: 32,
    height: 32,
  },

  boxBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    height: 50,
  },

  underline: {
    marginTop: 5,
    height: 1,
    backgroundColor: '#1E1D2033',
    width: '100%',
    // marginTop: 1,
  },
});
