import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

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

const b_text = require('../../../../assets/icons/profile/access_menu/b_text.png');
const contrast_ico = require('../../../../assets/icons/profile/access_menu/contrast_ico.png');
const dictionary_ico = require('../../../../assets/icons/profile/access_menu/dictionary_ico.png');
const dyslexia_ico = require('../../../../assets/icons/profile/access_menu/dyslexia_ico.png');
const line_height_ico = require('../../../../assets/icons/profile/access_menu/line_height_ico.png');
const links_ico = require('../../../../assets/icons/profile/access_menu/links_ico.png');
const page_structure_ico = require('../../../../assets/icons/profile/access_menu/page_structure_ico.png');
const reader_ico = require('../../../../assets/icons/profile/access_menu/reader_ico.png');
const saturation_ico = require('../../../../assets/icons/profile/access_menu/saturation_ico.png');
const smart_contrast = require('../../../../assets/icons/profile/access_menu/smart_contrast.png');
const spacing_text = require('../../../../assets/icons/profile/access_menu/spacing_text.png');
const text_align_ico = require('../../../../assets/icons/profile/access_menu/text_align_ico.png');
const voice_ico = require('../../../../assets/icons/profile/access_menu/voice_ico.png');
const warn_ico = require('../../../../assets/icons/profile/access_menu/warn_ico.png');

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const boxData = [
  [
    {
      icon: reader_ico,
      text: 'Screen Reader',
      warn: true,
      nav: '',
    },
    {icon: contrast_ico, text: 'Contrast +', warn: false, nav: ''},
  ],
  [
    {icon: smart_contrast, text: 'Smart Contrast', warn: false, nav: ''},
    {icon: links_ico, text: 'Highlight Links', warn: false, nav: ''},
  ],
  [
    {icon: b_text, text: 'Bigger Text', warn: false, nav: ''},
    {icon: spacing_text, text: 'Text Spacing', warn: false, nav: ''},
  ],
  [
    {icon: dyslexia_ico, text: 'Dyslexia Friendly', warn: true, nav: ''},
    {icon: page_structure_ico, text: 'Page Structure', warn: false, nav: ''},
  ],
  [
    {icon: line_height_ico, text: 'Line Height', warn: false, nav: ''},
    {icon: text_align_ico, text: 'Text Align', warn: false, nav: ''},
  ],
  [
    {icon: dictionary_ico, text: 'Dictionary', warn: false, nav: ''},
    {icon: saturation_ico, text: 'Saturation', warn: false, nav: ''},
  ],
  [{icon: voice_ico, text: 'Voice Settings', warn: false, nav: ''}],
];

const MainPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        visible={false}
        text={'Accessibility Menu'}
        color={'white'}
        editalbe={false}
      />
      <ScrollView>
        <View style={styles.container_s}>
          {boxData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  onPress={() => navigation.navigate(item.nav)}>
                  <View style={styles.boxBackground}>
                    {item.warn && (
                      <Image
                        source={warn_ico}
                        style={{
                          position: 'absolute',
                          top: 10,
                          left: 10,
                          width: 26,
                          height: 26,
                        }}
                      />
                    )}
                    <Image source={item.icon} style={styles.icon} />
                    <Text style={styles.text}>{item.text}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container_s: {
    padding: 10,
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
    fontSize: 18,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '600',
    // textAlign: 'left',
  },
  icon: {
    justifyContent: 'center',
    // width: 72,
    // height: 72,
  },
  boxBackground: {
    flexDirection: 'column',
    backgroundColor: '#FFDAB91A',
    borderWidth: 1,
    borderColor: '#FBC4AB',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    padding: 16,
    marginTop: 20,
    borderRadius: 20,
    width: (screenWidth * 2.1) / 5,
    height: (screenWidth * 2) / 5,
  },
});
