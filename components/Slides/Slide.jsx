import { View, Image, Text, StyleSheet, Dimensions } from "react-native"
import logo from '../../assets/logoapp.png'
import tecnique from '../../assets/workicon.png'
import timers from '../../assets/timers.png'
import { getTranslation } from '../../hooks/useLenguage';

const { width, height } = Dimensions.get('window');

export const Slide = ({slide}) => {
    if (slide == 1) {
      return (
        <View style={styles.slide}>
          <Text style={[{fontSize:30, fontWeight:"bold"},styles.text]}>{getTranslation("slides",0)}</Text>
          <Image source={logo} style={{width:120, height:120, borderRadius:20 ,marginVertical:25, elevation: 5,}}/>
          <Text style={styles.text}>{getTranslation("slides",1)}</Text>
        </View>
      )
    }
    if (slide == 2) {
     return (
       <View style={styles.slide}>
         <Image source={tecnique} style={{width:120, height:120}} />
         <Text style={[{fontSize:30, fontWeight:"bold"},styles.text]}>{getTranslation("slides",2)}</Text>
         <Text style={styles.text}>{getTranslation("slides",3)}</Text>
       </View>
     )
    }
    if (slide == 3) {
     return (
       <View style={styles.slide}>
         <Image source={timers} style={{width:210, height:120, marginVertical:30}} />
         <Text style={styles.text}>{getTranslation("slides",4)}</Text>
       </View>
     )
    }
 }

 const styles = StyleSheet.create({
    slide: {
      width,
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    },
    text: {
      paddingHorizontal: 20,
      marginVertical: 20,
      textAlign: "center",
    },
  })