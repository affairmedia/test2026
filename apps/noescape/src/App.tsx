import React, { useEffect } from 'react';
import { StatusBar, SafeAreaProvider } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@noescape/shared';
import { useAlarmChecker } from '@noescape/shared';
import { RootStackParamList } from './navigation/types';
import HomeScreen from './screens/HomeScreen';
import AlarmCreateScreen from './screens/AlarmCreateScreen';
import AlarmEditScreen from './screens/AlarmEditScreen';
import AlarmRingScreen from './screens/AlarmRingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const { startAlarmChecker } = useAlarmChecker(60000);

  useEffect(() => {
    // Start background alarm checker
    startAlarmChecker();
  }, [startAlarmChecker]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: COLORS.background },
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="AlarmCreate"
                component={AlarmCreateScreen}
                options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
              />
              <Stack.Screen
                name="AlarmEdit"
                component={AlarmEditScreen}
                options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
              />
              <Stack.Screen
                name="AlarmRing"
                component={AlarmRingScreen}
                options={{
                  gestureEnabled: false,
                  animation: 'fade',
                }}
              />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
