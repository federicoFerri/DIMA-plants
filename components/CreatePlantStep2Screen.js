import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';

class CreatePlantStep2Screen extends React.Component {
    toStep3 = () => {
        this.props.navigation.navigate('CreateStep3');
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toStep3()}
                />
                <Text style={{fontSize: 36, color: '#000', fontFamily:'Comfortaa'}}>Position</Text>
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep2Screen;