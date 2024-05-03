import 'react-native-gesture-handler';

// Import React
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LogBox, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Import Screens
import MainpageTutorial from './mainpagetutorial';
import StreetviewTutorial from './streetviewtutorial';
import RoutepageTutorial from './routepagetutorial';
import RouteviewTutorial from './routeviewtutorial';
import Location from '../location/index';
import Footer from '../../components/footer';
import {back} from '../../constants/images';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const LocationTutoroal = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator initialRouteName="MainpageTutorial">
        <Stack.Screen
          name="MainpageTutorial"
          component={MainpageTutorial}
          options={{
            title: 'Map',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Image source={back} style={{width: 24, height: 24}} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="RoutepageTutorial"
          component={RoutepageTutorial}
          options={{
            title: 'Your Route',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Image source={back} style={{width: 24, height: 24}} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="StreetviewTutorial"
          component={StreetviewTutorial}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="RouteviewTutorial"
          component={RouteviewTutorial}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <Footer state={3} />
    </View>
  );
};

export default LocationTutoroal;
