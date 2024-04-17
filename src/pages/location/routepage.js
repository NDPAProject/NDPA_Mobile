import 'react-native-gesture-handler';
import {GOOGLE_API_KEY_ANDROID__} from '@env';

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {hand_ico} from '../../constants/images';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Routepage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  //modal
  const [step_5, setStep_5] = useState(false);
  const [showImage, setShowImage] = useState(false);
  //modal_end
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

  const [result_dur_dis, setResult_dur_dis] = useState({
    duration: 0,
    distance: 0,
  });

  console.log(
    'locao',
    route.params.locationaddress.location_info,
    coordinates[1],
  );
  const mapView = useRef(null);

  useEffect(() => {
    AsyncStorage.getItem('hasSeenTutorial').then(value => {
      if (value === null) {
        // If no data is available in AsyncStorage, show the modal
        let timer;

        timer = setTimeout(() => {
          setStep_5(true);
          timer = setTimeout(() => {
            setShowImage(true);
          }, 800);
        }, 1000);

        return () => clearTimeout(timer);
      }
    });
  }, []);

  useEffect(() => {
    console.log('Updated duration and distance:', result_dur_dis);
  }, [result_dur_dis]);

  const onMapPress = e => {
    setCoordinates([...coordinates, e.nativeEvent.coordinate]);
  };

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: route.params.locationaddress.location_info.lat,
          longitude: route.params.locationaddress.location_info.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFill}
        ref={mapView}
        onPress={onMapPress}
        customMapStyle={mapStyle}>
        {coordinates.map((coordinate, index) => (
          <Marker key={`coordinate_${index}`} draggable coordinate={coordinate}>
            <View
              style={{
                width: 24,
                height: 24,
                borderColor: '#F08080',
                backgroundColor: '#FFFFFF',
                borderWidth: 2.4,
                borderRadius: 24,
                shadowColor: '#FE8572',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.5,
                shadowRadius: 16,
                elevation: 20,
              }}></View>
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
            strokeWidth={5}
            strokeColor="#F08080"
            lineDashPattern={[0, 0]}
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

              mapView.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
            onError={errorMessage => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
        {coordinates.length >= 2 && (
          <MapViewDirections
            origin={coordinates[0]}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            }
            destination={coordinates[coordinates.length - 1]}
            apikey={GOOGLE_API_KEY_ANDROID__}
            strokeWidth={5}
            lineDashPattern={[0, 0]}
            strokeColor="#0000004D"
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);

              // setResult_dur_dis({
              //   duration: Math.round(result.duration * 10) / 10,
              //   distance: Math.round(result.distance * 10) / 10,
              // });

              mapView.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: screenWidth / 20,
                  bottom: screenHeight / 20,
                  left: screenWidth / 20,
                  top: screenHeight / 20,
                },
              });
            }}
            onError={errorMessage => {
              // console.log('GOT AN ERROR');
            }}
          />
        )}
      </MapView>
      <View style={[styles.centeredView]}>
        <Text style={styles.sheetText}>
          {`${result_dur_dis.duration} min`}{' '}
          <Text
            style={{
              fontSize: 20,
              color: '#1E1D2080',
            }}>{`(${result_dur_dis.distance} km)`}</Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 20,
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: '#F08080',
                backgroundColor: '#FFFFFF',
              }}></View>
            <View
              style={{
                width: 0,
                height: 84,
                borderLeftWidth: 2,
                borderStyle: 'dashed',
                borderColor: '#F08080',
                backgroundColor: '#FFFFFF',
              }}></View>
            <View
              style={{
                width: 16,
                height: 16,
                backgroundColor: '#F08080',
                borderRadius: 8,
              }}></View>
          </View>
          <View
            style={{
              flexDirection: 'col',
              justifyContent: 'flex-start',
              gap: 20,
            }}>
            <View
              style={{
                flexDirection: 'col',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 24.51,
                  fontWeight: '500',
                  color: '#1E1D20',
                  fontFamily: 'OpenSans-Regular',
                }}>
                Home
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 21.79,
                  fontWeight: '500',
                  color: '#1E1D2080',
                  fontFamily: 'OpenSans-Regular',
                }}>
                Eastbourne Terrace, London W2, UK
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'col',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 24.51,
                  fontWeight: '500',
                  color: '#1E1D20',
                  fontFamily: 'OpenSans-Regular',
                }}>
                {route.params.locationaddress.location}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 21.79,
                  fontWeight: '500',
                  color: '#1E1D2080',
                  fontFamily: 'OpenSans-Regular',
                }}>
                {route.params.locationaddress.address}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{}}
          onPress={() => {
            navigation.navigate('Routeview', {
              locationaddress: route.params.locationaddress,
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: 45,
              borderRadius: 45,
              backgroundColor: '#F08080',
            }}>
            <Text style={styles.button_textStyle}>Start Route</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={step_5}
        onRequestClose={() => setStep_5(!step_5)}>
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
                flex: 1,
                position: 'absolute',
                bottom: 500,
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
                5/8
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

            <View style={[styles.centeredView]}>
              <Text style={styles.sheetText}>
                {`${result_dur_dis.duration} min`}{' '}
                <Text
                  style={{
                    fontSize: 20,
                    color: '#1E1D2080',
                  }}>{`(${result_dur_dis.distance} km)`}</Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  gap: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      borderWidth: 2,
                      borderColor: '#F08080',
                      backgroundColor: '#FFFFFF',
                    }}></View>
                  <View
                    style={{
                      width: 0,
                      height: 84,
                      borderLeftWidth: 2,
                      borderStyle: 'dashed',
                      borderColor: '#F08080',
                      backgroundColor: '#FFFFFF',
                    }}></View>
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      backgroundColor: '#F08080',
                      borderRadius: 8,
                    }}></View>
                </View>
                <View
                  style={{
                    flexDirection: 'col',
                    justifyContent: 'flex-start',
                    gap: 20,
                  }}>
                  <View
                    style={{
                      flexDirection: 'col',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        lineHeight: 24.51,
                        fontWeight: '500',
                        color: '#1E1D20',
                        fontFamily: 'OpenSans-Regular',
                      }}>
                      Home
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 21.79,
                        fontWeight: '500',
                        color: '#1E1D2080',
                        fontFamily: 'OpenSans-Regular',
                      }}>
                      Eastbourne Terrace, London W2, UK
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'col',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        lineHeight: 24.51,
                        fontWeight: '500',
                        color: '#1E1D20',
                        fontFamily: 'OpenSans-Regular',
                      }}>
                      {route.params.locationaddress.location}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 21.79,
                        fontWeight: '500',
                        color: '#1E1D2080',
                        fontFamily: 'OpenSans-Regular',
                      }}>
                      {route.params.locationaddress.address}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  navigation.navigate('Routeview', {
                    locationaddress: route.params.locationaddress,
                  });
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 45,
                    borderRadius: 45,
                    backgroundColor: '#F08080',
                  }}>
                  <Text style={styles.button_textStyle}>Start Route</Text>
                </View>
              </TouchableOpacity>
            </View>

            {showImage && (
              <Image
                source={hand_ico}
                style={{
                  position: 'absolute',
                  bottom: 64,
                  left: screenWidth / 2 - 30,
                }}
              />
            )}
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
  centeredView: {
    flex: 1,
    padding: 16,
    position: 'absolute',
    bottom: 100,
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
    fontSize: 20,
    lineHeight: 27.24,
    color: '#1E1D20',
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
export default Routepage;
