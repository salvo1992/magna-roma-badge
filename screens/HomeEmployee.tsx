import BadgeCard from '../components/BadgeCard';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Clock from '../components/Clock';
import colors from '../assets/colors';
import { useAuth } from '../context/AuthContext';

const HomeEmployee = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Clock />
      <Text style={styles.title}>Benvenuto da Magna Roma</Text>
      {user && (
        <BadgeCard
          name={user.name}
          reparto="Cucina" // Può essere dinamico in futuro
          id={user.id}
        />
      )}
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

export default HomeEmployee;
