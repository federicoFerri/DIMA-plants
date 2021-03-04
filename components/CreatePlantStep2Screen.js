import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';
import HeaderCreatePlant from './HeaderCreatePlant';
import RNPickerSelect from 'react-native-picker-select';
import DownArrow from '../buttons/DownArrow';

class CreatePlantStep2Screen extends React.Component {
    state = {
        plantName: '',
        plantType: '',
        plantImage:'',
        externalInternal: '',
        exposition: '',
        roomName:'',
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
        this.props.navigation.navigate('CreateStep3');
    }
    toStep1 = () => {
        this.props.navigation.navigate('CreateStep1');
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, flexDirection:'column'}}>
                <HeaderCreatePlant
                    forwardPress={() => this.toStep3()} 
                    backPress={() => this.toStep1()}
                />
                <Text style={{fontSize: 36, color: '#000', fontFamily:'Comfortaa', marginLeft: 20, marginTop: 15}}>Position</Text>

                <SafeAreaView style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', fontFamily:'Comfortaa', padding:15}}>
                    <RNPickerSelect
                        style={{}}
                        textInputProps={{fontSize: 15, color: '#000', marginLeft: 15, fontFamily: 'Comfortaa'}}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                            label: 'External/Internal',
                            value: null,
                            color: 'gray',
                          }}
                        onValueChange={(value) => this.handleExternalInternal(value)}
                        
                        Icon={() => {
                            return <DownArrow/>;
                          }}
                        items={[
                            { label: 'External', value: 'external' },
                            { label: 'Internal', value: 'internal' },
                        ]}
                    />
                </SafeAreaView>

                <SafeAreaView style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', fontFamily:'Comfortaa', padding:15}}>
                    <RNPickerSelect
                        style={{}}
                        textInputProps={{fontSize: 15, color: '#000', marginLeft: 15, fontFamily: 'Comfortaa'}}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{
                            label: 'Exposition',
                            value: null,
                            color: 'gray',
                          }}
                        onValueChange={(value) => this.handleExposition(value)}
                        
                        Icon={() => {
                            return <DownArrow/>;
                          }}
                        items={[
                            { label: 'Full Sun', value: 'full_sun' },
                            { label: 'Part Shade', value: 'part_shade' },
                            { label: 'Full Shade', value: 'full_shade' },
                        ]}
                    />
                </SafeAreaView>

                <TextInput
                    style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', fontFamily:'Comfortaa', padding:15}}
                    placeholder = "Name of the room (optional)"
                    placeholderTextColor = 'black'
                    onChangeText = {this.handleRoomName}
                />

            </SafeAreaView>
        )
    }
}

export default CreatePlantStep2Screen;