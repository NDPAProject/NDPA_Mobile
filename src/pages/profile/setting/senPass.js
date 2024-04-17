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
  {text: 'Status', value: 'Status'},
  {text: 'Diagnosis', value: 'Diagnosis'},
  {
    text: 'Individual Needs',
    value:
      'Student may be particularly sensitive to \nsound, sight, touch, taste, balance',
  },
  {text: 'Support Needs', value: 'Explain things to me clearly'},
  {text: 'Likes', value: 'I like playing on my iPad, eating pizza'},
  {text: 'Dislikes', value: 'I dislike loud noises, perfumes'},
  {
    text: 'I communicate by...',
    value:
      'I do not use verbal language but do use PECS\nand my Communication Book',
  },
];
const eduData = [
  {
    text: 'Teacher should be aware of',
    value:
      'Student has difficulty focusing for extended \nperiods, especially during group activities',
  },
  {
    text: 'Student finds difficult',
    value: 'Social situations involving large groups',
  },
  {
    text: 'Student does independetly',
    value: 'Completes assigned reading tasks with\nminimal supervision',
  },
];
const addInfoData = [{text: 'Notes and comments', value: 'Enter information'}];
const profileIco = require('../../../../assets/icons/profile/sample.png');
const cameraIco = require('../../../../assets/icons/profile/mdi_camera.png');
const hintIco = require('../../../../assets/icons/profile/setting/hint_ico.png');

const SENPassportPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);

  console.log('---------------', editMode);

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'SEN Passport'}
        color={'white'}
        editalbe={true}
        setEdit={setEditMode}
      />
      <ScrollView>
        <View style={styles.container_s}>
          <Text style={styles.text}>General Information</Text>
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
          <Text style={[styles.text, {marginTop: 35}]}>
            Educational Information
          </Text>
          {eduData.map((row, rowIndex) => (
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
          <Text style={[styles.text, {marginTop: 35}]}>
            Additional Information
          </Text>
          {addInfoData.map((row, rowIndex) => (
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

export default SENPassportPage;

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
