import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const DirectionBox = ({streetName, image}) => {
  return (
    <View style={styles.centeredView}>
      <View style={styles.directionsView}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} resizeMode="cover" />
          </View>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.sheetTextTop}>Turn Left in 10m</Text>
          <Text style={styles.sheetText}>{streetName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 68,
    backgroundColor: '#FFFFFF',
    width: screenWidth - 32,
    gap: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  directionsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 8.25,
    padding: 6.6,
    backgroundColor: '#F08080',
  },
  image: {
    width: 52.8,
    height: 52.8,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 4,
  },
  sheetTextTop: {
    fontSize: 18,
    lineHeight: 24.51,
    fontWeight: '600',
    fontFamily: 'OpenSans-Regular',
    color: '#1E1D20',
  },
  sheetText: {
    fontSize: 16,
    lineHeight: 21.79,
    fontWeight: '500',
    fontFamily: 'OpenSans-Regular',
    color: '#1E1D2080',
  },
});

export default DirectionBox;
