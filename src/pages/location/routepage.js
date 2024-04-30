import 'react-native-gesture-handler';
import {GOOGLE_API_KEY_ANDROID___} from '@env';
import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {mapStyle, stepData} from '../../constants/data';
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

  const [routecolor, setRoutecolor] = useState(false);
  const [switchroute, setSwitchroute] = useState(true);

  //modal_end
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

  const coordinates_ = [
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
  ];

  const [result_dur_dis, setResult_dur_dis] = useState([
    {
      duration: 0,
      distance: 0,
    },
    {
      duration: 0,
      distance: 0,
    },
  ]);

  const [mode, setMode] = useState('WALKING');
  const [allinfo, setAllinfo] = useState([]);

  const mapView = useRef(null);

  useEffect(() => {
    let modes = ['driving', 'bicycling', 'TRANSIT', 'walking'];
    let transit_modes = ['bus', 'subway'];
    // let modes = ['bus'];
    modes.forEach(mode => {
      let URL = '';
      if (mode != 'TRANSIT') {
        URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${
          coordinates[0].latitude
        },${coordinates[0].longitude}&destinations=${coordinates[2].latitude},${
          coordinates[2].longitude
        }&mode=${mode.toLowerCase()}&key=${GOOGLE_API_KEY_ANDROID___}`;
        fetch(URL)
          .then(response => response.json())
          .then(data => {
            if (data) {
              let route = data.rows[0].elements[0];
              setAllinfo(prev => [
                ...prev,
                {
                  mode: mode,
                  distance: route.distance.text,
                  duration: route.duration.text,
                },
              ]);
            }
          })

          .catch(err => console.log(err));
      } else {
        transit_modes.forEach(transit => {
          URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${coordinates[0].latitude},${coordinates[0].longitude}&destinations=${coordinates[2].latitude},${coordinates[2].longitude}&mode=transit&transit_mode=${transit}&key=${GOOGLE_API_KEY_ANDROID___}`;
          fetch(URL)
            .then(response => response.json())
            .then(data => {
              if (data) {
                let route = data.rows[0].elements[0];
                setAllinfo(prev => [
                  ...prev,
                  {
                    mode: transit,
                    distance: route.distance.text,
                    duration: route.duration.text,
                  },
                ]);
              }
            })

            .catch(err => console.log(err));
        });
      }
    });
  }, [coordinates]);

  useEffect(() => {
    console.log('Updated duration and distance:', result_dur_dis, switchroute);
  }, [result_dur_dis, switchroute]);

  const onMapPress = e => {
    // setCoordinates([...coordinates, e.nativeEvent.coordinate]);
    setRoutecolor(true);
  };

  const handleclick = mode => {
    setMode(mode);
    setSwitchroute(true);
  };

  const handleSwichroute = () => {
    setSwitchroute(!switchroute);
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
        // onPress={onMapPress}
        customMapStyle={mapStyle}>
        {coordinates.map((coordinate, index) => {
          if (index != 1)
            return (
              <Marker
                key={`coordinate_${index}`}
                draggable
                coordinate={coordinate}>
                <View
                  style={
                    index == 2 ? styles.markerstyle : styles.markerstyle_
                  }></View>
              </Marker>
            );
        })}
        {mode === 'WALKING' ? (
          <>
            {coordinates.length >= 2 && (
              <MapViewDirections
                origin={coordinates[0]}
                destination={coordinates[2]}
                apikey={GOOGLE_API_KEY_ANDROID___}
                strokeWidth={5}
                strokeColor={
                  switchroute
                    ? mode === 'BICYCLING'
                      ? '#23B80C'
                      : '#F08080'
                    : '#0000004D'
                }
                lineDashPattern={[0, 0]}
                mode={mode}
                optimizeWaypoints={true}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={result => {
                  setResult_dur_dis(prevState => [
                    {
                      duration: Math.round(result.duration * 10) / 10,
                      distance: Math.round(result.distance * 10) / 10,
                    },
                    prevState[1], // keep the existing second object
                  ]);

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
                mode={mode}
                optimizeWaypoints={false}
                strokeColor={switchroute ? '#0000004D' : '#F08080'}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={result => {
                  setResult_dur_dis(prevState => [
                    prevState[0], // keep the existing first object
                    {
                      duration: Math.round(result.duration * 10) / 10,
                      distance: Math.round(result.distance * 10) / 10,
                    },
                  ]);
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
          </>
        ) : (
          <>
            {coordinates.length >= 2 && (
              <MapViewDirections
                origin={coordinates[0]}
                destination={coordinates[2]}
                apikey={GOOGLE_API_KEY_ANDROID___}
                strokeWidth={5}
                strokeColor={
                  switchroute
                    ? mode === 'BICYCLING'
                      ? '#23B80C'
                      : '#F08080'
                    : '#0000004D'
                }
                mode={mode}
                optimizeWaypoints={true}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={result => {
                  setResult_dur_dis(prevState => [
                    {
                      duration: Math.round(result.duration * 10) / 10,
                      distance: Math.round(result.distance * 10) / 10,
                    },
                    prevState[1], // keep the existing second object
                  ]);

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
                mode={mode}
                optimizeWaypoints={false}
                strokeColor={
                  switchroute
                    ? '#0000004D'
                    : mode === 'BICYCLING'
                    ? '#23B80C'
                    : '#F08080'
                }
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={result => {
                  setResult_dur_dis(prevState => [
                    prevState[0], // keep the existing first object
                    {
                      duration: Math.round(result.duration * 10) / 10,
                      distance: Math.round(result.distance * 10) / 10,
                    },
                  ]);
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
          </>
        )}
      </MapView>

      <DistanceCard
        result_dur_dis={switchroute ? result_dur_dis[0] : result_dur_dis[1]}
        setModefunc={handleclick}
        allinfo={allinfo}
        switchroute={handleSwichroute}
        type={mode !== 'TRANSIT' ? true : false}
        coordinates={coordinates_}
      />
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
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 20,
  },

  markerstyle_: {
    width: 24,
    height: 24,
    borderColor: '#FFFFFF',
    backgroundColor: '#F08080',
    borderWidth: 2.4,
    borderRadius: 24,
    shadowColor: '#FE8572',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 24,
  },

  modalbackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(224, 208, 193, 0.5)',
  },
});

export default Routepage;

// border: 5px solid #23B80C
