import { SafeAreaView, StyleSheet } from 'react-native';
import { AdminTabNavigator } from '../navigation/AdminTabNavigator'; 

export default function AdminPage() {
  return (
    <SafeAreaView style={styles.container}>
      <AdminTabNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Cor de fundo da página, se necessário
  },
});