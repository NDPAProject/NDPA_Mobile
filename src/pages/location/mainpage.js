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
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import screens
import {
  sb_search,
  sb_voice,
  img_location,
  close,
  back,
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
import FabGroup from '../../components/fabGroup';
import TutorialModal from '../../components/tutorialModal';
import StepBox from '../../components/stepBox';
import ModalContainer from '../../components/modalContainer';
import RsheetButton from '../../components/RsheetButton';
import {mapStyle, stepData} from '../../constants/data';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
// Default location set to coordinates in the UK
const defaultLocation = {
  lat: 51.51656759999999,
  lng: -0.1784764,
};

// Default query parameters for Google Places API
const query = {
  key: GOOGLE_API_KEY_ANDROID___,
  language: 'en',
  types: 'address',
  components: 'country:gb',
};

// Resources data
const resourcedata = [
  {image: cafe, text: 'Cafes'},
  {image: hospital, text: 'Hospitals'},
  {image: pharamacies, text: 'Pharmacies'},
  {image: park, text: 'Parks'},
];

const Mainpage = () => {
  // References
  const ref = useRef();
  const refRBSheet = useRef();
  const navigation = useNavigation();

  // State variables for location and address
  const [location, setLocation] = useState(defaultLocation);
  const [address, setAddress] = useState('Search');
  const [locationaddress, setLocationaddress] = useState({
    location: '',
    address: '',
    location_info: '',
  });

  // State variable for search bar focus
  const [focus_sb, setFocus_sb] = useState(false);

  // State variables for modal visibility and steps
  const [modalVisible, setModalVisible] = useState(false);
  const [step_1, setStep_1] = useState(false);
  const [showImage, setShowImage] = useState(0);
  const [showstep_1, setShowstep_1] = useState(true);
  const [showstep_2, setShowstep_2] = useState(false);
  const [step_3, setStep_3] = useState(false);
  const [step_4, setStep_4] = useState(false);

  // Other state variables
  const [tutodata, setTutodata] = useState('');
  const [placeId, setPlaceId] = useState(null);

  useEffect(() => {
    // AsyncStorage.removeItem('hasSeenTutorial');
    AsyncStorage.getItem('hasSeenTutorial').then(value => {
      if (value === null) {
        setModalVisible(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!placeId) return;
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
        }
      });
  }, [placeId]);

  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

  useEffect(() => {
    console.log('Updated location:', location);
  }, [location]);

  useEffect(() => {
    let timer;

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
    if (!step_3) {
      setStep_3(false);
      return;
    }

    let timer = setTimeout(() => {
      setShowImage(3);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts or step_3 changes
  }, [step_3]);

  const handleClick = async () => {
    setModalVisible(false);
    setTimeout(() => {
      setStep_1(true);
    }, 1000);
  };
  // Extract onPress and other inline functions to make code cleaner
  const handleOnPress = (data, details = null) => {
    if (details) {
      setLocation(details.geometry.location);
      console.log('data', data, '\n location', details);
      setLocationaddress({
        location: details.address_components[0].short_name,
        address: details.formatted_address,
        location_info: details.geometry.location,
      });
      setFocus_sb(false);
      refRBSheet.current.open();
    }
  };

  const handleRenderRow = (data, i) => {
    if (i === 0) {
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
  };

  // Render buttons separately
  const RenderRightButton = () => (
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
  );

  const RenderLeftButton = () => (
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
  );

  const handleOnChangeText = text => {
    if (text.length > 1) {
      setAddress(text);
      if (address) setFocus_sb(true);
      setShowstep_2(false);
      setShowstep_1(false);
      setTimeout(() => {
        setStep_3(true);
      }, 2000);
    }
  };

  const handleOnFocus = () => {
    setShowImage(0);
    setShowstep_1(false);
    setTimeout(() => {
      setShowstep_2(true);
    }, 800);
    console.log('Input focused');
  };

  // Extract the onPress function for cleaner code
  const handlePress = () => {
    setStep_3(false);
    setStep_1(false);
    refRBSheet.current.open();
    setTimeout(() => {
      refRBSheet.current.close();
      setTimeout(() => {
        setStep_4(true);
        refRBSheet.current.open();
        setTimeout(() => {
          setShowImage(4);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
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
          }}>
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
          onPress={handleOnPress}
          renderRow={handleRenderRow}
          renderRightButton={RenderRightButton}
          renderLeftButton={RenderLeftButton}
          textInputProps={{
            onChangeText: handleOnChangeText,
            onFocus: handleOnFocus,
            placeholderTextColor: '#1E1D2080',
          }}
          query={query}
          placeholder="Enter Location"
          minLength={2}
          autoFocus={false}
          returnKeyType={'default'}
          fetchDetails={true}
          styles={searchStyle}
          enablePoweredByContainer={false}
        />
      </View>

      <View style={styles.resourcecontainter}>
        {resourcedata.map((data, i) => (
          <ResourceButton key={i} image={data.image} text={data.text} />
        ))}
      </View>

      <FabGroup />

      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        draggable={true}
        dragOnContent={true}
        customStyles={RBSheetStyle}
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
            <RsheetButton
              image={left_arrow}
              navigate={'Routepage'}
              bgcolor={'#F08080'}
              bocolor={'#FFFFFF'}
              locationaddress={locationaddress}
              text={'Routes'}
            />

            <RsheetButton
              image={send}
              navigate={'Routeview'}
              bgcolor={'#FFFFFF'}
              bocolor={'#F08080'}
              locationaddress={locationaddress}
              text={'Start'}
            />
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

      <TutorialModal
        image={tuto_1}
        handleClick={handleClick}
        modalVisible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      />

      <ModalContainer
        visible={step_1}
        onRequestClose={() => setStep_1(!step_1)}>
        <View style={styles.modalbackground}>
          <View style={{position: 'absolute', top: 58}}>
            <GooglePlacesAutocomplete
              ref={ref}
              onPress={handleOnPress}
              renderRow={handleRenderRow}
              renderRightButton={RenderRightButton}
              renderLeftButton={RenderLeftButton}
              textInputProps={{
                onChangeText: handleOnChangeText,
                onFocus: handleOnFocus,
                placeholderTextColor: '#1E1D2080',
              }}
              query={query}
              placeholder="Enter Location"
              minLength={2}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              styles={searchStyle}
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
            <StepBox style={{}} step="1" description={stepData.step1} />
          )}
          {showstep_2 && (
            <StepBox style={{}} step="2" description={stepData.step2} />
          )}
        </View>

        <ModalContainer
          visible={step_3}
          onRequestClose={() => setStep_3(!step_3)}>
          <View style={styles.modalbackground}>
            <TouchableOpacity
              style={styles.step3Container}
              onPress={handlePress}>
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

            {(tutodata.length > 1 || showImage === 3) && (
              <Image
                source={hand_ico}
                style={{
                  position: 'absolute',
                  top: 190,
                  right: 85,
                }}
              />
            )}
            <StepBox style={{}} step="3" description={stepData.step3} />
          </View>
        </ModalContainer>
      </ModalContainer>

      <ModalContainer
        visible={step_4}
        onRequestClose={() => setStep_4(!step_4)}>
        <View style={styles.modalbackground}>
          <StepBox style={{}} step="4" description={stepData.step4} />
        </View>
      </ModalContainer>
    </View>
  );
};

export default Mainpage;

const styles = StyleSheet.create({
  // Main Styles
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

  // Button Styles
  button: {
    marginTop: 28,
    width: '48%',
  },
  buttonTextStyle: {
    fontSize: 21,
    lineHeight: 28.6,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Regular',
  },

  // Text Styles
  textStyle: {
    fontSize: 16,
    lineHeight: 21.79,
    color: '#1E1D2080',
  },
  sheetText: {
    fontSize: 18,
    lineHeight: 24.51,
    color: '#1E1D20',
  },

  // Map Styles
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Modal Styles
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  modalbackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 208, 193, 0.5)',
  },
  step3Container: {
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
  },

  //Resource Styles
  resourcecontainter: {
    padding: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 16,
    position: 'absolute',
    top: 86,
    zIndex: 1,
  },
});

const searchStyle = {
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
};

const RBSheetStyle = {
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
};
