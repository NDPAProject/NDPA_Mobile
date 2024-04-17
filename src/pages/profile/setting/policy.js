import 'react-native-gesture-handler';

// Import React and Component
import React, {useState} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Header from '../../../components/header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const reviewData =
  'We want you to know exactly how our service \nwork and why we need your details. Reviewing\nour policy will help you continue using the app\nwith peace of mind.';
const generalData = [
  {text: 'What information do we collect \nabout you?', value: 'Status'},
  {
    text: 'How do we use your information?',
    value: 'How do we use your information?',
  },
  {
    text: 'To whom we disclose your information?',
    value: 'To whom we disclose your information?',
  },
  {
    text: 'What do we do to keep your information secure?',
    value: 'What do we do to keep your information secure?',
  },
  {text: 'Cookies and geo tracking', value: 'Cookies and geo tracking'},
];

const PrivacyPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);

  console.log('---------------', editMode);

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'Privacy Policy'}
        color={'white'}
        editalbe={false}
        setEdit={setEditMode}
      />
      <ScrollView>
        <View style={styles.container_s}>
          <Text style={styles.text}>{reviewData}</Text>
          {generalData.map((row, rowIndex) => (
            <View key={rowIndex}>
              <View style={styles.boxBackground}>
                <View style={{flexDirection: 'col', gap: 10}}>
                  <Text style={styles.title}>{row.text}</Text>

                  <Text style={styles.text}>{row.value}</Text>
                </View>
              </View>
              {!editMode && <View style={styles.underline} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPage;

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
    // height: 50,
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
});
