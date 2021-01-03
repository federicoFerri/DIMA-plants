import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

const image_BackButton = require('../button_images/back_button.png');

const BackButton = () => (
  <TouchableOpacity activeOpacity={0.5}>
      <Image 
          style={stylesImage.backButton}
          source={image_BackButton}
          /> 
  </TouchableOpacity>
);


const stylesImage = StyleSheet.create({
    flex: 1,
    backButton: {
      width: 20,
      height: 21,
      resizeMode: 'contain',
      paddingTop: 5,
    },
  });

export default BackButton;