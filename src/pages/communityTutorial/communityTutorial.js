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
import FeedbackModal from '../../components/feedbackModal';
import ExplainModal from '../../components/explainModal';

const comic_ico = require('../../../assets/icons/profile/comic/comic_ico.png');
const draw_ico = require('../../../assets/icons/profile/comic/draw_ico.png');
const search_ico = require('../../../assets/icons/profile/comic/search_ico.png');
const template_ico = require('../../../assets/icons/profile/comic/template_ico.png');

const screenWidth = Dimensions.get('window').width;
const boxData = [
  [
    {
      icon: draw_ico,
      text: 'Draw it yourself',
      nav: 'DrawSection',
    },
    {icon: template_ico, text: 'Templates', nav: 'TemplateSection'},
  ],
  [
    {icon: comic_ico, text: 'Scan a comic', nav: 'ScanSection'},
    {icon: search_ico, text: 'Search', nav: 'MainSearchSection'},
  ],
];

const CommunityTutorial = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(true);
  const [explainModal, setExplainModal] = useState(false);
  const [starRating, setStarRating] = useState(0);
  const [description, setDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleClick = comment => {
    try {
      setDescription(comment);
      console.log('commet', comment);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  const handleClickClose = async () => {
    try {
      setModalVisible(false);
      setExplainModal(false);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };

  // This function will be passed to the FeedbackModal
  const handleRating = rating => {
    setStarRating(rating);
    setExplainModal(true);
    setModalVisible(false);
    console.log('Rating received:', rating);
  };

  return (
    <View style={styles.container}>
      <FeedbackModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        handleClickClose={handleClickClose}
        handleRating={handleRating}
        title="Give Us Feedback"
        description="Are you having funNN using the app?"
      />
      <ExplainModal
        modalVisible={explainModal}
        setModalVisible={setModalVisible}
        handleClick={handleClick}
        handleClickClose={handleClickClose}
        title="Explain Your Choice"
      />
      <View style={styles.textBackground}>
        <Text style={styles.title}>Create a Comic</Text>
      </View>
      <ScrollView>
        <View style={styles.container_s}>
          {boxData.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  onPress={() => navigation.navigate(item.nav)}>
                  <View style={styles.boxBackground}>
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

export default CommunityTutorial;

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
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    // textAlign: 'left',
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
  icon: {
    justifyContent: 'center',
    width: 72,
    height: 72,
  },
  textBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: (screenWidth * 9) / 10,
    height: 100,
  },
  boxBackground: {
    flexDirection: 'column',
    backgroundColor: '#FFDAB91A',
    borderWidth: 1,
    borderColor: '#FBC4AB',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginTop: 20,
    borderRadius: 20,
    width: (screenWidth * 2.1) / 5,
    height: (screenWidth * 2) / 5,
  },
});
