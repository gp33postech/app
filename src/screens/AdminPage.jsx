import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AdminPage = ({ navigation }) => {
  const handleOpenUserList = () => {
    navigation.navigate('AdminUserList');
  };

  const handleOpenPostsList = () => {
    navigation.navigate('AdminPostsList');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Barra superior para o título "Admin" */}
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Painel Administrativo</Text>
      </View>

      {/* Área principal para os botões */}
      <View style={styles.mainButtonArea}>
        {/* Botão Usuários */}
        <TouchableOpacity style={styles.userButton} onPress={handleOpenUserList}>
          <Text style={styles.buttonText}>Usuários</Text>
          <FontAwesome5 name="user-cog" size={30} color="white" />
        </TouchableOpacity>

        {/* Botão Posts */}
        <TouchableOpacity style={styles.postsButton} onPress={handleOpenPostsList}>
          <Text style={styles.buttonText}>Posts</Text>
          <MaterialIcons name="post-add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Define um estilo base para os botões para evitar repetição
const baseButton = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#007bff',
  borderRadius: 25, 
  height: 150, 
  width: 300, 
  elevation: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5.46,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fc',
    marginTop: StatusBar.currentHeight || 0,
  },
  topBar: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#333',
  },
  mainButtonArea: {
    flex: 1, 
    justifyContent: 'flex-start',
    alignItems: 'center', 
    paddingTop: 30, 
  },
  userButton: {
    ...baseButton,
    marginBottom: 30,
  },
  postsButton: {
    ...baseButton,
    marginTop: -10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
    marginRight: 15,
  },
});

export default AdminPage;