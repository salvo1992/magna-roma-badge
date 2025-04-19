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
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: 'transparent',
  },
  logo: {
    width: 200,
    height: 40,
  },
});
