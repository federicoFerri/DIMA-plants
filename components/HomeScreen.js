import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, FlatList } from 'react-native';
import firebase from 'firebase';
import PlantWidget from './PlantWidget'
import * as Font from "expo-font";



class HomeScreen extends React.Component {
  state = { user: {}, plants: [], isFetching: true};

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({user: user});
        this.onRefresh();
      }
    });
  }

  //navigate to detail screen of a plant selected
  toDetailScreen = (plant) => {
    this.onRefresh();
    this.props.navigation.navigate('Detail', {
      plant_data: plant.data(),
      plant_id: plant.id,
      user: this.state.user
    });
  }

  //handle refresh of the homepage by updating data from Firebase
  onRefresh() {
    this.setState({isFetching: true});
    firebase.firestore().collection('plants').where('uid', '==', this.state.user.uid).get().then(snapshot => {
      const tmpPlants = [];
      snapshot.forEach(doc => {
        tmpPlants.push(doc);
      });
      this.setState({plants: tmpPlants, isFetching: false});
    }).catch(err => {
      console.log('Error getting documents', err);
    });
  }
 
  render() {
    return (
        <SafeAreaView style={{ flex: 1}}>
          <Text style={{fontSize: 36, color: '#000', fontFamily: 'Comfortaa', marginTop: 50, marginLeft: 10}}>Profile</Text>
          <View style={{alignItems: 'center'}}>
            <FlatList style={{marginTop: 15, marginBottom:90}}
                data={this.state.plants}
                renderItem={({ item }) => (
                    <PlantWidget
                        plant={item}
                        user={this.state.user}
                        time_left_next_watering={30}
                        colorWaterStatus={'red'}
                        onPress={() => this.toDetailScreen(item)}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                refreshing={this.state.isFetching}
                onRefresh={() => this.onRefresh()}
                ListEmptyComponent={() => (
                    <View>
                      <Text>Non hai nessuna pianta, aggiungi una pianta!</Text>
                    </View>
                )}
            />
          </View>
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
