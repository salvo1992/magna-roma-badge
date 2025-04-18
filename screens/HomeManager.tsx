import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Clock from '../components/Clock';
import colors from '../assets/colors';
import QRScanner from '../components/QRScanner';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeManager = () => {
  return (
    <View style={styles.container}>
      <Clock />
      <Text style={styles.title}>Dashboard Direzione - Magna Roma</Text>
      <QRScanner />
      <Button title="Esporta PDF" onPress={() => navigation.navigate('ExportPDF')} />

      <Text style={styles.footer}>sviluppata dal vikingo del web</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.romaRed,
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    color: colors.romaGold,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    textAlign: 'center',
    color: '#ccc',
    fontSize: 12,
  },
});

export default HomeManager;
