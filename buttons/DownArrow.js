import React from 'react';
import { StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const image_DownArrow = require('../assets/button_images/arrow_down.png');

{/*props required
  @onPress: if button is pressed, it launches an event like TouchableOpacity
*/}

class DownArrow extends React.Component {
    imagePressed = () => () => {
        this.props.onPress()
    }
    render() {
        return(
            <SafeAreaView>
                <TouchableOpacity 
                    activeOpacity={0.5}
                    onPress={this.imagePressed()}
                >
                    <Image 
                        style={stylesImage.downArrow}
                        source={image_DownArrow}
                        /> 
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
  
}


const stylesImage = StyleSheet.create({
    downArrow: {
      width: 32,
      height: 27,
      resizeMode: 'contain',
      marginTop: 0
    },
  });

export default DownArrow;