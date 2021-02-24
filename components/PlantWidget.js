import React from 'react';
import {Image, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';

const PlantWidget = (props) => (
  <SafeAreaView style={{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
    <TouchableOpacity activeOpacity={0.5}>
        <Image 
        style={{width: 250, height: 140}}
        source={props.source}
        />
    </TouchableOpacity>

    <View>
      <Text style={{fontSize: 25, color: '#000'}}>{props.name}</Text>
    </View>

    <View style={{width: 250, height: 50, padding: 10, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#E8DFDF'}}>
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

export default PlantWidget;