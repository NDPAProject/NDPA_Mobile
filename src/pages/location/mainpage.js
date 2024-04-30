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
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
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
import RsheetButton from '../../components/RsheetButton';
import {mapStyle} from '../../constants/data';
import {GetGeometry} from '../../redux/slices/location';

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
  const dispatch = useDispatch();
  const {up_message, error, geomtrytInfo} = useSelector(
    state => state.location,
  );

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
  const [showImage, setShowImage] = useState(0);

  // Other state variables
  const [tutodata, setTutodata] = useState('');
  const [placeId, setPlaceId] = useState(null);

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [listViewDisplayed, setListViewDisplayed] = useState('auto');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setListViewDisplayed('auto');
      setLocation(defaultLocation);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (!placeId) return;
    dispatch(GetGeometry(placeId));
  }, [placeId]);

  useEffect(() => {
    if (geomtrytInfo.result) {
      setLocation(geomtrytInfo.result.geometry.location);
      setLocationaddress({
        location: geomtrytInfo.result.address_components[0].short_name,
        address: geomtrytInfo.result.formatted_address,
        location_info: geomtrytInfo.result.geometry.location,
      });
    }
  }, [geomtrytInfo]);

  useEffect(() => {
    if (bottomSheetVisible) {
      refRBSheet.current.open();
    }
  }, [bottomSheetVisible]);

  useEffect(() => {
    console.log('Updated location:', location);
  }, [location]);

  // Extract onPress and other inline functions to make code cleaner
  const handleOnPress = (data, details) => {
    if (details) {
      setLocation(details.geometry.location);
      setLocationaddress({
        location: details.address_components[0].short_name,
        address: details.formatted_address,
        location_info: details.geometry.location,
      });
      setFocus_sb(false);
      ref.current?.clear();
      refRBSheet.current.open();
    }
  };

  const serchFocus = () => {
    setFocus_sb(false);
  };

  const serchClear = () => {
    ref.current?.clear();
    setFocus_sb(false);
  };

  const handleClickrowdata = () => {
    setBottomSheetVisible(true);
    setListViewDisplayed(false);
  };

  const handleRenderRow = (data, i) => {
    if (i === 0) {
      setTutodata(data.description);
      setPlaceId(data.place_id);
    }

    return (
      <TouchableOpacity onPress={handleClickrowdata}>
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
      </TouchableOpacity>
    );
  };

  const handlebottomvisible = () => {
    setBottomSheetVisible(false);
    refRBSheet.current.close();
  };

  // Render buttons separately
  const RenderRightButton = () => (
    <TouchableOpacity
      key={'voice'}
      style={{flexDirection: 'row', alignItems: 'center'}}
      onPress={serchClear}>
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
      onPress={serchFocus}>
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
    }
  };

  const handleOnFocus = () => {
    setShowImage(0);
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
      {listViewDisplayed && (
        <View
          style={{
            // backgroundColor: focus_sb ? '#FFFFFF' : 'transparent',
            zIndex: 1,
            height: focus_sb ? 'transparent' : 100,
          }}>
          <GooglePlacesAutocomplete
            ref={ref}
            onPress={handleOnPress}
            renderRow={handleRenderRow}
            renderRightButton={RenderRightButton}
            renderLeftButton={RenderLeftButton}
            listViewDisplayed={listViewDisplayed}
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
      )}

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
          enabled: true,
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
              handlebottomvisible={handlebottomvisible}
            />

            <RsheetButton
              image={send}
              navigate={'Routeview'}
              bgcolor={'#FFFFFF'}
              bocolor={'#F08080'}
              locationaddress={locationaddress}
              text={'Start'}
              handlebottomvisible={handlebottomvisible}
            />
          </View>
        </View>
      </RBSheet>
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
    zIndex: 1,
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
