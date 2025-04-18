import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <Text style={styles.clock}>{time.toLocaleTimeString('it-IT')}</Text>;
};

const styles = StyleSheet.create({
  clock: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#fff'
  }
});

export default Clock;

