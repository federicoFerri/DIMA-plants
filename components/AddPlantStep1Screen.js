import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';

class AddPlantStep1Screen extends React.Component {
    toStep2 = () => {
        this.props.navigation.navigate('CreateStep2');
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <HeaderAddPlant
                    forwardPress={() => this.toStep2()}
                />
                <Text style={{fontSize: 36, color: '#000', fontFamily:'Comfortaa'}}>Add a plant</Text>
            </SafeAreaView>
        )
    }
}


{/*props required
  @backPress: if back arrow is pressed, it launches an event like TouchableOpacity
  @forwardPress: if forward arrow is pressed, it launches an event like TouchableOpacity
*/}
class HeaderAddPlant extends React.Component {
    forwardPressed = () => () => {
        this.props.forwardPress()
    }
    backPressed = () => () => {
        this.props.backPress()
    }
    render() {
        return (
            <SafeAreaView style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <BackButton
                    onPress={this.backPressed()}
                />
                <ForwardButton
                    onPress={this.forwardPressed()}
                />
            </SafeAreaView>
        )
    }
}

export default AddPlantStep1Screen;