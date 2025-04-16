import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import colors from '../assets/colors';

type Props = {
  name: string;
  reparto: string;
  id: string;
};

const BadgeCard = ({ name, reparto, id }: Props) => {
  return (
    <View style={styles.card}>
      <Image
        source={require('../assets/avatar.png')}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.reparto}>Reparto: {reparto}</Text>
      </View>
      <QRCode value={id} size={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.romaGold,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  info: {
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.romaRed,
  },
  reparto: {
    fontSize: 14,
    color: colors.romaDark,
  },
});

export default BadgeCard;
