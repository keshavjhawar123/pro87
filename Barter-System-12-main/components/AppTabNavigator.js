import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import ExchangeScreen from './screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen'
import {createBottomTabNavigator} from 'react-navigation-tabs'

export const AppTabNavigator = createBottomTabNavigator({
    DonateItems : {
        screens : DonateScreen,
        navigationOptions : {tabBarIcon : <Image source = {require('../assets/donate')} style = {{width : 20, height : 20}}/>,
        tabBarLabel : "Donate Items"}
    },
    RequestItems : {
        screens : RequestScreen,
        navigationOptions : {tabBarIcon : <Image source = {require('../assets/request')} style = {{width : 20, height : 20}}/>,
        tabBarLabel : "Request Items"}
    },
})