import { useContext } from 'react'; // Asegúrate de importar React
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { TimerContext } from '../Timer.jsx';
import { CircleTime } from './CircleTime.jsx';
import { parseToMinutes } from '../../hooks/traductor.js';
import { getTranslation } from '../../hooks/useLenguage.js';

import pause from '../../assets/startSesion.png'
import paused from '../../assets/endSesion.png'

const { width, height } = Dimensions.get('window');

export const Clock = ({setIsOpen}) => {

  const { isRegistered, handleDay, timerState, sesionMaxTime, restBudgeting, tokens  } = useContext(TimerContext)
  
  return (
    <>
    <View style={styles.absolute}>
      <View style={styles.viewport}>

        <Text style={{color: "#ffffff", marginBottom: 10}}> 
          {timerState == 1?parseToMinutes(sesionMaxTime)+" min":parseToMinutes(restBudgeting)+" min"}
        </Text>
        
        <CircleTime />

        <TouchableOpacity style={styles.sesionTouchable} onPress={()=> {if (tokens <= 0) {alert(getTranslation("timer", 7));return}isRegistered? handleDay():setIsOpen(true)}}>
          <Image style={{width:30, height:30, marginLeft:isRegistered?0:5}} source={isRegistered ? paused : pause}/>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewport: {
    marginTop: 60,
    alignItems: "center",
  },
  textos2: {
    fontSize: 25,
    textAlign: "center",
    color: "#000000",
    fontFamily: "Montserrat-Bold"
  },
  absolute: {
    width,
    height,
    zIndex: 10000,
  },
  sesionTouchable: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
    color: "#000000", // Agregado color de texto negro explícito
  },
});