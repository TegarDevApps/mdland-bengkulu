import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, SCREEN_WIDTH } from '../constants/theme';
import { EVENTS } from '../data/mockData';
import EventCard from '../components/cards/EventCard';

const GENRE_FILTER = ['All', 'Deep House', 'R&B / Soul', 'Electronic', 'Jazz', 'Acoustic', 'Wellness'];

const EventsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeGenre, setActiveGenre] = useState('All');

  const filteredEvents = activeGenre === 'All'
    ? EVENTS
    : EVENTS.filter(e => e.genre.includes(activeGenre.split(' ')[0]));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      {/* Hero */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800' }}
        style={styles.hero}
      >
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.heroGradient}>
          <Animated.View entering={FadeInDown.springify()}>
            <Text style={styles.heroOverline}>BEACH CLUB</Text>
            <Text style={styles.heroTitle}>Events &{'\n'}Experiences</Text>
            <Text style={styles.heroSubtitle}>Music · R&B · Chill Vibes</Text>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>

      {/* Genre Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genreContainer}
      >
        {GENRE_FILTER.map(genre => (
          <Pressable
            key={genre}
            onPress={() => setActiveGenre(genre)}
            style={[styles.genreChip, activeGenre === genre && styles.genreChipActive]}
          >
            <Text style={[styles.genreText, activeGenre === genre && styles.genreTextActive]}>
              {genre}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Events List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.eventsList}
      >
        {/* Featured Event */}
        {filteredEvents.length > 0 && (
          <EventCard
            event={filteredEvents[0]}
            onPress={() => {}}
            variant="full"
            index={0}
          />
        )}

        {/* Other Events */}
        {filteredEvents.slice(1).map((event, index) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => {}}
            variant="horizontal"
            index={index + 1}
          />
        ))}

        {filteredEvents.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="musical-notes-outline" size={48} color={COLORS.gray300} />
            <Text style={styles.emptyText}>No events in this category</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  hero: { height: 220 },
  heroGradient: { flex: 1, justifyContent: 'flex-end', padding: SPACING.xl },
  heroOverline: { ...TYPOGRAPHY.overline, color: COLORS.accentWarm, fontSize: 11, marginBottom: 4 },
  heroTitle: { ...TYPOGRAPHY.h1, color: COLORS.white },
  heroSubtitle: { ...TYPOGRAPHY.body, color: COLORS.gray300, marginTop: 4 },
  genreContainer: { paddingHorizontal: SPACING.xl, paddingVertical: SPACING.lg, gap: 8 },
  genreChip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: RADIUS.round, backgroundColor: COLORS.white,
    borderWidth: 1, borderColor: COLORS.gray200,
  },
  genreChipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  genreText: { ...TYPOGRAPHY.caption, color: COLORS.gray600 },
  genreTextActive: { color: COLORS.white },
  eventsList: { paddingHorizontal: SPACING.xl, paddingBottom: 100 },
  emptyState: { alignItems: 'center', paddingTop: SPACING.huge },
  emptyText: { ...TYPOGRAPHY.body, color: COLORS.gray400, marginTop: SPACING.lg },
});

export default EventsScreen;
