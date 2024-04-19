import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const RsheetButton = ({
  image,
  navigate,
  bocolor,
  bgcolor,
  locationaddress,
  text,
  handlebottomvisible,
  type,
}) => {
  const navigation = useNavigation();

  const handleclick = () => {
    if (!type) {
      navigation.navigate(navigate, {locationaddress});

      handlebottomvisible();
    }
    navigation.navigate(navigate, {locationaddress});
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleclick}>
      <View
        style={[
          styles.buttonInner,
          {backgroundColor: bgcolor, borderColor: bocolor},
        ]}>
        <Image source={image} style={styles.icon} />
        <Text style={[styles.buttonTextStyle, {color: bocolor}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderRadius: 45,
    borderWidth: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonTextStyle: {
    fontSize: 21,
    lineHeight: 28.6,
    fontWeight: '600',
    fontFamily: 'OpenSans-Regular',
  },
  startText: {
    fontSize: 21,
    lineHeight: 28.6,
    fontWeight: '600',
    color: '#F08080',
    fontFamily: 'OpenSans-Regular',
  },
  button: {
    marginTop: 28,
    width: '48%',
  },
});

export default RsheetButton;
