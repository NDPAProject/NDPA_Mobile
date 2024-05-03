import 'react-native-gesture-handler';

// Import React
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LogBox, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Import Screens
import Mainpage from './mainpage';
import Streetview from './streetview';
import Routepage from './routepage';
import Routeview from './routeview';
import Footer from '../../components/footer';
import {back} from '../../constants/images';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

const Location = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <Stack.Navigator initialRouteName="Mainpage">
        <Stack.Screen
          name="Mainpage"
          component={Mainpage}
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
          name="Routepage"
          component={Routepage}
          options={{
            title: 'Your Route',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={back} style={{width: 24, height: 24}} />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="Streetview"
          component={Streetview}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Routeview"
          component={Routeview}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      <Footer state={3} />
    </View>
  );
};

export default Location;
