import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';
import firebase from 'firebase';
import PlantWidget from './PlantWidget'


class HomeScreen extends React.Component {
  state = { user: {} };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({user: user});
      }
    })
 
  }

 
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>{this.state.user.email}</Text>
          <Button title="Log Off" onPress={() => {
            firebase.auth().signOut();
          /*  analytics.identify("test", {
                email: "this.state.email"
              });*/
          }}/>
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
