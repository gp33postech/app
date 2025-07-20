import { FontAwesome5 } from '@expo/vector-icons';
import { useState, useEffect, useCallback } from 'react'; // <-- CORREÇÃO: Importar useEffect e useCallback
import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { functions } from '../services/firebaseConfig';
import { httpsCallable } from 'firebase/functions';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

// Componentes AdminUserRow e TableHeader (sem alterações)
const AdminUserRow = ({ item, onEdit, onDelete }) => (
  <View style={styles.rowContainer}>
    <Text style={[styles.cell, styles.titleCell]} numberOfLines={1}>{item.displayName}</Text>
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
    <Text style={[styles.headerText, styles.actionsCell, { justifyContent: 'center' }]}>Ações</Text>
  </View>
);


const AdminUserList = ({ navigation }) => {
  const [selectedTable, setSelectedTable] = useState('');
  const [professores, setProfessores] = useState([]); 
  const [alunos, setAlunos] = useState([]);       
  const [dadosTabela, setDadosTabela] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);   

  const deleteUserCallable = httpsCallable(functions, 'deleteUser');
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const listUsersFunction = httpsCallable(functions, 'listUsers');
      console.log("Chamando a função 'listUsers'...");
      const result = await listUsersFunction();
      
      const data = result.data;
      
      
      setProfessores(data.professores || []);
      setAlunos(data.alunos || []);

    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      setError("Não foi possível carregar os dados. Verifique sua conexão e permissões.");
    } finally {
      setLoading(false);
    }
  }, []); 

  useFocusEffect(
  useCallback(() => {
    // Esta lógica será executada toda vez que a tela ganhar foco
    fetchUsers();
    return () => {
    };
  }, [fetchUsers]) 
);

  
  useEffect(() => {
    if (selectedTable === 'professores') {
      setDadosTabela(professores);
    } else if (selectedTable === 'estudantes') {
      setDadosTabela(alunos);
    } else {
      setDadosTabela([]); 
    }
  }, [selectedTable, professores, alunos]);


  const handleEdit = (user) => {
    navigation.navigate('EditUserScreen', { user });
  };

  const handleCreateUser = () => {
    navigation.navigate('createUsers');
  };

  const handleDelete = (userId) => {
    console.log(userId);
    Alert.alert('Confirmar Exclusão', 'Você tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: async () => {
          try {
            
            await deleteUserCallable({uid: userId});
            Alert.alert("Sucesso", "Usuário excluído com sucesso.");
            
            fetchUsers(); 
          } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            Alert.alert("Erro", "Não foi possível excluir o usuário.");
          }
        }, style: 'destructive' },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <AdminUserRow
      key={item.uid}
      item={item}
      onEdit={() => handleEdit(item)}
      onDelete={() => {handleDelete(item.uid); console.log(item.uid)}}
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

      <View style={{ marginHorizontal: 16, marginTop: 10,marginBottom: 10, borderRadius: 8, borderWidth: 1, borderColor: '#6bb0f5ff', overflow: 'hidden' }}>
        <Picker
          selectedValue={selectedTable}
          onValueChange={(itemValue) => setSelectedTable(itemValue)}
        >
          <Picker.Item label="Selecione uma tabela" value="" />
          <Picker.Item label="Lista de Professores" value="professores" />
          <Picker.Item label="Lista de Alunos" value="estudantes" />
        </Picker>
      </View>

      {loading ? (<ActivityIndicator size="large" color="#007bff" style={{ marginTop: 50 }} />) :
        error ? (<Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>{error}</Text>) :
          (<View style={styles.tableContainer}>
            <FlatList
              data={dadosTabela}
              renderItem={renderItem}
              keyExtractor={(item) => item.uid}
              ListHeaderComponent={<TableHeader key="header" />}
              ListEmptyComponent={<Text style={{textAlign: 'center', padding: 20, color: '#666'}}>Nenhum dado para exibir. Selecione uma lista.</Text>}
            />
          </View>)
      }
    </SafeAreaView>
  );
};

// Seus estilos aqui (sem alterações)
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