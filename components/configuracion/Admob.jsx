import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getTranslation } from '../../hooks/useLenguage';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-native';

export const Admob = () => {
  const navigator = useNavigate();

  return (
    <>
      <TouchableOpacity onPress={() => navigator("/adsense")}>
        <Text style={styles.textos}>{getTranslation('menu', 1)}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  textos: {
    fontSize: 18,
    marginBottom: 30,
    color: 'white',
  },
});
