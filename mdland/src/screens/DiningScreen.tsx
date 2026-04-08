import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { RESTAURANTS } from '../data/mockData';
import { DiningItem } from '../types';
import RatingStars from '../components/common/RatingStars';

const CATEGORIES = ['All', 'Appetizer', 'Main', 'Dessert', 'Cocktail', 'Wine', 'Beer'];

const DiningScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeRestaurant, setActiveRestaurant] = useState(RESTAURANTS[0]);

  const filteredItems = activeCategory === 'All'
    ? activeRestaurant.items
    : activeRestaurant.items.filter(i => i.category === activeCategory.toLowerCase());

  const renderMenuItem = ({ item, index }: { item: DiningItem; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 60).springify()}>
      <Pressable style={styles.menuItem}>
        <Image source={{ uri: item.image }} style={styles.menuItemImage} />
        <View style={styles.menuItemContent}>
          <View style={styles.menuItemHeader}>
            <Text style={styles.menuItemName} numberOfLines={1}>{item.name}</Text>
            {item.isSignature && (
              <View style={styles.signatureBadge}>
                <Ionicons name="diamond" size={10} color={COLORS.accentWarm} />
                <Text style={styles.signatureText}>Signature</Text>
              </View>
            )}
          </View>
          <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
          <View style={styles.menuItemFooter}>
            <Text style={styles.menuItemPrice}>${item.price}</Text>
            <RatingStars rating={item.rating} size={11} showValue={true} />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dining & Drinks</Text>
        <Text style={styles.subtitle}>Culinary excellence by the ocean</Text>
      </View>

      {/* Restaurant Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.restaurantSelector}
      >
        {RESTAURANTS.map((restaurant) => (
          <Pressable
            key={restaurant.id}
            onPress={() => setActiveRestaurant(restaurant)}
            style={[
              styles.restaurantCard,
              activeRestaurant.id === restaurant.id && styles.restaurantCardActive,
            ]}
          >
            <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
            <View style={styles.restaurantInfo}>
              <Text style={[
                styles.restaurantName,
                activeRestaurant.id === restaurant.id && styles.restaurantNameActive,
              ]} numberOfLines={1}>
                {restaurant.name}
              </Text>
              <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
              <Text style={styles.restaurantHours}>{restaurant.openHours}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
      >
        {CATEGORIES.map(cat => (
          <Pressable
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={[styles.categoryChip, activeCategory === cat && styles.categoryChipActive]}
          >
            <Text style={[styles.categoryText, activeCategory === cat && styles.categoryTextActive]}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Menu Items */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuList}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="restaurant-outline" size={40} color={COLORS.gray300} />
            <Text style={styles.emptyText}>No items in this category</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  header: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.lg, paddingBottom: SPACING.md },
  title: { ...TYPOGRAPHY.h1, color: COLORS.gray800 },
  subtitle: { ...TYPOGRAPHY.bodySm, color: COLORS.gray500, marginTop: 4 },

  // Restaurant
  restaurantSelector: { paddingHorizontal: SPACING.xl, gap: 12, marginBottom: SPACING.lg },
  restaurantCard: {
    width: 200, backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl, overflow: 'hidden',
    borderWidth: 1.5, borderColor: COLORS.gray100, ...SHADOWS.small,
  },
  restaurantCardActive: { borderColor: COLORS.primary },
  restaurantImage: { width: '100%', height: 100 },
  restaurantInfo: { padding: SPACING.md },
  restaurantName: { ...TYPOGRAPHY.bodyMedium, color: COLORS.gray800 },
  restaurantNameActive: { color: COLORS.primary },
  restaurantCuisine: { ...TYPOGRAPHY.caption, color: COLORS.gray500, marginTop: 2 },
  restaurantHours: { ...TYPOGRAPHY.caption, color: COLORS.gray400, marginTop: 4, fontSize: 11 },

  // Categories
  categoryContainer: { paddingHorizontal: SPACING.xl, gap: 8, marginBottom: SPACING.lg },
  categoryChip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.gray200,
  },
  categoryChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  categoryText: { ...TYPOGRAPHY.caption, color: COLORS.gray600 },
  categoryTextActive: { color: COLORS.white },

  // Menu
  menuList: { paddingHorizontal: SPACING.xl, paddingBottom: 100 },
  menuItem: {
    flexDirection: 'row', backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl, overflow: 'hidden',
    marginBottom: SPACING.md, ...SHADOWS.small,
  },
  menuItemImage: { width: 100, height: 110 },
  menuItemContent: { flex: 1, padding: SPACING.md, justifyContent: 'space-between' },
  menuItemHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuItemName: { ...TYPOGRAPHY.bodyMedium, color: COLORS.gray800, flex: 1 },
  signatureBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: COLORS.accentWarm + '15',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.round,
  },
  signatureText: { ...TYPOGRAPHY.overline, color: COLORS.accentWarm, fontSize: 8 },
  menuItemDesc: { ...TYPOGRAPHY.caption, color: COLORS.gray500, marginTop: 4, lineHeight: 16 },
  menuItemFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6,
  },
  menuItemPrice: { ...TYPOGRAPHY.h4, color: COLORS.primary },

  // Empty
  emptyState: { alignItems: 'center', paddingTop: SPACING.huge },
  emptyText: { ...TYPOGRAPHY.body, color: COLORS.gray400, marginTop: SPACING.md },
});

export default DiningScreen;
