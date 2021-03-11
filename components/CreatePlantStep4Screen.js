import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import HeaderCreatePlant from './HeaderCreatePlant';
import { CommonActions } from "@react-navigation/native";

import needs_water_image from '../assets/button_images/bad_plant.png'
import plant_fine_image from '../assets/button_images/good_plant.png'
import firebase from "firebase";
import * as Font from "expo-font";

class CreatePlantStep4Screen extends React.Component {
    state = {
        user: {},
        plantName: '',
        plantType: '',
        plantImage:'',
        externalInternal: '',
        exposition: '',
        roomName:'',
        address:'',
        latitude: '',
        longitude: '',
        plantState: '', //0 is 'needs water', 1 is 'fine'
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.setState({user: user});
            }
        });
        this.setState({
            plantName: this.props.route.params.plantName,
            plantType: this.props.route.params.plantType,
            plantImage: this.props.route.params.plantImage,
            externalInternal: this.props.route.params.externalInternal,
            exposition: this.props.route.params.exposition,
            roomName: this.props.route.params.roomName,
            address: this.props.route.params.address,
            latitude: this.props.route.params.latitude,
            longitude: this.props.route.params.longitude,
        });
    }

    async uploadToFirebase(uri, filename) {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child('uploads/' + this.state.user.uid + '/' + filename);
        const snapshot = await ref.put(blob);
        return snapshot.ref.getDownloadURL();
    }

    toEnd = () => {
        this.props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        );
        const filename = this.state.plantImage.substring(this.state.plantImage.lastIndexOf('/') + 1);
        const imageUri = Platform.OS === 'ios' ? this.state.plantImage.replace('file://', '') : this.state.plantImage;
        this.uploadToFirebase(imageUri, filename).then((imageUrl) => {
            console.log(imageUrl);
            firebase.firestore().collection('plants').add({
                name: this.state.plantName,
                plantType: this.state.plantType,
                imageUrl: imageUrl,
                position: this.state.externalInternal,
                exposition: this.state.exposition,
                room: this.state.roomName,
                location: this.state.address,
                state: this.state.plantState,
                uid: this.state.user.uid
            });
        });
        //this.props.navigation.navigate('Home');
        console.log(this.state);
    }
    toStep3 = () => {
        this.props.navigation.navigate('CreateStep3',
        {
            plantName: this.state.plantName,
            plantType: this.state.plantType,
            plantImage: this.state.plantImage,
            externalInternal: this.state.externalInternal,
            exposition: this.state.exposition,
            roomName: this.state.roomName
        });
    }
    handlePlantIsGood = () => {
        this.setState({ plantState: 1 })
    }
    handlePlantIsBad = () => {
        this.setState({ plantState: 0 })
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toEnd()} 
                    backPress={() => this.toStep3()}
                />
                <Text style={{fontSize: 24, color: '#000', fontFamily:'Comfortaa', marginLeft: 20, marginTop: 15}}>How is your plant now?</Text>
                <SafeAreaView style={{ flex: 1, flexDirection:'row', justifyContent: 'center', marginTop: 75}}>
                    <SafeAreaView style={{ flex: 1, flexDirection:'column', alignItems: 'center'}}>
                        <Text style={{fontSize: 15, color: '#000', fontFamily:'Comfortaa', marginBottom: 10}}>Fine</Text>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            onPress={this.handlePlantIsGood}
                        >
                            <Image source={plant_fine_image} style={{width: 127, height: 109, alignSelf: 'center'}}/>  
                        </TouchableOpacity>
                    </SafeAreaView>
                    <SafeAreaView style={{ flex: 1, height: 170, flexDirection:'column', alignItems: 'center'}}>
                        <Text style={{fontSize: 15, color: '#000', fontFamily:'Comfortaa', marginBottom: 10}}>Needs water</Text>
                        <TouchableOpacity 
                            activeOpacity={0.5}
                            onPress={this.handlePlantIsBad}
                        >    
                            <Image source={needs_water_image} style={{width: 126, height: 117, alignSelf: 'center'}}/>  
                        </TouchableOpacity>
                    </SafeAreaView>    
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep4Screen;