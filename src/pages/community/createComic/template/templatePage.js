import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../../components/header';
import SearchBox from '../../../../components/searchBox';

const searchIcon = require('../../../../../assets/icons/mdi_magnify.png');
const temp_1 = require('../../../../../assets/icons/templates/temp_1.png');
const temp_2 = require('../../../../../assets/icons/templates/temp_2.png');
const temp_3 = require('../../../../../assets/icons/templates/temp_3.png');
const temp_4 = require('../../../../../assets/icons/templates/temp_4.png');
const temp_5 = require('../../../../../assets/icons/templates/temp_5.png');
const temp_6 = require('../../../../../assets/icons/templates/temp_6.png');

const popularItems = [
  {id: '1', image: temp_1},
  {id: '2', image: temp_2},
  {id: '3', image: temp_3},
  {id: '4', image: temp_4},
];

const superheroesItems = [
  {id: '1', image: temp_4},
  {id: '2', image: temp_5},
  {id: '3', image: temp_6},
  {id: '4', image: temp_2},
  {id: '5', image: temp_3},
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const comicCardWidth = (screenWidth * 9) / 10;

const TemplatePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [text, setText] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

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

  const SlideRow = ({title, items}) => (
    <View style={{width: comicCardWidth}}>
      <View
        style={{
          width: comicCardWidth,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.text_m}>View All</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.rowContainer}>
          {items.map(item => (
            <Image source={item.image} key={item.id} style={styles.image} />
          ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'Templates'}
        color={'white'}
        editalbe={false}
      />

      <SearchBox
        // handleInput={handleInput}
        text={text}
        handleChangeText={handleChangeText}
        // handleSend={handleSend}
        messageIcon={searchIcon}
        bottom={70}
      />
      <ScrollView style={{marginTop: 100, marginBottom: 90}}>
        <View style={{flexDirection: 'column', gap: 45}}>
          <SlideRow title="Popular" items={popularItems} />
          <SlideRow title="Superheroes" items={superheroesItems} />
          <SlideRow title="Fantasy" items={popularItems} />
          <SlideRow title="Adventure" items={popularItems} />
        </View>
      </ScrollView>
    </View>
  );
};

export default TemplatePage;

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
    fontFamily: 'OpenSans-Regular',
    marginTop: 0.7,
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 16,
    color: '#F08080',
  },
  scrollView: {
    flexGrow: 0,
    marginTop: 100,
  },
  image: {
    width: 120,
    height: 80,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 15,
  },
  rowTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'OpenSans-Medium',
  },
  rowViewAll: {
    color: '#8E8E8F',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '400',
    fontFamily: 'OpenSans-Medium',
  },
});
