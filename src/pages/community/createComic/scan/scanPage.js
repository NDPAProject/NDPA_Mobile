import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../../components/header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const comicCardWidth = (screenWidth * 9) / 10;

const ScanPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [step_2, setStep_2] = useState(true);

  const [text, setText] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  return (
    <View style={styles.container}>
      <Header visible={false} text={'Scan'} color={'white'} editalbe={false} />
    </View>
  );
};

export default ScanPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    height: screenHeight,
    width: screenWidth,
  },
  input: {
    borderWidth: 1,
    borderColor: '#F08080',
    height: 40,
    width: (screenWidth * 9) / 10,
    marginTop: -40,
    padding: 1,
    paddingLeft: 30,
    borderRadius: 40,
    fontFamily: 'OpenSans-Regular',
  },
  title: {
    color: 'black',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
  },
  text_m: {
    color: '#F08080',
    fontSize: 21,
    fontFamily: 'OpenSans-bold',
    textAlign: 'center',
    marginTop: 3,
    // alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    // textAlign: 'left',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  comicCard: {
    width: comicCardWidth,
    height: 80,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 25,
    padding: 10,
    gap: 15,
  },
  comicTitle: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '700',
    fontFamily: 'OpenSans-Medium',
  },
  comicSubtitle: {
    color: '#8E8E8F',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '400',
    fontFamily: 'OpenSans-Medium',
  },
});
