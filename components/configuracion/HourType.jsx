import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import {useContext} from 'react'
import { SettingsContext } from '../Settings.jsx'
import arrow from '../../assets/arrowLeft.png'
import { useNavigate } from 'react-router-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getTranslation, initializeLanguage } from '../../hooks/useLenguage.js'

export const HourType = () => {
  
  const navigator = useNavigate()
  const {setMilitarHour} = useContext(SettingsContext)
  
  async function handleTypeHour (t) {
    await AsyncStorage.setItem('language', t);
    initializeLanguage()
    navigator('/')
  }

  return (
    <View style={styles.background}>
      <TouchableOpacity onPress={()=>navigator('/')}>
        <Image style={{width:60, height:60}} source={arrow} />
      </TouchableOpacity>
      <Text style={styles.h1}>
        {getTranslation('menu',0)}
      </Text>
      <View style={{alignItems:"center"}}>
        <TouchableOpacity onPress={()=>handleTypeHour('en')} style={styles.container}>
          <Text style={styles.text}>Inglish</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleTypeHour('es')} style={styles.container}>
          <Text style={styles.text}>Español</Text>
        </TouchableOpacity>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
    h1:{
        color: "white",
        fontSize: 40,
        textAlign: "center",
        marginTop: 30,
        marginBottom:20,
    },
    background:{
        backgroundColor:"#1a2432",
        flex:1,
        padding:10
    },
    container: {
        marginVertical:20,
        backgroundColor: "#ffffff12",
        padding:10,
        borderRadius: 20,
        width:250,
    },
    text: {
        color:"white",
        fontSize: 25,
        textAlign: "center"
    },
    hour: {
        color:"white",
        marginTop:15,
        fontSize:40,
        textAlign:"center",
        fontFamily:"MS"
    }
})