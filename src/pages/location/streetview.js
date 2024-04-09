import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView from 'react-native-maps';
import StreetView from 'react-native-streetview';
import Footer from '../../components/footer';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Streetview = () => {
  const [location, setLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    heading: 0,
    pitch: 0,
  });
  return (
    <View style={styles.container}>
      <StreetView
        style={styles.streetView}
        allGesturesEnabled={true}
        coordinate={{
          latitude: -33.852,
          longitude: 151.211,
        }}
        pov={{
          tilt: parseFloat(0),
          bearing: parseFloat(0),
          zoom: parseInt(1),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  streetView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default Streetview;
