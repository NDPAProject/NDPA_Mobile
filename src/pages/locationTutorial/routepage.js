import 'react-native-gesture-handler';
import {GOOGLE_API_KEY_ANDROID___} from '@env';

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
import StepBox from '../../components/stepBox';
import {mapStyle, stepData} from '../../constants/data';
import ModalContainer from '../../components/modalContainer';
import DistanceCard from '../../components/distanceCard';
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
            <View style={styles.markerstyle}></View>
          </Marker>
        ))}
        {coordinates.length >= 2 && (
          <MapViewDirections
            origin={coordinates[0]}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            }
            destination={coordinates[coordinates.length - 1]}
            apikey={GOOGLE_API_KEY_ANDROID___}
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
                  bottom: height / 2,
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
            apikey={GOOGLE_API_KEY_ANDROID___}
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

              mapView.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: screenWidth / 20,
                  bottom: screenHeight / 2,
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

      <DistanceCard result_dur_dis={result_dur_dis} />

      <ModalContainer
        visible={step_5}
        onRequestClose={() => setStep_5(!step_5)}>
        <View style={styles.modalbackground}>
          <StepBox
            style={{flex: 1, position: 'absolute', bottom: 500}}
            step={'5'}
            description={stepData.step5}
          />
          <DistanceCard result_dur_dis={result_dur_dis} />

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
      </ModalContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFBF8',
  },

  markerstyle: {
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
  },

  modalbackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 208, 193, 0.5)',
  },
});

export default Routepage;
