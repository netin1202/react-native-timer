import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const Auth = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
 
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('token').then((value) =>{
        if(value){
          AsyncStorage.getItem('disclaimer').then((disclaimer) =>{
            if(disclaimer){
              navigation.replace('Fuelstation')
            }else{
              navigation.replace('Disclaimer')
            }
          })
        }else{
          navigation.replace('LoginScreen')
        }
      
      }
       ,
      );
    }, 5000);
  }, []);
 
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
 
export default Auth;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c67c55',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});