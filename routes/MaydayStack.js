import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';

// Views
import MaydayPlay from '../components/mayday/MaydayPlay';

// Shared Styles
import Colors from '../sharedColors';

const Stack = createStackNavigator();

function MaydayStack() {
  return (
    <Stack.Navigator
      headerMode='none'
      screenOptions={{
         // This enables swipping to go back
        gestureEnabled: true,
        cardStyle: { backgroundColor: Colors.maydayBg }
      }}
    >
      <Stack.Screen
        name="Play"
        component={MaydayPlay}
        />
    </Stack.Navigator>
  );
}

export default MaydayStack;