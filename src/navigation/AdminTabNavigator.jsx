import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { AdminPostsList } from '../screens/AdminPostsList'
import { AdminUserList } from '../screens/AdminUserList'

const Tab = createMaterialTopTabNavigator();

export function AdminTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12, textTransform: 'capitalize' },
        tabBarIndicatorStyle: { backgroundColor: '#007BFF' }, 
        tabBarStyle: { backgroundColor: '#FFF' }, 
      }}
    >
      <Tab.Screen
        name="AdminPosts"
        component={AdminPostsList}
        options={{ title: 'Gerenciar Posts' }} 
      />
      <Tab.Screen
        name="AdminUsers"
        component={AdminUserList}
        options={{ title: 'Gerenciar Usuários' }} 
      />
    </Tab.Navigator>
  );
}