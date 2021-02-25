import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import { firebaseConfig } from './config/firebase.js';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from "./navigation/AppNavigator";
import {NavigationContainer} from "@react-navigation/native";


firebase.initializeApp(firebaseConfig);

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            Auth: AuthNavigator,
            App: AppNavigator
        },
        {
            initialRouteName: 'Auth'
        }
    )
);


const Plants = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
            <AppContainer>

            </AppContainer>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default Plants;

/*

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Detail from './components/Detail';
import imagePlant from './plants_images/banana.jpg'

const App = () => (
  <Detail/>
);


export default App;
*/

/*
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Detail from './components/Detail';
import HomeScreen from './components/HomeScreen';
import imagePlant from './plants_images/banana.jpg'

const App = () => (
  <HomeScreen/>
);


export default App;
*/