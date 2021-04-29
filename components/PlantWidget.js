import React from 'react';
import {Image, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import firebase from "firebase";

class PlantWidget extends React.Component {
  millisBetweenUpdates = 15000;
  state = { 
    colorWaterStatus: null, 
    timeLeftNextWatering: 0 //in seconds, you adapt it for minutes
  };

  componentDidMount() {
    const expired = firebase.firestore.Timestamp.now().seconds > this.props.plant.data().lastWatering.seconds + this.props.plant.data().secondsBetweenWaterings;
    const diff = this.props.plant.data().lastWatering.seconds + this.props.plant.data().secondsBetweenWaterings - firebase.firestore.Timestamp.now().seconds;
    console.log(firebase.firestore.Timestamp.now().seconds, this.props.plant.data().lastWatering.seconds + this.props.plant.data().secondsBetweenWaterings, diff, expired);
    this.setState({
        colorWaterStatus: (expired ? 'red' : 'green'),
        timeLeftNextWatering: (expired ? 0 :  diff )
    });
    // TODO start a recurrent operation (timer) that updates the time left and color of the icon (state)
    //update every 30 seconds
    this.interval = setInterval(() => this.updateStatusOverTime(), this.millisBetweenUpdates); 
  }

  componentWillUnmount() {
      // TODO: clear the interval
      clearInterval(this.interval);
  }

  imagePressed = () => () => {
    this.props.onPress()
  }

  updateStatusOverTime() {
    const expired = ((this.state.timeLeftNextWatering - (this.millisBetweenUpdates/ (1000))) <= 0);
    const diff = (this.millisBetweenUpdates / 1000);
    this.setState({
      colorWaterStatus: (expired ? 'red' : 'green'),
      timeLeftNextWatering: (expired ? 0 : this.state.timeLeftNextWatering - diff )
  });
}

  badPlantPressed = () => () => {
      const diff = +10;
      firebase.firestore().collection('plants').doc(this.props.plant.id).update({
          logs: firebase.firestore.FieldValue.arrayUnion({date: firebase.firestore.Timestamp.now(), action: 'bad'}),
          secondsBetweenWaterings: (this.props.plant.secondsBetweenWaterings - diff > 0 ? this.props.plant.secondsBetweenWaterings - diff : this.props.plant.secondsBetweenWaterings)
      }).then(() => {
          // TODO: mark opacity with green color for n seconds and update props
          const expired = (this.props.plant.secondsBetweenWaterings - diff) > 0
          this.setState({
            colorWaterStatus: (expired ? 'red' : 'green'),
            timeLeftNextWatering: (expired ? 0 :  (this.state.timeLeftNextWatering - diff) )
        });
      })
  }

  goodPlantPressed = () => () => {
      const diff = +10;
      firebase.firestore().collection('plants').doc(this.props.plant.id).update({
          logs: firebase.firestore.FieldValue.arrayUnion({date: firebase.firestore.Timestamp.now(), action: 'good'}),
          secondsBetweenWaterings: this.props.plant.secondsBetweenWaterings + diff
      }).then(() => {
          // TODO: mark opacity with green color for n seconds and update props
          this.setState({
            colorWaterStatus: 'green',
            timeLeftNextWatering: (this.state.timeLeftNextWatering + diff)
        });
      })
  }

  wateringPlantPressed = () => () => {
      firebase.firestore().collection('plants').doc(this.props.plant.id).update({
          logs: firebase.firestore.FieldValue.arrayUnion({date: firebase.firestore.Timestamp.now(), action: 'watering'}),
          lastWatering: firebase.firestore.Timestamp.now()
      }).then(() => {
          // TODO: mark opacity with green color for n seconds and update props
          this.setState({
            colorWaterStatus: 'green',
            timeLeftNextWatering: this.props.plant.data().secondsBetweenWaterings
        });
      })
  }

  printTimeLeft(){
    if(this.state.timeLeftNextWatering > 0) {
      if(this.state.timeLeftNextWatering >= 60){
        return ('in ' + Math.floor(this.state.timeLeftNextWatering / 60) + ' min');
      }
      else{
        return ('in ' + this.state.timeLeftNextWatering +' seconds');
      }
    }
    else{
      return ('now');
    }
  }

  render() {
      return (
        <SafeAreaView style={{width: 300, height: 190, flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
          <TouchableOpacity 
            activeOpacity={0.5}
            onPress={this.imagePressed()}>
                {/*plant image */}
                <Image 
                style={{width: 300, height: 140, opacity: 0.75, borderTopRightRadius: 10, borderTopLeftRadius: 10}}
                source={{uri: this.props.plant.data().imageUrl}}
                />
                {/*name of the plant */}
                <View style={{position: 'absolute', bottom: 2, left: 8}}>
                  <Text style={{fontSize: 25, color: '#000', fontFamily:'Comfortaa'}}>{this.props.plant.data().name}</Text>
                </View>
                {/*water status image */}
                <Image 
                style={{width: 20, height: 25, position: 'absolute', top:4, right:8, tintColor: this.state.colorWaterStatus}}
                source={require('../assets/button_images/water_status.png')}
                />
                {/*time left and clock image on top left */}
                <View style={{position: 'absolute', top: 2, left: 4, padding: 5, flex: 1, flexDirection:'row'}}>
                  <Image 
                  style={{width: 24, height: 23}}
                  source={require('../assets/button_images/clock.png')}
                  />
                  <Text style={{fontSize: 13, color: '#000', fontFamily: 'Comfortaa', padding: 2}}>next watering {this.printTimeLeft()}</Text>
                </View>
          </TouchableOpacity>
          <View style={{width: 300, padding: 10, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E8DFDF', borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}>
            <TouchableOpacity activeOpacity={0.5} onPress={this.wateringPlantPressed()}>
                <Image 
                  style={{width: 30, height: 30}}
                  source={require('../assets/button_images/watering.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={this.goodPlantPressed()}>
                <Image 
                  style={{width: 30, height: 30}}
                  source={require('../assets/button_images/good_plant.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={this.badPlantPressed()}>
                <Image 
                  style={{width: 32, height: 30}}
                  source={require('../assets/button_images/bad_plant.png')}
                />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
  }
}

export default PlantWidget;