import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { MAP_MARKERS } from '../data/mockData';
import GlassCard from '../components/common/GlassCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TYPE_COLORS: Record<string, string> = {
  resort: COLORS.primary,
  restaurant: COLORS.accent,
  event: COLORS.coral,
  activity: COLORS.teal,
};

const TYPE_ICONS: Record<string, string> = {
  resort: 'bed',
  restaurant: 'restaurant',
  event: 'musical-notes',
  activity: 'bicycle',
};

const MapViewScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const selected = MAP_MARKERS.find(m => m.id === selectedMarker);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Map</Text>
        <Text style={styles.subtitle}>Explore nearby spots</Text>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={64} color={COLORS.gray200} />
          <Text style={styles.mapPlaceholderText}>Interactive Map</Text>
          <Text style={styles.mapPlaceholderSubtext}>
            Map renders on device with react-native-maps
          </Text>

          {/* Simulated Markers */}
          {MAP_MARKERS.map((marker, index) => (
            <Animated.View
              key={marker.id}
              entering={FadeInDown.delay(300 + index * 100).springify()}
            >
              <Pressable
                onPress={() => setSelectedMarker(marker.id)}
                style={[
                  styles.markerButton,
                  {
                    top: 80 + index * 65,
                    left: 30 + (index % 3) * 90,
                  },
                ]}
              >
                <View style={[styles.marker, { backgroundColor: TYPE_COLORS[marker.type] }]}>
                  <Ionicons
                    name={TYPE_ICONS[marker.type] as any}
                    size={16}
                    color={COLORS.white}
                  />
                </View>
                <View style={[styles.markerArrow, { borderTopColor: TYPE_COLORS[marker.type] }]} />
                <Text style={styles.markerLabel}>{marker.title}</Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          {Object.entries(TYPE_COLORS).map(([type, color]) => (
            <View key={type} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: color }]} />
              <Text style={styles.legendText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Selected Marker Card */}
      {selected && (
        <Animated.View entering={FadeInDown.springify()} style={styles.detailCard}>
          <Image source={{ uri: selected.image }} style={styles.detailImage} />
          <View style={styles.detailContent}>
            <View style={[styles.detailBadge, { backgroundColor: TYPE_COLORS[selected.type] + '15' }]}>
              <Ionicons name={TYPE_ICONS[selected.type] as any} size={12} color={TYPE_COLORS[selected.type]} />
              <Text style={[styles.detailBadgeText, { color: TYPE_COLORS[selected.type] }]}>
                {selected.type.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.detailTitle}>{selected.title}</Text>
            <Text style={styles.detailDescription}>{selected.description}</Text>
          </View>
          <Pressable onPress={() => setSelectedMarker(null)} style={styles.detailClose}>
            <Ionicons name="close" size={18} color={COLORS.gray500} />
          </Pressable>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  header: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.md },
  title: { ...TYPOGRAPHY.h1, color: COLORS.gray800 },
  subtitle: { ...TYPOGRAPHY.bodySm, color: COLORS.gray500, marginTop: 4 },

  mapContainer: { flex: 1, marginHorizontal: SPACING.xl, marginBottom: SPACING.xl },
  mapPlaceholder: {
    flex: 1, backgroundColor: COLORS.gray50,
    borderRadius: RADIUS.xxl, alignItems: 'center',
    justifyContent: 'center', position: 'relative',
    overflow: 'hidden', borderWidth: 1, borderColor: COLORS.gray200,
  },
  mapPlaceholderText: { ...TYPOGRAPHY.h4, color: COLORS.gray300, marginTop: SPACING.md },
  mapPlaceholderSubtext: { ...TYPOGRAPHY.caption, color: COLORS.gray300, marginTop: 4 },

  // Markers
  markerButton: { position: 'absolute', alignItems: 'center' },
  marker: {
    width: 36, height: 36, borderRadius: 18,
    alignItems: 'center', justifyContent: 'center',
    ...SHADOWS.medium,
  },
  markerArrow: {
    width: 0, height: 0, borderLeftWidth: 6, borderRightWidth: 6,
    borderTopWidth: 8, borderLeftColor: 'transparent',
    borderRightColor: 'transparent', marginTop: -2,
  },
  markerLabel: { ...TYPOGRAPHY.caption, color: COLORS.gray600, marginTop: 2, fontSize: 10 },

  // Legend
  legend: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 16, paddingVertical: SPACING.md,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { ...TYPOGRAPHY.caption, color: COLORS.gray500, fontSize: 11 },

  // Detail Card
  detailCard: {
    position: 'absolute', bottom: 20, left: SPACING.xl, right: SPACING.xl,
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl, overflow: 'hidden', ...SHADOWS.large,
  },
  detailImage: { width: 90, height: 90 },
  detailContent: { flex: 1, padding: SPACING.md, justifyContent: 'center' },
  detailBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: RADIUS.round, alignSelf: 'flex-start', marginBottom: 4,
  },
  detailBadgeText: { ...TYPOGRAPHY.overline, fontSize: 9 },
  detailTitle: { ...TYPOGRAPHY.bodyMedium, color: COLORS.gray800 },
  detailDescription: { ...TYPOGRAPHY.caption, color: COLORS.gray500, marginTop: 2 },
  detailClose: { position: 'absolute', top: 8, right: 8, padding: 4 },
});

export default MapViewScreen;
