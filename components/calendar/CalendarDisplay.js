import React from 'react'
import {StyleSheet, View, Text, Button} from 'react-native';

const CalendarDisplay = ({navigation}) => {
    return(
    <View style={styles.container}>
    <Text>DetailScreen</Text>
    <Button
      title="Map画面に遷移する"
      onPress={() => {
        navigation.navigate('Map');
      }}
    />
  </View>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});


export default CalendarDisplay