import React from 'react';
import {View, StyleSheet} from 'react-native';
import {fab_1, fab_2, fab_3} from '../constants/images';
import FabButton from './fabButton';

const FabGroup = () => {
  const fabButtons = [
    {image: fab_1, navigate: '', bgcolor: '#FFFFFF'},
    {image: fab_2, navigate: 'Streetview', bgcolor: '#FFFFFF'},
    {image: fab_3, navigate: '', bgcolor: '#F08080'},
  ];

  return (
    <View style={styles.fabContainer}>
      {fabButtons.map((fabButton, index) => (
        <FabButton
          key={index}
          image={fabButton.image}
          navigate={fabButton.navigate}
          bgcolor={fabButton.bgcolor}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 130,
    right: 16,
    zIndex: 1,
  },
});

export default FabGroup;
