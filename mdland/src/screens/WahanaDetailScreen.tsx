import React, { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Pressable, Image, ImageBackground,
} from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, SCREEN_WIDTH } from '../constants/theme';
import { Wahana } from '../types';

interface WahanaDetailScreenProps {
  wahana: Wahana;
  onBack: () => void;
  onBuyTicket: (wahana: Wahana, qty: number, total: number) => void;
}

const WahanaDetailScreen: React.FC<WahanaDetailScreenProps> = ({ wahana, onBack, onBuyTicket }) => {
  const insets = useSafeAreaInsets();
  const [ticketQty, setTicketQty] = useState(1);
  const total = wahana.price * ticketQty;

  const formatPrice = (price: number) => 'Rp ' + price.toLocaleString('id-ID');

  return (
    <View style={[styles.container]}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <ImageBackground source={{ uri: wahana.image }} style={styles.hero}>
          <LinearGradient colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.7)']} style={styles.heroGradient}>
            <Pressable
              onPress={onBack}
              style={[styles.backBtn, { marginTop: insets.top }]}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.white} />
            </Pressable>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.content}>
          {/* Title Section */}
          <Animated.View entering={FadeInDown.springify()}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{wahana.category.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>{wahana.name}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color={COLORS.accent} />
              <Text style={styles.ratingText}>{wahana.rating}</Text>
              <View style={styles.dot} />
              <Ionicons name="time-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.metaText}>{wahana.duration}</Text>
              <View style={styles.dot} />
              <Ionicons name="people-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.metaText}>Max {wahana.capacity} orang</Text>
            </View>
          </Animated.View>

          {/* Description */}
          <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.section}>
            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={styles.description}>{wahana.description}</Text>
          </Animated.View>

          {/* Info Grid */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Ionicons name="cash-outline" size={22} color={COLORS.primary} />
              <Text style={styles.infoLabel}>Harga / Orang</Text>
              <Text style={styles.infoValue}>{formatPrice(wahana.price)}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="time-outline" size={22} color={COLORS.teal} />
              <Text style={styles.infoLabel}>Durasi</Text>
              <Text style={styles.infoValue}>{wahana.duration}</Text>
            </View>
            {wahana.minAge && (
              <View style={styles.infoCard}>
                <Ionicons name="person-outline" size={22} color={COLORS.accent} />
                <Text style={styles.infoLabel}>Usia Min.</Text>
                <Text style={styles.infoValue}>{wahana.minAge} tahun</Text>
              </View>
            )}
            <View style={styles.infoCard}>
              <Ionicons name="people-outline" size={22} color={COLORS.coral} />
              <Text style={styles.infoLabel}>Kapasitas</Text>
              <Text style={styles.infoValue}>{wahana.capacity} orang</Text>
            </View>
          </Animated.View>

          {/* Ticket Selector */}
          <Animated.View entering={FadeInDown.delay(300).springify()} style={styles.ticketSection}>
            <Text style={styles.sectionTitle}>Jumlah Tiket</Text>
            <View style={styles.ticketControl}>
              <Pressable
                onPress={() => setTicketQty(Math.max(1, ticketQty - 1))}
                style={styles.ticketBtn}
              >
                <Ionicons name="remove" size={20} color={COLORS.primary} />
              </Pressable>
              <Text style={styles.ticketQty}>{ticketQty}</Text>
              <Pressable
                onPress={() => setTicketQty(Math.min(wahana.capacity, ticketQty + 1))}
                style={styles.ticketBtn}
              >
                <Ionicons name="add" size={20} color={COLORS.primary} />
              </Pressable>
            </View>

            <View style={styles.priceBreakdown}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>{ticketQty}x Tiket</Text>
                <Text style={styles.priceValue}>{formatPrice(total)}</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <View>
          <Text style={styles.bottomLabel}>Total</Text>
          <Text style={styles.bottomTotal}>{formatPrice(total)}</Text>
        </View>
        <Pressable
          onPress={() => onBuyTicket(wahana, ticketQty, total)}
          style={[styles.buyButton, !wahana.available && styles.buyButtonDisabled]}
          disabled={!wahana.available}
        >
          <LinearGradient
            colors={wahana.available ? COLORS.gradientOcean as any : [COLORS.gray300, COLORS.gray400]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            style={styles.buyGradient}
          >
            <Ionicons name="ticket-outline" size={18} color={COLORS.white} />
            <Text style={styles.buyText}>
              {wahana.available ? 'Beli Tiket' : 'Tidak Tersedia'}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.offWhite },
  hero: { width: SCREEN_WIDTH, height: 280 },
  heroGradient: { flex: 1, padding: SPACING.xl },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)', alignItems: 'center', justifyContent: 'center',
  },
  content: { padding: SPACING.xl, paddingBottom: 140 },
  categoryBadge: {
    alignSelf: 'flex-start', backgroundColor: COLORS.teal + '15',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.round, marginBottom: 8,
  },
  categoryText: { fontSize: 10, fontWeight: '700', color: COLORS.teal, letterSpacing: 1 },
  title: { ...TYPOGRAPHY.h1, color: COLORS.gray800, fontSize: 26, marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingText: { ...TYPOGRAPHY.bodyMedium, color: COLORS.gray800 },
  metaText: { ...TYPOGRAPHY.caption, color: COLORS.gray500 },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: COLORS.gray400 },

  section: { marginTop: SPACING.xl },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.gray800, marginBottom: SPACING.sm },
  description: { ...TYPOGRAPHY.body, color: COLORS.gray600, lineHeight: 22 },

  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginTop: SPACING.xl },
  infoCard: {
    width: (SCREEN_WIDTH - SPACING.xl * 2 - SPACING.sm) / 2,
    backgroundColor: COLORS.white, borderRadius: RADIUS.lg,
    padding: SPACING.md, ...SHADOWS.small,
  },
  infoLabel: { ...TYPOGRAPHY.caption, color: COLORS.gray500, marginTop: 6 },
  infoValue: { ...TYPOGRAPHY.bodyMedium, color: COLORS.gray800, fontSize: 14, marginTop: 2 },

  ticketSection: { marginTop: SPACING.xl },
  ticketControl: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start',
    gap: 20, backgroundColor: COLORS.white, borderRadius: RADIUS.xl,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, ...SHADOWS.small,
  },
  ticketBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: COLORS.primary + '10', alignItems: 'center', justifyContent: 'center',
  },
  ticketQty: { ...TYPOGRAPHY.h2, color: COLORS.gray800, fontSize: 24, minWidth: 32, textAlign: 'center' },

  priceBreakdown: { marginTop: SPACING.lg },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  priceLabel: { ...TYPOGRAPHY.body, color: COLORS.gray500 },
  priceValue: { ...TYPOGRAPHY.bodyMedium, color: COLORS.gray800 },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: COLORS.white, paddingHorizontal: SPACING.xl, paddingTop: SPACING.md,
    ...SHADOWS.medium,
  },
  bottomLabel: { ...TYPOGRAPHY.caption, color: COLORS.gray500 },
  bottomTotal: { ...TYPOGRAPHY.h3, color: COLORS.gray800 },
  buyButton: { borderRadius: RADIUS.xl, overflow: 'hidden' },
  buyButtonDisabled: { opacity: 0.6 },
  buyGradient: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 24, paddingVertical: 14,
  },
  buyText: { ...TYPOGRAPHY.button, color: COLORS.white, fontSize: 15 },
});

export default WahanaDetailScreen;
