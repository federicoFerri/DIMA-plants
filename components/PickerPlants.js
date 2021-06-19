import React from 'react';
import { SafeAreaView, Platform} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DownArrow from '../buttons/DownArrow';

//interface that lets you select an object from a list
//Required props
//@label : label to show when no item is selected
//@items : item list of elements that can be selected, with label and value
//@function : function to call after selection
class PickerPlant extends React.Component {

    render() {
        return (
            <SafeAreaView style={{ height: 52, marginLeft: 20, marginRight:20, marginTop:20,  borderColor: 'black', borderWidth: 2, fontSize: 15, color: '#000', fontFamily:'Comfortaa', padding:15}}>
                <RNPickerSelect
                    style={{}}
                    textInputProps={{fontSize: 15, color: '#000', padding: Platform.OS === 'ios' ? 13 : 0}}
                    useNativeAndroidPickerStyle={false}
                    placeholder={{
                        label: this.props.label,
                        value: null,
                        color: 'gray',
                        }}
                    onValueChange={(value) => this.props.function(value)}
                    
                    Icon={() => {
                        return <DownArrow/>;
                        }}
                    items={this.props.items}
                />
            </SafeAreaView>
            )   
        }
}

export default PickerPlant;