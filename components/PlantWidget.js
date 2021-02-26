import React from 'react';
import {Image, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import * as Font from "expo-font";

const clock_image = require('../assets/button_images/clock.png');
const water_status_image = require('../assets/button_images/water_status.png');

{/*props required
  @source: a png image of the plant
  @name: the name of the plant
  @time_left_next_watering: time left to the next watering in minutes
*/}

class PlantWidget extends React.Component {
  state = {fontsLoaded: false};

  async loadFonts() {
    await Font.loadAsync({
        Comfortaa: require('../assets/fonts/Comfortaa-Regular.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }
  render() {
    if (this.state.fontsLoaded) {
      return (
        <SafeAreaView style={{width: 300, height: 190, flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity activeOpacity={0.5}>
              {/*plant image */}
              <Image 
              style={{width: 300, height: 140, opacity: 0.75, borderTopRightRadius: 10, borderTopLeftRadius: 10}}
              source={this.props.source}
              />
              {/*name of the plant */}
              <View style={{position: 'absolute', bottom: 2, left: 8}}>
                <Text style={{fontSize: 25, color: '#000', fontFamily:'Comfortaa'}}>{this.props.name}</Text>
              </View>
              {/*water status image */}
              <Image 
              style={{width: 20, height: 25, position: 'absolute', top:4, right:8}}
              source={water_status_image}
              />
              {/*time left and clock image on top left */}
              <View style={{position: 'absolute', top: 2, left: 4, padding: 5, flex: 1, flexDirection:'row'}}>
                <Image 
                style={{width: 24, height: 23}}
                source={clock_image}
                />
                <Text style={{fontSize: 13, color: '#000', fontFamily: 'Comfortaa', padding: 2}}>next watering in {this.props.time_left_next_watering} min</Text>
              </View>
          </TouchableOpacity>
          <View style={{width: 300, padding: 10, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E8DFDF', borderBottomRightRadius: 10, borderBottomLeftRadius: 10}}>
            <TouchableOpacity activeOpacity={0.5}>
                <Image 
                  style={{width: 30, height: 30}}
                  source={require('../assets/button_images/watering.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
                <Image 
                  style={{width: 30, height: 30}}
                  source={require('../assets/button_images/good_plant.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
                <Image 
                  style={{width: 30, height: 30}}
                  source={require('../assets/button_images/bad_plant.png')}
                />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
    }
    else{
      return null;
    }
  }
}

export default PlantWidget;