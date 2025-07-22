import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar,Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../services/firebaseConfig';


const EditUserScreen = ({ route, navigation }) => {

  
  // Recebe os dados do usuário 
  const { user } = route.params || {};
  
  const [nome, setNome] = useState(user?.displayName || '');
  const email = user?.email;
  const [role, setRole] = useState(user?.role || 'estudante');

  const updateUserCallable = httpsCallable(functions, 'updateUser');

  const handleSave = async() => {
   
    try {
      await updateUserCallable({
        uid: user.uid,
        displayName: nome,
        role: role,
      });
      Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
      navigation.goBack(); 
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    }
  
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Editar Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
        />
        <View style={styles.input}>
        <Text style={styles.emailText}>{email}</Text>
        </View>
        <Text style={styles.label}>Função (Role)</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item key="estudante" label="Aluno" value="estudante" />
            <Picker.Item key="admin" label="Professor" value="admin" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f7fc',
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    borderRadius: 10,
    padding: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 18,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 7,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 7,
    backgroundColor: '#f8f9fa',
    marginBottom: 16,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emailText: {
    fontSize: 16,
    color: '#6c757d', 
},
});

export default EditUserScreen;
