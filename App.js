import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import { firebaseConfig } from './config/firebase.js';
import AuthNavigator from './navigation/AuthNavigator';
import HomeScreen from './components/HomeScreen.js';

firebase.initializeApp(firebaseConfig);

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            Auth: AuthNavigator,
            App: HomeScreen,
        },
        {
            initialRouteName: 'Auth'
        }
    )
);

const Plants = () => {
    return (<SafeAreaProvider><AppContainer></AppContainer></SafeAreaProvider>)
}

export default Plants;