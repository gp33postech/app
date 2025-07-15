import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';




// The ': Props' type annotation was removed.
const AdminPostsList = ({ navigation }) => {
  // Parameter type ': string' was removed.
  const handleEdit = (postId) => {
    // navigation.navigate('EditPostScreen', { postId });
  };
  
  const handleCreatePost = () => {
     navigation.navigate('AdminPostsList');
  };

  const handleCreateUsers = () =>{
    navigation.navigate('createUsers')
  }

  // Parameter type ': string' was removed.
  const handleDelete = (postId) => {
    Alert.alert('Confirmar Exclusão', 'Você tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => console.log(`Deletando: ${postId}`), style: 'destructive' },
      ]
    );
  };

  // The type annotation for the destructured 'item' was removed.
  const renderItem = ({ item }) => (
    <AdminPostRow
      item={item}
      onEdit={() => handleEdit(item.id)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Admin</Text>       
      </View>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateUsers}>
          <Text style={styles.createButtonText}>Usuários</Text>
          <FontAwesome5 name="user-plus" size={15} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
          <Text style={styles.createButtonText}>Posts</Text>
          <MaterialIcons name="post-add" size={20} color="white"/>
        </TouchableOpacity>
      </View>      
    </SafeAreaView>
  );
};

// The styles remain exactly the same.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fc',
    marginTop: StatusBar.currentHeight || 0,
  },
  topBar: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  topButtonsContainer: {
    flexDirection: 'row', 
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10, 
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight: 8, 
  },
  tableContainer: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  cell: {
    fontSize: 14,
    color: '#333',
  },
  titleCell: {
    flex: 3,
    fontWeight: '500',
  },
  authorCell: {
    flex: 2,
    marginLeft: 8
  },
  actionsCell: {
    flex: 1.5, 
    flexDirection: 'row', 
    justifyContent: 'center', 
  },
  actionButton: {
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 4, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
});

export default AdminPostsList;