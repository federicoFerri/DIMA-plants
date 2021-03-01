import React from 'react';
import {Image, Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';

{/*props required
  @backPress: if back arrow is pressed, it launches an event like TouchableOpacity
  @forwardPress: if forward arrow is pressed, it launches an event like TouchableOpacity
*/}
class HeaderCreatePlant extends React.Component {
    forwardPressed = () => () => {
        this.props.forwardPress()
    }
    backPressed = () => () => {
        this.props.backPress()
    }
    render() {
        return (
            <SafeAreaView style={{flexDirection: 'row', justifyContent:'space-between', marginTop: 20, paddingLeft: 15, paddingRight: 15}}>
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
export default HeaderCreatePlant;