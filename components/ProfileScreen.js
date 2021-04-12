import React from 'react';
import { Text, View, SafeAreaView, Button, Switch } from 'react-native';
import firebase from 'firebase';
import * as Font from "expo-font";

class ProfileScreen extends React.Component {
  state = { user: {}, fontsLoaded: false, disableNotifications: false};

  async loadFonts() {
    await Font.loadAsync({
        Comfortaa: require('../assets/fonts/Comfortaa-Regular.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        firebase.firestore().collection('users').doc(user.uid).get().then(user_data => {
            if (user_data.exists) {
                this.setState({disableNotifications: user_data.data().disableNotifications || false});
            }
        })
        this.setState({user: user});
      }
    })
    this.loadFonts();
  }

  render() {
    const toggle = (value) => {
        firebase.firestore().collection('users').doc(this.state.user.uid).update({disableNotifications: !this.state.disableNotifications}).then(res => {
            this.setState({disableNotifications: !this.state.disableNotifications})
        })
    }
    if (this.state.fontsLoaded) {
      return (
          <SafeAreaView style={{flex: 1}}>
            <Text style={{fontSize: 36, color: '#000', fontFamily: 'Comfortaa', marginTop: 50, marginLeft: 10}}>Profile</Text>
            <Text style={{fontFamily: 'Comfortaa', marginLeft: 10}}>{this.state.user.email}</Text>
              <View style={{flexDirection:'row', flexWrap:'wrap', marginTop: 20, marginLeft: 20}}>
                  <Text style={{fontFamily: 'Comfortaa', marginLeft: 10, fontSize: 20}}>Show notifications</Text>
                  <Switch
                      style={{marginLeft: 20}}
                      onValueChange={toggle}
                      value={!this.state.disableNotifications}
                  />
                  <Text style={{fontFamily: 'Comfortaa', marginLeft: 10}}>Allow plants to send you notifications</Text>
              </View>
            <View style={{padding: 20}}>
              <View style={{marginTop: 20, marginBottom: 10}}>
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
