import React , { Component,useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, Button, CameraRoll} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import Exif from 'react-native-exif';
import * as MediaLibrary from 'expo-media-library';
import MapDisplay from './components/map/MapDisplay';
import RootStackScreen from './components/navigation';
// import CameraRoll from 'react-native-cameraroll';

function App (){
  return (<RootStackScreen/>);
}

export default App;