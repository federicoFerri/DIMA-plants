import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Button, TouchableOpacity, Platform, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';
import {NavigationActions} from "react-navigation";
import DownArrow from '../buttons/DownArrow';
import * as ImagePicker from 'expo-image-picker';

import plant_load_image from '../assets/button_images/add_a_photo.png'
import PickerPlant from './PickerPlants';
import firebase from "firebase";

const plantLoadImageUri = Image.resolveAssetSource(plant_load_image).uri

//First screen of the creation of the plant
class CreatePlantStep1Screen extends React.Component {
    state = {
        plantName: '',
        plantType: '',
        secondsBetweenWaterings: 0,
        plantImage: '',
        plantTypesTimes: {},
        plantTypesPicker: []
    }

    componentDidMount() {
        firebase.firestore().collection('plantTypes').get().then(snapshot => {
            const tmpPlantTypesTimes = {};
            const tmpPlantTypesPicker = [];
            snapshot.forEach(doc => {
                tmpPlantTypesTimes[doc.id] = doc.data().secondsBetweenWaterings;
                tmpPlantTypesPicker.push({label: doc.data().name, value: doc.id})
            });
            this.setState({plantTypesTimes: tmpPlantTypesTimes, plantTypesPicker: tmpPlantTypesPicker});
        })
    }

    //handle the taking of a photo of the plant
    openImagePickerAsync = async () => {
        let permissionResult = ImagePicker.requestMediaLibraryPermissionsAsync();
        let permissionResultCamera = ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false && (await permissionResultCamera).granted === false) {
          alert("Permission to access camera roll and camera are required!");
          return;
        }
        //launchImagwLibraryAsync() for selection of saved images
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [350, 250],
            quality: 1,
          } );
        //console.log(pickerResult);
        if (pickerResult.cancelled === true) {
            return;
        }
        this.setState({ plantImage: pickerResult.uri });
        //console.log('hey ' + this.state.plantImage);
    }

    //control that all needed data is inserted and navigate to screen 2
    toStep2 = () => {
        if(this.state.plantName==='' || this.state.plantType==='' || this.state.plantImage===''){
            alert("Insert all required data!");
            return;
        }
        else {
            this.props.navigation.navigate('CreateStep2', 
            {
                plantName: this.state.plantName,
                plantType: this.state.plantType,
                secondsBetweenWaterings: this.state.secondsBetweenWaterings,
                plantImage: this.state.plantImage
            });
        }
        
    }
    //go back to homescreen
    toHome = () => {
        this.props.navigation.goBack('Home');
    }
    //handle the insertion of the name of the plant
    handlePlantName = (text) => {
        this.setState({ plantName: text })
    }
    //handle the selection of the type of the plant
    handlePlantType = (id) => {
        this.setState({ plantType: id, secondsBetweenWaterings: this.state.plantTypesTimes[id]})
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{ flex: 1, flexDirection:'column'}}>
                    <HeaderCreatePlant
                        forwardPress={() => this.toStep2()} 
                        backPress={() => this.toHome()}
                    />
                    <Text style={{fontSize: 36, color: '#000', fontFamily:'Comfortaa', marginLeft: 20, marginTop: 15}}>Add a plant</Text>
                    <TextInput
                        style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', padding:15}}
                        placeholder = "Name of the plant"
                        placeholderTextColor = 'gray'
                        onChangeText = {this.handlePlantName}
                    />
                    
                    <PickerPlant
                        label= 'Select a plant type'
                        items= {this.state.plantTypesPicker}
                        function= {this.handlePlantType}
                    />
                    <Text style={{fontSize: 15, color: '#000', marginLeft: 25, marginTop: 15, marginBottom: 10}}>Tap to add a photo</Text>
                    <TouchableOpacity 
                        activeOpacity={0.5}
                        onPress={this.openImagePickerAsync}
                        style={{width: 300, height: 250, alignSelf: 'center', flex:1, alignItems: 'center', flexDirection: 'column', marginHorizontal: 10, marginVertical:10}}>
                            {this.state.plantImage ? (<Image source={{ uri: this.state.plantImage }} style={{width: 300, height: 250, alignSelf: 'center',marginHorizontal: 30, marginVertical:10}}/>) 
                            : (<Image source={{ uri: plantLoadImageUri }} style={{width: 160, height: 120, marginTop: 40, alignSelf: 'center', resizeMode: 'contain'}}/>)}  
                    </TouchableOpacity>
                    
                    
                </SafeAreaView>
            </ScrollView>
        )
    }
}

export default CreatePlantStep1Screen;