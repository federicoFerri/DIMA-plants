import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import imagePlant from './plants_images/banana.jpg'

const Detail = () => (
  <View style={container}>
    <Text style={text}>Banana</Text>
    <Image 
      style={stylesImage.stretch}
      source={require('./plants_images/banana.jpg')}
      /> 
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
    resizeMode: 'stretch',
  },
});


const container = StyleSheet.compose(page.container, lists.listContainer);
const text = StyleSheet.compose(page.text, lists.listItem);

export default Detail;
