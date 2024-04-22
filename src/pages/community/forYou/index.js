import 'react-native-gesture-handler';

// Import React and Component
import React, {useEffect, useState} from 'react';

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
import PostCard from '../../../components/postCard';

const create_comic_ico = require('../../../../assets/icons/community/view/create_comic.png');
const mdi_menu_act = require('../../../../assets/icons/community/view/mdi_menu_act.png');
const mdi_menu_pass = require('../../../../assets/icons/community/view/mdi_menu_pass.png');
const gallery_view_act = require('../../../../assets/icons/community/view/gallery_view_act.png');
const gallery_view_pass = require('../../../../assets/icons/community/view/gallery_view_pass.png');
const checkbox_view_act = require('../../../../assets/icons/community/view/checkbox_view_act.png');
const checkbox_view_pass = require('../../../../assets/icons/community/view/checkbox_view_pass.png');

const m_avatar = require('../../../../assets/icons/me_ico.png');
const w_avatar = require('../../../../assets/icons/community/view/w_avatar.png');
const sample_1 = require('../../../../assets/icons/community/view/sample_1.png');
const sample_2 = require('../../../../assets/icons/community/view/sample_2.png');
const sample_3 = require('../../../../assets/icons/community/view/sample_3.png');

const comic_ico = require('../../../../assets/icons/profile/comic/comic_ico.png');
const draw_ico = require('../../../../assets/icons/profile/comic/draw_ico.png');
const search_ico = require('../../../../assets/icons/profile/comic/search_ico.png');
const template_ico = require('../../../../assets/icons/profile/comic/template_ico.png');

const screenWidth = Dimensions.get('window').width;
const postData = [
  {
    id: '1',
    userName: 'David',
    image: sample_1,
    avatar: m_avatar,
    date: '2024-4-20',
    like: '5',
    comments: '10',
  },
  {
    id: '2',
    userName: 'Alex',
    image: sample_2,
    avatar: w_avatar,
    date: '2024-4-20',
    like: '11',
    comments: '9',
  },
];

const MainPage = () => {
  const navigation = useNavigation();
  const [menu, setMenu] = useState(true);
  const [gallery, setGallery] = useState(false);
  const [checkbox, setCheckBox] = useState(false);

  const handleClick = async param => {
    try {
      if (param === 'content') {
        navigation.navigate('MyContentSection');
      } else {
        navigation.navigate('ForYouSection');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickItem = async item => {
    try {
      switch (item) {
        case 'menu':
          updateStates(true, false, false);
          break;
        case 'gallery':
          updateStates(false, true, false);
          break;
        case 'checkbox':
          updateStates(false, false, true);
          break;
        default:
          console.log('Invalid item');
          break;
      }
    } catch (error) {
      console.error('Error handling item click:', error);
    }
  };

  const updateStates = (menu, gallery, checkbox) => {
    setMenu(menu);
    setGallery(gallery);
    setCheckBox(checkbox);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textBackground}>
        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => handleClick('content')}>
            <Text style={styles.title_s}>My Content</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity onPress={() => handleClick('foryou')}>
            <Text style={styles.title}>For You</Text>
          </TouchableOpacity>
          <View style={styles.underline} />
        </View>
      </View>
      <View style={styles.underline_s} />
      <ScrollView>
        <View style={styles.container_s}>
          {postData.map(data => (
            <View key={data.id}>
              <PostCard
                avatar={data.avatar}
                userName={data.userName}
                date={data.date}
                image={data.image}
                like={data.like}
                comments={data.comments}
              />
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
    alignItems: 'center',
    marginTop: 10,
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
    fontWeight: '600',
    fontFamily: 'OpenSans-Medium',
  },
  title_s: {
    color: '#D3D3D3',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'OpenSans-Medium',
  },
  underline: {
    height: 2,
    backgroundColor: 'black',
    width: '100%',
  },
  underline_s: {
    height: 1,
    backgroundColor: '#D3D3D3',
    width: '100%',
  },
  verticalline: {
    height: 30,
    backgroundColor: '#D3D3D3',
    width: 1.5,
    position: 'absolute',
    marginLeft: 40,
  },
  verticalline_s: {
    height: 30,
    backgroundColor: '#D3D3D3',
    width: 1.5,
    position: 'absolute',
    marginLeft: 90,
  },

  text: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
  },

  textBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
    width: (screenWidth * 9) / 10,
    height: 100,
  },
});
