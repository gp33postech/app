import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AdminPostsList from '../screens/AdminPostsList';
import CreateUserScreen from '../screens/CreateUserScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import Header from '../components/header';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    
        <Stack.Navigator initialRouteName="Home" screenOptions={{ header: (props) => <Header {...props} /> }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Página Inicial' }}
            />
      <Stack.Screen
        name="AdminPage"
        component={AdminPostsList}
        options={{ title: 'Página Administradores' }}
      />
      <Stack.Screen
        name="createUsers"
        component={CreateUserScreen}
        options={{ title: 'Criar Usuários' }}
      />
      <Stack.Screen
        name="createPost"
        component={CreatePostScreen}
        options={{ title: 'Criar Post' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Tela de Login' }}
      />
    </Stack.Navigator>
  );
}