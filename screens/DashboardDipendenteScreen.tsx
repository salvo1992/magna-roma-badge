import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Clock from '../components/Clock';
import BadgeCard from '../components/BadgeCard';
import { useAuth } from '../context/AuthContext';
import colors from '../assets/colors';
import AppHeaderLogo from '../components/AppHeaderLogo';

export default function DashboardDipendenteScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <AppHeaderLogo />
      <Clock />
      <Text style={styles.title}>Ciao {user?.nome || 'Dipendente'} 👋</Text>
      <BadgeCard
        name={user?.nome || 'Nome'}
        reparto={user?.ruolo || 'Reparto'}
        id={user?.uid || 'ID'}
      />
      <Text style={styles.footer}>sviluppata dal vikingo del web</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.romaRed, alignItems: 'center', padding: 20 },
  title: { fontSize: 22, color: colors.romaGold, marginVertical: 10 },
  footer: { marginTop: 30, fontSize: 12, color: '#fff' }
});
