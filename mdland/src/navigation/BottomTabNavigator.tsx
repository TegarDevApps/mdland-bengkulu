import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../constants/theme';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import EventsScreen from '../screens/EventsScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

interface TabIconProps {
  name: string;
  focused: boolean;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, focused, color, size }) => {
  const scale = useSharedValue(focused ? 1.15 : 1);

  React.useEffect(() => {
    scale.value = withSpring(focused ? 1.15 : 1, { damping: 12, stiffness: 200 });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.iconContainer, animatedStyle]}>
      {focused && <View style={styles.activeDot} />}
      <Ionicons name={name as any} size={size} color={color} />
    </Animated.View>
  );
};

interface BottomTabNavigatorProps {
  onNavigateResort: (resort: any) => void;
  onNavigateSearch: () => void;
  onNavigateEvents: () => void;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  onNavigateResort,
  onNavigateSearch,
  onNavigateEvents,
}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray400,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} color={color} size={size} />
          ),
        }}
      >
        {() => (
          <HomeScreen
            onNavigateResort={onNavigateResort}
            onNavigateExplore={() => {}}
            onNavigateEvents={onNavigateEvents}
            onNavigateSearch={onNavigateSearch}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Explore"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={focused ? 'compass' : 'compass-outline'} focused={focused} color={color} size={size} />
          ),
        }}
      >
        {() => <ExploreScreen onNavigateResort={onNavigateResort} />}
      </Tab.Screen>

      <Tab.Screen
        name="Events"
        component={EventsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={focused ? 'musical-notes' : 'musical-notes-outline'} focused={focused} color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={focused ? 'heart' : 'heart-outline'} focused={focused} color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 88 : 68,
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    paddingTop: 8,
    ...SHADOWS.medium,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -2,
  },
  tabItem: {
    paddingTop: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeDot: {
    position: 'absolute',
    top: -8,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.primary,
  },
});

export default BottomTabNavigator;
