import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import AdminPostsList from '../screens/AdminPostsList';
import CreateUserScreen from '../screens/CreateUserScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import AdminPage from '../screens/AdminPage';
import PostDetails from '../screens/PostDetails';
import Header from '../components/header';


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
        name="AdminPostsList"
        component={AdminPostsList}
        options={{ title: 'Página de Posts' }}
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
    </Stack.Navigator>
  );
}