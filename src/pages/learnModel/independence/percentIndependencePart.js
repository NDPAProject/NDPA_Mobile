import 'react-native-gesture-handler';

// Import React and Component
import React, {useState, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';
import {ScrollView} from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PercentIndependenceSection = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {param} = route.params;

  console.log('----------param-----------------', param);
  const Quizs = [
    {
      id: 1,
      quiz: 'Set timer for a task',
      answer: '✓ Done',
      type: true,
    },
  ];
  const Quizs_3 = [
    {
      id: 1,
      quiz: 'Turn on the timer',
      answer: '✓ Done',
      type: true,
    },
    {
      id: 2,
      quiz: 'Turn off the timer',
      answer: param ? '✓ Done' : '✕ Failed',
      type: param,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={[
            styles.title,
            {marginTop: 50, fontSize: 22, fontWeight: '600'},
          ]}>
          Independence
        </Text>
        <View
          style={{marginTop: 30, alignContent: 'center', alignItems: 'center'}}>
          <CircularProgress
            value={param ? 100 : 60}
            radius={screenWidth / 5}
            inActiveStrokeColor={'#F08080'}
            activeStrokeColor={'#F08080'}
            inActiveStrokeOpacity={0.2}
            progressValueColor={'black'}
            valueSuffix={'%'}
          />
          <Text
            style={[
              styles.title,
              {fontWeight: '700', fontSize: 28, marginTop: 25},
            ]}>
            Great Job!
          </Text>
          <Text style={[styles.text, {textAlign: 'center'}]}>
            You`ve completed {param ? '3 / 3' : '2 / 3'} tasks
          </Text>
        </View>
        <View style={{width: (screenWidth * 9) / 10, marginTop: 15}}>
          <View style={styles.underline} />
          <Text style={[styles.sub_title]}>Step 2. Set timer</Text>
          {Quizs.map(quiz => (
            <View key={quiz.id}>
              <Text style={[styles.text, {marginTop: 10}]}>{quiz.quiz}</Text>
              <Text
                style={[
                  quiz.type ? styles.welcomeText : styles.incorrectText,
                  {marginTop: 10},
                ]}>
                {quiz.answer}
              </Text>
              {!quiz.type && (
                <Text style={[styles.correctText, {marginTop: 10}]}>
                  {`Correct answer: ${quiz.correctAnswer}`}
                </Text>
              )}
              <View style={[styles.underline, {marginTop: 10}]} />
            </View>
          ))}
          <Text style={[styles.sub_title]}>Step 3. Work</Text>
          {Quizs_3.map(quiz => (
            <View key={quiz.id}>
              <Text style={[styles.text, {marginTop: 10}]}>{quiz.quiz}</Text>
              <Text
                style={[
                  quiz.type ? styles.welcomeText : styles.incorrectText,
                  {marginTop: 10},
                ]}>
                {quiz.answer}
              </Text>
              <View style={[styles.underline, {marginTop: 10}]} />
            </View>
          ))}
        </View>
        <View
          style={{
            marginTop: 15,
            alignContent: 'center',
            alignItems: 'center',
            gap: 10,
            marginBottom: 50,
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: (screenWidth * 8) / 10,
              height: 57,
              borderRadius: 45,
              backgroundColor: '#F08080',
            }}
            onPress={() => navigation.navigate('MainPage')}>
            <Text style={styles.b1_text}>Finish</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: (screenWidth * 8) / 10,
              height: 57,
              borderColor: '#F08080',
              borderWidth: 1,
              borderRadius: 45,
              backgroundColor: 'white',
            }}
            onPress={() => navigation.navigate('StartPeerSection')}>
            <Text style={styles.b2_text}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PercentIndependenceSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
    fontFamily: 'OpenSans-Medium',
    textAlign: 'center',
  },
  sub_title: {
    color: 'black',
    fontFamily: 'OpenSans-Medium',
    fontSize: 19,
    fontWeight: '700',
    marginTop: 10,
  },
  underline: {
    height: 1.5,
    backgroundColor: '#D3D3D3',
    width: '100%',
    marginTop: 1,
  },
  text: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    marginTop: 5,
  },
  welcomeText: {
    color: '#23B80C',
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
  },
  incorrectText: {
    color: '#FF5050',
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
  },
  correctText: {
    color: '#F08080',
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
  },
  b1_text: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
  b2_text: {
    color: '#F08080',
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
  },
});
