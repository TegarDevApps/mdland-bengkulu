import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  FlatList,
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { RESORTS } from '../data/mockData';
import { Resort } from '../types';
import ResortCard from '../components/cards/ResortCard';
import SearchBar from '../components/common/SearchBar';
import { FilterModal } from '../components/FilterModal';

interface ExploreScreenProps {
  onNavigateResort: (resort: Resort) => void;
}

const TABS = ['All', 'Beach', 'Island', 'Mountain', 'City'];

const ExploreScreen: React.FC<ExploreScreenProps> = ({ onNavigateResort }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(false);

  const filteredResorts = RESORTS.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Header */}
      <Animated.View entering={FadeIn} style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>Discover your perfect escape</Text>
      </Animated.View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setShowFilters(true)}
        />
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {TABS.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Results Header */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>{filteredResorts.length} resorts found</Text>
        <View style={styles.viewToggle}>
          <Pressable
            onPress={() => setViewMode('list')}
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleActive]}
          >
            <Ionicons name="list" size={18} color={viewMode === 'list' ? COLORS.primary : COLORS.gray400} />
          </Pressable>
          <Pressable
            onPress={() => setViewMode('grid')}
            style={[styles.toggleButton, viewMode === 'grid' && styles.toggleActive]}
          >
            <Ionicons name="grid" size={18} color={viewMode === 'grid' ? COLORS.primary : COLORS.gray400} />
          </Pressable>
        </View>
      </View>

      {/* Results */}
      <FlatList
        data={filteredResorts}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={viewMode === 'grid' ? 2 : 1}
        key={viewMode}
        columnWrapperStyle={viewMode === 'grid' ? styles.gridRow : undefined}
        renderItem={({ item, index }) => (
          <View style={viewMode === 'grid' ? styles.gridItem : undefined}>
            <ResortCard
              resort={item}
              onPress={() => onNavigateResort(item)}
              variant={viewMode === 'grid' ? 'compact' : 'large'}
              index={index}
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color={COLORS.gray300} />
            <Text style={styles.emptyText}>No resorts found</Text>
            <Text style={styles.emptySubtext}>Try a different search term</Text>
          </View>
        }
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={(filters) => { setShowFilters(false); }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  header: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.md },
  title: { ...TYPOGRAPHY.h1, color: COLORS.gray800 },
  subtitle: { ...TYPOGRAPHY.bodySm, color: COLORS.gray500, marginTop: 4 },
  searchContainer: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.lg },
  tabsContainer: { paddingHorizontal: SPACING.xl, gap: 8, marginBottom: SPACING.lg },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: { ...TYPOGRAPHY.buttonSm, color: COLORS.gray600 },
  tabTextActive: { color: COLORS.white },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  resultsCount: { ...TYPOGRAPHY.bodySm, color: COLORS.gray500 },
  viewToggle: { flexDirection: 'row', gap: 4 },
  toggleButton: {
    padding: 8,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.white,
  },
  toggleActive: { backgroundColor: COLORS.gray50 },
  listContainer: { paddingHorizontal: SPACING.xl, paddingBottom: 100 },
  gridRow: { justifyContent: 'space-between' },
  gridItem: { width: '48%' },
  emptyState: { alignItems: 'center', paddingTop: SPACING.huge },
  emptyText: { ...TYPOGRAPHY.h4, color: COLORS.gray400, marginTop: SPACING.lg },
  emptySubtext: { ...TYPOGRAPHY.bodySm, color: COLORS.gray400 },
});

export default ExploreScreen;
