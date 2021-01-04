import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView} from 'react-native';
import BackButton from './buttons/BackButton'
import { useFonts } from 'expo-font';

const titolo = 'titolo';
const descrizione = 'descrizione';
const image_plant = require('./plants_images/banana.jpg');

const DetailScreen = () => {
  //hook to get font
  const [loaded] = useFonts({
    Comfortaa: require('./assets/fonts/Comfortaa-Regular.ttf'),
  });

  if (!loaded) {
    return <SafeAreaView><Text>no</Text></SafeAreaView>;
  }

  return (
    <Detail/>
  );
}

const Detail = () => (
  <SafeAreaView style={container}>
    <BackButton/> 
    <Text style={{fontSize: 36,
    color: '#000',
    fontFamily:'Comfortaa'}}>Banana</Text>
    <PlantImage 
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

const PlantImage = (props) => (
  <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', marginHorizontal: 30,marginVertical: 10}}>
    <Image 
      style={stylesImage.stretch}
      source={props.source}
      /> 
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
