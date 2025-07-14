import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Platform, StatusBar, FlatList,TouchableOpacity } from 'react-native';
import PostItem from '../components/PostItem';
import useFetchPosts from '../hooks/useFetchPosts';

// Exemplo: import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
  const { posts, loading, error } = useFetchPosts();

  // A função de clique continua a mesma
  const handlePostClick = (postId) => {
    console.log('Navegando para o post com ID:', postId);
    //navigation.navigate('PostDetails', { id: postId }); 
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

        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={()=>{
      navigation.navigate('AdminPage')}}>
             <Text style={styles.buttonText}>Página Admin</Text>
      </TouchableOpacity>
     

      {/* A lógica do carrossel foi substituída pelo FlatList */}
      <FlatList
        data={posts}
        // renderItem chama o PostItem para cada item na lista de posts
        renderItem={({ item }) => (
          <PostItem 
            post={item} 
            onPress={() => handlePostClick(item._id)} 
          />
        )}
        keyExtractor={(item) => item.id}
        // Mensagem para quando a lista estiver vazia
        ListEmptyComponent={<Text style={styles.infoText}>Nenhuma postagem encontrada.</Text>}
        // Adiciona um pouco de espaço no topo e no final da lista
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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