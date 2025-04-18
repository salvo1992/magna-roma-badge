import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Clock from '../components/Clock';
import BadgeCard from '../components/BadgeCard';
import { useAuth } from '../context/AuthContext';
import colors from '../assets/colors';

export default function DashboardDipendenteScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Clock />
      <Text style={styles.title}>Ciao {user?.name} 👋</Text>
      <BadgeCard name={user?.name} reparto={user?.role} id={user?.id} />
      <Text style={styles.footer}>sviluppata dal vikingo del web</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.romaRed, alignItems: 'center', padding: 20 },
  title: { fontSize: 22, color: colors.romaGold, marginVertical: 10 },
  footer: { marginTop: 30, fontSize: 12, color: '#fff' }
});