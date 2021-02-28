import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import firebase from 'firebase';
import PlantWidget from './PlantWidget'
import * as Font from "expo-font";



class HomeScreen extends React.Component {
  state = { user: {}, plants: []};

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({user: user});
        firebase.firestore().collection('plants').where('uid', '==', user.uid).get().then(snapshot => {
          const tmpPlants = [];
          snapshot.forEach(doc => {
            tmpPlants.push(doc.data());
          });
          this.setState({plants: tmpPlants});
        }).catch(err => {
          console.log('Error getting documents', err);
        });
      }
    });
  }

 
  render() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text>Home</Text>
          </View>
            <PlantWidget
                source={require('../plants_images/banana.jpg')}
                name="Banana"
                time_left_next_watering={30}
            />
        </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});



export default HomeScreen;
