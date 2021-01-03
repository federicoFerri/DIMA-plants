import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import BackButton from './buttons/BackButton'

const titolo = 'titolo';
const descrizione = 'descrizione';
const image_plant = require('./plants_images/banana.jpg');

const Detail = () => (
  <SafeAreaView style={container}>
    <BackButton/> 
    <Text style={text}>Banana</Text>
    <Image 
      style={stylesImage.stretch}
      source={image_plant}
      /> 
    <SafeAreaView style={{flex: 1,flexDirection: 'column'}}>
      <Info 
        title={'plant type'}
        descr={'Fruit plant'}
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
);

const Info = (props) => (
<SafeAreaView style={container}>
    <Text style={{fontSize: 12, color: '#000', fontWeight: 'bold'}}>{props.title}</Text>
    <Text style={{fontSize: 18, color: '#000'}}>{props.descr}</Text>
  </SafeAreaView>
);


const page = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    //paddingTop: 50,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    color: '#000',
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
    resizeMode: 'stretch',
  },
});


const container = StyleSheet.compose(page.container, lists.listContainer);
const text = StyleSheet.compose(page.text, lists.listItem);


export default Detail;
