import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import { firebaseConfig } from './config/firebase.js';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from "./navigation/AppNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {Text, SafeAreaView, LogBox} from 'react-native';
import * as Font from "expo-font";

LogBox.ignoreLogs(['Setting a timer']);

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


class Plants extends React.Component {
    state = {fontsLoaded: false};
    async loadFonts() {
        await Font.loadAsync({
            Comfortaa: require('./assets/fonts/Comfortaa-Regular.ttf')
        });
        this.setState({ fontsLoaded: true });
      }
    componentDidMount() {
        this.loadFonts();
    }
    render() {
        if (this.state.fontsLoaded) {
            return (
                <SafeAreaProvider>
                    <NavigationContainer>
                    <AppContainer>

                    </AppContainer>
                    </NavigationContainer>
                </SafeAreaProvider>
            )
        }
        else {
            return <SafeAreaView><Text>Font not loaded</Text></SafeAreaView>;
        }
    }
};

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