import React, { useState } from 'react'
import { Text, Dimensions, StyleSheet, View, ImageBackground, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native'
import Service from "service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Login = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');


  const loginFunction = () => {
    setLoading(true)
    if (user === "" || password === "") {
      setLoading(true)
      alert("user name or password is empty")
    }
    else {
      // let body=new FormData();

      // body.append("email","eve.holt@reqres.in" )
      // body.append("password","cityslicka")
      let body = {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
      }

      Service.post("login", body).then(async ({ data }) => {
        try {
          setLoading(false)
          await AsyncStorage.setItem('token', data.token)
          await AsyncStorage.setItem('isLogin', JSON.stringify(true))
          navigation.replace('Home')
        } catch (e) {
          setLoading(false)
          alert(e)
        }

      })
    }
  }
  return (
    <ScrollView style={styles.container}>

      <View style={styles.host}>
        <View style={styles.header}>

          <Text style={{ fontWeight: 'bold', fontSize: 25, marginTop: 20, textAlign: 'center', color: '#fff' }}>Welcome  </Text>
          <Text style={{ fontWeight: '500', fontSize: 17, marginTop: 10, textAlign: 'center', color: '#fff' }}> There are many variations of passages of Lorem lpsum available , but the majority have suffered alteration</Text>
        </View>
        <View style={styles.bottomView}>

          <View style={styles.cardview}>
            <Image source={require('./src/footer.jpg')} style={{ width: 90, height: 90, marginTop: 20 }} />
            <Text style={{ fontWeight: '900', fontSize: 23, marginTop: 10, textAlign: 'center', color: '#000', marginBottom: 10 }}> Login</Text>
            {loading && (
              <ActivityIndicator size="large" color="#00ff00" />)}
            <TextInput
              onChangeText={user => setUser(user)}
              style={styles.input}
              placeholder="Enter Email here"
              defaultValue={user}
            />
            <TextInput
              onChangeText={password => setPassword(password)}
              style={styles.input}
              placeholder="Enter Password here"
              defaultValue={password}
            />
            <TouchableOpacity style={styles.loginbutton} onPress={loginFunction}>
              <Text style={{ textAlign: 'center', fontSize: 17, color: '#ffffff', fontWeight: 'bold' }}> Login </Text>
            </TouchableOpacity>


          </View>
        </View>

      </View>

    </ScrollView>




  )

};
export default Login;
const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#59c098'
    },
    host: {
      flex: 1,

      backgroundColor: '#59c098'
    },
    header: {
      padding: 30,
      width: '100%',
      height: Dimensions.get('screen').height / 4,
      backgroundColor: '#59c098'
    },

    bottomView: {
      width: '100%',
      height: Dimensions.get('screen').height * 3 / 4,
      padding: 31.5,
      backgroundColor: '#fff',
      borderTopStartRadius: 60,
      borderTopEndRadius: 60
    },
    cardview: {

      backgroundColor: "#e5e5e5",
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 8,
      padding: 30,
      alignContent: 'center',
      justifyContent: "center",
      alignItems: 'center'
    },
    input: {

      height: 40,
      margin: 10,
      paddingLeft: 15,
      borderRadius: 5,
      backgroundColor: '#fff',
      width: Dimensions.get('window').width / 1.5,

    },
    loginbutton: {
      alignSelf: 'center',
      height: 40,
      margin: 10,
      backgroundColor: '#59c098',
      width: Dimensions.get('window').width / 1.5,
      justifyContent: 'center'
    },
    spinnerTextStyle: {
      color: 'red',
    }




  }
)