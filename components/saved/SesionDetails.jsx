import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import { formatHour, formatTime, timeThereshold } from "../../hooks/traductor";
import { CirclePorcent } from "./CirclePorcent.jsx";
import {useContext} from 'react';
import {SettingsContext} from '../Settings.jsx'

import close from '../../assets/close.webp'
import { getTranslation } from "../../hooks/useLenguage.js";

const {width, height} = Dimensions.get('window');

export const SesionDetails = ({ sesion, setDetails }) => {

  const {name1, name2, color1, color2} = useContext(SettingsContext)

  return (
    <>
      <TouchableOpacity onPress={setDetails} style={{backgroundColor:'rgba(0,0,0,0.5)',width:width*2, height, zIndex:1, position:"absolute", top:0, right:0}}/>
      <View style={styles.overlay}>
        <TouchableOpacity onPress={setDetails} style={{width:40, height:40}}>
          <Image style={styles.img} source={close}/>
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={[styles.h1Text, {marginBottom:10}]}>
            {formatTime(sesion.workingTime + sesion.restingTime)}h
          </Text>
          <View style={styles.mediumContainer}>
            <View style={styles.infoBack}>
                <Text style={{fontSize: 20, textAlign:"center", color: color1}}>{name1}</Text>
                <Text style={{fontSize:37, marginBottom:2, textAlign:"center", color:color1, fontFamily:"Montserrat-Bold"}}>{timeThereshold(sesion.workingTime, sesion.restingTime).w}%</Text>
                <Text style={{color: "white", textAlign:"center", fontFamily:"MS", fontSize:25,}}>{formatTime(sesion.workingTime)}</Text>
            </View>
            <View style={styles.infoBack}>
                <Text style={{fontSize: 20, textAlign:"center", color: color2}}>{name2}</Text>
                <Text style={{fontSize:37, marginBottom:2, textAlign:"center", color: color2 ,fontFamily:"Montserrat-Bold"}}>{timeThereshold(sesion.workingTime, sesion.restingTime).r}%</Text>
                <Text style={{color: "white", textAlign:"center", fontFamily:"MS", fontSize:25,}}>{formatTime(sesion.restingTime)}</Text>
            </View>
          </View>

          <View style={styles.mediumContainer}>
            <CirclePorcent theres1={timeThereshold(sesion.workingTime, sesion.restingTime).w} theres2={timeThereshold(sesion.workingTime, sesion.restingTime).r}>
                <Text style={{color:"white", fontSize:25, fontFamily:"MS", lineHeight:29, width:80, textAlign:"center"}}>TIME LINE</Text>
            </CirclePorcent>

            <View>
                <View>
                    <Text style={{color:"white",marginBottom:2, fontSize:23, textAlign:"center", fontFamily:"MS"}}>{getTranslation('saveds',3)}</Text>
                    <Text style={{color:"white", fontSize:18, textAlign:"center", fontFamily:"MS"}}>{formatHour(sesion.startSesionDate)}</Text>
                </View>
                <View>
                    <Text style={{color:"white",marginBottom:2, fontSize:23, textAlign:"center", fontFamily:"MS"}}>{getTranslation('saveds',4)}</Text>
                    <Text style={{color:"white", fontSize:18, textAlign:"center", fontFamily:"MS"}}>{formatHour(sesion.finishSesionDate)}</Text>
                </View>
            </View>
          </View>
          
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1Text: {
    fontSize: 60,
    color: "white"
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '130%',
    zIndex: 5000,
  },
  overlay: {
    backgroundColor: "#243245",
    height: "82%",
    width,
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 300,
  },
  mediumContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  img: {
    position: "relative",
    left: 140,
    top: 25,
    width: 30,
    height: 30,
  },
  infoBack: {
    backgroundColor: "#ffffff0c",
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: 130,
    borderRadius: 15,
    marginHorizontal:10,
  },
});
