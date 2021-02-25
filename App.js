import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import { firebaseConfig } from './config/firebase.js';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from "./navigation/AppNavigator";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./components/HomeScreen";


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
