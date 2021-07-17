import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StatusBar, Text, View, Dimensions, StyleSheet } from 'react-native'



const Splash = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(async () => {
    value = await AsyncStorage.getItem('isLogin')
    console.log(JSON.parse(value))
    setIsLogin(JSON.parse(value))
    setTimeout(() => {
      setAnimating(false);
      if (JSON.parse(value)) {
        console.log(JSON.parse(value))
        console.log('Home')
        navigation.replace('Home')
      }
      else {
        console.log(JSON.parse(value))
        console.log('Login')
        navigation.replace('Login')
      }


    }, 10000)
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#59c098' }}>
      <Image source={require('./src/footer.jpg')} style={{ width: 150, height: 150 }} />
    </View>



  )

}


export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C53938',
    height: 100,
    width: 100,
    overflow: 'hidden'
  },
});