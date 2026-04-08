import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Resort, Villa } from '../types';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResortDetailScreen from '../screens/ResortDetailScreen';
import VillaDetailScreen from '../screens/VillaDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';
import EventsScreen from '../screens/EventsScreen';
import MapViewScreen from '../screens/MapViewScreen';
import DiningScreen from '../screens/DiningScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import SearchScreen from '../screens/SearchScreen';

// Navigation
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (showOnboarding) {
    return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />;
  }

  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                onLogin={() => setIsAuthenticated(true)}
                onNavigateRegister={() => props.navigation.navigate('Register')}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => (
              <RegisterScreen
                onRegister={() => setIsAuthenticated(true)}
                onNavigateLogin={() => props.navigation.goBack()}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs">
          {(props) => (
            <BottomTabNavigator
              onNavigateResort={(resort: Resort) =>
                props.navigation.navigate('ResortDetail', { resort })
              }
              onNavigateSearch={() => props.navigation.navigate('Search')}
              onNavigateEvents={() => props.navigation.navigate('EventsFullScreen')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ResortDetail" options={{ animation: 'fade_from_bottom' }}>
          {(props: any) => (
            <ResortDetailScreen
              resort={props.route.params.resort}
              onBack={() => props.navigation.goBack()}
              onNavigateVilla={(villa: Villa) =>
                props.navigation.navigate('VillaDetail', {
                  villa,
                  resortName: props.route.params.resort.name,
                })
              }
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="VillaDetail" options={{ animation: 'slide_from_right' }}>
          {(props: any) => (
            <VillaDetailScreen
              villa={props.route.params.villa}
              resortName={props.route.params.resortName}
              onBack={() => props.navigation.goBack()}
              onBook={() =>
                props.navigation.navigate('Booking', {
                  villa: props.route.params.villa,
                  resortName: props.route.params.resortName,
                })
              }
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Booking" options={{ animation: 'slide_from_right' }}>
          {(props: any) => (
            <BookingScreen
              villa={props.route.params.villa}
              resortName={props.route.params.resortName}
              onBack={() => props.navigation.goBack()}
              onProceedPayment={(checkIn, checkOut, guests, totalPrice) =>
                props.navigation.navigate('Payment', {
                  villa: props.route.params.villa,
                  checkIn,
                  checkOut,
                  guests,
                  totalPrice,
                })
              }
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Payment" options={{ animation: 'slide_from_right' }}>
          {(props: any) => (
            <PaymentScreen
              totalPrice={props.route.params.totalPrice}
              onBack={() => props.navigation.goBack()}
              onConfirm={() => props.navigation.navigate('BookingSuccess')}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="BookingSuccess" options={{ animation: 'fade_from_bottom' }}>
          {(props: any) => (
            <BookingSuccessScreen
              onGoHome={() => props.navigation.popToTop()}
              onViewBookings={() => {
                props.navigation.popToTop();
                props.navigation.navigate('MyBookings');
              }}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="MapView" component={MapViewScreen} />
        <Stack.Screen name="Dining" component={DiningScreen} />
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
        <Stack.Screen name="EventsFullScreen" component={EventsScreen} />

        <Stack.Screen name="Search" options={{ animation: 'fade' }}>
          {(props: any) => (
            <SearchScreen onBack={() => props.navigation.goBack()} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
