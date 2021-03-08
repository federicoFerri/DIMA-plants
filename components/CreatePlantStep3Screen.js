import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';

const image_geo_localization = require('../assets/button_images/geo_localization.png');

class CreatePlantStep3Screen extends React.Component {
    state = {
        plantName: '',
        plantType: '',
        plantImage:'',
        externalInternal: '',
        exposition: '',
        roomName:'',
        address:'',
    }

    componentDidMount() {
        this.setState({
            plantName: this.props.route.params.plantName,
            plantType: this.props.route.params.plantType,
            plantImage: this.props.route.params.plantImage,
            externalInternal: this.props.route.params.externalInternal,
            exposition: this.props.route.params.exposition,
            roomName: this.props.route.params.roomName
        });
    }

    toStep4 = () => {
        this.props.navigation.navigate('CreateStep4',{
            plantName: this.state.plantName,
            plantType: this.state.plantType,
            plantImage: this.state.plantImage,
            externalInternal: this.state.externalInternal,
            exposition: this.state.exposition,
            roomName: this.state.roomName,
            address: this.state.address
        });
    }
    toStep2 = () => {
        this.props.navigation.navigate('CreateStep2',
        {
            //we put the same elements as the navigation from step1 to step2
            plantName: this.state.plantName,
            plantType: this.state.plantType,
            plantImage: this.state.plantImage
        });
    }

    handleAddress = (text) => {
        this.setState({ address: text })
    }

    handleGeoLocalization = () => {
        //TODO
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
                <SafeAreaView style={{ flex: 1, flexDirection:'column', alignItems: 'center', marginTop: 60}}>
                    <Text style={{fontSize: 15, color: '#000', fontFamily:'Comfortaa', marginBottom: 15}}>Or use geo-localization</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={this.handleGeoLocalization()}>
                        <Image 
                            style={{width: 115, height: 153, resizeMode: 'contain',}}
                            source={image_geo_localization}
                            /> 
                    </TouchableOpacity>

                </SafeAreaView>
            </SafeAreaView>
        )
    }
}

export default CreatePlantStep3Screen;