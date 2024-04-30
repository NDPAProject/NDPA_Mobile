import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {GOOGLE_API_KEY_ANDROID___} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  bicycle,
  bus,
  bus_,
  car,
  ferry,
  location_r,
  right,
  subway,
  tram,
  walk,
} from '../constants/images';
import {GetTransit} from '../redux/slices/location';

const screenWidth = Dimensions.get('window').width;

const CircleView = ({color, bgcolor}) => (
  <View
    style={[styles.circleView, {borderColor: color, backgroundColor: bgcolor}]}
  />
);

const VerticalLine = ({color, height}) => (
  <View style={[styles.verticalLine, {height: height, borderColor: color}]} />
);

const VerticalLine_dash = ({color, height}) => (
  <View
    style={[
      styles.verticalLine,
      {height: height, borderColor: color, borderStyle: 'solid'},
    ]}
  />
);

const AddressText = ({children, style}) => (
  <Text style={[styles.addressText, style]}>{children}</Text>
);

const AddressView = ({title, subtitle}) => (
  <View style={styles.addressView}>
    <AddressText style={styles.addressTitle}>{title}</AddressText>
    <AddressText style={styles.addressSubtitle}>{subtitle}</AddressText>
  </View>
);

const AddressView_ = ({title, subtitle}) => (
  <View style={styles.addressView}>
    <AddressText style={styles.addressSubtitle_}>{subtitle}</AddressText>
  </View>
);

const DistanceCard = ({
  result_dur_dis,
  setModefunc,
  allinfo,
  switchroute,
  type,
  coordinates,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [currentTime, setCurrentTime] = useState(new Date());
  const {up_message, error, transitInfo} = useSelector(state => state.location);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [mode, setMode] = useState('');
  const [transitmode, setTransitMode] = useState('bus');
  const [transitData, setTransitData] = useState([]);
  const [visibletransit, setVisibletransit] = useState(false);

  const [icon1, setIcon1] = useState(null);
  const [icon2, setIcon2] = useState(null);
  const [transit1, setTransit1] = useState([]);
  const [transit2, setTransit2] = useState([]);

  const modes = [
    {name: 'Walking', value: 'WALKING', transit: 'walking', icon: walk},
    {name: 'Car', value: 'DRIVING', transit: 'driving', icon: car},
    {name: 'Bicycle', value: 'BICYCLING', transit: 'bicycling', icon: bicycle},
    {name: 'bus', value: 'TRANSIT', transit: 'bus', icon: bus_},
    {name: 'subway', value: 'TRANSIT', transit: 'subway', icon: subway},
  ];

  useEffect(() => {
    dispatch(GetTransit(coordinates, transitmode));
  }, []);

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  useEffect(() => {
    if (transitInfo?.routes?.[0]?.legs?.[0]?.steps) {
      setTransitData(transitInfo.routes[0].legs[0].steps);
    }
  }, [transitInfo]);

  const handle = (mode, index) => {
    setTransitData([]);
    setMode(mode.value);
    if (mode.value == 'TRANSIT') setTransitMode(mode.name);
    setSelectedIndex(index);
    setVisibletransit(false);
  };

  const Transititem = ({transit, text, transit_, text_, index}) => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 4,
        }}>
        <Image
          source={
            transit.travel_mode == 'TRANSIT'
              ? transit.html_instructions.includes('Bus')
                ? bus_
                : transit.html_instructions.includes('Tram')
                ? tram
                : transit.html_instructions.includes('Ferry')
                ? ferry
                : transit.html_instructions.includes('Subway')
                ? subway
                : bus
              : transit.travel_mode == 'DRIVING'
              ? car
              : walk
          }
          style={{width: 24, height: 24}}
        />
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 16.34,
            textAlign: 'center',
          }}>
          {text}
        </Text>

        <Image source={right} style={{width: 16, height: 16}} />

        <Image
          source={
            transit_.travel_mode == 'TRANSIT'
              ? transit_.html_instructions.includes('Bus')
                ? bus_
                : transit_.html_instructions.includes('Ferry')
                ? ferry
                : transit_.html_instructions.includes('Tram')
                ? tram
                : transit_.html_instructions.includes('Subway')
                ? subway
                : bus
              : transit_.travel_mode == 'DRIVING'
              ? car
              : walk
          }
          style={{width: 24, height: 24}}
        />
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            lineHeight: 16.34,
            textAlign: 'center',
          }}>
          {text_}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.centeredView}>
      <View style={{borderBottomWidth: 1, borderBottomColor: '#0000001A'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {allinfo &&
            modes.map((mode, index) => {
              const duration =
                allinfo.find(item => item.mode === mode.transit)?.duration ||
                'N/A';
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      selectedIndex === index ? '#F0808080' : 'white',
                    padding: 10,
                    borderRadius: 20,
                    marginHorizontal: 10,
                  }}
                  onPress={() => {
                    setModefunc(mode.value);
                    handle(mode, index);
                    if (mode.value == 'TRANSIT')
                      dispatch(GetTransit(coordinates, mode.name));
                  }}
                  disabled={
                    result_dur_dis
                      ? route.name.includes('Tutorial')
                        ? true
                        : false
                      : true
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    <Image source={mode.icon} style={{width: 24, height: 24}} />
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 14,
                        fontWeight: '400',
                        lineHeight: 19,
                        textAlign: 'center',
                      }}>
                      {duration}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
      {mode != 'TRANSIT' ? (
        <>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.sheetText}>
              {`${result_dur_dis.duration} min`}{' '}
              <Text
                style={
                  styles.distanceText
                }>{`(${result_dur_dis.distance} km)`}</Text>
            </Text>
            {type && (
              <TouchableOpacity onPress={switchroute}>
                <View style={styles.routebuttonstyle_}>
                  <Text style={styles.button_textStyle}>Switch Route</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.mainRow}>
            <View style={styles.iconColumn}>
              <CircleView color="#F08080" bgcolor={'#FFFFFF'} />
              <VerticalLine color="#F08080" height={84} />
              <Image source={location_r} style={{width: 16, height: 22.86}} />
              {/* <CircleView color="#F08080" bgcolor={'#F08080'} /> */}
            </View>
            <View style={styles.addressColumn}>
              <AddressView
                title="Home"
                subtitle="Eastbourne Terrace, London W2, UK"
              />
              <AddressView
                title={route.params.locationaddress.location}
                subtitle={route.params.locationaddress.address}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              // if (route.name.includes('Tutorial'))
              console.log({
                locationaddress: route.params.locationaddress,
                mode: mode,
              });
              navigation.navigate(
                route.name.includes('Tutorial')
                  ? 'RouteviewTutorial'
                  : 'Routeview',
                {
                  locationaddress: route.params.locationaddress,
                  mode: mode ? mode : 'WALKING',
                },
              );
            }}>
            <View style={styles.routebuttonstyle}>
              <Text style={styles.button_textStyle}>Start Route</Text>
            </View>
          </TouchableOpacity>
        </>
      ) : visibletransit ? (
        <View>
          <View style={styles.mainRow}>
            <View style={styles.iconColumn}>
              {transit1.mode !== 'TRANSIT' ? (
                <>
                  <CircleView color="#F08080" bgcolor={'#FFFFFF'} />
                  <VerticalLine color="#F08080" height={24} />
                  <Image source={icon1} style={{width: 24, height: 24}} />
                  <VerticalLine color="#F08080" height={24} />
                  <Image source={icon2} style={{width: 24, height: 24}} />
                  <VerticalLine_dash color="#F08080" height={72} />
                  <CircleView color="#F08080" bgcolor={'#F08080'} />
                </>
              ) : (
                <>
                  <CircleView color="#F08080" bgcolor={'#FFFFFF'} />
                  <VerticalLine color="#F08080" height={48} />
                  <Image source={icon1} style={{width: 24, height: 24}} />
                  <VerticalLine color="#F08080" height={48} />
                  <Image source={icon2} style={{width: 24, height: 24}} />
                  <VerticalLine_dash color="#F08080" height={36} />
                  <CircleView color="#F08080" bgcolor={'#F08080'} />
                </>
              )}
            </View>
            <View style={styles.addressColumn}>
              <AddressView_
                title="Home"
                subtitle="Eastbourne Terrace, London W2, UK"
              />
              {transit1.mode === 'TRANSIT' ? (
                <>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: 19.07,
                        textAlign: 'center',
                        color: '#1E1D20',
                      }}>
                      {transit1.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: 16.34,
                        textAlign: 'center',
                        color: '#1E1D20',
                      }}>
                      {`${transit1.num_stops} bus stops`}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      lineHeight: 16.34,
                      textAlign: 'center',
                      color: '#000',
                    }}>{`${transit2.duration} (${transit2.distance})`}</Text>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      lineHeight: 16.34,
                      textAlign: 'center',
                      color: '#000',
                    }}>{`${transit1.duration} (${transit1.distance})`}</Text>

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      gap: 24,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        lineHeight: 19.07,
                        textAlign: 'center',
                        color: '#1E1D20',
                      }}>
                      {transit2.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: 16.34,
                        textAlign: 'center',
                        color: '#1E1D20',
                      }}>
                      {`${transit2.num_stops} bus stops`}
                    </Text>
                  </View>
                </>
              )}

              <AddressView_
                title={route.params.locationaddress.location}
                subtitle={route.params.locationaddress.address}
              />
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 4,
          }}>
          {transitData &&
            transitData.map((transit, index) => {
              const nextItem = transitData[index + 1];
              if (nextItem) {
                return (
                  <TouchableOpacity
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 4,
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: '#0000001A',
                    }}
                    onPress={() => {
                      setVisibletransit(true);

                      if (transit.travel_mode == 'TRANSIT') {
                        setTransit1({
                          mode: transit.travel_mode,
                          name: transit.html_instructions,
                          num_stops: transit.transit_details.num_stops,
                        });
                        setTransit2({
                          duration: nextItem.duration.text,
                          distance: nextItem.distance.text,
                        });
                      } else {
                        setTransit1({
                          mode: transit.travel_mode,
                          duration: transit.duration.text,
                          distance: transit.distance.text,
                        });
                        setTransit2({
                          name: nextItem.html_instructions,
                          num_stops: nextItem.transit_details.num_stops,
                        });
                      }

                      if (transit.travel_mode == 'TRANSIT') {
                        if (transit.html_instructions.includes('Bus')) {
                          setIcon1(bus_);
                        } else if (
                          transit.html_instructions.includes('Ferry')
                        ) {
                          setIcon1(ferry);
                        } else if (transit.html_instructions.includes('Tram')) {
                          setIcon1(tram);
                        } else {
                          setIcon1(subway);
                        }
                      } else if (transit.travel_mode == 'DRIVING') {
                        setIcon1(car);
                      } else {
                        setIcon1(walk);
                      }

                      if (nextItem.travel_mode == 'TRANSIT') {
                        if (nextItem.html_instructions.includes('Bus')) {
                          setIcon2(bus_);
                        } else if (
                          nextItem.html_instructions.includes('Ferry')
                        ) {
                          setIcon2(ferry);
                        } else if (
                          nextItem.html_instructions.includes('Tram')
                        ) {
                          setIcon2(tram);
                        } else {
                          setIcon2(subway);
                        }
                      } else if (nextItem.travel_mode == 'DRIVING') {
                        setIcon2(car);
                      } else {
                        setIcon2(walk);
                      }
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 4,
                        width: screenWidth - 64,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                        }}>
                        <Transititem
                          transit={transit}
                          transit_={nextItem}
                          text={transit.duration.text}
                          text_={nextItem.duration.text}
                          index={index}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          lineHeight: 16.34,
                          textAlign: 'center',
                        }}>
                        {transit.duration.text}
                      </Text>
                    </View>
                    <Text>{`${new Date().getHours()}:${
                      new Date().getMinutes() < 10 ? '0' : ''
                    }${new Date().getMinutes()}-${new Date().getHours()}:${
                      new Date().getMinutes() +
                        parseInt(transit.duration.text) <
                      10
                        ? '0'
                        : ''
                    }${
                      new Date().getMinutes() + parseInt(transit.duration.text)
                    }`}</Text>
                    {/* <Text>{new Date().toLocaleTimeString()}</Text> */}
                  </TouchableOpacity>
                );
              } else {
                return null;
              }
            })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  sheetText: {
    fontSize: 20,
    lineHeight: 27.24,
    color: '#1E1D20',
  },
  distanceText: {
    fontSize: 20,
    color: '#1E1D2080',
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
  iconColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  circleView: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  verticalLine: {
    width: 0,
    borderLeftWidth: 2,
    borderStyle: 'dashed',
  },
  addressColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
  },
  addressView: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  addressText: {
    fontSize: 18,
    lineHeight: 24.51,
    fontWeight: '500',
    color: '#1E1D20',
    fontFamily: 'OpenSans-Regular',
  },
  addressTitle: {
    fontSize: 18,
    lineHeight: 24.51,
  },
  addressSubtitle: {
    fontSize: 16,
    lineHeight: 21.79,
    color: '#1E1D2080',
  },
  addressSubtitle_: {
    fontSize: 14,
    lineHeight: 19.07,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  routebuttonstyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    borderRadius: 45,
    backgroundColor: '#F08080',
  },
  routebuttonstyle_: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 45,
    paddingHorizontal: 20,
    backgroundColor: '#F08080',
  },
  button_textStyle: {
    fontSize: 21,
    lineHeight: 28.6,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'OpenSans-Regular',
  },
});
export default DistanceCard;

const i = {
  locationaddress: {
    address: '41 Welbeck St, London W1G 8DW, UK',
    location: '41',
    location_info: {lat: 51.5183821, lng: -0.150062},
  },
  mode: 'WALKING',
};

const u = {
  locationaddress: {
    address: '41 Welbeck St, London W1G 8DW, UK',
    location: '41',
    location_info: {lat: 51.5183821, lng: -0.150062},
  },
  mode: 'DRIVING',
};
