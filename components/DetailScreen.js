import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Alert, FlatList, ScrollView, Dimensions} from 'react-native';
import BackButton from '../buttons/BackButton'
import DeletePlantButton from '../buttons/DeletePlantButton';
import WeatherWidget from '../components/WeatherWidget'
import firebase from "firebase";
import needs_water_image from '../assets/button_images/bad_plant.png'
import plant_fine_image from '../assets/button_images/good_plant.png'
import watering_event from '../assets/button_images/watering.png'
import line_timeline from '../assets/timeline_images/line_timeline.png'
import point_timeline from '../assets/timeline_images/point_timeline.png'
import {CommonActions} from "@react-navigation/native";
import * as Location from 'expo-location';

class DetailScreen extends React.Component {
    state = { 
      user: {}, 
      plant_data: {},
      plant_id: null,
      latitude: '',
      longitude: '',
      icon: '',
      condition_weather: '',
      temperature: '',
      logs: {},
      isRoomPresent: true,
    };
    async componentDidMount() {
        this.setState({
            user: this.props.route.params.user,
            plant_data: this.props.route.params.plant_data,
            plant_id: this.props.route.params.plant_id,
            logs: this.props.route.params.plant_data.logs,
            isRoomPresent: (this.props.route.params.plant_data.room != ''),
        });

        //calulate latidute and longitude
        Location.requestPermissionsAsync();
        //console.log(this.props.route.params.plant_data.location) //don't use state but props, because state could be still undefined
        let locationData = await Location.geocodeAsync(this.props.route.params.plant_data.location);
        //console.log(locationData)

        


        let plantLatidute = locationData[0].latitude;
        let plantLongitude = locationData[0].longitude

        //weather API request
        fetch('http://api.weatherapi.com/v1/current.json?key=72fea28e67a349748a9160705210903&q='
        +plantLatidute +','+ plantLongitude + '&aqi=no')
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

    deletePlant = () => {
        firebase.firestore().collection('plants').doc(this.state.plant_id).delete().then(() => {
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home'}]
                })
            );
        })
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
          { text: "Delete plant", onPress: () => this.deletePlant() }
        ],
        { cancelable: true }
      );
    }

    showTwoDigits(num){
      return (num < 10) ? '0' + num.toString() : num.toString();
    }

    createStringEvent(dateEvent){
      return dateEvent.getDate() + '/' + (dateEvent.getMonth() + 1) + '/' + dateEvent.getFullYear() + '\n    ' +
      this.showTwoDigits(dateEvent.getHours()) + ':' + this.showTwoDigits(dateEvent.getMinutes());
    }

  
    render() {
      //TODO don't use the params, but the state
      //I use the array in a reverse way with slice(0).reverse()
      let added_buttons_goes_here = this.props.route.params.plant_data.logs.slice(0).reverse().map( (log) => {
        let dateEvent = log.date.toDate();
        //console.log(dateEvent);
        //console.log(dateEvent.setSeconds(log.date.seconds));
        switch(log.action){
          case "watering":
            return (
              <Event source={watering_event} date={this.createStringEvent(dateEvent)}/>
            )
          case "good":
            return (
              <Event source={plant_fine_image} date={this.createStringEvent(dateEvent)}/>
            )
          case "bad":
            return (
              <Event source={needs_water_image} date={this.createStringEvent(dateEvent)}/>
            )
        }
      });


      

      return (
          <ScrollView style={container} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
              <BackButton onPress={() => this.props.navigation.goBack()}/>
              <WeatherWidget
                  icon={this.state.icon}
                  condition={this.state.condition_weather}
                  temperature={this.state.temperature}
              />
            </SafeAreaView>
            <SafeAreaView style={{flex: 1, flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', marginTop: 10}}>
              <Text style={{fontSize: 36,
                color: '#000',
                fontFamily:'Comfortaa'}}>{this.state.plant_data.name}
              </Text>
              <DeletePlantButton onPress={() => this.createMessageDeletePlant()}/>
            </SafeAreaView>
            <PlantImage
                source={{uri: this.state.plant_data.imageUrl}}
            />
            <SafeAreaView style={{flex: 1,flexDirection: 'column', marginVertical:10}}>
              <Info
                  title={'plant type'}
                  descr={this.state.plant_data.plantType}
              />
              <Info
                  title={'position'}
                  descr={this.state.plant_data.position}
              />
              <Info
                  title={'exposition'}
                  descr={this.state.plant_data.exposition}
              />
              {this.state.isRoomPresent && //show only if a room was added by the user
              <Info
                  title={'room'}
                  descr={this.state.plant_data.room}
              />
              }
              <Info
                  title={'location'}
                  descr={this.state.plant_data.location}
              />
            </SafeAreaView >
            <ScrollView ref='_scrollViewEvents' horizontal={true} endFillColor='#fff' showsHorizontalScrollIndicator={false} style={{flex:1, paddingHorizontal:10, paddingBottom:50, marginTop: 20}}>
              {added_buttons_goes_here}
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
  <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
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
          top: 7,
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
        top: 8, //needs to be 1 pixel more than the line at the left
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
  <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', marginHorizontal: 70,marginVertical: 10}}>
    <Image 
      style={{
        //stylesImage.stretch
        //width: 300,
        width: Dimensions.get('window').width*0.85,
        height: 140,
        //flexDirection: 'row',
        //resizeMode: 'stretch',
        //marginHorizontal: 10,
        //marginVertical: 10,
      }}
      source={props.source}
      />
  </SafeAreaView>
)


const Info = (props) => (
<SafeAreaView style={{
  flex: 1,
    
  //padding: 24,
  //paddingTop: 10,
  paddingHorizontal: 20,
  backgroundColor: '#fff',
  marginHorizontal: 5,
  marginVertical:5,}}
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
    width: 300,
    height: 140,
    flexDirection: 'row',
    //resizeMode: 'contain',
    //marginHorizontal: 10,
    //marginVertical: 10,
  },
});


const container = StyleSheet.compose(page.container, lists.listContainer);
const text = StyleSheet.compose(page.text, lists.listItem);


export default DetailScreen;
