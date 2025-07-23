
import { View, Text, ActivityIndicator, StyleSheet, Platform, StatusBar, FlatList,TouchableOpacity, TextInput } from 'react-native';
import PostItem from '../components/PostItem';
import useFetchPosts from '../hooks/useFetchPosts';
import { useAuth } from '../context/UserContext';
import React, { useState,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const { posts, loading, error, refetch } = useFetchPosts();

  const { user } = useAuth();

  const [search, setSearch] = useState(''); // Estado para busca

  //Atualizar a pagina quando o usuário voltar
    useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  // Filtra os posts conforme o texto digitado
  const filteredPosts = posts.filter(post =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  );

  // A função de clique continua a mesma
  const handlePostClick = (postId) => {
 
    navigation.navigate('PostDetails', { id: postId }); 
  };
  const buttonRender = () => {
  if (user?.role === 'admin') {
    return (
      <TouchableOpacity style={[styles.button, styles.editButton]} onPress={()=>{
        navigation.navigate('AdminPage')}}>
        <Text style={styles.buttonText}>Painel Administrativo</Text>
      </TouchableOpacity>          
  )
  }
  };

  // Os estados de loading e erro continuam iguais
  if (loading) {
    return <View style={styles.loaderContainer}><ActivityIndicator size="large" color="#5c6bc0" /></View>;
  }

  if (error) {
    return <View style={styles.loaderContainer}><Text style={styles.errorText}>{error.message || 'Ocorreu um erro'}</Text></View>;
  }
  
  
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'left', marginVertical: 10, marginLeft: 15 }}>
          {`Ola, ${user?.displayName}`}
        </Text>
      {buttonRender()}
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar postagens..."
        value={search}
        onChangeText={setSearch}
      />      
      <FlatList
        data={filteredPosts}
        // renderItem chama o PostItem para cada item na lista de posts
        renderItem={({ item }) => (
          <PostItem 
            post={item} 
            onPress={() => handlePostClick(item._id)} 
          />
        )}
        keyExtractor={(item) => item._id}
        // Mensagem para quando a lista estiver vazia
        ListEmptyComponent={<Text style={styles.infoText}>Nenhuma postagem encontrada.</Text>}
        // Adiciona um pouco de espaço no topo e no final da lista
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',    
  },
  container: { 
    flex: 1, 
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    backgroundColor: '#20365B',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: { color: 'red', fontSize: 18, margin: 38 },
  infoText: { fontSize: 18, margin: 48, textAlign: 'center' },
});