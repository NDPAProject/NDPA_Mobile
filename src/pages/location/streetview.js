import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import StreetView from 'react-native-streetview';
import {fab_1, fab_5, right_arrow, str_icon} from '../../constants/images';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const FloatingActionButtonGroup = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.fab_container}>
      <TouchableOpacity
        key={'route_view_map'}
        style={[styles.fabButton, {backgroundColor: '#FFFFFF'}]}
        onPress={() => {
          navigation.navigate('Routepage');
        }}>
        <Image source={fab_1} style={styles.fab_image} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.fabButton, {backgroundColor: '#FFFFFF'}]}
        onPress={() => {
          navigation.navigate('Streetview');
        }}>
        <Image source={fab_5} style={styles.fab_image} />
      </TouchableOpacity>
    </View>
  );
};

const Streetview = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 51.51656759999999,
    longitude: -0.1784764,
    heading: 0,
    pitch: 1,
  });
  return (
    <View style={styles.container}>
      <StreetView
        style={styles.streetView}
        allGesturesEnabled={true}
        coordinate={{
          latitude: 51.51656759999999,
          longitude: -0.1784764,
        }}
        pov={{
          tilt: parseFloat(0),
          bearing: parseFloat(0),
          zoom: parseInt(1),
        }}
      />

      <View style={[styles.centeredView_]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
          }}>
          <TouchableOpacity style={{}} onPress={() => {}}>
            <View
              style={{
                borderRadius: 8.25,
                padding: 6.6,
                backgroundColor: '#F08080',
              }}>
              <Image
                source={right_arrow}
                style={{width: 52.8, height: 52.8}}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'col',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.sheetText_top}>Turn Left in 10m</Text>
            <Text style={styles.sheetText_top_}>123 Street Name</Text>
          </View>
        </View>
      </View>
      <Image
        source={str_icon}
        style={{width: 543, height: 315, position: 'absolute', bottom: 0}}
      />
      <View style={[styles.centeredView]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 24,
            marginLeft: 16,
          }}>
          <View
            style={{
              flexDirection: 'col',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text style={styles.sheetText}>Distance</Text>
            <Text style={styles.sheetText_}>0.9 km</Text>
          </View>
          <View
            style={{
              flexDirection: 'col',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text style={styles.sheetText}>Time</Text>
            <Text style={styles.sheetText_}>10 min</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.navigate('Mainpage');
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto',
              height: 45,
              borderRadius: 45,
              paddingHorizontal: 24,
              paddingVertical: 8,
              backgroundColor: '#FFFFFF',
            }}>
            <Text style={styles.button_textStyle}>End</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FloatingActionButtonGroup />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  streetView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  //top tab
  centeredView_: {
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

  sheetText_top: {
    fontSize: 18,
    lineHeight: 24.51,
    fontWeight: '600',
    fontFamily: 'OpenSans-Regular',
    color: '#1E1D20',
  },
  sheetText_top_: {
    fontSize: 16,
    lineHeight: 21.79,
    fontWeight: '500',
    fontFamily: 'OpenSans-Regular',
    color: '#1E1D2080',
  },
  //bottom tab
  centeredView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    width: screenWidth - 32,
    gap: 20,
    // borderRadius: 56,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },

  textStyle: {
    fontSize: 16,
    lineHeight: 21.79,
    color: '#1E1D2080',
  },
  button_textStyle: {
    fontSize: 21,
    lineHeight: 28.6,
    fontWeight: '600',
    color: '#F08080',
    fontFamily: 'OpenSans-Regular',
  },
  sheetText: {
    fontSize: 16,
    lineHeight: 21.79,
    fontWeight: '500',
    fontFamily: 'OpenSans-Regular',
    color: '#FFFFFF',
  },
  sheetText_: {
    fontSize: 22,
    lineHeight: 29.96,
    fontWeight: '700',
    fontFamily: 'OpenSans-Regular',
    color: '#FFFFFF',
  },

  //fab
  fab_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 200,
    right: 16,
  },
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
  fab_image: {
    width: 32,
    height: 32,
  },
});
export default Streetview;
