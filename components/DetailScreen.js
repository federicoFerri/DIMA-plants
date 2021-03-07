import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import BackButton from '../buttons/BackButton'

class DetailScreen extends React.Component {
    state = { user: {}, plant: {}};
    componentDidMount() {
        this.setState({
            user: this.props.route.params.user,
            plant: this.props.route.params.plant
        });
    }
  
    render() {
      return (
          <SafeAreaView style={container}>
            <SafeAreaView style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <BackButton onPress={() => this.props.navigation.goBack()}/>
              <Weather
                  source={require('../assets/weather_images/sunny.png')}
              />
            </SafeAreaView>
            <Text style={{fontSize: 36,
              color: '#000',
              fontFamily:'Comfortaa'}}>{this.state.plant.name}</Text>
            <PlantImage
                source={{uri: this.state.plant.imageUrl}}
            />
            <SafeAreaView style={{flex: 1,flexDirection: 'column'}}>
              <Info
                  title={'plant type'}
                  descr={this.state.plant.plantType}
              />
              <Info
                  title={'position'}
                  descr={'Internal'}
              />
              <Info
                  title={'exposition'}
                  descr={'Sunny'}
              />
              <Info
                  title={'room'}
                  descr={'Living room'}
              />
              <Info
                  title={'location'}
                  descr={"Av. d'Icària, 18908005 Barcelona, Spagna"}
              />
            </SafeAreaView>
          </SafeAreaView>
      )
  }
}

const PlantImage = (props) => (
  <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', marginHorizontal: 30,marginVertical: 10}}>
    <Image 
      style={stylesImage.stretch}
      source={props.source}
      />
  </SafeAreaView>
)

const Weather = (props) => (
  <SafeAreaView style={{flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
    <Image 
      style={{width: 35, height: 34}}
      source={props.source}
      />
    <View>
      <Text style={{fontSize: 11, color: '#000', fontFamily:'Comfortaa'}}>SUNNY</Text>
      <Text style={{fontSize: 11, color: '#000', fontFamily:'Comfortaa'}}>30 °C</Text>
      <Text style={{fontSize: 11, color: '#000', fontFamily:'Comfortaa'}}>from weather api</Text>
    </View> 
       
  </SafeAreaView>
)


const Info = (props) => (
<SafeAreaView style={container}>
    <Text style={{fontSize: 12, color: '#000', fontWeight: 'bold', fontFamily:'Comfortaa'}}>{props.title}</Text>
    <Text style={{fontSize: 18, color: '#000', fontFamily:'Comfortaa'}}>{props.descr}</Text>
  </SafeAreaView>
);


const page = StyleSheet.create({
  container: {
    flex: 1,
    
    padding: 24,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginVertical: 15,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 30,
    color: '#000',
    fontFamily:'Comfortaa',
  },
});

const lists = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listItem: {
    fontWeight: 'bold',
  },
  paddingTop: 50,
});

const stylesImage = StyleSheet.create({
  flex: 1,
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 357,
    height: 151,
    flexDirection: 'row',
    resizeMode: 'contain',
    //marginHorizontal: 10,
    //marginVertical: 10,
  },
});


const container = StyleSheet.compose(page.container, lists.listContainer);
const text = StyleSheet.compose(page.text, lists.listItem);


export default DetailScreen;
