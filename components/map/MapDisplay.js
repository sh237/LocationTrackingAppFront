import React , { Component,useState, useEffect } from 'react';
import { StyleSheet, Text, View ,Image, Button} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker';
import Exif from 'react-native-exif';
import * as MediaLibrary from 'expo-media-library';
const MapDisplay = ({navigation}) => {
    let [image, setImage] = useState('');
    let [markers, setMarkers] = useState([]);
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        exif: true,
      });
  
      console.log(result.exif);
      if (!result.cancelled) {
        setImage(result.uri);
        console.log(result.exif.GPSLatitude);
        console.log(result.exif.GPSLongitude);
        const Latitude = result.exif.GPSLatitude;
        const Longitude = result.exif.GPSLongitude;
        setMarkers(marker=>({...marker,latlng:{"latitude":Latitude,"longitude":Longitude}}))}; 
        console.log(marker.latlng);   
    };
    const ReadExif = () => {
      Exif.getExif('file:///Users/nagashimashunya/React/LocationTrackingAppFront/LocationTrackingAppFront/assets/IMG_2066.jpg')
      .then(msg => console.warn('OK: ' + JSON.stringify(msg)))
      .catch(msg => console.warn('ERROR: ' + msg))
      // setMarker(marker=>({...marker,latlng:{"latitude":Latitude,"longitude":Longitude}}))
    }; 
    const ReadPhoto = async () => {
      const media = await MediaLibrary.getAssetsAsync({
        first: 10,
        mediaType: ['photo'],
        // createdAfter: moment(new Date()).add(-14, 'days').toDate(),
      });
      // console.log(media)
      const photo = await MediaLibrary.getAssetInfoAsync(media.assets[4]);
      let date = photo.exif["{Exif}"].DateTimeOriginal.split(' ')
      let date_str = date[0].split(':')
      let time_str = date[1].split(':')
      setMarkers(markers=>({...markers,latlng:{"latitude":photo.location.latitude,"longitude":photo.location.longitude}})); 
      setMarkers(markers=>({...markers,"datetime":new Date(Number(date_str[0]),Number(date_str[1])-1,Number(date_str[2],Number(time_str[0],Number(time_str[1]),Number(time_str[2])))).toLocaleString()})); 
      setMarkers(markers=>({...markers,image:photo.uri}));
      console.log(new Date(Number(date_str[0]),Number(date_str[1])-1,Number(date_str[2],Number(time_str[0],Number(time_str[1]),Number(time_str[2])))).toLocaleString())
    }
  
    const ReadPhotos = async () => {
      const media = await MediaLibrary.getAssetsAsync({
        first: 10,
        mediaType: ['photo'],
        // createdAfter: moment(new Date()).add(-14, 'days').toDate(),
      });
      // console.log(media)
     media.assets.map(async(output,index) =>{
        let photo = await MediaLibrary.getAssetInfoAsync(output);
        // console.log(photo);console.log('i='+index);console.log(photo,photo.location);
        if(photo.hasOwnProperty('exif') && photo.exif != '' && photo.exif.hasOwnProperty("{Exif}")){
          if(photo && photo.uri != ""  && photo.uri != null && photo.hasOwnProperty('location') && photo.location != null && photo.location.hasOwnProperty('latitude') ){
          let date = photo.exif["{Exif}"].DateTimeOriginal.split(' ')
          let date_str = date[0].split(':')
          let time_str = date[1].split(':')
        
        // console.log(photo.location.hasOwnProperty('latitude'))
          let marker = {
            title: '公園',
            discription: '遊び場',
            latlng: {
              latitude: photo.location.latitude,
              longitude: photo.location.longitude,
            },
            datetime:new Date(Number(date_str[0]),Number(date_str[1])-1,Number(date_str[2],Number(time_str[0],Number(time_str[1]),Number(time_str[2])))).toLocaleString(),
            image:photo.uri
          }
          setMarkers((prevmarker)=>[...prevmarker,marker]); 
          return marker;
        }}
    })
      // const photo = await MediaLibrary.getAssetInfoAsync(media.assets[4]);
      // console.log(photo.exif["{Exif}"].DateTimeOriginal)
      // let date = photo.exif["{Exif}"].DateTimeOriginal.split(' ')
      // let date_str = date[0].split(':')
      // let time_str = date[1].split(':')
      // setMarker(marker=>({...marker,latlng:{"latitude":photo.location.latitude,"longitude":photo.location.longitude}})); 
      // setMarker(marker=>({...marker,"datetime":new Date(Number(date_str[0]),Number(date_str[1])-1,Number(date_str[2],Number(time_str[0],Number(time_str[1]),Number(time_str[2])))).toLocaleString()})); 
      // setImage(photo.uri)
      // console.log(new Date(Number(date_str[0]),Number(date_str[1])-1,Number(date_str[2],Number(time_str[0],Number(time_str[1]),Number(time_str[2])))).toLocaleString())
    }
    useEffect(() => {
     ReadPhotos();
    },[]);
    
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
                  {markers.map((marker,index) => {
                    return (<Marker coordinate={marker.latlng} key={index} >{console.log(marker)}
                      <Text>
                      {marker.image && <Image source={{ uri: marker.image }} style={{ width: 100, height: 100 }} />}
                      </Text>
                    </Marker>)
                  })}
                  {/* <Marker coordinate={markers.latlng} >
                  <Text><Image
                    style={{
                      width: 34,
                      height: 34
                    }}
                    source={require('./assets/favicon.png')}
                  />
                  </Text>
                  </Marker> */}
                  <Marker coordinate={{latitude: 35.249245,longitude: 139.686818}}>
                  <Button title="Reload Screen" onPress={ReadPhotos} />
                    {markers.image && <Image source={{ uri: markers.image }} style={{ width: 100, height: 100 }} />}
                  </Marker>
                  <Marker coordinate={{latitude: 35.2786737,longitude: 139.670043}}> 
                  <Button title="Move to Calendar" onPress={() => {navigation.navigate('Calendar');}}/>
                  </Marker>

              </MapView>
              
          );
}

export default MapDisplay