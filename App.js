import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase from 'firebase';
import { firebaseConfig } from './config/firebase.js';
import AuthNavigator from './navigation/AuthNavigator';
import AppNavigator from "./navigation/AppNavigator";
import {NavigationContainer} from "@react-navigation/native";
import {Text, SafeAreaView, LogBox} from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Font from "expo-font";

//dealing with less relevant logs related to the environment setup
LogBox.ignoreLogs(['Setting a timer', 'Non-serializable values were found in the navigation state. Check:', 'Warning: Each child in a list should have a unique "key" prop.']);

//initializing firebase using credentials
firebase.initializeApp(firebaseConfig);

//initial navigation to the auth screen
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

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

//main app, on opening it gets the expo notification token and pushes it to firebase firestore for storage and later use
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
        registerForPushNotificationsAsync().then((token) => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user != null) {
                    firebase.firestore().collection('users').doc(user.uid).set({expoToken: token}, {merge: true});
                }
            });

        });

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
}

export default Plants;

//retrieves the expo notification token and sets the style for it
async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
