import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native'
import optionsIcon from '../../assets/options.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-native';
import {Admob} from './Admob.jsx'
import { getTranslation } from '../../hooks/useLenguage.js';

const { width, height } = Dimensions.get('window');

export const Options = () => {

  const navigator = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <View style={[styles.view, open ? styles.z2 : null]}>
        <TouchableOpacity onPress={()=> setOpen(true)} style={styles.touchable}>
            <Image style={styles.img} source={optionsIcon}/>
        </TouchableOpacity>


        {open && (
          <>
            <TouchableOpacity onPress={()=> setOpen(false)} style={styles.background}></TouchableOpacity>
            <View style={styles.menu}>
              <TouchableOpacity onPress={()=> navigator('/hourType')}>
                <Text style={styles.textos}>{getTranslation('menu', 0)}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>navigator('/slides')}>
                <Text style={styles.textos}>{getTranslation('menu', 3)}</Text>
              </TouchableOpacity>
              <Admob />
            </View>
          </>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
      width,
      flexDirection: 'row',
      justifyContent: "flex-end",
      alignItems:"flex-end",
      paddingHorizontal: 18,
      height:70
    },
    img: {
     width: 30,
     height: 30,
   },
    touchable: {
     width: 40,
     height:40,
    },
    background: {
      backgroundColor: '#20202073',
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
    },
    z2:{
      zIndex:2
    },
    menu: {
      flex: 1,
      backgroundColor: '#243245',
      width: "75%" ,
      height,
      position: "absolute",
      right: 0,
      top:0,
      paddingLeft: 25,
      paddingTop:80,
      zIndex:10,
    },
    textos: {
      fontSize:18,
      marginBottom:30,
      color: "white"
    }
  });