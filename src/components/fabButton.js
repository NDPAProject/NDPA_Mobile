import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const FabButton = ({image, navigate, bgcolor}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    console.log(`TO ${navigate} FABGROUP CLICKED`);
    // navigation.navigate(navigate);
  };

  return (
    <TouchableOpacity
      style={[styles.fabButton, {backgroundColor: bgcolor}]}
      onPress={handleNavigation}>
      <Image source={image} style={styles.fabImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 30,
    backgroundColor: '#F08080',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabImage: {
    width: 32,
    height: 32,
  },
});

export default FabButton;
