import React from 'react';
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

// Views
import PaydayImport from '../components/payday/PaydayImport';
import PaydayCalculating from '../components/payday/PaydayCalculating';
import PaydayList from '../components/payday/PaydayList';

// Shared Styles
import Colors from '../sharedColors';

const Stack = createStackNavigator();

function PaydayStack() {
  return (
    <Stack.Navigator
      headerMode = {'none'}
      screenOptions={{
        gestureEnabled: true,
        cardStyle: { backgroundColor: Colors.dark }
      }}
    >
      <Stack.Screen
        name="Import"
        component={PaydayImport}
        />
      <Stack.Screen
        name="Calculating"
        component={PaydayCalculating}
        />
      <Stack.Screen
        name="List"
        component={PaydayList}
        />
    </Stack.Navigator>
  );
}

export default PaydayStack;

/*
screenOptions={{
        gestureEnabled: true,
        headerStyle: {
            height: 20
        }
      }}

// Nice card styles
screenOptions={{
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}


      */