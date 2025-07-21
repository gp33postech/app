import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
// 1. Importe o hook 'useSafeAreaInsets'
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import colors from '../styles/colors';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ navigation, route, options }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };
  // 2. Chame o hook para pegar as medidas da área segura do dispositivo
  const insets = useSafeAreaInsets();

  const title = options?.title ?? route?.name ?? 'BlogTech';
  const canGoBack = navigation?.canGoBack();

  return (
    // 3. O View principal agora tem um paddingTop dinâmico
    //    O valor é a altura da barra de status (insets.top) + um padding extra
    <View style={[styles.header, { paddingTop: insets.top + 15 }]}>
      {canGoBack && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      )}
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <View style={{ flex: 1 }} />
      {route.name !== 'Login' && (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    // O paddingTop agora é dinâmico, então definimos os outros paddings aqui
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.header,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  backButton: {
    padding: 5,
  },
  button: {
    backgroundColor: colors.button,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 7,
    marginLeft: 15,
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
  },
});