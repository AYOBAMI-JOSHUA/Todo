import React from 'react';
import { ImageBackground, StyleSheet, Dimensions, View } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { BackgroundImages } from '../constants/Images';

const { width } = Dimensions.get('window');
const isTabletOrDesktop = width >= 768;

export const BackgroundImage: React.FC = () => {
  const { theme } = useTheme();

  const backgroundImage = isTabletOrDesktop
    ? BackgroundImages[theme].desktop
    : BackgroundImages[theme].mobile;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});