import React from 'react';
import { StyleSheet, Image } from 'react-native';

const BackButton = () => (
    <Image 
        style={stylesImage.backButton}
        source={require('../button_images/back_button.png')}
        /> 
);

const stylesImage = StyleSheet.create({
    flex: 1,
    backButton: {
      width: 20,
      height: 21,
      resizeMode: 'stretch',
      paddingTop: 5,
    },
  });

export default BackButton;