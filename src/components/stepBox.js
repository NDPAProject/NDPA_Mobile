import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const StepBox = ({style, step, description}) => {
  const navigation = useNavigation();

  const handleClick = () => {
    console.log('Redux store skip button click');
  };

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.stepText}>{`${step}/8`}</Text>
      <Text style={styles.descriptionText}>{description}</Text>
      <TouchableOpacity onPress={handleClick}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 360,
    height: 102,
    paddingTop: 4,
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  stepText: {
    fontWeight: '700',
    fontSize: 10,
    lineHeight: 13.62,
    color: '#1E1D20',
  },
  descriptionText: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 24.51,
    color: '#1E1D20',
  },
  skipText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 21.79,
    color: '#1E1D2080',
    textAlign: 'right',
  },
});

export default StepBox;
