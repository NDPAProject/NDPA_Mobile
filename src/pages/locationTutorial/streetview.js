import 'react-native-gesture-handler';
import {GOOGLE_API_KEY_ANDROID___} from '@env';
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import StreetView from 'react-native-streetview';
import Geocoder from 'react-native-geocoding';
import {getRhumbLineBearing, computeDestinationPoint} from 'geolib';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  arrow_up,
  fab_1,
  fab_5,
  hand_ico,
  left_arrow,
  right_arrow,
  str_icon,
  tuto_2,
} from '../../constants/images';
import DirectionBox from '../../components/turnBox';
import ModalContainer from '../../components/modalContainer';
import StepBox from '../../components/stepBox';
import {stepData} from '../../constants/data';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
Geocoder.init(GOOGLE_API_KEY_ANDROID___);

const FloatingActionButtonGroup = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.fab_container}>
      <TouchableOpacity
        key={'route_view_map'}
        style={[styles.fabButton, {backgroundColor: '#FFFFFF'}]}
        // onPress={() => {
        //   navigation.navigate('Mainpage');
        // }}
      >
        <Image source={fab_1} style={styles.fab_image} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.fabButton, {backgroundColor: '#FFFFFF'}]}
        onPress={() => {
          console.log(route.params, '!!!!!!!!!!!!!!!BBBB!!!!!!!!!!!!!!!!');
          navigation.navigate('Routeview', {
            locationaddress: route.params.locationaddress,
            mode: route.params.mode,
          });
        }}>
        <Image source={fab_5} style={styles.fab_image} />
      </TouchableOpacity>
    </View>
  );
};

const Streetview = routedata => {
  const navigation = useNavigation();
  const route = useRoute();
  //modal
  const [step_7, setStep_7] = useState(false);
  const [step_8, setStep_8] = useState(false);
  const [showImage, setShowImage] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  //
  const [location, setLocation] = useState({
    latitude: 51.51656759999999,
    longitude: -0.1784764,
  });

  const [coordinates, setCoordinates] = useState([
    {
      latitude: 51.51656759999999,
      longitude: -0.1784764,
    },
    {
      latitude: 51.52656759999999,
      longitude: -0.1884764,
    },
    {
      latitude: route.params.locationaddress.location_info.lat,
      longitude: route.params.locationaddress.location_info.lng,
    },
  ]);
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
          console.log('STREET NAME', street);
        })
        .catch(error => console.warn(error));
    }
  }, [newPoint]);

  useEffect(() => {
    console.log(route.name, '<><><><><><><><><><><');
    // AsyncStorage.getItem('hasSeenTutorial').then(value => {
    //   if (value === null) {
    let timer;
    timer = setTimeout(() => {
      setStep_7(true);
      timer = setTimeout(() => {
        setShowImage(1);
      }, 800);
    }, 1000);
    return () => clearTimeout(timer);
    //   }
    // });
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 70,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <View style={styles.container}>
      <StreetView
        style={styles.streetView}
        allGesturesEnabled={true}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        pov={{
          tilt: parseFloat(0),
          bearing: parseFloat(0),
          zoom: parseInt(1),
        }}
      />

      {streetName && (
        <DirectionBox streetName={streetName} image={right_arrow} />
      )}

      <Image
        source={str_icon}
        style={{width: 543, height: 315, position: 'absolute', bottom: 80}}
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
            <Text
              style={
                styles.sheetText_
              }>{`${route.params.result_dur_dis.distance} km`}</Text>
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
              }>{`${route.params.result_dur_dis.duration} min`}</Text>
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

      <ModalContainer
        visible={step_7}
        onRequestClose={() => setStep_7(!step_7)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(224, 208, 193, 0.5)',
          }}>
          <View style={{position: 'absolute', top: 0, left: 16}}>
            <View style={{position: 'absolute', top: 70, left: 0, zIndex: 0}}>
              <Animated.View
                style={{
                  transform: [{translateY: slideAnim}],
                }}>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    paddingTop: 32,
                    paddingBottom: 12,
                    paddingHorizontal: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: 52,
                      borderRadius: 26,
                      backgroundColor: '#F08080',
                      paddingVertical: 10,
                      paddingHorizontal: 24,
                      gap: 4,
                    }}
                    onPress={() => {
                      console.log('ROUTEDATA', route.params.routedata);
                      setLocation({
                        latitude: route.params.routedata.latitude,
                        longitude: route.params.routedata.longitude,
                      });
                      setStep_7(false);

                      let timer;

                      timer = setTimeout(() => {
                        setStep_8(true);
                        timer = setTimeout(() => {
                          setShowImage(2);
                        }, 800);
                      }, 1000);
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: 21,
                        lineHeight: 28.6,
                      }}>
                      Next
                    </Text>
                    <Image source={arrow_up} style={{width: 32, height: 32}} />
                  </TouchableOpacity>
                </View>
              </Animated.View>

              {showImage === 1 && (
                <Image
                  source={hand_ico}
                  style={{
                    position: 'relative',
                    bottom: -40,
                    right: -40,
                  }}
                />
              )}
            </View>

            {streetName && (
              <DirectionBox streetName={streetName} image={right_arrow} />
            )}
          </View>

          <StepBox step={'7'} description={stepData.step7} />
        </View>
      </ModalContainer>

      <Modal
        animationType="fade"
        transparent={true}
        visible={step_8}
        onRequestClose={() => setStep_8(!step_8)}>
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
                8/8
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
                    style={
                      styles.sheetText_
                    }>{`${route.params.result_dur_dis.distance} km`}</Text>
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
                    }>{`${route.params.result_dur_dis.duration} min`}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setStep_8(false);
                  setModalVisible(true);
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
              {showImage === 2 && (
                <Image
                  source={hand_ico}
                  style={{
                    position: 'absolute',
                    bottom: -40,
                    right: 20,
                  }}
                />
              )}
            </View>
          </View>
        </LinearGradient>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BlurView
            style={[
              styles.blurView,
              {backgroundColor: 'rgba(255, 218, 185, 1)'},
            ]}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="black"
          />
          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderRadius: 10,
              padding: 24,
              gap: 22,
            }}>
            <Image source={tuto_2} style={{width: 100, height: 100}} />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 16,
              }}>
              <Text style={styles.text_m}>
                Great Job! Now you are {'\n'} ready to use the map!
              </Text>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: screenWidth - 96,
                  height: 48,
                  borderRadius: 45,
                  backgroundColor: '#F08080',
                }}
                onPress={() => {
                  navigation.navigate('Location');
                  // AsyncStorage.setItem('hasSeenTutorial', 'true');
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 21,
                    lineHeight: 28.6,
                    color: 'white',
                  }}>
                  Go
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  text_m: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 27.24,
    color: '#1E1D20',
    textAlign: 'center',
    alignSelf: 'center',
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
    bottom: 120,
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
