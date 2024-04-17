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

const language_ico = require('../../../../assets/icons/profile/setting/language_ico.png');
const region_ico = require('../../../../assets/icons/profile/setting/region_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const generalData = [
  {
    ico: language_ico,
    text: 'Language',
    sample: 'English',
    value: 'Select language of the app interface',
  },
  {
    ico: region_ico,
    text: 'Region',
    sample: 'Select',
    value: 'Select your region',
  },
];

const LanguagePage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);

  console.log('---------------', editMode);

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'Language and Country'}
        color={'white'}
        editalbe={false}
        setEdit={setEditMode}
      />
      <ScrollView>
        <View style={styles.container_s}>
          {generalData.map((row, rowIndex) => (
            <View key={rowIndex}>
              <View style={styles.boxBackground}>
                <View style={{flexDirection: 'col', gap: 10}}>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <Image source={row.ico} style={{width: 20, height: 20}} />
                    <Text style={styles.title}>{row.text}</Text>
                  </View>
                  <Text style={styles.text}>{row.value}</Text>
                  <TextInput
                    style={[styles.input]}
                    placeholder={row.sample}
                    placeholderTextColor="#F08080"
                    value={name}
                    onChangeText={text => {
                      setName(text);
                    }}
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default LanguagePage;

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
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    alignItems: 'center',
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
