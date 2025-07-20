import React, { useState } from 'react';
import {SafeAreaView,View,Text,TextInput,StyleSheet,TouchableOpacity,ScrollView,Alert,Image,StatusBar,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';

// Tela de formulário para criar ou editar um post
const CreatePostScreen = ({ navigation }) => {
  // Estados para controlar os campos do formulário
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  // O tipo genérico <string | null> foi removido do useState
  const [imagemUri, setImagemUri] = useState(null);

  const selecionarImagem = async () => {
    // Pede permissão para acessar a galeria
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Você precisa permitir o acesso à galeria para selecionar uma imagem.');
      return;
    }

    // Abre o seletor de imagens
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const handleSalvar = () => {
    if (!titulo || !conteudo) {
      Alert.alert('Campos Incompletos', 'Por favor, preencha o título e o conteúdo do post.');
      return;
    }

    // enviaros dados (titulo, conteudo, imagemUri) para o backend
    console.log({ titulo, conteudo, imagemUri });
    Alert.alert('Post Salvo!', 'Seu post foi salvo com sucesso (simulação).');
    navigation.goBack();
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Criar Novo Post</Text>

        {/* Campo de Título */}
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Título do Post"
        />

        {/* Campo de Conteúdo */}
        <Text style={styles.label}>Conteúdo</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={conteudo}
          onChangeText={setConteudo}
          placeholder="Escreva aqui o conteúdo do seu post..."
          multiline={true}
          numberOfLines={10}
        />

        {/* Seletor de Imagem */}
        <Text style={styles.label}>Imagem de Capa</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={selecionarImagem}>
          <FontAwesome5 name="image" size={20} color="#007bff" />
          <Text style={styles.imagePickerText}>Selecionar Imagem</Text>
        </TouchableOpacity>

        {/* Pré-visualização da Imagem Selecionada */}
        {imagemUri && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imagemUri }} style={styles.imagePreview} />
            <TouchableOpacity style={styles.removeImageButton} onPress={() => setImagemUri(null)}>
              <FontAwesome5 name="times" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}

        {/* Botões de Ação */}
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelar}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSalvar}>
            <Text style={[styles.buttonText, styles.saveButtonText]}>Salvar Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos para a tela
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#343a40',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 8,
    color: '#495057',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginHorizontal: 20,
  },
  textArea: {
    height: 200,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ecef',
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
  },
  imagePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#007bff',
    fontWeight: '600',
  },
  imagePreviewContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    alignItems: 'center',
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 30,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  saveButtonText: {
    color: '#fff',
  },
});

export default CreatePostScreen;