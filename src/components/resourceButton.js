import React from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const ResourceButton = ({image, text}) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 27,
      height: 27,
      shadow: {
        ...Platform.select({
          ios: {
            shadowColor: '#000000',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          android: {
            elevation: 8,
          },
        }),
      },
      gap: 4,
    }}
    onPress={() => {
      console.log('search the cakes on map');
    }}>
    <Image source={image} style={{width: 16, height: 16}} />
    <Text
      style={{
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 19.07,
        color: '#1E1D20',
      }}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default ResourceButton;
