import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';

//widget that shows the weather and the temperature of a location
//Required props
//@icon : url of the image of the weather condition
//@condition : string that explains the weather condition
//@temperature : number of the temperature in celsius
class WeatherWidget extends React.Component {
    render() {
        return (
            <SafeAreaView style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    style={{resizeMode: 'stretch', width: 45, height: 44}}
                    source={{uri: 'https:'+ this.props.icon}}
                />
                <View>
                <Text style={{fontSize: 11, color: '#000', fontFamily:'Comfortaa'}}>{this.props.condition}</Text>
                <Text style={{fontSize: 11, color: '#000', fontFamily:'Comfortaa'}}>{this.props.temperature}°C</Text>
                <Text style={{fontSize: 11, color: '#000', fontFamily:'Comfortaa'}}>from weather api</Text>
                </View> 
                
            </SafeAreaView>
        )
    }
}

export default WeatherWidget;