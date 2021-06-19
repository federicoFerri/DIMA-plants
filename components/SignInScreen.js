import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  ImageBackground,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import 'firebase/firestore';
import firebase from 'firebase';
import * as Facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth';
import * as Segment from 'expo-analytics-segment';
import { androidClientId, IOSClientId } from '../config/google.js';
import { facebookAppId } from '../config/facebook.js';
export const isAndroid = () => Platform.OS === 'android';

//Sign in screen
class SignInScreen extends React.Component {
  state = { displayName: '', email: '', password: '', errorMessage: '', loading: false };

  onLoginSuccess() {
    this.props.navigation.navigate('App');
  }

  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }

  async signInWithFacebook() {
    try {
      await Facebook.initializeAsync({
        appId: facebookAppId,
      })
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      })
      console.log(type, token);
      if (type === 'success') {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase.auth().signInWithCredential(credential);
        this.onLoginSuccess.bind(this);
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

   isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

   onSignIn = (googleUser)  => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken);
        // Sign in with credential from the Google user.
        firebase.auth().signInWithCredential(credential).then(function(result){
            
            console.log("user sign in");
        firebase
        .database()
        .ref('/users'+result.user.uid)
        .set({
            gmail:result.user.email,
            profile_picture:result.additionalUserInfo.profile.profile_picture,
            locale:result.additionalUserInfo.profile_picture.locale,
            first_name:result.additionalUserInfo.given_name,
            last_name:result.additionalUserInfo.first_name
        })
        .then(function(snapshot){

        });
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: androidClientId,
        iosClientId: IOSClientId,
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    return (
        <SafeAreaView style={{flex: 1}}>
          <KeyboardAvoidingView behavior="padding">
            <View style={{height: '84%'}}>
              <ImageBackground source={require('../assets/background.jpeg')} style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}} imageStyle={{opacity: 0.8}}>
                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={require('../assets/logoplants.png')} style={{marginRight: 10}}></Image>
                  <Text style={{ fontSize: 56, color: '#ffffff', textAlign: 'center'}}>
                    plants
                  </Text>
                </View>
              </ImageBackground>
            </View>
            {this.renderLoading()}
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'red',
                width: '80%'
              }}
            >
              {this.state.error}
            </Text>
            <View style={{flexDirection:'row', flexWrap:'wrap', height: '12%'}}>
              <TouchableOpacity
                  style={{ width: '50%', justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => this.signInWithGoogleAsync()}>
                <View style={styles.button}>
                  <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../assets/google.png')} style={{marginRight: 10}}></Image>
                    <Text style={{letterSpacing: 0.5, fontSize: 16, color: '#000000'}}>
                      GOOGLE
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: '50%', justifyContent: 'center', alignItems: 'center'}}
                onPress={() => this.signInWithFacebook()}>
                <View style={styles.button}>
                  <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../assets/facebook.png')} style={{marginRight: 10}}></Image>
                    <Text style={{letterSpacing: 0.5, fontSize: 16, color: '#000000'}}>
                      FACEBOOK
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    height: '90%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#000000'
  }
});
export default SignInScreen;
