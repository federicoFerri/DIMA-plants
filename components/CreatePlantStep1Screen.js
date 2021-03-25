import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Button, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';
import {NavigationActions} from "react-navigation";
import DownArrow from '../buttons/DownArrow';
import * as ImagePicker from 'expo-image-picker';

import plant_load_image from '../assets/button_images/add_a_photo.png'

const plantLoadImageUri = Image.resolveAssetSource(plant_load_image).uri

class CreatePlantStep1Screen extends React.Component {
    state = {
        plantName: '',
        plantType: '',
        plantImage: '',
    }

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

    toStep2 = () => {
        if(this.state.plantName==='' || this.state.plantType==='' || this.state.plantImage===plantLoadImageUri){
            alert("Insert all required data!");
            return;
        }
        else {
            this.props.navigation.navigate('CreateStep2', 
            {
                plantName: this.state.plantName,
                plantType: this.state.plantType,
                plantImage: this.state.plantImage
            });
        }
        
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
                    placeholderTextColor = 'gray'
                    onChangeText = {this.handlePlantName}
                />
                
                <SafeAreaView style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', fontFamily:'Comfortaa', padding:15}}>
                    <RNPickerSelect
                        style={{}}
                        textInputProps={{fontSize: 15, color: '#000'}}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                            label: 'Select a plant type',
                            value: null,
                            color: 'gray',
                          }}
                        onValueChange={(value) => this.handlePlantType(value)}
                        
                        Icon={() => {
                            return <DownArrow/>;
                          }}
                        items={[
                            { label: 'Tomato', value: 'tomato' },
                            { label: 'Rose', value: 'rose' },
                            { label: 'Tulipan', value: 'tulipan' },
                        ]}
                    />
                </SafeAreaView>
                <Text style={{fontSize: 15, color: '#000', marginLeft: 25, marginTop: 15, marginBottom: 10}}>Tap to add a photo</Text>
                <TouchableOpacity 
                    activeOpacity={0.5}
                    onPress={this.openImagePickerAsync}
                    style={{width: 300, height: 250, alignSelf: 'center', flex:1, alignItems: 'center', flexDirection: 'column'}}>
                        {this.state.plantImage ? (<Image source={{ uri: this.state.plantImage }} style={{width: 300, height: 250, alignSelf: 'center'}}/>) 
                        : (<Image source={{ uri: plantLoadImageUri }} style={{width: 160, height: 120, marginTop: 40, alignSelf: 'center', resizeMode: 'contain'}}/>)}  
                </TouchableOpacity>
                
                
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep1Screen;