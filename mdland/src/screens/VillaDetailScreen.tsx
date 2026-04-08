import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeIn,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { Villa } from '../types';
import ImageCarousel from '../components/ImageCarousel';
import RatingStars from '../components/common/RatingStars';
import AnimatedButton from '../components/common/AnimatedButton';
import AnimatedHeader from '../components/AnimatedHeader';

interface VillaDetailScreenProps {
  villa: Villa;
  resortName: string;
  onBack: () => void;
  onBook: () => void;
}

const VillaDetailScreen: React.FC<VillaDetailScreenProps> = ({
  villa,
  resortName,
  onBack,
  onBook,
}) => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <AnimatedHeader
        title={villa.name}
        scrollY={scrollY}
        onBack={onBack}
        collapseHeight={250}
      />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Image Gallery */}
        <ImageCarousel images={villa.images} height={340} borderRadius={0} />

        {/* Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.titleSection}>
            <View style={styles.titleRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.villaName}>{villa.name}</Text>
                <Text style={styles.resortName}>{resortName}</Text>
              </View>
              <Pressable style={styles.heartBtn}>
                <Ionicons name="heart-outline" size={24} color={COLORS.coral} />
              </Pressable>
            </View>
            <RatingStars rating={villa.rating} size={15} />
          </Animated.View>

          {/* Quick Info */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.quickInfo}>
            <View style={styles.infoItem}>
              <View style={[styles.infoIcon, { backgroundColor: COLORS.teal + '15' }]}>
                <Ionicons name="bed-outline" size={20} color={COLORS.teal} />
              </View>
              <Text style={styles.infoValue}>{villa.bedrooms}</Text>
              <Text style={styles.infoLabel}>Bedrooms</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={[styles.infoIcon, { backgroundColor: COLORS.primary + '15' }]}>
                <Ionicons name="water-outline" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.infoValue}>{villa.bathrooms}</Text>
              <Text style={styles.infoLabel}>Bathrooms</Text>
            </View>
            <View style={styles.infoItem}>
              <View style={[styles.infoIcon, { backgroundColor: COLORS.accent + '15' }]}>
                <Ionicons name="people-outline" size={20} color={COLORS.accent} />
              </View>
              <Text style={styles.infoValue}>{villa.maxGuests}</Text>
              <Text style={styles.infoLabel}>Max Guests</Text>
            </View>
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(300)} style={styles.section}>
            <Text style={styles.sectionTitle}>About This Villa</Text>
            <Text style={styles.description}>{villa.description}</Text>
          </Animated.View>

          {/* Amenities */}
          <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {villa.amenities.map((amenity, index) => (
                <View key={amenity} style={styles.amenityChip}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* Policies */}
          <Animated.View entering={FadeInDown.delay(500)} style={styles.section}>
            <Text style={styles.sectionTitle}>Policies</Text>
            <View style={styles.policyRow}>
              <Ionicons name="time-outline" size={18} color={COLORS.gray500} />
              <View>
                <Text style={styles.policyTitle}>Check-in: 2:00 PM</Text>
                <Text style={styles.policyTitle}>Check-out: 12:00 PM</Text>
              </View>
            </View>
            <View style={styles.policyRow}>
              <Ionicons name="close-circle-outline" size={18} color={COLORS.gray500} />
              <Text style={styles.policyTitle}>Free cancellation up to 48h before</Text>
            </View>
          </Animated.View>
        </View>
      </Animated.ScrollView>

      {/* Bottom Booking Bar */}
      <View style={[styles.bookingBar, { paddingBottom: insets.bottom + SPACING.md }]}>
        <View>
          <Text style={styles.bookingPrice}>
            ${villa.pricePerNight}
            <Text style={styles.bookingUnit}> / night</Text>
          </Text>
          <Text style={styles.bookingTax}>Includes taxes & fees</Text>
        </View>
        <AnimatedButton
          title={villa.available ? 'Book Now' : 'Sold Out'}
          onPress={onBook}
          variant="gradient"
          size="lg"
          disabled={!villa.available}
          gradientColors={COLORS.gradientOcean as any}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingTop: SPACING.xl },

  // Title
  titleSection: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.xl },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  villaName: { ...TYPOGRAPHY.h2, color: COLORS.gray800 },
  resortName: { ...TYPOGRAPHY.bodySm, color: COLORS.gray500, marginTop: 4 },
  heartBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.gray50,
    alignItems: 'center', justifyContent: 'center',
  },

  // Quick Info
  quickInfo: {
    flexDirection: 'row',
    marginHorizontal: SPACING.xl,
    backgroundColor: COLORS.gray50,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xxl,
    justifyContent: 'space-around',
  },
  infoItem: { alignItems: 'center', gap: 6 },
  infoIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  infoValue: { ...TYPOGRAPHY.h4, color: COLORS.gray800 },
  infoLabel: { ...TYPOGRAPHY.caption, color: COLORS.gray500 },

  // Sections
  section: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.xxl },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.gray800, marginBottom: SPACING.md },
  description: { ...TYPOGRAPHY.body, color: COLORS.gray600, lineHeight: 26 },

  // Amenities
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  amenityChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.gray50, paddingHorizontal: 14, paddingVertical: 10,
    borderRadius: RADIUS.round,
  },
  amenityText: { ...TYPOGRAPHY.bodySm, color: COLORS.gray700 },

  // Policies
  policyRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  policyTitle: { ...TYPOGRAPHY.bodySm, color: COLORS.gray600 },

  // Booking Bar
  bookingBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
    ...SHADOWS.medium,
  },
  bookingPrice: { ...TYPOGRAPHY.h3, color: COLORS.gray800 },
  bookingUnit: { ...TYPOGRAPHY.bodySm, color: COLORS.gray500, fontWeight: '400' },
  bookingTax: { ...TYPOGRAPHY.caption, color: COLORS.gray400, marginTop: 2 },
});

export default VillaDetailScreen;
