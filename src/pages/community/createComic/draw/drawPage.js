import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../../components/header';

const hand_ico = require('../../../../../assets/icons/community/finger_ico.png');
const pencil_ico = require('../../../../../assets/icons/community/pencil_ico.png');
const pen_2 = require('../../../../../assets/icons/community/pen_2.png');
const eraser = require('../../../../../assets/icons/community/eraser.png');
const brush_ico = require('../../../../../assets/icons/community/brush_ico.png');
const rule_ico = require('../../../../../assets/icons/community/rule_ico.png');
const inc_pen = require('../../../../../assets/icons/community/inc_pen.png');
const add_ico = require('../../../../../assets/icons/community/add_ico.png');

const tools = [
  {id: '1', image: pencil_ico, nav: ''},
  {id: '2', image: pen_2, nav: ''},
  {id: '3', image: inc_pen, nav: ''},
  {id: '4', image: brush_ico, nav: ''},
  {id: '5', image: rule_ico, nav: ''},
  {id: '6', image: eraser, nav: ''},
];

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const comicCardWidth = (screenWidth * 9) / 10;

const DrawPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [step_2, setStep_2] = useState(true);

  const [text, setText] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const CircleButton = ({color, onPress}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.circleButton, {backgroundColor: color}]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'Draw it your self'}
        color={'white'}
        editalbe={false}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 200,
        }}>
        <Image source={hand_ico} />
        <Text style={styles.title}>Use your finger to draw</Text>
      </View>
      <View style={styles.underfinger} />
      <View
        style={{
          position: 'absolute',
          bottom: 176,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: (screenWidth * 9) / 10,
        }}>
        {tools.map(tool =>
          tool.id !== '1' ? (
            <TouchableOpacity
              key={tool.id}
              onPress={() => console.log('Add button pressed')}>
              <Image source={tool.image} style={{marginTop: 19}} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={tool.id}
              onPress={() => console.log('Add button pressed')}>
              <Image source={tool.image} key={tool.id} />
            </TouchableOpacity>
          ),
        )}
      </View>
      <View style={styles.underline} />
      <View
        style={{
          position: 'absolute',
          bottom: 100,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: (screenWidth * 9) / 10,
        }}>
        <CircleButton
          color="#FF0000"
          onPress={() => console.log('Red button pressed')}
        />
        <CircleButton
          color="#FFFF00"
          onPress={() => console.log('Yellow button pressed')}
        />
        <CircleButton
          color="#008000"
          onPress={() => console.log('Green button pressed')}
        />
        <CircleButton
          color="#0000FF"
          onPress={() => console.log('Blue button pressed')}
        />
        <CircleButton
          color="#4B0082"
          onPress={() => console.log('Indigo button pressed')}
        />
        <TouchableOpacity onPress={() => console.log('Add button pressed')}>
          <Image source={add_ico} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawPage;

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
    fontWeight: '600',
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
    color: '#8E8E8F',
    marginTop: 20,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underfinger: {
    position: 'absolute',
    bottom: 290,
    right: 0,
    height: 1,
    backgroundColor: '#D3D3D3',
    width: screenWidth,
  },
  underline: {
    position: 'absolute',
    bottom: 175,
    right: 0,
    height: 1,
    backgroundColor: '#D3D3D3',
    width: screenWidth,
  },
});
