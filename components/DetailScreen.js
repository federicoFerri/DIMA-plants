import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Alert, FlatList, ScrollView} from 'react-native';
import BackButton from '../buttons/BackButton'
import DeletePlantButton from '../buttons/DeletePlantButton';
import WeatherWidget from '../components/WeatherWidget'

import needs_water_image from '../assets/button_images/bad_plant.png'
import plant_fine_image from '../assets/button_images/good_plant.png'
import watering_event from '../assets/button_images/watering.png'
import line_timeline from '../assets/timeline_images/line_timeline.png'
import point_timeline from '../assets/timeline_images/point_timeline.png'

class DetailScreen extends React.Component {
    state = { 
      user: {}, 
      plant: {},
      latitude: 41.390205,
      longitude: 2.154007,
      icon: '',
      condition_weather: '',
      temperature: ''
    };
    componentDidMount() {
        this.setState({
            user: this.props.route.params.user,
            plant: this.props.route.params.plant
        });

        //weather API request
        fetch('http://api.weatherapi.com/v1/current.json?key=72fea28e67a349748a9160705210903&q='
        +this.state.latitude +','+ this.state.longitude + '&aqi=no')
        .then(response => response.json())
        .then(responseJson => {
          this.setState(
            {
              icon: responseJson.current.condition.icon,
              condition_weather: responseJson.current.condition.text,
              temperature: responseJson.current.temp_c
            },
            function() {}
          );
        })
        .catch(error => {
          console.error(error);
        });
    }

    //TODO add fuction that cancel plant in the database
    deletePlant = () => {
      //TODO
    }

    createMessageDeletePlant = () => {
      Alert.alert(
        "Attention",
        "Do you really want to delete this plant?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
          //TODO substitute fuction for deletion of the plant
          { text: "Delete plant", onPress: () => this.deletePlant() }
        ],
        { cancelable: true }
      );
    }
  
    render() {
      return (
          <ScrollView style={container}>
            <SafeAreaView style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <BackButton onPress={() => this.props.navigation.goBack()}/>
              <WeatherWidget
                  icon={this.state.icon}
                  condition={this.state.condition_weather}
                  temperature={this.state.temperature}
              />
            </SafeAreaView>
            <SafeAreaView style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <Text style={{fontSize: 36,
                color: '#000',
                fontFamily:'Comfortaa'}}>{this.state.plant.name}
              </Text>
              <DeletePlantButton onPress={() => this.createMessageDeletePlant()}/>
            </SafeAreaView>
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
            <ScrollView horizontal={true} style={{flex:1, paddingHorizontal:50, borderBottomWidth: 20}}>
              <Event source={needs_water_image} date={'10th Dec'}/>
              <Event source={plant_fine_image} date={'11th Dec'}/>
              <Event source={watering_event} date={'12th Dec'}/>
              <Event source={plant_fine_image} date={'13th Dec'}/>
              <Event source={watering_event} date={'14th Dec'}/>
              <Event source={plant_fine_image} date={'15th Dec'}/>
              <Event source={watering_event} date={'16th Dec'}/>
              <Event source={needs_water_image} date={'17th Dec'}/>
            </ScrollView>
          </ScrollView>

      )
  }
}

{/*props required
  @source: image of the event to show
  @date: string of the time of the event
*/}
const Event = (props) => (
  <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal:0}}>
    <Image 
      style={{
        width: 50,
        height: 50,
        resizeMode: 'contain'
      }}
      source={props.source}
    />
    <SafeAreaView style={{ flexDirection:'row', justifyContent:'center'}}>
      <Image 
        style={{
          
          width: 50,
          height: 5,
          resizeMode: 'stretch'
        }}
        source={line_timeline}
      />
      <Image 
        style={{
          width: 20,
          height: 20,
          resizeMode: 'contain'
        }}
        source={point_timeline}
      />
      <Image 
        style={{
          width: 50,
          height: 5,
          resizeMode: 'stretch'
        }}
        source={line_timeline}
      />
    </SafeAreaView>
    <Text style={{fontSize: 15, color: '#000',fontFamily: 'Comfortaa'}}>{props.date}</Text>

  </SafeAreaView>
)

const PlantImage = (props) => (
  <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', marginHorizontal: 30,marginVertical: 10}}>
    <Image 
      style={stylesImage.stretch}
      source={props.source}
      />
  </SafeAreaView>
)


const Info = (props) => (
<SafeAreaView style={{
  flex: 1,
    
  padding: 24,
  paddingTop: 10,
  paddingHorizontal: 20,
  backgroundColor: '#fff',
  marginHorizontal: 5,}}
>
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
