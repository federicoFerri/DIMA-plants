import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import HeaderCreatePlant from './HeaderCreatePlant';
import { CommonActions } from "@react-navigation/native";

class CreatePlantStep4Screen extends React.Component {
    state = {
        plantName: '',
        plantType: '',
        plantImage:'',
        externalInternal: '',
        exposition: '',
        roomName:'',
        address:'',
    }
    
    toEnd = () => {
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
        //this.props.navigation.navigate('Home');
    }
    toStep3 = () => {
        this.props.navigation.navigate('CreateStep3');
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toEnd()} 
                    backPress={() => this.toStep3()}
                />
                <Text style={{fontSize: 24, color: '#000', fontFamily:'Comfortaa', marginLeft: 20, marginTop: 15}}>How is your plant now?</Text>
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep4Screen;