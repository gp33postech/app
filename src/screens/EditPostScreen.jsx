import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  Image,
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useFetch } from '../hooks/useFetch';
import API_BASE_URL from '../config/apiConfig';

const EditPostScreen = ({ route, navigation }) => {
  const { id } = route.params || {};
  const postUrl = `${API_BASE_URL}/posts/${id}`;
  const { data: post, loading, error } = useFetch(postUrl);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (post) {
      setTitulo(post.title || '');
      setAutor(post.author || '');
      setConteudo(post.description || '');
      setImagem(post.image || null);
    }
  }, [post]);

  const handleSave = async () => {
  if (!titulo || !autor || !conteudo) {
    Alert.alert('Erro', 'Preencha todos os campos.');
    return;
  }
  setSaving(true);
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: titulo,
        author: autor,
        description: conteudo,
        image: imagem, // <-- Adicione esta linha!
      }),
    });
    if (!response.ok) throw new Error('Erro ao atualizar o post');
    Alert.alert('Sucesso', 'Post atualizado com sucesso!');
    navigation.goBack();
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível atualizar o post.');
  } finally {
    setSaving(false);
  }
};

  // Função igual à da tela de criar post
 const selecionarImagem = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão necessária', 'Você precisa permitir o acesso à galeria para selecionar uma imagem.');
    return;
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [16, 9],
    quality: 1,
  });

  if (!result.canceled && result.assets && result.assets.length > 0) {
    setImagem(result.assets[0].uri);
  }
};

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5c6bc0" />
        <Text style={styles.loadingText}>Carregando post...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Erro ao carregar o post: {error.message || 'Erro desconhecido'}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.header}>Editar Post</Text>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Digite o título do post"
        />
        <Text style={styles.label}>Autor</Text>
        <TextInput
          style={styles.input}
          value={autor}
          onChangeText={setAutor}
          placeholder="Nome do autor"
        />
        <Text style={styles.label}>Conteúdo</Text>
        <TextInput
          style={[styles.input, { height: 120 }]}
          value={conteudo}
          onChangeText={setConteudo}
          placeholder="Digite o conteúdo do post"
          multiline
        />
        <Text style={styles.label}>Imagem de Capa</Text>
                <TouchableOpacity style={styles.imagePickerButton} onPress={selecionarImagem}>
                  <FontAwesome5 name="image" size={20} color="#007bff" />
                  <Text style={styles.imagePickerText}>Selecionar Imagem</Text>
                </TouchableOpacity>
        {imagem && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imagem }} style={styles.imagePreview} />
            <TouchableOpacity style={styles.removeImageButton} onPress={() => setImagem(null)}>
              <FontAwesome5 name="times" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={saving}>
          <Text style={styles.saveButtonText}>{saving ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    margin: 38,
    textAlign: 'center',
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
    marginBottom: 10,
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
  saveButton: {
    backgroundColor: '#007bff',
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

export default EditPostScreen;