import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput} from 'react-native';
import {Picker} from '@react-native-picker/picker'
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';
import {NavigationActions} from "react-navigation";

class CreatePlantStep1Screen extends React.Component {
    state = {
        plantName: '',
        plantType: '',
        selectedValue: 'java',
    }

    toStep2 = () => {
        this.props.navigation.navigate('CreateStep2');
    }
    toHome = () => {
        this.props.navigation.goBack('Home');
    }
    handlePlantName = (text) => {
        this.setState({ plantName: text })
    }
    handlePlantType = (text) => {
        this.setState({ plantType: text })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toStep2()} 
                    backPress={() => this.toHome()}
                />
                <Text style={{fontSize: 36, color: '#000', fontFamily:'Comfortaa', marginLeft: 20, marginTop: 15}}>Add a plant</Text>
                <TextInput
                    style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', padding:15}}
                    placeholder = "Name of the plant"
                    placeholderTextColor = 'black'
                    onChangeText = {this.handlePlantName}
                />
                <SafeAreaView style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', fontFamily:'Comfortaa'}}>
                    <Picker
                        style={{marginLeft: 4, fontSize: 30, color: '#000', fontFamily:'Comfortaa'}}
                    >
                        <Picker.Item label="Tomato" value="tomato"/>
                        <Picker.Item label="Rose" value="rose" />
                    </Picker>
                </SafeAreaView>
                
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep1Screen;