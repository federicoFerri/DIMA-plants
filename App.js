import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import firebase from 'firebase';
import { firebaseConfig } from './config/firebase.js';
import AuthNavigator from './navigation/AuthNavigator';
import HomeScreen from './components/HomeScreen.js';

firebase.initializeApp(firebaseConfig);

export default createAppContainer(

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