
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

import CreateUserScreen from '../screens/CreateUserScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import AdminPage from '../screens/AdminPage';
import PostDetails from '../screens/PostDetails';
import Header from '../components/header';

import EditUserScreen from '../screens/EditUserScreen';
import EditPostScreen from '../screens/EditPostScreen';


const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    
    <Stack.Navigator initialRouteName="Login" screenOptions={{ header: (props) => <Header {...props} /> }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Página Inicial' }}
      />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{ title: '' }}
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
      <Stack.Screen
        name="AdminPage"
        component={AdminPage}
        options={{ title: 'Painel Administrativo' }}
      />
      <Stack.Screen
        name="EditUserScreen"
        component={EditUserScreen}
        options={{ title: 'Edição de Usuários' }}
      />
      <Stack.Screen
        name="EditPostScreen"
        component={EditPostScreen}
        options={{ title: 'Edição de Post' }}
      />
    </Stack.Navigator>
  );
}