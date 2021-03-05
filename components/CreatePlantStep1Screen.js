import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Button} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';
import {NavigationActions} from "react-navigation";
import DownArrow from '../buttons/DownArrow';
import * as ImagePicker from 'expo-image-picker';

class CreatePlantStep1Screen extends React.Component {
    state = {
        plantName: '',
        plantType: '',
        plantImage:'',
    }

    openImagePickerAsync = () => {
        permissionResult = ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        lpickerResult = ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);
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
                    style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', fontFamily:'Comfortaa', padding:15}}
                    placeholder = "Name of the plant"
                    placeholderTextColor = 'black'
                    onChangeText = {this.handlePlantName}
                />
                
                <SafeAreaView style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', fontFamily:'Comfortaa', padding:15}}>
                    <RNPickerSelect
                        style={{}}
                        textInputProps={{fontSize: 15, color: '#000', marginLeft: 15, fontFamily: 'Comfortaa'}}
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

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Pick an image from camera roll" onPress={this.openImagePickerAsync} />
                    
                </View>
                    
                
                
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep1Screen;