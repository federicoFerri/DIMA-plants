import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';

class CreatePlantStep3Screen extends React.Component {
    toStep4 = () => {
        this.props.navigation.navigate('CreateStep4');
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toStep4()}
                />
                <Text style={{fontSize: 36, color: '#000', fontFamily:'Comfortaa'}}>Address</Text>
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep3Screen;