import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
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
import MapViewScreen from '../screens/MapViewScreen';

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
  onNavigateVilla: (villa: any) => void;
  onNavigateSearch: () => void;
  onNavigateEvent: (event: any) => void;
  onNavigateFnB: () => void;
  onNavigateWahana: () => void;
  onNavigateMap: () => void;
  onNavigateRestaurant?: (restaurant: any) => void;
  onNavigateWahanaDetail?: (wahana: any) => void;
  onNavigateEvents: () => void;
  onNavigatePersonalInfo?: () => void;
  onNavigatePaymentHistory?: () => void;
  onNavigateNotifications?: () => void;
}

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({
  onNavigateVilla,
  onNavigateSearch,
  onNavigateEvent,
  onNavigateFnB,
  onNavigateWahana,
  onNavigateMap,
  onNavigateRestaurant,
  onNavigateWahanaDetail,
  onNavigateEvents,
  onNavigatePersonalInfo,
  onNavigatePaymentHistory,
  onNavigateNotifications,
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
            onNavigateVilla={onNavigateVilla}
            onNavigateExplore={() => {}}
            onNavigateEvents={onNavigateEvents}
            onNavigateEvent={onNavigateEvent}
            onNavigateSearch={onNavigateSearch}
            onNavigateFnB={onNavigateFnB}
            onNavigateWahana={onNavigateWahana}
            onNavigateMap={onNavigateMap}
            onNavigateNotifications={onNavigateNotifications}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Map"
        options={{
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={focused ? 'map' : 'map-outline'} focused={focused} color={color} size={size} />
          ),
        }}
      >
        {() => {
          const navigation = useNavigation<any>();
          return (
            <MapViewScreen
              onBack={() => navigation.navigate('Home')}
              onSearch={onNavigateSearch}
              onNavigateVilla={onNavigateVilla}
              onNavigateRestaurant={onNavigateRestaurant}
              onNavigateWahana={onNavigateWahanaDetail}
              onNavigateEvent={onNavigateEvent}
            />
          );
        }}
      </Tab.Screen>

      <Tab.Screen
        name="Favorites"
        component={WishlistScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={focused ? 'heart' : 'heart-outline'} focused={focused} color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} color={color} size={size} />
          ),
        }}
      >
        {() => (
          <ProfileScreen
            onNavigatePersonalInfo={onNavigatePersonalInfo}
            onNavigatePaymentHistory={onNavigatePaymentHistory}
            onNavigateNotifications={onNavigateNotifications}
          />
        )}
      </Tab.Screen>
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
