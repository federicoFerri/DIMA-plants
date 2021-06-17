import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Platform, ScrollView} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';
import RNPickerSelect from 'react-native-picker-select';
import DownArrow from '../buttons/DownArrow';
import PickerPlant from './PickerPlants';

class CreatePlantStep2Screen extends React.Component {
    state = {
        plantName: '',
        plantType: '',
        secondsBetweenWaterings: 0,
        plantImage:'',
        externalInternal: '',
        exposition: '',
        roomName:'',
    }

    componentDidMount() {
        this.setState({
            plantName: this.props.route.params.plantName,
            plantType: this.props.route.params.plantType,
            secondsBetweenWaterings: this.props.route.params.secondsBetweenWaterings,
            plantImage: this.props.route.params.plantImage
        });
        //console.log(this.state);
    }

    handleExternalInternal = (text) => {
        this.setState({ externalInternal: text })
    }

    handleExposition = (text) => {
        this.setState({ exposition: text })
    }

    handleRoomName = (text) => {
        this.setState({ roomName: text })
    }

    toStep3 = () => {
        if(this.state.externalInternal==='' || this.state.exposition===''){
            alert("Insert all required data!");
            return;
        }
        else{
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
        
    }
    toStep1 = () => {
        this.props.navigation.navigate('CreateStep1');
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{ flex: 1, flexDirection:'column'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toStep3()} 
                    backPress={() => this.toStep1()}
                />
                <Text style={{fontSize: 36, color: '#000', fontFamily:'Comfortaa', marginLeft: 20, marginTop: 15}}>Position</Text>

                <PickerPlant
                    label='External/Internal'
                    items={[
                        { label: 'External', value: 'external' },
                        { label: 'Internal', value: 'internal' },
                    ]}
                    function={this.handleExternalInternal} 
                />

                <PickerPlant
                    label='Exposition'
                    items={[
                        { label: 'Full Sun', value: 'full_sun' },
                        { label: 'Part Shade', value: 'part_shade' },
                        { label: 'Full Shade', value: 'full_shade' },
                    ]}
                    function={this.handleExposition} 
                />

                <TextInput
                    style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', padding:15}}
                    placeholder = "Name of the room (optional)"
                    placeholderTextColor = 'gray'
                    onChangeText = {this.handleRoomName}
                />

            </SafeAreaView>
            </ScrollView>
        )
    }
}

export default CreatePlantStep2Screen;