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
            <SafeAreaView style={{flexDirection: 'row', justifyContent:'space-between', alignItems:'center', marginTop: 20, marginLeft: 15, marginRight: 15}}>
                <BackButton
                    onPress={this.backPressed()}
                />
                {this.props.isForwardVisible && <ForwardButton
                    onPress={this.forwardPressed()}
                />}
            </SafeAreaView>
        )
    }
}

HeaderCreatePlant.defaultProps = {
    isForwardVisible: true,
  };

export default HeaderCreatePlant;