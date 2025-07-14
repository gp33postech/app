// Exemplo de App.js (ou seu arquivo de navegação principal)
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import 'react-native-gesture-handler'; // Adicione esta linha no topo do seu App.js ou index.js
import { enableScreens } from 'react-native-screens';

import HomeApp from './app/homeApp';      // Seu componente HomeApp
import DetalhesApp from './app/detailApp'; // Seu componente DetalhesApp

enableScreens(); // Chame esta função após os imports e antes do seu componente App

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeApp">
        <Stack.Screen
          name="HomeApp"
          component={HomeApp}
          options={{ headerShown: false }} // Oculta o cabeçalho padrão da navegação
        />
        <Stack.Screen
          name="DetalhesApp" // Este nome deve corresponder ao que você usa em navigation.navigate()
          component={DetalhesApp}
          options={{ headerShown: false }} // Oculta o cabeçalho padrão da navegação
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;