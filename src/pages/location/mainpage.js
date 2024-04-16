import 'react-native-gesture-handler';
import {GOOGLE_API_KEY_ANDROID__, GOOGLE_API_KEY_ANDROID___} from '@env';

//import modules
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  Modal,
  Button,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import screens
import Footer from '../../components/footer';
import {
  sb_search,
  sb_voice,
  img_location,
  close,
  back,
  fab_1,
  fab_2,
  fab_3,
  location_r,
  left_arrow,
  send,
  cafe,
  hospital,
  pharamacies,
  park,
  tuto_1,
  hand_ico,
} from '../../constants/images';
import ResourceButton from '../../components/resourceButton';

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
        <Image source={fab_2} style={styles.fab_image} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.fabButton}>
        <Image source={fab_3} style={styles.fab_image} />
      </TouchableOpacity>
    </View>
  );
};

const Mainpage = () => {
  const ref = useRef();
  const refRBSheet = useRef();
  const [address, setAddress] = useState('Search');

  const [location, setLocation] = useState({
    lat: 51.51656759999999,
    lng: -0.1784764,
  });
  const [locationaddress, setLocationaddress] = useState({
    location: '',
    address: '',
    location_info: '',
  });
  const navigation = useNavigation();
  const [focus_sb, setFocus_sb] = useState(false);

  const [resourcedata, setResourcedata] = useState([
    {image: cafe, text: 'Cafes'},
    {image: hospital, text: 'Hospitals'},
    {image: pharamacies, text: 'Pharmacies'},
    {image: park, text: 'Parks'},
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [step_1, setStep_1] = useState(false);
  const [showImage, setShowImage] = useState(0);
  const [showstep_1, setShowstep_1] = useState(true);
  const [showstep_2, setShowstep_2] = useState(false);
  const [step_3, setStep_3] = useState(false);
  const [tutodata, setTutodata] = useState('');
  const [placeId, setPlaceId] = useState(null);

  const [step_4, setStep_4] = useState(false);
  const [showstep_4, setShowstep_4] = useState(false);

  useEffect(() => {
    // AsyncStorage.removeItem('hasSeenTutorial');
    AsyncStorage.getItem('hasSeenTutorial').then(value => {
      if (value === null) {
        // If no data is available in AsyncStorage, show the modal
        setModalVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    console.log('geometry', placeId);
    fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_API_KEY_ANDROID__}`,
    )
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setLocation(data.result.geometry.location);
          setLocationaddress({
            location: data.result.address_components[0].short_name,
            address: data.result.formatted_address,
            location_info: data.result.geometry.location,
          });
          // console.log('Geometry', data.result);
        }
      });
  }, [placeId]);

  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

  useEffect(() => {
    console.log('Updated location:', location);
  }, [location]);

  const handleClick = async () => {
    try {
      setModalVisible(false);
      let timer;
      timer = setTimeout(() => {
        setStep_1(true);
      }, 1000);

      console.log('=-=-=-=-=--', step_1, modalVisible);
    } catch (error) {
      setErrorMsg((error && error.error) || 'Something went wrong.');
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    let timer;
    // Check if step_1 is true, then set a timer to show the modal after 0.4 sec
    if (step_1) {
      timer = setTimeout(() => {
        setStep_1(true);
        timer = setTimeout(() => {
          setShowImage(1);
        }, 800);
      }, 1000);
    } else {
      setStep_1(false);
    }

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or step_1 changes
  }, [step_1]);

  useEffect(() => {
    let timer;
    console.log('--------step_3----------', step_3);

    if (step_3) {
      timer = setTimeout(() => {
        setShowImage(3);
      }, 1000);
    } else {
      // If step_1 is false, make sure to hide the modal
      setStep_3(false);
    }

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or step_1 changes
  }, [step_3]);

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
        region={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapStyle}>
        <Marker
          draggable
          coordinate={{
            latitude: location.lat,
            longitude: location.lng,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          title={'Test Marker'}
          description={'This is a description of the marker'}>
          <Image source={location_r} style={{width: 28, height: 40}} />
        </Marker>
      </MapView>

      <View
        style={{
          // backgroundColor: focus_sb ? '#FFFFFF' : 'transparent',
          height: focus_sb ? 'transparent' : 100,
        }}>
        <GooglePlacesAutocomplete
          ref={ref}
          onPress={(data, details = null) => {
            console.log('data', '\n location', details);
            if (details) {
              setLocation(details.geometry.location);
              console.log('data', data, '\n location', details);
              setLocationaddress({
                location: details.address_components[0].short_name,
                address: details.formatted_address,
                location_info: details.geometry.location,
              });
              setFocus_sb(false);
              // setModalVisible(true);
              refRBSheet.current.open();
            }
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
            <TouchableOpacity
              key={'voice'}
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                ref.current?.clear();
                setFocus_sb(false);
              }}>
              <Image
                source={focus_sb ? close : sb_voice}
                style={{width: 24, height: 24, marginRight: 16}}
              />
            </TouchableOpacity>
          )}
          renderLeftButton={() => (
            <TouchableOpacity
              key={'se'}
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => {
                setFocus_sb(false);
              }}>
              <Image
                source={focus_sb ? back : sb_search}
                style={{width: 24, height: 24, marginLeft: 16}}
              />
            </TouchableOpacity>
          )}
          textInputProps={{
            onChangeText: text => {
              if (text.length > 1) {
                setAddress(text);
                if (address) setFocus_sb(true);
              }
            },
            placeholderTextColor: '#1E1D2080',
          }}
          query={{
            key: GOOGLE_API_KEY_ANDROID___,
            language: 'en',
            types: 'address',
          }}
          placeholder="Enter Location"
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          styles={{
            container: {
              flex: 1,
            },

            textInputContainer: {
              flexDirection: 'row',
              alignSelf: 'center',
              backgroundColor: 'white',
              width: screenWidth - 32,
              marginHorizontal: 16,
              borderRadius: 64,
              marginTop: 22,
              marginBottom: 4,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
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
              height: '100%',
            },
            separator: {
              height: 1,
              backgroundColor: '#1E1D201A',
            },
          }}
          enablePoweredByContainer={false}
        />
      </View>

      <View
        style={{
          padding: 0,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 16,
          position: 'absolute',
          top: 86,
          zIndex: 1,
        }}>
        {resourcedata.map((data, i) => (
          <ResourceButton key={i} image={data.image} text={data.text} />
        ))}
      </View>

      <FloatingActionButtonGroup />

      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        draggable={true}
        dragOnContent={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          draggableIcon: {
            backgroundColor: '#1E1D2033',
            width: 100,
            height: 5,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <View style={[styles.centeredView]}>
          <Text style={styles.sheetText}>{locationaddress.location}</Text>
          <Text style={styles.textStyle}>{locationaddress.address}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: screenWidth - 32,
            }}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                navigation.navigate('Routepage', {
                  locationaddress: locationaddress,
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
                <Image source={left_arrow} style={{width: 24, height: 24}} />
                <Text style={styles.button_textStyle}>Routes</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => {
                navigation.navigate('Routeview', {
                  locationaddress: locationaddress,
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
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: '#F08080',
                }}>
                <Image source={send} style={{width: 24, height: 24}} />
                <Text
                  style={{
                    fontSize: 21,
                    lineHeight: 28.6,
                    fontWeight: '600',
                    color: '#F08080',
                    fontFamily: 'OpenSans-Regular',
                  }}>
                  Start
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {showImage === 4 && (
            <Image
              source={hand_ico}
              style={{
                position: 'absolute',
                bottom: 44,
                left: 70,
              }}
            />
          )}
        </View>
      </RBSheet>

      <Footer state={0} />

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
              {backgroundColor: 'rgba(255, 218, 185, 0.4)'},
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
            <Image source={tuto_1} style={{width: 100, height: 100}} />
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 16,
              }}>
              <Text style={styles.text_m}>
                Let's learn {'\n'}how to use the map!
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
                onPress={handleClick}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 21,
                    lineHeight: 28.6,
                    color: 'white',
                  }}>
                  Let's Start
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: screenWidth - 96,
                  height: 48,
                  borderRadius: 45,
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: '#F08080',
                }}
                // onPress={setModalVisible}
              >
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 21,
                    lineHeight: 28.6,
                    color: '#F08080',
                  }}>
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={step_1}
        onRequestClose={() => setStep_1(!step_1)}>
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
            <View style={{position: 'absolute', top: 58}}>
              <GooglePlacesAutocomplete
                ref={ref}
                onPress={(data, details = null) => {
                  if (details) {
                    setLocation(details.geometry.location);
                    console.log('data', data, '\n location', details);
                    setLocationaddress({
                      location: details.address_components[0].short_name,
                      address: details.formatted_address,
                      location_info: details.geometry.location,
                    });
                    setFocus_sb(false);
                    // setModalVisible(true);
                    refRBSheet.current.open();
                  }
                }}
                renderRow={(data, i) => {
                  if (i == 0) {
                    setTutodata(data.description);

                    setPlaceId(data.place_id);
                    console.log('data', data.place_id);
                  }
                  return (
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
                  );
                }}
                renderRightButton={() => (
                  <TouchableOpacity
                    key={'voice'}
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      ref.current?.clear();
                      setFocus_sb(false);
                    }}>
                    <Image
                      source={focus_sb ? close : sb_voice}
                      style={{width: 24, height: 24, marginRight: 16}}
                    />
                  </TouchableOpacity>
                )}
                renderLeftButton={() => (
                  <TouchableOpacity
                    key={'se'}
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      setFocus_sb(false);
                    }}>
                    <Image
                      source={focus_sb ? back : sb_search}
                      style={{width: 24, height: 24, marginLeft: 16}}
                    />
                  </TouchableOpacity>
                )}
                textInputProps={{
                  onChangeText: text => {
                    if (text.length > 1) {
                      setAddress(text);
                      if (address) setFocus_sb(true);
                      setShowstep_2(false);
                      let timer;
                      setShowstep_1(false);
                      timer = setTimeout(() => {
                        setStep_3(true);
                      }, 800);
                    }
                  },
                  onFocus: () => {
                    setShowImage(0);
                    let timer;
                    setShowstep_1(false);
                    timer = setTimeout(() => {
                      setShowstep_2(true);
                    }, 800);

                    console.log('Input focused');
                  },
                  placeholderTextColor: '#1E1D2080',
                }}
                query={{
                  key: GOOGLE_API_KEY_ANDROID__,
                  language: 'en',
                  types: 'address',
                }}
                placeholder="Enter Location"
                minLength={2}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                styles={{
                  container: {
                    flex: 1,
                  },

                  textInputContainer: {
                    flexDirection: 'row',
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    width: screenWidth - 32,
                    marginHorizontal: 16,
                    borderRadius: 64,
                    marginTop: 22,
                    marginBottom: 4,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
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
                    height: '100%',
                  },
                  separator: {
                    height: 1,
                    backgroundColor: '#1E1D201A',
                  },
                }}
                enablePoweredByContainer={false}
              />

              {showImage === 1 && (
                <Image
                  source={hand_ico}
                  style={{
                    position: 'absolute',
                    top: 58,
                    left: 50,
                  }}
                />
              )}
            </View>
            {showstep_1 && (
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
                  1/8
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
            )}
            {showstep_2 && (
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
                  2/8
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
            )}
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={step_3}
            onRequestClose={() => setStep_3(!step_3)}>
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
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'absolute',
                    top: 140,
                    width: screenWidth,
                    paddingTop: 32,
                    paddingBottom: 10,
                    backgroundColor: 'white',
                    paddingHorizontal: 24,
                  }}
                  onPress={() => {
                    setStep_3(false);
                    setStep_1(false);
                    refRBSheet.current.open();
                    let timer;
                    timer = setTimeout(() => {
                      refRBSheet.current.close();
                      timer = setTimeout(() => {
                        setStep_4(true);
                        refRBSheet.current.open();
                        timer = setTimeout(() => {
                          setShowImage(4);
                        }, 1000);
                      }, 1000);
                    }, 1000);
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
                    {tutodata}
                  </Text>
                </TouchableOpacity>

                {showImage === 3 && (
                  <Image
                    source={hand_ico}
                    style={{
                      position: 'absolute',
                      top: 190,
                      right: 85,
                    }}
                  />
                )}
                {
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
                      3/8
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
                }
              </View>
            </LinearGradient>
          </Modal>
        </LinearGradient>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={step_4}
        onRequestClose={() => setStep_4(!step_4)}>
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
                4/8
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
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default Mainpage;

const styles = StyleSheet.create({
  // modal
  text_m: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 27.24,
    color: '#1E1D20',
    textAlign: 'center',
    alignSelf: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  //main
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
  },
  centeredView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 88,
  },

  button: {
    marginTop: 28,
    width: '48%',
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
    fontSize: 18,
    lineHeight: 24.51,
    color: '#1E1D20',
  },
  //fab
  fab_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 130,
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
    featureType: 'all',
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
    featureType: 'all',
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
    featureType: 'all',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        lightness: 20,
      },
      {
        visibility: 'off',
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
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#edeef2',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        lightness: 21,
      },
      {
        visibility: 'on',
      },
      {
        color: '#dcd9d6',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#cdcac7',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#dcd9d6',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#cdcac7',
      },
    ],
  },
  {
    featureType: 'poi.business',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#c96a31',
      },
    ],
  },
  {
    featureType: 'poi.medical',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        hue: '#ff00bf',
      },
    ],
  },
  {
    featureType: 'poi.medical',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
      {
        hue: '#ff00bf',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#00fff6',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#00fff6',
      },
    ],
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#015ad0',
      },
    ],
  },
  {
    featureType: 'poi.place_of_worship',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#015ad0',
      },
    ],
  },
  {
    featureType: 'poi.school',
    elementType: 'labels.text.fill',
    stylers: [
      {
        visibility: 'on',
      },
      {
        hue: '#2300ff',
      },
    ],
  },
  {
    featureType: 'poi.school',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'on',
      },
      {
        color: '#a192ff',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'simplified',
      },
      {
        color: '#ffffff',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#0f8c38',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#0f8c38',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
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
        lightness: 16,
      },
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
        color: '#ffffff',
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ff0000',
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff',
      },
      {
        lightness: 17,
      },
    ],
  },
];
