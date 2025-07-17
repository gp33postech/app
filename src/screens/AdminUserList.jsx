import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DADOS_API = [
  { id: '1', nome: 'Gabriela', email: 'gabriela@email.com', role: 'estudante' },
  { id: '2', nome: 'Adriano', email: 'adriano@email.com', role: 'admin' },
  { id: '3', nome: 'Filipe', email: 'filipe@email.com', role: 'estudante' },
  { id: '4', nome: 'Pedro', email: 'pedro@email.com', role: 'admin' },

];

const AdminUserRow = ({ item, onEdit, onDelete }) => (
  <View style={styles.rowContainer}>
    <Text style={[styles.cell, styles.titleCell]} numberOfLines={1}>{item.nome}</Text>
    <Text style={[styles.cell, styles.authorCell]} numberOfLines={1}>{item.email}</Text>
    <Text style={[styles.cell, styles.roleCell]} numberOfLines={1}>{item.role === 'admin' ? 'Professor' : 'Aluno'}</Text>
    <View style={styles.actionsCell}>
      <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={onEdit}>
        <FontAwesome5 name="user-edit" size={12} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionButton, styles.deleteButton]} onPress={onDelete}>
        <FontAwesome5 name="user-times" size={12} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

const TableHeader = () => (
  <View style={styles.headerContainer}>
    <Text style={[styles.headerText, styles.titleCell]}>Nome</Text>
    <Text style={[styles.headerText, styles.authorCell]}>Email</Text>
    <Text style={[styles.headerText, styles.roleCell]}>Tipo</Text>
    <Text style={[styles.headerText, styles.actionsCell, {justifyContent: 'center'}]}>Ações</Text>
  </View>
);

const AdminUserList = ({ navigation }) => {
  const handleEdit = (user) => {
    navigation.navigate('EditUserScreen', { user });
  };

  const handleCreateUser = () => {
    navigation.navigate('createUsers');
  };

  const handleDelete = (userId) => {
    Alert.alert('Confirmar Exclusão', 'Você tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => console.log(`Deletando usuário: ${userId}`), style: 'destructive' },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <AdminUserRow
      key={item.id}
      item={item}
      onEdit={() => handleEdit(item)}
      onDelete={() => handleDelete(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.pageTitle}>Usuários</Text>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
            <Text style={styles.createButtonText}>Novo Usuário</Text>
            <FontAwesome5 name="user-plus" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tableContainer}>
        <FlatList
          data={DADOS_API}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<TableHeader key="header" />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  roleCell: {
    flex: 1.5,
    color: '#333',
    marginLeft: 8,
    fontSize: 14,
  },
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

export default AdminUserList;
