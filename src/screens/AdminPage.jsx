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
  borderRadius: 25, // Bordas mais arredondadas para os botões grandes
  height: 150,      // Altura conforme solicitado (interpretado como dp)
  width: 300,       // Largura conforme solicitado (interpretado como dp)
  // Adiciona sombra para um efeito visual de profundidade
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
    // --- ALTERADO AQUI ---
    // Reduzimos o padding vertical para diminuir o espaço em torno do título.
    paddingVertical: 20, // Era 50
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#333',
  },
  mainButtonArea: {
    flex: 1, // Mantém para que esta área ocupe o restante do espaço na tela
    // --- ALTERADO AQUI ---
    // Alinha os botões ao topo da área, em vez de centralizá-los verticalmente.
    justifyContent: 'flex-start', // Era 'center'
    alignItems: 'center',    // Mantém o alinhamento horizontal dos botões.
    // --- ADICIONADO AQUI ---
    // Adiciona um padding no topo desta área para criar um espaço razoável entre o título e os botões.
    paddingTop: 30, 
  },
  userButton: {
    ...baseButton,
    marginBottom: 30, // Mantido para o espaçamento entre os botões.
  },
  postsButton: {
    ...baseButton,
    marginTop: -10, // Mantido para a proximidade entre os botões.
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
    marginRight: 15,
  },
});

export default AdminPage;