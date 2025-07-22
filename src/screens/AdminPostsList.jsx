import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import API_BASE_URL from '../config/apiConfig';
import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import useFetchPosts from '../hooks/useFetchPosts';
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';

const AdminPostRow = ({ item, onEdit, onDelete }) => (
  <View style={styles.rowContainer}>
    <Text style={[styles.cell, styles.titleCell]} numberOfLines={1}>{item.title}</Text>
    <Text style={[styles.cell, styles.authorCell]}>{item.author}</Text>
    <View style={styles.actionsCell}>
      <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={onEdit}>
        <FontAwesome5 name="pen" size={12} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={onDelete}>
        <FontAwesome5 name="trash" size={12} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

const TableHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={[styles.headerText, styles.titleCell]}>Título</Text>
    <Text style={[styles.headerText, styles.authorCell]}>Autor</Text>
    <Text style={[styles.headerText, styles.actionsCell, {justifyContent: 'center'}]}>Ações</Text>
  </View>
);

// The ': Props' type annotation was removed.
export const AdminPostsList = ({ navigation }) => {
  const { posts, loading, error, refetch } = useFetchPosts(API_BASE_URL + '/posts');
  // Usando mock
  // Parameter type ': string' was removed.
  const handleEdit = (postId) => {
    navigation.navigate('EditPostScreen', { id: postId });
  };

  const handleCreatePost = () => {
    navigation.navigate('createPost');
  };

 
  // Parameter type ': string' was removed.
  const handleDelete = (postId) => {
    Alert.alert('Confirmar Exclusão', 'Você tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => console.log(`Deletando: ${postId}`), style: 'destructive' },
      ]
    );
  };
  const renderItem = ({ item }) => (
    <AdminPostRow
      key={item._id}
      item={item}
      onEdit={() => handleEdit(item._id)}
      onDelete={() => handleDelete(item._id)}
    />
  );

  if (loading) {
    return <View style={styles.loaderContainer}><ActivityIndicator size="large" color="#5c6bc0" /></View>;
  }

  if (error) {
    return <View style={styles.loaderContainer}><Text style={styles.errorText}>{error.message || 'Ocorreu um erro'}</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Posts</Text>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
            <Text style={styles.createButtonText}>Novo Post</Text>
            <MaterialIcons name="post-add" size={20} color="white"/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tableContainer}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={<TableHeader />}
          ListEmptyComponent={<Text style={styles.infoText}>Nenhuma postagem encontrada.</Text>}
          onRefresh={refetch}
          refreshing={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fc',
    marginTop: StatusBar.currentHeight || 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: { color: 'red', fontSize: 18, margin: 38 },
  infoText: { fontSize: 18, margin: 48, textAlign: 'center' },
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