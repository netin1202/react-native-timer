/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  useColorScheme
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/screens/login';
import Desclaimer from './src/screens/disclaimer';
import Fuelstation from './src/screens/fuelstation';
import Details from './src/screens/details';
import Auth from './src/screens/auth';
const Stack = createStackNavigator();
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      {/* <Login/> */}
    {/* <Desclaimer/> */}
    {/* <Fuelstation/> */}
    {/* <Details/> */}
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Auth">
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="Disclaimer"
          component={Desclaimer}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
         <Stack.Screen
        name="Fuelstation"
        component={Fuelstation}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Details"
        component={Details}
        options={{headerShown: false}}
      />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
