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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Header from '../../../components/header';
import DeleteModal from '../../../components/deleteModal';

const clock_outline = require('../../../../assets/icons/profile/setting/clock_outline.png');
const vector = require('../../../../assets/icons/profile/setting/vector.png');
const mdi_delete = require('../../../../assets/icons/profile/setting/mdi_delete.png');
const verified_ico = require('../../../../assets/icons/profile/setting/verified_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const boxData = [
  {
    title: 'Passport',
  },
  {
    title: 'Passport',
  },
];

const IdVeriList = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const handlePress = () => {
    console.log('goto');
    // navigation.navigate('TimeSettingPage');
  };

  console.log('-------------------', editMode);

  return (
    <View style={styles.container}>
      <DeleteModal
        modalVisible={showModal}
        handleClick={setShowModal}
        // handleClick={handleClickMove}
        text="Are you sure to delete your passport?"
        visible={true}
      />

      <Header
        visible={false}
        text={'ID Verification'}
        color={'white'}
        editalbe={true}
        setEdit={setEditMode}
      />
      <ScrollView>
        <View style={styles.container_s}>
          {boxData.map((row, rowIndex) => (
            <View key={rowIndex} style={{width: (screenWidth * 9) / 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: (screenWidth * 8) / 10,
                }}>
                <Text style={styles.text}>{row.title}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.b2_text}>Verified </Text>
                  <Image source={verified_ico} />
                </View>
              </View>
              <View style={styles.underline} />
              {editMode && (
                <TouchableOpacity
                  onPress={() => setShowModal(true)}
                  style={{position: 'absolute', bottom: 18, right: 0}}>
                  <Image source={mdi_delete} />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.startButton} onPress={handlePress}>
            <Text style={styles.b3_text}>Add New Document</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default IdVeriList;

const styles = StyleSheet.create({
  container_s: {
    marginTop: 25,
    gap: 20,
    marginBottom: 100,
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
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
    // textAlign: 'left',
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 57,
    marginTop: 20,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
  b2_text: {
    color: '#23B80C',
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
  },
  b3_text: {
    color: 'white',
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
    marginTop: 20,
    height: 1,
    backgroundColor: '#1E1D2033',
    width: '92%',
    // marginTop: 1,
  },
});
