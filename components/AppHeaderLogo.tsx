import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function AppHeaderLogo() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  logo: {
    width: 120,
    height: 40,
  },
});
