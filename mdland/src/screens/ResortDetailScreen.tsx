import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Pressable,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  FadeInDown,
  FadeIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, SCREEN_WIDTH } from '../constants/theme';
import { VILLAS } from '../data/mockData';
import { Resort, Villa } from '../types';
import VillaCard from '../components/cards/VillaCard';
import RatingStars from '../components/common/RatingStars';
import AnimatedButton from '../components/common/AnimatedButton';

const HEADER_HEIGHT = 380;
const { width } = Dimensions.get('window');

const DETAIL_TABS = ['Overview', 'Villas', 'Amenities', 'Reviews'];

interface ResortDetailScreenProps {
  resort: Resort;
  onBack: () => void;
  onNavigateVilla: (villa: Villa) => void;
}

const ResortDetailScreen: React.FC<ResortDetailScreenProps> = ({
  resort,
  onBack,
  onNavigateVilla,
}) => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const [activeTab, setActiveTab] = useState('Overview');

  const resortVillas = VILLAS.filter(v => v.resortId === resort.id);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Parallax header
  const headerImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [-200, 0, HEADER_HEIGHT], [-100, 0, 100], Extrapolation.CLAMP);
    const scale = interpolate(scrollY.value, [-200, 0], [1.5, 1], Extrapolation.CLAMP);
    return { transform: [{ translateY }, { scale }] };
  });

  // Collapsing header bar
  const headerBarStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [HEADER_HEIGHT - 150, HEADER_HEIGHT - 80], [0, 1], Extrapolation.CLAMP);
    return { opacity };
  });

  const backButtonBg = useAnimatedStyle(() => {
    const bg = interpolate(scrollY.value, [0, HEADER_HEIGHT - 100], [1, 0], Extrapolation.CLAMP);
    return { backgroundColor: `rgba(0,0,0,${bg * 0.3})` };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Parallax Header Image */}
      <Animated.View style={[styles.headerImage, headerImageStyle]}>
        <ImageBackground source={{ uri: resort.image }} style={styles.headerBg}>
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'transparent', 'rgba(0,0,0,0.6)']}
            style={styles.headerGradient}
          />
        </ImageBackground>
      </Animated.View>

      {/* Fixed Header Bar */}
      <Animated.View style={[styles.fixedHeader, { paddingTop: insets.top }, headerBarStyle]}>
        <Text style={styles.fixedHeaderTitle} numberOfLines={1}>{resort.name}</Text>
      </Animated.View>

      {/* Back Button */}
      <Animated.View style={[styles.backButton, { top: insets.top + 8 }, backButtonBg]}>
        <Pressable onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color={COLORS.white} />
        </Pressable>
      </Animated.View>

      {/* Share Button */}
      <Animated.View style={[styles.shareButton, { top: insets.top + 8 }, backButtonBg]}>
        <Pressable>
          <Ionicons name="share-outline" size={22} color={COLORS.white} />
        </Pressable>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Spacer for header image */}
        <View style={{ height: HEADER_HEIGHT - 30 }} />

        {/* Content Card */}
        <View style={styles.contentCard}>
          {/* Resort Info */}
          <Animated.View entering={FadeInDown.delay(100)} style={styles.infoSection}>
            <View style={styles.nameRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.resortName}>{resort.name}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={16} color={COLORS.primary} />
                  <Text style={styles.locationText}>{resort.location}</Text>
                </View>
              </View>
              <View style={styles.priceBox}>
                <Text style={styles.priceValue}>${resort.pricePerNight}</Text>
                <Text style={styles.priceUnit}>/ night</Text>
              </View>
            </View>

            <RatingStars rating={resort.rating} count={resort.reviewCount} size={16} />
          </Animated.View>

          {/* Sticky Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
            {DETAIL_TABS.map(tab => (
              <Pressable
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.tabActive]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                  {tab}
                </Text>
                {activeTab === tab && <View style={styles.tabIndicator} />}
              </Pressable>
            ))}
          </ScrollView>

          {/* Tab Content */}
          {activeTab === 'Overview' && (
            <Animated.View entering={FadeIn} style={styles.tabContent}>
              <Text style={styles.description}>{resort.description}</Text>

              {/* Quick Stats */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="star" size={20} color={COLORS.accentWarm} />
                  <Text style={styles.statValue}>{resort.rating}</Text>
                  <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Ionicons name="chatbubble" size={20} color={COLORS.primary} />
                  <Text style={styles.statValue}>{resort.reviewCount}</Text>
                  <Text style={styles.statLabel}>Reviews</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Ionicons name="bed" size={20} color={COLORS.teal} />
                  <Text style={styles.statValue}>{resortVillas.length}</Text>
                  <Text style={styles.statLabel}>Villas</Text>
                </View>
              </View>
            </Animated.View>
          )}

          {activeTab === 'Villas' && (
            <Animated.View entering={FadeIn} style={styles.tabContent}>
              {resortVillas.length > 0 ? (
                resortVillas.map((villa, index) => (
                  <VillaCard
                    key={villa.id}
                    villa={villa}
                    onPress={() => onNavigateVilla(villa)}
                    index={index}
                  />
                ))
              ) : (
                <View style={styles.emptyTab}>
                  <Text style={styles.emptyTabText}>No villas available for this resort</Text>
                </View>
              )}
            </Animated.View>
          )}

          {activeTab === 'Amenities' && (
            <Animated.View entering={FadeIn} style={styles.tabContent}>
              <View style={styles.amenitiesGrid}>
                {resort.amenities.map((amenity, index) => (
                  <Animated.View
                    key={amenity}
                    entering={FadeInDown.delay(index * 60)}
                    style={styles.amenityItem}
                  >
                    <View style={styles.amenityIcon}>
                      <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                    </View>
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </Animated.View>
                ))}
              </View>
            </Animated.View>
          )}

          {activeTab === 'Reviews' && (
            <Animated.View entering={FadeIn} style={styles.tabContent}>
              {[1, 2, 3].map((_, index) => (
                <Animated.View key={index} entering={FadeInDown.delay(index * 80)} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewAvatar}>
                      <Text style={styles.reviewInitial}>
                        {['J', 'M', 'S'][index]}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.reviewName}>
                        {['James Wilson', 'Maria Santos', 'Sophie Chen'][index]}
                      </Text>
                      <RatingStars rating={[5, 4.5, 5][index]} size={11} showValue={false} />
                    </View>
                    <Text style={styles.reviewDate}>
                      {['2 days ago', '1 week ago', '2 weeks ago'][index]}
                    </Text>
                  </View>
                  <Text style={styles.reviewText}>
                    {[
                      'Absolutely incredible experience! The villa was stunning and the service was impeccable. Can\'t wait to return.',
                      'Beautiful resort with amazing views. The staff went above and beyond to make our stay memorable.',
                      'Paradise found! Every detail was perfect from check-in to checkout. Five stars is not enough.',
                    ][index]}
                  </Text>
                </Animated.View>
              ))}
            </Animated.View>
          )}
        </View>
      </Animated.ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomCTA, { paddingBottom: insets.bottom + SPACING.md }]}>
        <View>
          <Text style={styles.ctaPrice}>${resort.pricePerNight}<Text style={styles.ctaUnit}>/night</Text></Text>
          <RatingStars rating={resort.rating} size={11} />
        </View>
        <AnimatedButton
          title="View Villas"
          onPress={() => setActiveTab('Villas')}
          variant="gradient"
          size="lg"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 0,
  },
  headerBg: { width: '100%', height: '100%' },
  headerGradient: { flex: 1 },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: COLORS.white,
    paddingBottom: 12,
    paddingHorizontal: 60,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  fixedHeaderTitle: { ...TYPOGRAPHY.h4, color: COLORS.gray800 },
  backButton: {
    position: 'absolute', left: SPACING.lg, zIndex: 20,
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  shareButton: {
    position: 'absolute', right: SPACING.lg, zIndex: 20,
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
  },
  contentCard: {
    backgroundColor: COLORS.offWhite,
    borderTopLeftRadius: RADIUS.xxxl,
    borderTopRightRadius: RADIUS.xxxl,
    marginTop: -30,
    minHeight: 600,
  },
  infoSection: { padding: SPACING.xl, paddingTop: SPACING.xxl },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  resortName: { ...TYPOGRAPHY.h2, color: COLORS.gray800 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locationText: { ...TYPOGRAPHY.bodySm, color: COLORS.gray500 },
  priceBox: { alignItems: 'flex-end' },
  priceValue: { ...TYPOGRAPHY.price, color: COLORS.primary },
  priceUnit: { ...TYPOGRAPHY.caption, color: COLORS.gray500 },

  // Tabs
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    paddingHorizontal: SPACING.xl,
  },
  tab: { paddingHorizontal: 16, paddingVertical: 14, marginRight: 8, alignItems: 'center' },
  tabActive: {},
  tabText: { ...TYPOGRAPHY.bodyMedium, color: COLORS.gray400 },
  tabTextActive: { color: COLORS.primary },
  tabIndicator: {
    position: 'absolute', bottom: 0,
    height: 3, width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  tabContent: { padding: SPACING.xl },
  description: { ...TYPOGRAPHY.body, color: COLORS.gray600, lineHeight: 26 },

  // Stats
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    marginTop: SPACING.xl,
    ...SHADOWS.small,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 6 },
  statValue: { ...TYPOGRAPHY.h4, color: COLORS.gray800 },
  statLabel: { ...TYPOGRAPHY.caption, color: COLORS.gray500 },
  statDivider: { width: 1, backgroundColor: COLORS.gray100 },

  // Amenities
  amenitiesGrid: { gap: 12 },
  amenityItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  amenityIcon: {},
  amenityText: { ...TYPOGRAPHY.body, color: COLORS.gray700 },

  // Reviews
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  reviewAvatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  reviewInitial: { ...TYPOGRAPHY.bodyMedium, color: COLORS.white },
  reviewName: { ...TYPOGRAPHY.bodyMedium, color: COLORS.gray800 },
  reviewDate: { ...TYPOGRAPHY.caption, color: COLORS.gray400 },
  reviewText: { ...TYPOGRAPHY.bodySm, color: COLORS.gray600, lineHeight: 22 },

  // Empty
  emptyTab: { alignItems: 'center', padding: SPACING.huge },
  emptyTabText: { ...TYPOGRAPHY.body, color: COLORS.gray400 },

  // Bottom CTA
  bottomCTA: {
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
  ctaPrice: { ...TYPOGRAPHY.h3, color: COLORS.gray800 },
  ctaUnit: { ...TYPOGRAPHY.bodySm, color: COLORS.gray500, fontWeight: '400' },
});

export default ResortDetailScreen;
