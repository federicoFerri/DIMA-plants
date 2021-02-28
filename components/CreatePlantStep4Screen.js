import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';

class CreatePlantStep4Screen extends React.Component {
    toEnd = () => {
        this.props.navigation.navigate('Home');
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toEnd()}
                />
                <Text style={{fontSize: 24, color: '#000', fontFamily:'Comfortaa'}}>How is your plant now?</Text>
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep4Screen;