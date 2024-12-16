import React from 'react';
import {
  NavigationContainer,
  NavigationIndependentTree,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ProjectsScreen from './screens/ProjectsScreen';
import ProjectDetails from './screens/ProjectDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationIndependentTree>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName='ProjectsScreen'>
              <Stack.Screen name='ProjectsScreen' component={ProjectsScreen} />
              <Stack.Screen name='ProjectDetails' component={ProjectDetails} />
            </Stack.Navigator>
          </GestureHandlerRootView>
        </NavigationContainer>
      </NavigationIndependentTree>
    </PaperProvider>
  );
}
