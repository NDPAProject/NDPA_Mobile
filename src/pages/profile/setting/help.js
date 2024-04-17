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
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import Header from '../../../components/header';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const drop_arrow_ico = require('../../../../assets/icons/profile/setting/drop_arrow_ico.png');
const up_arrow_ico = require('../../../../assets/icons/profile/setting/up_arrow_ico.png');

const reviewData =
  'We are here to help you with anything and \neverything on my NDPA';
const generalData = [
  {text: 'Your agreement', value: 'Your agreement'},
  {
    text: 'Age restristions',
    value: 'Age restristions',
  },
  {
    text: 'Basic use requirements',
    value: 'Basic use requirements',
  },
  {
    text: 'Your account',
    value: 'Your account',
  },
  {text: 'Use license', value: 'Use license'},
];

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (expandedIndex === index) {
      setExpandedIndex(null); // Collapse the row if it's already expanded
    } else {
      setExpandedIndex(index); // Expand the row if it's not the currently expanded one
    }
  };
  return (
    <View style={styles.container}>
      <Header visible={false} text={'Help'} color={'white'} editalbe={false} />
      <ScrollView>
        <View style={styles.container_s}>
          <Text style={styles.text}>{reviewData}</Text>
          <Text style={styles.text}>FAQs</Text>
          {generalData.map((row, rowIndex) => (
            <View key={rowIndex}>
              <View style={styles.boxBackground}>
                <View style={{flexDirection: 'column', gap: 10}}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => toggleExpand(rowIndex)}>
                    <Text style={styles.title}>{row.text}</Text>
                    {expandedIndex === rowIndex ? (
                      <Image source={up_arrow_ico} />
                    ) : (
                      <Image source={drop_arrow_ico} />
                    )}
                  </TouchableOpacity>
                  {expandedIndex === rowIndex && (
                    <View style={styles.body}>
                      <Text style={styles.content}>{row.value}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={styles.underline} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HelpPage;

const styles = StyleSheet.create({
  container_s: {
    marginTop: 25,
    gap: 20,
    marginBottom: 100,
  },

  container: {
    flex: 1,
    height: screenHeight,
    alignItems: 'center',
    backgroundColor: 'white',
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
  body: {
    padding: 10,
    paddingTop: 0,
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
});
