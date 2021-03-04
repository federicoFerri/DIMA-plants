import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';

class CreatePlantStep3Screen extends React.Component {
    state = {
        plantName: '',
        plantType: '',
        plantImage:'',
        externalInternal: '',
        exposition: '',
        roomName:'',
        address:'',
    }

    toStep4 = () => {
        this.props.navigation.navigate('CreateStep4');
    }
    toStep2 = () => {
        this.props.navigation.navigate('CreateStep2');
    }

    handleAddress = (text) => {
        this.setState({ externalInternal: text })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toStep4()} 
                    backPress={() => this.toStep2()}
                />
                <Text style={{fontSize: 36, color: '#000', fontFamily:'Comfortaa', marginLeft: 20, marginTop: 15}}>Address</Text>
                <TextInput
                    style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', fontFamily:'Comfortaa', padding:15}}
                    placeholder = "Enter address"
                    placeholderTextColor = 'black'
                    onChangeText = {this.handleAddress}
                />
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep3Screen;