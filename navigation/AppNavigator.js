import React, { Component } from "react";
import { Image } from 'react-native';
import ProfileScreen from "../components/ProfileScreen";
import HomeScreen from "../components/HomeScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import DetailScreen from "../components/DetailScreen";
import CreatePlantStep1Screen from "../components/CreatePlantStep1Screen";
import CreatePlantStep2Screen from "../components/CreatePlantStep2Screen";
import CreatePlantStep3Screen from "../components/CreatePlantStep3Screen";
import CreatePlantStep4Screen from "../components/CreatePlantStep4Screen";

const CreationStack = createStackNavigator();

function CreationStackScreen() {
    return (
        <CreationStack.Navigator>
            <CreationStack.Screen name="Create" component={CreatePlantStep1Screen} />
            <CreationStack.Screen name="CreateStep2" component={CreatePlantStep2Screen} />
            <CreationStack.Screen name="CreateStep3" component={CreatePlantStep3Screen} />
            <CreationStack.Screen name="CreateStep4" component={CreatePlantStep4Screen} />
        </CreationStack.Navigator>
    );
}

const DetailStack = createStackNavigator();

function DetailStackScreen() {
    return (
        <DetailStack.Navigator >
            <DetailStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <DetailStack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
        </DetailStack.Navigator>
    );
}

const AppNavigator = createBottomTabNavigator();

function AppNavigatorScreen() {
    return (
        <AppNavigator.Navigator tabBarOptions={{ showLabel: false }}>
            <AppNavigator.Screen
                name="Home"
                component={DetailStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/home.png')}
                            style={{width: 23, height: 20}}
                        />
                    ),
                }} />
            <AppNavigator.Screen
                name="Create"
                component={CreationStackScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/new.png')}
                            style={{width: 70, height: 40}}
                        />
                    ),
                }} />
            <AppNavigator.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={require('../assets/person.png')}
                            style={{width: 16, height: 22}}
                        />
                    ),
                }} />
        </AppNavigator.Navigator>
    );
}

export default AppNavigatorScreen;
