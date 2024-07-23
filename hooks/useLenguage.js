import * as RNLocalize from "react-native-localize";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Definición de las traducciones
const translations = {
  en: {
    slides: [
      "Welcome to Pomodoron't", "A new way to manage your work or study hours with the rest budgeting technique",
      "What is the rest budgeting technique?", "It is a methodology that allows you to work for a fixed period of time with flexible break minutes that can be used at any moment, thus improving the flexibility of the Pomodoro technique without reducing your productivity",
      "All you need to do is define the number of hours you want to work and the total rest budget you will have, start the timer, and begin working. When you feel fatigued or blocked, you can start your break time to recover"
    ],
    menu: ["language", "Get Tokens", "Leave Feedback", "App Guide", "Loading Add", "Watch Add"],
    timer: ["working time", "resting time","","", "Sesion Hours", "rest budgeting hours", "start", "get more tokens in the configuration for more sessions"],
    saveds: ["Today", "Yesterday", "More Sessions", "Started at", "Ended at", "There's still no any session"],
    noti: ["Congratulations!! 🎉🎉", "Have Completed the Work Session.","The Resting Time is Over" ,"your working time is running out, don't let it slip away.", "Stop Alarm"]
  },
  es: {
    slides: [
      "Bienvenido a Pomodoron't", "Una nueva forma de gestionar tus horas de trabajo o estudio con la técnica de presupuesto de descanso",
      "¿Qué es la técnica de presupuesto de descanso?", "Es una tecnica que permite trabajar durante un lapso de tiempo fijo con minutos de descanso flexibles que puedes usar en cualquier momento, mejorando así la flexibilidad de la técnica Pomodoro sin restarte productividad",
      "Todo lo que debes hacer es definir la cantidad de horas que deseas trabajar y el presupuesto de descanso total que tendrás, iniciar el temporizador y empezar a trabajar. En el momento que te sientas fatigado o bloqueado, puedes poner a correr tu tiempo de descanso para recuperarte"
    ],
    menu: ["lenguaje", "Obten Tokens", "Valoranos", "Guia de la App", "Cargando Anuncio", "Ver Anuncio"],
    timer: ["working time", "resting time","","", "Horas de la sesion", "Horas de descanso", "iniciar", "obten más tokens en la configuración para más sesiones"],
    saveds: ["Hoy", "Ayer", "Ver más", "Inicio en", "Termino en", "Todavia no hay ninguna sesión"],
    noti: ["Felicidades!! 🎉🎉","Completaste la Sesion de Trabajo.","Se ah Acabado el Descanso" ,"tu tiempo productivo esta corriendo, no dejes que se te escape.", "Detener"]
  }
};

let userLenguaje

// Función para establecer el idioma al iniciar la aplicación
export async function initializeLanguage() {
  try {
    const value = await AsyncStorage.getItem("language");
    if (value === null) {
      const locales = RNLocalize.getLocales();
      let userLanguage = locales[0]?.languageTag.substring(0, 2) || 'en';
      if (!['en', 'es'].includes(userLanguage)) {
        userLanguage = 'en';
      }
      await AsyncStorage.setItem('language', userLanguage);
      userLenguaje = userLanguage
    } else {
      userLenguaje = value
      return true
    }
  } catch (error) {
    console.error('Error al inicializar el lenguaje:', error);
    await AsyncStorage.setItem('language', 'en');
    userLenguaje = 'en'
  } finally {
    return true
  }
}

// Función para obtener la traducción basada en la sección e índice
export function getTranslation(section, index) {

    const translation = translations[userLenguaje]?.[section]?.[index];
    if (!translation) {
      console.error('Traducción no encontrada para', section, index);
      return "papaya";
    } else {
      return translation;
    }
      



}