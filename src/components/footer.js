import 'react-native-gesture-handler';

// Import React and useState hook
import React, {useState} from 'react';

import {
  Image,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const footerIcons = [
  {
    source: require('../../assets/icons/footer/learn.png'),
    sourceClick: require('../../assets/icons/footer/learn_click.png'),
    navTarget: 'LearnSection',
  },
  {
    source: require('../../assets/icons/footer/chat.png'),
    sourceClick: require('../../assets/icons/footer/chat_click.png'),
    navTarget: 'ChatSection',
  },
  {
    source: require('../../assets/icons/footer/community.png'),
    sourceClick: require('../../assets/icons/footer/community_click.png'),
    navTarget: 'CommunitySection',
  },
  {
    source: require('../../assets/icons/footer/location.png'),
    sourceClick: require('../../assets/icons/footer/location_click.png'),
    navTarget: 'LocationSection',
  },
  {
    source: require('../../assets/icons/footer/profile.png'),
    sourceClick: require('../../assets/icons/footer/profile_click.png'),
    navTarget: 'ProfileSection',
  },
];

const Footer = props => {
  const navigation = useNavigation();
  const [activeIcon, setActiveIcon] = useState(null);
  const handlePress = navTarget => {
    // Implement navigation logic here, e.g., using React Navigation
    navigation.navigate(navTarget);
  };

  return (
    <View style={styles.textBackground}>
      {footerIcons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setActiveIcon(index), handlePress(icon.navTarget);
          }}>
          <Image
            source={
              activeIcon === index || props.state === index
                ? icon.sourceClick
                : icon.source
            }
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  textBackground: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: screenWidth,
    height: 88,
    bottom: 0,
    position: 'absolute',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android Shadow
    elevation: 15,
  },
});
