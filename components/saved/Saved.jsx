import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { useSesionsStorage } from "../../hooks/storage";
import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import { formatHour, formatHours, timeThereshold } from "../../hooks/traductor";
import { format } from 'date-fns';
import {SettingsContext} from '../Settings'
import { useNavigate } from 'react-router-native';
import { getTranslation } from "../../hooks/useLenguage";

const { width, height } = Dimensions.get('window');

export const Saved = ({ setIsOpen, saved }) => {
  const [sesions, setSesions] = useState([]);

  const navigator = useNavigate()
  const {sesionStateChanged} = useContext(SettingsContext)

  useEffect(() => {
    async function fetchSesions() {
      const sesionsStorageData = await useSesionsStorage();
      if (!saved) {
        let sesions15 = sesionsStorageData.slice(0, 15);
        setSesions(sesions15);
        return
      }
      setSesions(sesionsStorageData)
    }
    fetchSesions();
  }, [sesionStateChanged]);

  function handleMore() {
    navigator('/saved')
  }

  const groupSessionsByDay = useCallback((sessions) => {
    const grouped = sessions.reduce((acc, session) => {
      const dateKey = new Date(session.finishSesionDate).toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(session);
      return acc;
    }, {});

    const sortedGroups = Object.entries(grouped).sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA));
    return sortedGroups.map(([date, sessions]) => ({ date, sessions }));
  }, []);

  const groupedSessions = useMemo(() => groupSessionsByDay(sesions), [sesions, groupSessionsByDay]);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return getTranslation('saveds',0);
    } else if (date.toDateString() === yesterday.toDateString()) {
      return getTranslation('saveds',1);
    } else {
      return format(date, 'dd/MM');
    }
  }, []);

  return (
    <>
      <View style={[styles.outerContainer, {marginTop:saved?20:60}]}>
        {groupedSessions.length > 0 ? (
          <>
            <View style={styles.sideBar} />
            <ScrollView>
              {groupedSessions.map(({ date, sessions }) => (
                <View key={date}>
                  <Text style={{ color: "white", marginBottom: 10, marginLeft: 10 }}>{formatDate(date)}</Text>
                  <View style={{ width: 10, position: "absolute", top: 10, right: "3.7%", height: 10, backgroundColor: "white", borderRadius: 100 }}></View>
                  {sessions.map((sesion) => (
                    <TouchableOpacity onPress={() =>{setIsOpen(sesion)}} style={styles.container} key={sesion._id}>
                      <Text style={styles.h1Text}>
                        {formatHours(sesion.workingTime + sesion.restingTime)}
                      </Text>

                      <View>
                        <Text style={[styles.hour, { marginBottom: 2 }]}>{formatHour(sesion.startSesionDate)}</Text>
                        <Text style={styles.hour}>{formatHour(sesion.finishSesionDate)}</Text>
                      </View>

                      <View>
                        <Text style={[styles.workingPorcent, { marginBottom: 2 }]}>{timeThereshold(sesion.workingTime, sesion.restingTime).w}%</Text>
                        <Text style={styles.restingPorcent}>{timeThereshold(sesion.workingTime, sesion.restingTime).r}%</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
              {sesions.length == 15 && (
                <View style={{ width: "85%", paddingTop: 20, justifyContent: "center", alignItems: "center" }}>
                  <TouchableOpacity onPress={handleMore} style={{ justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, color: "#ffffff", fontFamily: "Montserrat-Regular", textAlign: "center" }}>{getTranslation('saveds',2)}</Text>
                  </TouchableOpacity>
                </View>
              )}
              <View style={{height:400, width:2}}></View>
            </ScrollView>
          </>
        ) : (
          <>
          <View>
            <Text style={{ color: "white", textAlign: "center" }}>{getTranslation('saveds',5)}</Text>
          </View>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    padding: 10,
    width,
    height,
  },
  hour: {
    color: "#ffffff"
  },
  container: {
    backgroundColor: 'rgb(35, 48, 60)',
    marginBottom: 10,
    padding: 5,
    width: "85%",
    height: 65,
    marginLeft: 5,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    elevation: 20,
  },
  workingPorcent: {
    color: "rgb(236, 100, 62)"
  },
  restingPorcent: {
    color: "rgb(113, 148, 234)"
  },
  h1Text: {
    fontSize: 35,
    color: "#ffffff",
    fontFamily: "MS"
  },
  sideBar: {
    width: 2,
    height: 700,
    position: "absolute",
    right: "8%",
    top: "4%",
    backgroundColor: "#ffffff"
  },
});
