import React from 'react';
import { Text, View, SafeAreaView, Button } from 'react-native';
import firebase from 'firebase';
import * as Font from "expo-font";

class ProfileScreen extends React.Component {
  state = { user: {}, fontsLoaded: false};

  async loadFonts() {
    await Font.loadAsync({
        Comfortaa: require('../assets/fonts/Comfortaa-Regular.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({user: user});
      }
    })
    this.loadFonts();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
          <SafeAreaView style={{flex: 1}}>
            <Text style={{fontSize: 36, color: '#000', fontFamily: 'Comfortaa', marginTop: 50, marginLeft: 10}}>Profile</Text>
            <Text style={{fontFamily: 'Comfortaa', marginLeft: 10}}>{this.state.user.email}</Text>
            <View style={{padding: 20}}>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Button color='#000' title="LOG OUT" onPress={() => {
                  firebase.auth().signOut();
                }}/>
              </View>
            </View>
          </SafeAreaView>
      )
    } else {
      return null;
    }
  }
}

export default ProfileScreen;
