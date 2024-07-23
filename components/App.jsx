import { Timer } from './Timer.jsx';
import { View, StatusBar, TouchableOpacity, Image } from 'react-native';
import { AnimatedRoutes } from './AnimatedRoutes.jsx';
import { Settings } from './Settings.jsx';
import { loadFonts } from '../hooks/font.js';
import { useState, useEffect } from 'react';
import { HourType } from './configuracion/HourType.jsx';
import { NativeRouter, Routes, Route, useNavigate } from 'react-router-native';
import { Notificationss } from './Notifications.jsx';
import {Saved} from './saved/Saved.jsx'
import arrow from '../assets/arrowLeft.png'
import { SesionDetails } from './saved/SesionDetails.jsx';
import { initializeLanguage } from '../hooks/useLenguage.js';
import { Slides } from './Slides/Slides.jsx'
import Adsense from './Adsense.jsx';

const SavedComponent = () => {

  const navigate = useNavigate()
  const [sesionDetails, setSesionDetails] = useState(null);

  return (
    <>
    <View style={{flex:1, backgroundColor:"#1a2432"}}>
      <TouchableOpacity style={{marginTop:30}} onPress={()=> navigate("/")}>
        <Image style={{width:60, height:60}} source={arrow}/>
      </TouchableOpacity>
      <Saved setIsOpen={setSesionDetails} saved={true}/>
    </View>
    {sesionDetails !== null && (<SesionDetails sesion={sesionDetails} setDetails={() => { setSesionDetails(null) }} />)}
    </>
  )
}

export function Appp() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      await loadFonts();
      await initializeLanguage();
      setLanguageLoaded(true);
      setFontsLoaded(true);
    };
    loadApp();
  }, []);

  if (!fontsLoaded || !languageLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: "#1a2432" }}>
      </View>
    );
  }

  return (
    <NativeRouter>
      <Settings>
        <Notificationss>
          {({ scheduleNotificationsHandler, restEndNotifications }) => (
            <Timer
              scheduleNotificationsHandler={scheduleNotificationsHandler}
              restEndNotifications={restEndNotifications}
            >
                <StatusBar barStyle="light-content" backgroundColor="#2a3649" />
                <Routes>
                  <Route path='/' element={<AnimatedRoutes />} />
                  <Route path='/adsense' element={<Adsense />} />
                  <Route path='/slides' element={<Slides />} />
                  <Route path='/saved' element={<SavedComponent />} />
                  <Route path='/hourType' element={<HourType />} />
                </Routes>
            </Timer>
          )}
        </Notificationss>
      </Settings>
    </NativeRouter>
  );
}