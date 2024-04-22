import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../../components/header';
import ChatBox from '../../../../components/chatBox';

const msg_send_passive = require('../../../../../assets/icons/msg_send_passive.png');
const msg_send_active = require('../../../../../assets/icons/msg_send_active.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const comicCardWidth = (screenWidth * 9) / 10;

const SearchPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(true);
  const [step_2, setStep_2] = useState(true);

  const [text, setText] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const messageIcon = text ? msg_send_active : msg_send_passive;

  const handleClickMove = async () => {
    try {
      // navigation.navigate('SpeakingSection', {param: text});
      navigation.navigate('MainPage', {param: true});
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleChangeText = async text => {
    try {
      setText(text);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
    }
  };

  const ComicExample = ({title, subtitle}) => (
    <View style={styles.comicCard}>
      <Text style={styles.comicTitle}>{title}</Text>
      <Text style={styles.comicSubtitle}>{subtitle}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'Search'}
        color={'white'}
        editalbe={false}
      />

      {step_2 && (
        <>
          <View style={styles.imageContainer}>
            <Text style={styles.title}>Create a comic image of...</Text>
            <View style={{marginTop: 30, gap: 20}}>
              <ComicExample
                title="Example of the comic"
                subtitle="Lorem ipsum dolor sit amet consectetur."
              />
              <ComicExample
                title="Example of the comic"
                subtitle="Lorem ipsum dolor sit amet consectetur."
              />
              <ComicExample
                title="Example of the comic"
                subtitle="Lorem ipsum dolor sit amet consectetur."
              />
            </View>
          </View>
        </>
      )}
      <ChatBox
        // handleInput={handleInput}
        text={text}
        handleChangeText={handleChangeText}
        // handleSend={handleSend}
        messageIcon={messageIcon}
        bottom={20}
      />
    </View>
  );
};

export default SearchPage;

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
