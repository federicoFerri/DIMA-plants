import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './navigation/AuthNavigator';
import HomeScreen from './screens/HomeScreen.js';
import firebase from 'firebase'
import {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGE_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} from 'react-native-dotenv'
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
    measurementId:MEASUREMENT_ID
}
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
