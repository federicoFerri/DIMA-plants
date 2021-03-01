import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';

class CreatePlantStep3Screen extends React.Component {
    toStep4 = () => {
        this.props.navigation.navigate('CreateStep4');
    }
    toStep2 = () => {
        this.props.navigation.navigate('CreateStep2');
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toStep4()} 
                    backPress={() => this.toStep2()}
                />
                <Text style={{fontSize: 36, color: '#000', fontFamily:'Comfortaa', marginLeft: 20, marginTop: 15}}>Address</Text>
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep3Screen;