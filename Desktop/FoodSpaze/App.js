import React, {Component} from 'react';
import Home from "./src/containers/Home";
import { createStackNavigator } from 'react-navigation';

export default createStackNavigator({
    home: {
        screen: Home
    },
});