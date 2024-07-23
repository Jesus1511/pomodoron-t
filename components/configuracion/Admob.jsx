import { Text, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { getTranslation } from '../../hooks/useLenguage';
import { useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AdmobContext } from '../Timer';
import { useNavigate } from 'react-router-native';

const { width, height } = Dimensions.get('window');

export const Admob = () => {
  const navigator = useNavigate();
  const [opening, setOpening] = useState(false);
  const { loaded } = useContext(AdmobContext);

  useEffect(() => {
    if (opening && loaded) {
      navigator('/adsense')
    }
  }, [opening, loaded]);

  return (
    <>
      <TouchableOpacity onPress={() => setOpening(true)}>
        <Text style={styles.textos}>{getTranslation('menu', 1)}</Text>
      </TouchableOpacity>
      {opening && !loaded && (
        <TouchableOpacity onPress={() => setOpening(false)} style={styles.shadow}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text>{getTranslation('menu', 4)}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textos: {
    fontSize: 18,
    marginBottom: 30,
    color: 'white',
  },
  shadow: {
    backgroundColor: "#00000079",
    position: "absolute",
    width: "115%",
    height,
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
