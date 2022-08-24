import React , { Component,useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';

function App (){
 
  let [image, setImage] = useState('');
  let [marker, setMarker] = useState({
    title: '公園',
    discription: '遊び場',
    latlng: {
      latitude: 35.249245,
      longitude: 139.686818
    },
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      exif: true,
      heif: true,
    });
  

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(result.exif);
      console.log(result.exif.GPSLatitude);
      console.log(result.exif.GPSLongitude);
      const Latitude = result.exif.GPSLatitude;
      const Longitude = result.exif.GPSLongitude;
      setMarker(marker=>({...marker,latlng:{"latitude":Latitude,"longitude":Longitude}}))}; 
      console.log(marker.latlng);   
  };



  
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 35.249245,
                    longitude: 139.686818,
                    latitudeDelta: 0.02, //小さくなるほどズーム
                    longitudeDelta: 0.02,
                }}
            >
                {/* <MapView.Marker
                    coordinate={{
                        latitude: 35.249245,
                        longitude: 139.686818,
                    }}
                    title={"東京駅"}
                    description={"JRの駅です。"} */}
                    {/* // onPress={()=>alert("click")}
                // /> */}
                <Marker coordinate={marker.latlng} >
                <Text><Image
                  style={{
                    width: 34,
                    height: 34
                  }}
                  source={require('./assets/favicon.png')}
                />
                </Text>
                </Marker>
                <Marker coordinate={marker.latlng}>
                  <Button title="Pick an image from camera rolls" onPress={pickImage} />
                  {image && <Image source={{ uri: image }} style={{ width: 30, height: 30 }} />}
                </Marker>
                
                
            </MapView>
            
            
        );
}

export default App;