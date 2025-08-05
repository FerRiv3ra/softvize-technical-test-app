import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Image } from 'expo-image';
import QRCode from 'react-native-qrcode-svg';
import { useSelector } from 'react-redux';

import { authSelectors } from '@/src/store/auth/authSlice';
import { LogoQr } from '@/src/utils/constants/Images';
import { scale } from '@/src/utils/helpers/scale';

export const UserCard = () => {
  const user = useSelector(authSelectors.selectCurrentUser);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: user?.avatar }} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>{user?.name}</Text>
        <Text style={styles.secondaryText}>{user?.email}</Text>
        <QRCode
          value={user?._id}
          backgroundColor="transparent"
          size={scale(280)}
          logo={LogoQr}
        />
        <Text style={{ ...styles.secondaryText, paddingTop: scale(20) }}>
          Share your QR Code to let others connect with you
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    padding: scale(30),
    borderRadius: 30,
  },
  imageContainer: {
    position: 'absolute',
    top: -scale(30),
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: scale(70),
    height: scale(70),
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 50,
  },
  infoContainer: {
    paddingTop: scale(10),
    alignItems: 'center',
  },
  text: {
    paddingTop: scale(10),
    fontFamily: 'Mulish-Bold',
    fontSize: scale(20, 'font'),
  },
  secondaryText: {
    paddingBottom: scale(10),
    fontFamily: 'Mulish-Regular',
    fontSize: scale(12, 'font'),
    color: '#666',
  },
});
