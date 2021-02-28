import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';
import {NavigationActions} from "react-navigation";

class CreatePlantStep1Screen extends React.Component {
    toStep2 = () => {
        this.props.navigation.navigate('CreateStep2');
    }
    toHome = () => {
        this.props.navigation.goBack('Home');
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toStep2()} backPress={() => this.toHome()}
                />
                <Text style={{fontSize: 36, color: '#000', fontFamily:'Comfortaa'}}>Add a plant</Text>
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep1Screen;