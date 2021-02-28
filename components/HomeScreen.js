import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button,TouchableOpacity } from 'react-native';
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

  toDetailScreen = () => {
    this.props.navigation.navigate('Detail');
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
                onPress={() => this.toDetailScreen()}
            />
            <TouchableOpacity 
            activeOpacity={0.5}
            onPress={() => this.toDetailScreen()}>
                {/*name of the plant */}
                <Text style={{fontSize: 25, color: '#000', fontFamily:'Comfortaa'}}>ciao</Text>
          </TouchableOpacity>
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
