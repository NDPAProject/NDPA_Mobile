import 'react-native-gesture-handler';
import {GOOGLE_API_KEY_ANDROID} from '@env';

//import modules
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';

//import screens
import Footer from '../../components/footer';
import {
  sb_search,
  sb_voice,
  img_location,
  close,
  back,
} from '../../constants/images';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Mainpage = () => {
  const ref = useRef();
  const [address, setAddress] = useState('Search');
  const [location, setLocation] = useState({});

  const navigation = useNavigation();
  const [activeIcon, setActiveIcon] = useState(null);

  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapStyle}>
        <Marker
          draggable
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Test Marker'}
          description={'This is a description of the marker'}
        />
      </MapView>

      <GooglePlacesAutocomplete
        ref={ref}
        onPress={(data, details = null) => {
          if (details) {
            setLocation(details.geometry.location);
            setActiveIcon(true);
          }
          console.log('search data', data, details);
        }}
        renderRow={data => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: screenWidth - 30,
              paddingTop: 32,
              paddingBottom: 10,
            }}>
            <Image
              source={img_location}
              style={{width: 32, height: 32, marginRight: 8}}
              resizeMode="contain"
            />
            <Text
              style={{
                color: '#1E1D20',
                fontSize: 16,
                fontFamily: 'OpenSans-Regular',
                fontWeight: 400,
              }}>
              {data.description}
            </Text>
          </View>
        )}
        renderRightButton={() => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={sb_voice}
              style={{width: 24, height: 24, marginRight: 16}}
            />
          </View>
        )}
        renderLeftButton={() => (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={sb_search}
              style={{width: 24, height: 24, marginLeft: 16}}
            />
          </View>
        )}
        textInputProps={{
          onChangeText: text => setAddress(text),
          placeholderTextColor: '#1E1D2080',
        }}
        query={{
          key: GOOGLE_API_KEY_ANDROID,
          language: 'en',
          types: 'address',
        }}
        placeholder="Enter Location"
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        styles={{
          textInputContainer: {
            alignSelf: 'center',
            backgroundColor: 'white',
            width: screenWidth - 32,
            borderRadius: 64,
            marginTop: 22,
          },
          textInput: {
            height: 48,
            color: '#1E1D20',
            fontSize: 16,
            fontFamily: 'OpenSans-Regular',
            lineHeight: 21,
            padding: 12,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },

          listView: {
            backgroundColor: 'white',
            width: screenWidth,
          },
          separator: {
            height: 1,
            backgroundColor: '#1E1D201A',
          },
        }}
        enablePoweredByContainer={false}
      />

      {/* <TouchableOpacity
        key={index}
        onPress={() => {
          setActiveIcon(index), handlePress(icon.navTarget);
        }}>
        <Image source={''} style={{width: 20, height: 20}} />
      </TouchableOpacity> */}

      <Footer state={0} />
    </View>
  );
};

export default Mainpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
  },
  //react native maps
  container_map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStyle = [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e9e9e9',
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5',
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dedede',
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#ffffff',
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        saturation: 36,
      },
      {
        color: '#333333',
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f2f2f2',
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#fefefe',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#fefefe',
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
];

// const mapStyle = [
//   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
//   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
//   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
//   {
//     featureType: 'administrative.locality',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#d59563'}],
//   },
//   {
//     featureType: 'poi',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#d59563'}],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'geometry',
//     stylers: [{color: '#263c3f'}],
//   },
//   {
//     featureType: 'poi.park',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#6b9a76'}],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry',
//     stylers: [{color: '#38414e'}],
//   },
//   {
//     featureType: 'road',
//     elementType: 'geometry.stroke',
//     stylers: [{color: '#212a37'}],
//   },
//   {
//     featureType: 'road',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#9ca5b3'}],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry',
//     stylers: [{color: '#746855'}],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'geometry.stroke',
//     stylers: [{color: '#1f2835'}],
//   },
//   {
//     featureType: 'road.highway',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#f3d19c'}],
//   },
//   {
//     featureType: 'transit',
//     elementType: 'geometry',
//     stylers: [{color: '#2f3948'}],
//   },
//   {
//     featureType: 'transit.station',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#d59563'}],
//   },
//   {
//     featureType: 'water',
//     elementType: 'geometry',
//     stylers: [{color: '#17263c'}],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.fill',
//     stylers: [{color: '#515c6d'}],
//   },
//   {
//     featureType: 'water',
//     elementType: 'labels.text.stroke',
//     stylers: [{color: '#17263c'}],
//   },
// ];
