import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

const comment_ico = require('../../assets/icons/community/view/mdi_comment-text-outline.png');
const like_ico = require('../../assets/icons/community/view/mdi_cards-heart-outline.png');
const export_ico = require('../../assets/icons/community/view/mdi_export-variant.png');
const screenWidth = Dimensions.get('window').width;

const PostCard = ({avatar, userName, date, image, like, comments}) => {
  return (
    <View style={{width: (screenWidth * 9) / 10}}>
      <View style={styles.userInfo}>
        <View style={styles.headerline}>
          <Image source={avatar} />
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Image source={image} style={{marginTop: 10}} />
      <View style={styles.userInfo}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <Image source={like_ico} />
          <Text style={styles.text}>{like}</Text>
          <Image source={comment_ico} />
          <Text style={styles.text}>{comments}</Text>
        </View>
        <Image source={export_ico} />
      </View>
      <View style={styles.underline_s} />
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: (screenWidth * 9) / 10,
    marginTop: 10,
  },

  headerline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  userName: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'OpenSans-Medium',
  },
  date: {
    fontSize: 14,
    color: '#B9B9B9',
    fontFamily: 'OpenSans-Medium',
  },
  text: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'OpenSans-Medium',
  },
  underline_s: {
    height: 1,
    backgroundColor: '#D3D3D3',
    width: '100%',
    marginTop: 10,
  },
});

export default PostCard;
