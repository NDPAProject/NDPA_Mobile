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
const generalData = [
  {text: 'Full Name', value: 'Ross Rivers'},
  {text: 'Date of Birth', value: 'dd/mm/yyyy'},
  {text: 'Individual Differences', value: 'Individual Differences'},
];
const contactData = [
  {text: 'Phone Number', value: '+123 234 345 4567'},
  {text: 'Email', value: 'example@email.com'},
  {text: 'Parents Email', value: 'parents@email.com'},
];
const addressData = [
  {text: 'Country', value: 'Country'},
  {text: 'City', value: 'City'},
  {text: 'Street', value: 'Street'},
];
const profileIco = require('../../../../assets/icons/profile/sample.png');
const cameraIco = require('../../../../assets/icons/profile/mdi_camera.png');

const PersonalInfoPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);

  console.log('---------------', editMode);

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
            <View key={rowIndex}>
              <View style={styles.boxBackground}>
                <View style={{flexDirection: 'col', gap: 10}}>
                  <Text style={styles.title}>{row.text}</Text>
                  {editMode ? (
                    <TextInput
                      style={[styles.input]}
                      placeholder={row.value}
                      placeholderTextColor="#F08080"
                      value={name}
                      onChangeText={text => {
                        setName(text);
                      }}
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
                      value={name}
                      onChangeText={text => {
                        setName(text);
                      }}
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
            <View key={rowIndex}>
              <View style={styles.boxBackground}>
                <View style={{flexDirection: 'col', gap: 10}}>
                  <Text style={styles.title}>{row.text}</Text>
                  {editMode ? (
                    <TextInput
                      style={[styles.input]}
                      placeholder={row.value}
                      placeholderTextColor="#F08080"
                      value={name}
                      onChangeText={text => {
                        setName(text);
                      }}
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
                    value={name}
                    onChangeText={text => {
                      setName(text);
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
                    value={name}
                    onChangeText={text => {
                      setName(text);
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
            <TouchableOpacity style={styles.startButton}>
              <Text style={styles.b3_text}>Save</Text>
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
});
