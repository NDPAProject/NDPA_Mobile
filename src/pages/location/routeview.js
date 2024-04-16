import 'react-native-gesture-handler';
import {GOOGLE_API_KEY_ANDROID__} from '@env';

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {getRhumbLineBearing, computeDestinationPoint} from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Footer from '../../components/footer';
import {
  fab_1,
  fab_4,
  hand_ico,
  location_2,
  right_arrow,
} from '../../constants/images';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

Geocoder.init(GOOGLE_API_KEY_ANDROID__);

const FloatingActionButtonGroup = (routedata, showImage) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [locationaddress, setLocationaddress] = useState({
    location: '',
    address: '',
    location_info: '',
  });

  useEffect(() => {
    setLocationaddress({
      location_info: {lat: routedata.latitude, lng: routedata.longitude},
    });
  }, []);
  return (
    <View style={styles.fab_container}>
      <TouchableOpacity
        key={'route_view_map'}
        style={[styles.fabButton, {backgroundColor: '#FFFFFF'}]}
        onPress={() => {
          navigation.navigate('Routepage', {
            locationaddress: locationaddress,
          });
        }}>
        <Image source={fab_1} style={styles.fab_image} />
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          style={[styles.fabButton, {backgroundColor: '#FFFFFF'}]}
          onPress={() => {
            navigation.navigate('Streetview', {routedata: routedata});
          }}>
          <Image source={fab_4} style={styles.fab_image} />
        </TouchableOpacity>
        {showImage && (
          <Image
            source={hand_ico}
            style={{
              position: 'relative',
              bottom: 35,
              left: 0,
            }}
          />
        )}
      </View>
    </View>
  );
};

const Routeview = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //modal
  const [step_6, setStep_6] = useState(false);
  const [showImage, setShowImage] = useState(false);
  //
  const [coordinates, setCoordinates] = useState([
    {
      latitude: 51.51656759999999,
      longitude: -0.1784764,
    },
    {
      latitude: route.params.locationaddress.location_info.lat,
      longitude: route.params.locationaddress.location_info.lng,
    },
  ]);
  const mapView = useRef(null);
  const [result_dur_dis, setResult_dur_dis] = useState({
    duration: 0,
    distance: 0,
  });

  //origin screen center
  useEffect(() => {
    if (mapView.current) {
      mapView.current.animateToRegion({
        latitude: 51.51656759999999,
        longitude: -0.1784764,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }

    AsyncStorage.getItem('hasSeenTutorial').then(value => {
      if (value === null) {
        let timer;

        timer = setTimeout(() => {
          setStep_6(true);
          timer = setTimeout(() => {
            setShowImage(true);
          }, 800);
        }, 1000);
        return () => clearTimeout(timer);
      }
    });
  }, []);

  //street name
  const [region, setRegion] = useState({
    latitude: 51.51656759999999,
    longitude: -0.1784764,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [streetName, setStreetName] = useState('');
  const [newPoint, setNewPoint] = useState(null);

  useEffect(() => {
    if (coordinates[0] && coordinates[1]) {
      const bearing = getRhumbLineBearing(coordinates[0], coordinates[1]);
      const newPoint = computeDestinationPoint(coordinates[0], 10, bearing);
      setNewPoint(newPoint);
      console.log('NEW POINT', bearing, coordinates[1], newPoint);
    }
  }, [coordinates]);

  useEffect(() => {
    if (newPoint) {
      Geocoder.from(newPoint.latitude, newPoint.longitude)
        .then(json => {
          const addressComponent =
            json.results[0].formatted_address.split(',')[0];

          const street = addressComponent ? addressComponent : '';

          setStreetName(street);
          setRegion({
            latitude: newPoint.latitude,
            longitude: newPoint.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            title: street,
          });
          console.log('STREET NAME', street);
        })
        .catch(error => console.warn(error));
    }
  }, [newPoint]);

  useEffect(() => {
    console.log('Updated duration and distance:', result_dur_dis);
  }, [result_dur_dis]);

  // const onMapPress = e => {
  //   setCoordinates([...coordinates, e.nativeEvent.coordinate]);
  // };

  return (
    <View style={styles.container}>
      <MapView
        region={{
          latitude: 51.51656759999999,
          longitude: -0.1784764,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        style={StyleSheet.absoluteFill}
        ref={mapView}
        // onPress={onMapPress}
        customMapStyle={mapStyle}>
        {coordinates.map((coordinate, index) => (
          <Marker key={`coordinate_${index}`} draggable coordinate={coordinate}>
            <View
              style={{
                width: 32,
                height: 32,
                borderColor: '#F08080',
                backgroundColor: '#F08080',
                borderWidth: 2.4,
                borderRadius: 24,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#FE8572',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.5,
                shadowRadius: 16,
                elevation: 20,
              }}>
              <Image source={location_2} style={{width: 16, height: 16}} />
            </View>
          </Marker>
        ))}

        {coordinates.length >= 2 && (
          <MapViewDirections
            origin={coordinates[0]}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            }
            destination={coordinates[coordinates.length - 1]}
            apikey={GOOGLE_API_KEY_ANDROID__}
            strokeWidth={10}
            strokeColor="#F08080"
            mode="WALKING"
            optimizeWaypoints
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);

              setResult_dur_dis({
                duration: Math.round(result.duration * 10) / 10,
                distance: Math.round(result.distance * 10) / 10,
              });

              // mapView.current.fitToCoordinates(result.coordinates, {
              //   edgePadding: {
              //     right: 50,
              //     bottom: 50,
              //     left: 50,
              //     top: 50,
              //   },
              // });
            }}
            onError={errorMessage => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
      {streetName && (
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
              <Text style={styles.sheetText}>{streetName}</Text>
            </View>
          </View>
        </View>
      )}

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
            <Text
              style={styles.sheetText_}>{`${result_dur_dis.distance} km`}</Text>
          </View>
          <View
            style={{
              flexDirection: 'col',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text style={styles.sheetText}>Time</Text>
            <Text
              style={
                styles.sheetText_
              }>{`${result_dur_dis.duration} min`}</Text>
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
              backgroundColor: '#F08080',
            }}>
            <Text style={styles.button_textStyle}>End</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FloatingActionButtonGroup
        routedata={{
          latitude: route.params.locationaddress.location_info.lat,
          longitude: route.params.locationaddress.location_info.lng,
        }}
        showImage={false}
      />
      <Footer state={0} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={step_6}
        onRequestClose={() => setStep_6(!step_6)}>
        <LinearGradient
          style={{flex: 1}}
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(255, 218, 185, 0.4)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(224, 208, 193, 0.5)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                width: 360,
                height: 102,
                paddingTop: 4,
                paddingBottom: 12,
                paddingHorizontal: 12,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 10,
                  lineHeight: 13.62,
                  color: '#1E1D20',
                }}>
                6/8
              </Text>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 18,
                  lineHeight: 24.51,
                  color: '#1E1D20',
                }}>
                To begin, tap on the search bar to{'\n'}start finding your
                desired location.
              </Text>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 16,
                  lineHeight: 21.79,
                  color: '#1E1D2080',
                  textAlign: 'right',
                }}>
                Skip
              </Text>
            </View>

            <FloatingActionButtonGroup
              routedata={{
                latitude: route.params.locationaddress.location_info.lat,
                longitude: route.params.locationaddress.location_info.lng,
              }}
              showImage={showImage}
            />
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
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
  //bottom tab
  centeredView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    backgroundColor: '#FFFFFF',
    width: screenWidth - 32,
    gap: 20,
    borderRadius: 56,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Regular',
  },
  sheetText: {
    fontSize: 16,
    lineHeight: 21.79,
    fontWeight: '500',
    fontFamily: 'OpenSans-Regular',
    color: '#1E1D2080',
  },
  sheetText_: {
    fontSize: 22,
    lineHeight: 29.96,
    fontWeight: '700',
    fontFamily: 'OpenSans-Regular',
    color: '#1E1D20',
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
export default Routeview;
