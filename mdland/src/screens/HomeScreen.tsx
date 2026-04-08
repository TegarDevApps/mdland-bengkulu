import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeIn,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, SCREEN_WIDTH } from '../constants/theme';
import { RESORTS, EVENTS, USER } from '../data/mockData';
import { Resort } from '../types';
import ResortCard from '../components/cards/ResortCard';
import EventCard from '../components/cards/EventCard';
import { SkeletonCard } from '../components/common/SkeletonLoader';

interface HomeScreenProps {
  onNavigateResort: (resort: Resort) => void;
  onNavigateExplore: () => void;
  onNavigateEvents: () => void;
  onNavigateSearch: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateResort,
  onNavigateExplore,
  onNavigateEvents,
  onNavigateSearch,
}) => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(255,255,255,${interpolate(scrollY.value, [0, 100], [0, 1], Extrapolation.CLAMP)})`,
  }));

  const featuredResorts = RESORTS.filter(r => r.featured);
  const upcomingEvents = EVENTS.slice(0, 3);

  const categories = [
    { icon: 'water', label: 'Beach', color: COLORS.teal },
    { icon: 'restaurant', label: 'Dining', color: COLORS.accent },
    { icon: 'musical-notes', label: 'Events', color: COLORS.coral },
    { icon: 'fitness', label: 'Wellness', color: COLORS.palm },
    { icon: 'boat', label: 'Activities', color: COLORS.lagoon },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Animated Header */}
      <Animated.View style={[styles.header, { paddingTop: insets.top }, headerStyle]}>
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: USER.avatar }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.userName}>{USER.name.split(' ')[0]}</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Pressable onPress={onNavigateSearch} style={styles.headerIcon}>
            <Ionicons name="search" size={22} color={COLORS.gray700} />
          </Pressable>
          <Pressable style={styles.headerIcon}>
            <Ionicons name="notifications-outline" size={22} color={COLORS.gray700} />
            <View style={styles.notifDot} />
          </Pressable>
        </View>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 70, paddingBottom: 100 }}
      >
        {/* Hero Banner */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.heroBanner}>
          <LinearGradient
            colors={COLORS.gradientOcean as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroOverline}>EXCLUSIVE OFFER</Text>
              <Text style={styles.heroTitle}>Summer{'\n'}Paradise</Text>
              <Text style={styles.heroSubtitle}>Up to 40% off on premium villas</Text>
              <Pressable style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Book Now</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
              </Pressable>
            </View>
            <View style={styles.heroImagePlaceholder}>
              <Text style={styles.heroEmoji}>🏝️</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Categories */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((cat, index) => (
              <Animated.View
                key={cat.label}
                entering={FadeInRight.delay(200 + index * 80).springify()}
              >
                <Pressable style={styles.categoryItem}>
                  <View style={[styles.categoryIcon, { backgroundColor: cat.color + '15' }]}>
                    <Ionicons name={cat.icon as any} size={22} color={cat.color} />
                  </View>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                </Pressable>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Featured Resorts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Featured Resorts</Text>
              <Text style={styles.sectionSubtitle}>Handpicked luxury destinations</Text>
            </View>
            <Pressable onPress={onNavigateExplore} style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
            </Pressable>
          </View>

          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <FlatList
              data={featuredResorts}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: SPACING.xl }}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <ResortCard
                  resort={item}
                  onPress={() => onNavigateResort(item)}
                  variant="medium"
                  index={index}
                />
              )}
            />
          )}
        </View>

        {/* Popular Destinations */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { paddingHorizontal: SPACING.xl }]}>
            <View>
              <Text style={styles.sectionTitle}>Popular Destinations</Text>
              <Text style={styles.sectionSubtitle}>Where travelers love to go</Text>
            </View>
          </View>

          <View style={{ paddingHorizontal: SPACING.xl }}>
            {loading ? (
              <SkeletonCard />
            ) : (
              RESORTS.slice(0, 2).map((resort, index) => (
                <ResortCard
                  key={resort.id}
                  resort={resort}
                  onPress={() => onNavigateResort(resort)}
                  variant="large"
                  index={index}
                />
              ))
            )}
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={[styles.sectionHeader, { paddingHorizontal: SPACING.xl }]}>
            <View>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              <Text style={styles.sectionSubtitle}>Music, vibes & unforgettable nights</Text>
            </View>
            <Pressable onPress={onNavigateEvents} style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
            </Pressable>
          </View>

          <View style={{ paddingHorizontal: SPACING.xl }}>
            {upcomingEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                onPress={() => {}}
                variant="horizontal"
                index={index}
              />
            ))}
          </View>
        </View>

        {/* Membership Banner */}
        <Animated.View entering={FadeIn.delay(600)} style={styles.membershipBanner}>
          <LinearGradient
            colors={COLORS.gradientGold as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.membershipGradient}
          >
            <View>
              <Text style={styles.membershipTitle}>MDLAND Platinum</Text>
              <Text style={styles.membershipSubtitle}>Unlock exclusive perks & rewards</Text>
            </View>
            <Ionicons name="diamond" size={36} color="rgba(255,255,255,0.4)" />
          </LinearGradient>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: COLORS.primary },
  greeting: { ...TYPOGRAPHY.caption, color: COLORS.gray500 },
  userName: { ...TYPOGRAPHY.h4, color: COLORS.gray800 },
  headerRight: { flexDirection: 'row', gap: 8 },
  headerIcon: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center',
    ...SHADOWS.small,
  },
  notifDot: {
    position: 'absolute', top: 10, right: 10,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: COLORS.error,
  },

  // Hero
  heroBanner: { marginHorizontal: SPACING.xl, marginBottom: SPACING.xxl },
  heroGradient: {
    borderRadius: RADIUS.xxl,
    padding: SPACING.xxl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 180,
    overflow: 'hidden',
  },
  heroContent: { flex: 1 },
  heroOverline: { ...TYPOGRAPHY.overline, color: 'rgba(255,255,255,0.7)', fontSize: 10, marginBottom: 8 },
  heroTitle: { ...TYPOGRAPHY.h1, color: COLORS.white, marginBottom: 8 },
  heroSubtitle: { ...TYPOGRAPHY.bodySm, color: 'rgba(255,255,255,0.8)', marginBottom: 16 },
  heroButton: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: COLORS.white, paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: RADIUS.round, alignSelf: 'flex-start',
  },
  heroButtonText: { ...TYPOGRAPHY.buttonSm, color: COLORS.primary },
  heroImagePlaceholder: { justifyContent: 'center', alignItems: 'center' },
  heroEmoji: { fontSize: 64 },

  // Categories
  categoriesContainer: { paddingHorizontal: SPACING.xl, gap: 16, marginBottom: SPACING.xxl },
  categoryItem: { alignItems: 'center', gap: 8 },
  categoryIcon: {
    width: 56, height: 56, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
  },
  categoryLabel: { ...TYPOGRAPHY.caption, color: COLORS.gray600 },

  // Sections
  section: { marginBottom: SPACING.xxl },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },
  sectionTitle: { ...TYPOGRAPHY.h3, color: COLORS.gray800 },
  sectionSubtitle: { ...TYPOGRAPHY.caption, color: COLORS.gray500, marginTop: 2 },
  seeAllButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  seeAllText: { ...TYPOGRAPHY.buttonSm, color: COLORS.primary },

  // Membership
  membershipBanner: { marginHorizontal: SPACING.xl, marginBottom: SPACING.xl },
  membershipGradient: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  membershipTitle: { ...TYPOGRAPHY.h4, color: COLORS.white },
  membershipSubtitle: { ...TYPOGRAPHY.bodySm, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
});

export default HomeScreen;
