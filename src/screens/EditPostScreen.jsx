import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image
} from 'react-native';

const EditPostScreen = ({ route, navigation }) => {
  const [imagem, setImagem] = useState(post?.imagem || null);
  // Recebe os dados do post via params
  const { post } = route.params || {};
  const [titulo, setTitulo] = useState(post?.titulo || '');
  const [autor, setAutor] = useState(post?.autor || '');
  const [conteudo, setConteudo] = useState(post?.conteudo || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!titulo || !autor || !conteudo) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      // Aqui você pode chamar a API para atualizar o post
      // Exemplo: await updatePost({ id: post?.id, titulo, autor, conteudo });
      Alert.alert('Sucesso', 'Post atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o post.');
    } finally {
      setLoading(false);
    }
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          style={[styles.input, {height: 120}]}
          value={conteudo}
          onChangeText={setConteudo}
          placeholder="Digite o conteúdo do post"
          multiline
        />
        <Text style={styles.label}>Imagem</Text>
        {imagem && (
          <Image source={{ uri: imagem }} style={styles.imagePreview} />
        )}
        <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
          <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          <Text style={styles.saveButtonText}>{loading ? 'Salvando...' : 'Salvar'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imagePreview: {
    width: '90%',
    height: 180,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 12,
    marginTop: 8,
  },
  imageButton: {
    backgroundColor: '#6c757d',
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 18,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
    marginBottom: 10,
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
