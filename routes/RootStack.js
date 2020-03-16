import React from 'react';
import { createAppContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';

// Views
import RootView from '../components/RootView';

// Shared Styles
import Colors from '../sharedColors';

const Drawer = createDrawerNavigator();

function RootStack() {
  return (
    <Drawer.Navigator
      headerMode = {'none'}
      screenOptions={{
        // This would enable both side drawer
        gestureEnabled: false,
        // transparent is an option, but is darker on Android
        cardStyle: { backgroundColor: Colors.dark}
      }}>
      <Drawer.Screen
        name="Root"
        component={RootView}
        params={{
          mode: 'payday',
          phase: 3
        }}
        />
    </Drawer.Navigator>
  );
}

export default RootStack;
