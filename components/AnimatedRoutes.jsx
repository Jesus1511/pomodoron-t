import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Image } from 'react-native';
import { Clock } from './clock/Clock.jsx';
import { Saved } from './saved/Saved.jsx';
import { Options } from './configuracion/Options.jsx';
import { LinearGradient } from 'expo-linear-gradient';
import clara from '../assets/sobraclara.png';
import { StartSesion } from './clock/StartSesion.jsx';
import { SesionDetails } from './saved/SesionDetails.jsx';

const { width } = Dimensions.get("window");

export const AnimatedRoutes = () => {
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [startingSesion, setStartingSesion] = useState(false);
  const [ sesionDetails, setSesionDetails ] = useState(null);

  useEffect(() => {
    if (startingSesion || sesionDetails !== null) {
      setScrollEnabled(false)
    } else {
      setScrollEnabled(true)
    }
  },[startingSesion, sesionDetails])

  return (
    <>
    <View style={{ flex: 1, backgroundColor: "#1a2432" }}>
      <Image source={clara} style={[styles.shadow, { top: 0, height: 400 }]} />
      <Options />
      <ScrollView
        style={styles.scrollView}
        horizontal
        pagingEnabled
        scrollEnabled={scrollEnabled} 
      >
        <View pointerEvents='none' style={[styles.shadowBlack, { bottom: 0, width: width * 2, height: 250, zIndex: 20 }]} >
          <LinearGradient
            colors={['transparent', 'rgb(21, 28, 35)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.degree}
          /> 
        </View>
        <Clock setIsOpen={setStartingSesion} />
        <Saved setIsOpen={setSesionDetails} saved={false}/>
      </ScrollView>
    </View>
    
    {startingSesion && (<StartSesion setOpenSesionDetails={setStartingSesion}/>)}
    {sesionDetails !== null && (<SesionDetails saved={false} sesion={sesionDetails} setDetails={() => { setSesionDetails(null) }} />)}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  shadow: {
    position: "absolute",
    width,
    opacity: 0.2,
    zIndex: 0,
  },
  shadowBlack: {
    position: "absolute",
    width,
  },
  degree: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
