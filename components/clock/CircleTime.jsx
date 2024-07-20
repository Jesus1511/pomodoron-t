import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {formatTime} from '../../hooks/traductor.js'
import {useContext} from 'react';
import { TimerContext } from '../Timer';
import { Circulo } from './Circulo.jsx'
import {SettingsContext} from '../Settings.jsx'

export const CircleTime = () => {

    const {timerState, setTimerState, workingTime, restingTime, restBudgeting} = useContext(TimerContext)
    const {name1, name2, color1, color2} = useContext(SettingsContext)

    function handleTimerState () {
      if (restingTime >= restBudgeting || restBudgeting <= 0) {
        return
      } else {
        timerState == 1? setTimerState(2):setTimerState(1)
      }
    }

    const descanso = restBudgeting - restingTime

  return (
    <Circulo value={timerState == 1?workingTime:restingTime}>
      <TouchableOpacity style={styles.circle} onPress={handleTimerState}>
          <View style={{marginTop:25}}>
            <Text style={[styles.textos, {fontSize: 25,}, timerState === 1?{color: color1}:{color: color2}]}>
              {timerState === 1 ? name1 : name2}
            </Text>
            <Text style={[styles.textos, {fontSize: 58}]}>
              {timerState == 1? formatTime(workingTime) : formatTime(descanso)}
            </Text>
          </View>

          <View style={{marginTop:15, opacity:0.7}}>
            <Text style={[styles.textos, {fontSize: 20}, timerState === 1?{color: color2}:{color: color1}]}>
              {timerState === 1 ? name2 : name1}
            </Text>
            <Text style={[styles.textos, {marginTop: 6, fontSize: 25}]}>
              {timerState == 1? formatTime(descanso) : formatTime(workingTime)}
            </Text>
          </View>
    </TouchableOpacity>
    </Circulo>
  )
}

const styles = StyleSheet.create({

    textos: {
      textAlign: "center",
      color:"#ffffff",
      fontFamily: "MS"
    },

    circle: {
      width: 290,
      height:290,
      backgroundColor: "#1a2432",
      borderRadius: 200,
      justifyContent:"center",
    },
  });