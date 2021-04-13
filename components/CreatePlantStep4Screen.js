import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
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
        secondsBetweenWaterings: 0,
        plantImage:'',
        externalInternal: '',
        exposition: '',
        roomName:'',
        address:'',
        latitude: '',
        longitude: '',
        loading: false,
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
            secondsBetweenWaterings: this.props.route.params.secondsBetweenWaterings,
            plantImage: this.props.route.params.plantImage,
            externalInternal: this.props.route.params.externalInternal,
            exposition: this.props.route.params.exposition,
            roomName: this.props.route.params.roomName,
            address: this.props.route.params.address,
            latitude: this.props.route.params.latitude,
            longitude: this.props.route.params.longitude,
            loading: false
        });
    }

    async uploadToFirebase(uri, filename) {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase.storage().ref().child('uploads/' + this.state.user.uid + '/' + filename);
        const snapshot = await ref.put(blob);
        return snapshot.ref.getDownloadURL();
    }

    toEnd = (state) => {
        const filename = this.state.plantImage.substring(this.state.plantImage.lastIndexOf('/') + 1);
        const imageUri = Platform.OS === 'ios' ? this.state.plantImage.replace('file://', '') : this.state.plantImage;
        this.setState({loading: true});
        this.uploadToFirebase(imageUri, filename).then((imageUrl) => {
            const diff = ((state === 'good') ? 0 : -this.state.secondsBetweenWaterings)
            const lastWatering = firebase.firestore.Timestamp.now().toDate()
            lastWatering.setSeconds(lastWatering.getSeconds() + diff);
            firebase.firestore().collection('plants').add({
                name: this.state.plantName,
                plantType: this.state.plantType,
                imageUrl: imageUrl,
                position: this.state.externalInternal,
                exposition: this.state.exposition,
                room: this.state.roomName,
                location: this.state.address,
                uid: this.state.user.uid,
                logs: [{date: firebase.firestore.Timestamp.now(), action: state}],
                lastWatering: firebase.firestore.Timestamp.fromDate(lastWatering),
                secondsBetweenWaterings: this.state.secondsBetweenWaterings
            }).then((res) => {
                this.setState({loading: false});
                this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Home'}]
                    })
                );
            });
        });
    }
    toStep3 = () => {
        this.props.navigation.navigate('CreateStep3',
        {
            plantName: this.state.plantName,
            plantType: this.state.plantType,
            secondsBetweenWaterings: this.state.secondsBetweenWaterings,
            plantImage: this.state.plantImage,
            externalInternal: this.state.externalInternal,
            exposition: this.state.exposition,
            roomName: this.state.roomName
        });
    }
    handlePlantIsGood = () => {
        this.toEnd('good');
    }
    handlePlantIsBad = () => {
        this.toEnd('bad');
    }
    render() {
        return (
            <SafeAreaView style={{flex:1}}>
            {this.state.loading ? (
                <SafeAreaView style={{ flex: 1, flexDirection:'column', justifyContent: 'center'}}>
                    <ActivityIndicator
                            //visibility of Overlay Loading Spinner
                            visible={true}
                            //Text with the Spinner
                            textContent={'Loading...'}
                            //Text style of the Spinner Text
                            textStyle={{flex:1, fontFamily:'Comfortaa', padding:8}}
                            size="large"
                            color="#000000"
                            />
                </SafeAreaView>
                ) : (
                    <SafeAreaView style={{ flex: 1, flexDirection:'column'}}>
                        <HeaderCreatePlant
                            forwardPress={() => this.toEnd()} 
                            backPress={() => this.toStep3()}
                            isForwardVisible={false}
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
            
            </SafeAreaView>

            
        )
    }
}

export default CreatePlantStep4Screen;