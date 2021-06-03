import React from 'react';
import { StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

const image_DeletePlantButton = require('../assets/button_images/delete_plant.png');

{/*props required
  @onPress: if button is pressed, it launches an event like TouchableOpacity
*/}

class DeletePlantButton extends React.Component {
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
                        style={stylesImage.deletePlantButton}
                        source={image_DeletePlantButton}
                        /> 
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
  
}


const stylesImage = StyleSheet.create({
    deletePlantButton: {
      width: 18,
      height: 21,
      resizeMode: 'contain',
      //marginTop: 20
    },
  });

export default DeletePlantButton;