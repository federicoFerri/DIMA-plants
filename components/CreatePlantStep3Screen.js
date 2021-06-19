import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';
import * as Location from 'expo-location';

const image_geo_localization = require('../assets/button_images/geo_localization.png');

//Third screen of the creation of a plant
class CreatePlantStep3Screen extends React.Component {
    state = {
        plantName: '',
        plantType: '',
        secondsBetweenWaterings: 0,
        plantImage:'',
        externalInternal: '',
        exposition: '',
        roomName:'',
        address:'',
        latitude: '',
        longitude: '',

        //private variable
        loading:false,

    }

    componentDidMount() {
        this.setState({
            plantName: this.props.route.params.plantName,
            plantType: this.props.route.params.plantType,
            secondsBetweenWaterings: this.props.route.params.secondsBetweenWaterings,
            plantImage: this.props.route.params.plantImage,
            externalInternal: this.props.route.params.externalInternal,
            exposition: this.props.route.params.exposition,
            roomName: this.props.route.params.roomName
        });
    }

    //control that all the needed data is inserted and navigate to screen 4
    toStep4 = () => {
        if(this.state.address==='' || this.state.latitude==='' || this.state.longitude===''){
            alert("Insert all required data!");
            return;
        }
        else{
            this.props.navigation.navigate('CreateStep4',{
                plantName: this.state.plantName,
                plantType: this.state.plantType,
                secondsBetweenWaterings: this.state.secondsBetweenWaterings,
                plantImage: this.state.plantImage,
                externalInternal: this.state.externalInternal,
                exposition: this.state.exposition,
                roomName: this.state.roomName,
                address: this.state.address,
                latitude: this.state.latitude,
                longitude: this.state.longitude
            });
        }
        
    }
    //go back to screen 2
    toStep2 = () => {
        this.props.navigation.navigate('CreateStep2',
        {
            //we put the same elements as the navigation from step1 to step2
            plantName: this.state.plantName,
            plantType: this.state.plantType,
            secondsBetweenWaterings: this.state.secondsBetweenWaterings,
            plantImage: this.state.plantImage
        });
    }

    //handle the manual insertion of the address of the location of the plant
    handleAddress = async (text) => {
        //console.log(text)
        try{
            let permissionResult = Location.requestForegroundPermissionsAsync();
        
            if (permissionResult=== false) {
                alert("Permission to access map services are required!");
                return;
            }
            let result = await Location.geocodeAsync(text);
            //console.log(result);
            //console.log(result[0].latitude);
            this.setState({ address: text });
            this.setState({ latitude: result[0].latitude });
            this.setState({ longitude: result[0].longitude });
            //console.log(this.state);
        }catch(error){
            console.log(error);
        }
        
    }

    //handle the geolocalization of the plant
    handleGeoLocalization = async () => {
        try{
            //set loading icon to visible
            this.setState({loading: true});
            let permissionResult = await Location.requestForegroundPermissionsAsync();
        
            if (permissionResult=== false) {
                alert("Permission to access map services are required!");
                return;
            }
            let result = await Location.getLastKnownPositionAsync({});
            console.log(result);
            //console.log(result[0].latitude);
            let location = {latitude: result.coords.latitude, longitude: result.coords.longitude};
            let addressFound = await Location.reverseGeocodeAsync(location);
            console.log(addressFound);
            this.setState({ address: addressFound[0].city });
            this.setState({ latitude: result.coords.latitude });
            this.setState({ longitude: result.coords.longitude });
            console.log(this.state);
            //set loading icon to invisible
            this.setState({loading: false});
        }catch(error){
            alert("Can't use geolocalization!");
            console.log(error);
        }
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
                    style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', padding:15}}
                    placeholder = "Enter address"
                    placeholderTextColor = 'gray'
                    onChangeText = {this.handleAddress}
                />
                <SafeAreaView style={{ flex: 1, flexDirection:'column', alignItems: 'center', marginTop: 40}}>
                    <Text style={{fontSize: 15, color: '#000', fontFamily:'Comfortaa', marginBottom: 15}}>Or use geo-localization</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.handleGeoLocalization}>
                        <Image 
                            style={{width: 115, height: 153, resizeMode: 'contain'}}
                            source={image_geo_localization}
                            /> 
                    </TouchableOpacity>
                    <Text style={{fontSize: 15, color: '#000', fontFamily:'Comfortaa', marginBottom: 15, marginTop:5}}>Location selected: {this.state.address}</Text>
                    <Text style={{fontSize: 15, color: '#000', fontFamily:'Comfortaa', marginBottom: 15}}>Latitude: {this.state.latitude}</Text>
                    <Text style={{fontSize: 15, color: '#000', fontFamily:'Comfortaa', marginBottom: 15}}>Longitute: {this.state.longitude}</Text>
                    {this.state.loading && <ActivityIndicator
                                            //visibility of Overlay Loading Spinner
                                            visible={true}
                                            //Text with the Spinner
                                            textContent={'Loading...'}
                                            //Text style of the Spinner Text
                                            textStyle={{flex:1, fontFamily:'Comfortaa', padding:8}}
                                            size="large"
                                            color="#000000"
                                            />}
                </SafeAreaView>
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep3Screen;