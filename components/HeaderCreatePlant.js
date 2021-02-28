import React from 'react';
import {SafeAreaView} from 'react-native';
import BackButton from '../buttons/BackButton'
import ForwardButton from '../buttons/ForwardButton';

{/*props required
  @backPress: if back arrow is pressed, it launches an event like TouchableOpacity
  @forwardPress: if forward arrow is pressed, it launches an event like TouchableOpacity
*/}
class HeaderCreatePlant extends React.Component {
    forwardPressed = () => () => {
        this.props.forwardPress()
    }
    backPressed = () => () => {
        this.props.backPress()
    }
    render() {
        return (
            <SafeAreaView style={{flexDirection: 'row', justifyContent:'space-between'}}>
                <BackButton
                    onPress={this.backPressed()}
                />
                <ForwardButton
                    onPress={this.forwardPressed()}
                />
            </SafeAreaView>
        )
    }
}
export default HeaderCreatePlant;