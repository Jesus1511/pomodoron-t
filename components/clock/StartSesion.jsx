import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TimerContext } from '../Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseSeconds } from '../../hooks/traductor';
import { getTranslation } from '../../hooks/useLenguage';
import { useTimeConfig } from '../../hooks/storage';

const { width, height } = Dimensions.get('window');

export const StartSesion = ({setOpenSesionDetails}) => {
  const [selectedHour1, setSelectedHour1] = useState(0);
  const [selectedMinute1, setSelectedMinute1] = useState(0);
  const [selectedHour2, setSelectedHour2] = useState(0);
  const [selectedMinute2, setSelectedMinute2] = useState(0);

  const hoursArray = Array.from({ length: 24 }, (_, i) => i);
  const minutesArray = Array.from({ length: 60 }, (_, i) => i);

  const { setSesionMaxTime, setRestBudgeting, handleDay  } = useContext(TimerContext)

  async function handlePress () {
    try { 
    if (selectedHour1 == 0 && selectedMinute1 == 0) {
      alert("can´t start timer in 0 minutes")
      setOpenSesionDetails(false)
      return
    }
    // guardar configuración de tiempo predeterminada
    await AsyncStorage.setItem('selectedHour1', toString(selectedHour1))
    await AsyncStorage.setItem('selectedMinute1', toString(selectedMinute1))
    await AsyncStorage.setItem('selectedHour2', toString(selectedHour2))
    await AsyncStorage.setItem('selectedMinute2', toString(selectedMinute2))

    const maxTime = parseSeconds(selectedHour1, selectedMinute1)
    const restTime = parseSeconds(selectedHour2, selectedMinute2)
    if (restTime > maxTime) {
      alert("the rest budget cannot exceed the maximum time of the session.")
      setOpenSesionDetails(false)
      return
    }
    setSesionMaxTime(maxTime)
    setRestBudgeting(restTime)
    await AsyncStorage.setItem('sesionMaxTime', toString(maxTime))
    await AsyncStorage.setItem('restBudgeting', toString(restTime))
    handleDay()
    setOpenSesionDetails(false)
  } catch (e) {
    console.error("error iniciando la sesion", e)
  }
  } 

  useEffect(() => {
    const {storedSelectedHour1, storedSelectedMinute1, storedSelectedHour2, storedSelectedMinute2} = useTimeConfig()

    setSelectedHour1(storedSelectedHour1)
    setSelectedMinute1(storedSelectedMinute1)
    setSelectedHour2(storedSelectedHour2)
    setSelectedMinute2(storedSelectedMinute2)
  },[])

  return (
    <View style={styles.View}>
      <TouchableOpacity onPress={()=>setOpenSesionDetails(false)} style={styles.background} />
      <View style={styles.box}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getTranslation('timer', 4)}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedHour1}
              onValueChange={(itemValue) => setSelectedHour1(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {hoursArray.map((hour) => (
                <Picker.Item key={hour} label={String(hour).padStart(2, '0')} value={hour} />
              ))}
            </Picker>
            <Text style={styles.separator}>:</Text>
            <Picker
              selectedValue={selectedMinute1}
              onValueChange={(itemValue) => setSelectedMinute1(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {minutesArray.map((minute) => (
                <Picker.Item key={minute} label={String(minute).padStart(2, '0')} value={minute} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{getTranslation('timer', 5)}</Text>
          <View style={styles.pickerContainer}>
          
            <Picker
              selectedValue={selectedHour2}
              onValueChange={(itemValue) => setSelectedHour2(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {hoursArray.map((hour) => (
                <Picker.Item key={hour} label={String(hour).padStart(2, '0')} value={hour} />
              ))}
            </Picker>
            <Text style={styles.separator}>:</Text>
            <Picker
              selectedValue={selectedMinute2}
              onValueChange={(itemValue) => setSelectedMinute2(itemValue)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {minutesArray.map((minute) => (
                <Picker.Item key={minute} label={String(minute).padStart(2, '0')} value={minute} />
              ))}
            </Picker>
          </View>
        </View>
        <TouchableOpacity onPress={handlePress} style={styles.touchable}>
          <Text style={styles.touchableText}>{getTranslation('timer', 6).toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  View: {
    position: 'absolute',
    width,
    height,
    zIndex: 99910,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    top:-70
  },
  box: {
    backgroundColor: '#29344e',
    width: 300,
    borderRadius: 25,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 100,
    height: 80,
    color:"#ffffff",

  },
  pickerItem:{
    fontSize: 30,
  },

  separator: {
    color: 'white',
    fontSize: 24,
    marginHorizontal: 10,
  },
  touchable: {
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  touchableText: {
    fontFamily: 'Montserrat-Bold',
  },
});



//   (
//     <View style={styles.container}>
//       <Text style={styles.label}>Select Time:</Text>
//       <View style={styles.pickerContainer}>
        
//       </View>
//       <Text style={styles.selectedValue}>Selected Time: {`${selectedHour}:${selectedMinute}`}</Text>
//     </View>
//   )



