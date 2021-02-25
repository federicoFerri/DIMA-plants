import React from 'react';
import { StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const image_BackButton = require('../assets/button_images/back_button.png');

const BackButton = () => (
  <SafeAreaView>
    <TouchableOpacity activeOpacity={0.5}>
        <Image 
            style={stylesImage.backButton}
            source={image_BackButton}
            /> 
    </TouchableOpacity>
  </SafeAreaView>
);


const stylesImage = StyleSheet.create({
    flex: 1,
    backButton: {
      width: 20,
      height: 21,
      resizeMode: 'contain',
      marginTop: 20,
    },
  });

export default BackButton;