import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
  withSpring,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { COLORS, TYPOGRAPHY } from '../constants/theme';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const taglineTranslateY = useSharedValue(20);
  const circleScale = useSharedValue(0);

  useEffect(() => {
    // Logo animation
    logoOpacity.value = withTiming(1, { duration: 600 });
    logoScale.value = withSequence(
      withSpring(1.1, { damping: 8, stiffness: 100 }),
      withSpring(1, { damping: 12, stiffness: 120 })
    );

    // Circle pulse
    circleScale.value = withDelay(
      200,
      withSequence(
        withSpring(1.2, { damping: 6, stiffness: 80 }),
        withSpring(1, { damping: 10, stiffness: 100 })
      )
    );

    // Tagline
    taglineOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));
    taglineTranslateY.value = withDelay(800, withSpring(0, { damping: 12 }));

    // Navigate away
    const timer = setTimeout(() => {
      logoOpacity.value = withTiming(0, { duration: 400 });
      taglineOpacity.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(onFinish)();
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
    opacity: circleScale.value > 0 ? 0.15 : 0,
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }],
  }));

  return (
    <LinearGradient
      colors={['#0A1628', '#0D2847', '#0A84FF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* Animated decorative circle */}
      <Animated.View style={[styles.circle, circleStyle]} />

      {/* Logo */}
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <View style={styles.logoIcon}>
          <Text style={styles.logoLetter}>M</Text>
        </View>
        <Text style={styles.logoText}>MDLAND</Text>
      </Animated.View>

      {/* Tagline */}
      <Animated.View style={[styles.taglineContainer, taglineStyle]}>
        <Text style={styles.tagline}>Luxury Beach Living</Text>
        <View style={styles.divider} />
        <Text style={styles.subTagline}>PREMIUM RESORT EXPERIENCE</Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoLetter: {
    fontSize: 42,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -2,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 8,
  },
  taglineContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  tagline: {
    ...TYPOGRAPHY.body,
    color: COLORS.seafoam,
    letterSpacing: 2,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.accentWarm,
    marginVertical: 12,
    borderRadius: 1,
  },
  subTagline: {
    ...TYPOGRAPHY.overline,
    color: COLORS.gray400,
    fontSize: 10,
    letterSpacing: 3,
  },
});

export default SplashScreen;
