import { useState,useEffect } from 'react';
import {SafeAreaView,View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,Alert} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../services/firebaseConfig';
import { useAuth } from '../context/UserContext';
import { Timestamp } from 'firebase/firestore';

// A tela de formulário para criar um novo usuário
const CreateUserScreen = ({ navigation }) => {
 const { user } = useAuth();

  // Seus estados para o formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('estudante');
  const [loading, setLoading] = useState(false);

  const firebaseTimestamp = Timestamp.now();
  const dataLegivel = firebaseTimestamp.toDate();

 
  useEffect(() => {
    
    if (user?.role !== 'admin') {
      Alert.alert(
        'Acesso Negado',
        `Você não tem permissão para criar novos usuários. ${user.displayName}`,
        [{ text: 'OK', onPress: () => navigation.goBack() }] // Opção para voltar
      );
    }
  }, [user, navigation]); // Dependências: re-executa se 'user' ou 'navigation' mudarem.


  const handleCreateUser = async () => {
    
    if (!email || !password || !name) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);

    try {
      const createUserFunction = httpsCallable(functions, 'createUser');
      await createUserFunction({
        email,
        password,
        displayName: name,
        role,
        createdAt: dataLegivel,
      });

      Alert.alert('Sucesso', `Usuário ${name} criado com sucesso!`);
      navigation.goBack();

    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      Alert.alert('Erro', 'Não foi possível criar o usuário.');
    } finally {
      setLoading(false);
    }
  };

  // Se o usuário não for admin, podemos nem renderizar o formulário para evitar um "flash"
  if (user?.role !== 'admin') {
    
    return null; 
  }

  
  return (
    <SafeAreaView style={styles.container}>
      {/* ... seu ScrollView e todo o resto do JSX ... */}
      <ScrollView>
        <Text style={styles.header}>Criar Novo Usuário</Text>
        
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Digite o nome do usuário"
          autoCapitalize="words"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="exemplo@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha Provisória</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
        />

        <Text style={styles.label}>Função (Role)</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item label="Estudante" value="estudante" />
            <Picker.Item label="Professor" value="admin" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleCreateUser} disabled={loading}>
          <Text style={styles.saveButtonText}>{loading ? 'Criando...' : 'Criar Usuário'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// ... seus estilos ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginHorizontal: 20,
  },
  pickerContainer: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#28a745',
    borderRadius: 8,
    padding: 18,
    margin: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default CreateUserScreen;