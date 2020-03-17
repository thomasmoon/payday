import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

// Views
import MaydayPlay from '../components/mayday/MaydayPlay';
import MaydayShips from '../components/mayday/MaydayShips';
import MaydayTarget from '../components/mayday/MaydayTarget';
import MaydayWait from '../components/mayday/MaydayWait';
import MaydayGameOver from '../components/mayday/MaydayGameOver';

// Shared Styles
import Colors from '../sharedColors';

const Stack = createStackNavigator();

function MaydayStack() {
  return (
    <Stack.Navigator
      headerMode='none'
      screenOptions={{
         // This enables swipping to go back
        gestureEnabled: false,
        cardStyle: { backgroundColor: Colors.maydayBg },
        /* Settings for fade transition */
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
        })
      }}
    >
      <Stack.Screen
        name="Play"
        component={MaydayPlay}
        />
      <Stack.Screen
        name="Ships"
        component={MaydayShips}
        />
      <Stack.Screen
        name="Target"
        component={MaydayTarget}
        />
      <Stack.Screen
        name="Wait"
        component={MaydayWait}
        />
      <Stack.Screen
        name="GameOver"
        component={MaydayGameOver}
        />
    </Stack.Navigator>
  );
}

export default MaydayStack;