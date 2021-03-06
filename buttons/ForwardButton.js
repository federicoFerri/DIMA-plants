import React from 'react';
import { StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const image_ForwardButton = require('../assets/button_images/arrow_forward.png');

{/*props required
  @onPress: if button is pressed, it launches an event like TouchableOpacity
*/}

class ForwardButton extends React.Component {
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
                        style={stylesImage.forwardButton}
                        source={image_ForwardButton}
                        /> 
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
  
}


const stylesImage = StyleSheet.create({
    forwardButton: {
      width: 32,
      height: 27,
      resizeMode: 'contain',
      //marginTop: 17
    },
  });

export default ForwardButton;