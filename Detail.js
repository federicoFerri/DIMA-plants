import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import BackButton from './buttons/BackButton'

const titolo = 'titolo';
const descrizione = 'descrizione';
const image_plant = require('./plants_images/banana.jpg');

const Detail = () => (
  <View style={container}>
    <BackButton/> 
    <Text style={text}>Banana</Text>
    <Image 
      style={stylesImage.stretch}
      source={image_plant}
      /> 
    <Info 
      title={titolo}
      descr={descrizione}
    />
  </View>
);

const Info = (props) => (
<View style={container}>
    <Text style={text}>{props.title}</Text>
    <Text style={{fontSize: 20, color: '#000'}}>{props.descr}</Text>
  </View>
);


const page = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 50,
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
