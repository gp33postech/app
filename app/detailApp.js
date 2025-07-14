// app/detailApp.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Importar useRoute para acessar route.params
import { useFetch } from '../src/hooks/useFetch';
import  API_BASE_URL  from '../src/config/apiConfig'; // Importar API_BASE_URL
import Header from '../src/components/header';
import  colors  from '../src/styles/colors';
import detailAppStyles from '../src/styles/detailAppStyles';

const POST_PLACEHOLDER_IMAGE = require('../assets/post_placeholder.jpg');

const DetailApp = ({ route }) => { // 'route' é recebido como prop via React Navigation
    // Recebe o 'id' dos parâmetros da rota. O '?? {}' garante que,
    // se route.params for undefined ou null, ele use um objeto vazio para evitar erros.
    const { id } = route.params ?? {}; 

    // Validação do ID: Se o ID não for válido (null, undefined, ou vazio),
    // exibe uma mensagem de erro e não tenta fazer a requisição à API.
    if (!id) {
        return (
            <View style={styles.container}>
                <Header title="Erro de Acesso" />
                <View style={styles.centeredContent}>
                    <Text style={styles.errorText}>Não foi possível carregar os detalhes do post.</Text>
                    <Text style={styles.errorText}>O identificador do post (ID) não foi fornecido ou é inválido.</Text>
                    <Text style={styles.errorText}>Por favor, retorne e tente acessar o post novamente.</Text>
                </View>
            </View>
        );
    }

    // CONSTRUÇÃO CORRETA DA URL: Combina a API_BASE_URL com o ID dinâmico.
    // Esta é a URL que será usada para buscar os detalhes do post específico.
    const postUrl = `${API_BASE_URL}/posts/${id}`;
    
    // Chama o hook useFetch com a URL dinâmica construída.
    const { data: post, loading, error } = useFetch(postUrl);

    if (loading) {
        return (
            <View style={styles.container}>
                <Header title="Carregando..." />
                <View style={styles.centeredContent}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Carregando detalhes do post...</Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Header title="Erro" />
                <View style={styles.centeredContent}>
                    <Text style={styles.errorText}>Erro ao carregar o post:</Text>
                    <Text style={styles.errorText}>{error.message || 'Erro desconhecido'}</Text>
                    <Text style={styles.errorText}>Por favor, verifique sua conexão ou tente novamente.</Text>
                </View>
            </View>
        );
    }

    if (!post) {
        return (
            <View style={styles.container}>
                <Header title="Post Não Encontrado" />
                <View style={styles.centeredContent}>
                    <Text style={styles.notFoundText}>O post solicitado não foi encontrado.</Text>
                    <Text style={styles.notFoundText}>Verifique se o ID está correto ou se o post existe.</Text>
                </View>
            </View>
        );
    }

    const postImageSource = post.image ? { uri: post.image } : POST_PLACEHOLDER_IMAGE;

    return (
        <View style={styles.container}>
            <Header title="Detalhes do Post" />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Image source={postImageSource} style={styles.postImage} resizeMode="cover" />
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postBody}>{post.body}</Text>
                {post.userId && (
                    <Text style={styles.postAuthor}>Autor: Usuário {post.userId}</Text>
                )}
            </ScrollView>
        </View>
    );
};
//========> Inicio Styles - Transferir para o arquivo de estilos src/styles/detailAppStyles.js
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background || '#f8f9fa',
    },
    scrollViewContent: {
        padding: 16,
        paddingBottom: 20,
    },
    centeredContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: colors.text || '#333333',
    },
    errorText: {
        fontSize: 16,
        color: colors.danger || '#dc3545',
        textAlign: 'center',
        marginBottom: 5,
    },
    notFoundText: {
        fontSize: 18,
        color: colors.secondaryText || '#6c757d',
        textAlign: 'center',
        marginTop: 10,
    },
    postImage: {
        width: '100%',
        height: 220,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: colors.lightGray || '#e9ecef',
    },
    postTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: colors.primary || '#007bff',
        marginBottom: 12,
        lineHeight: 32,
    },
    postBody: {
        fontSize: 17,
        lineHeight: 26,
        color: colors.text || '#333333',
        marginBottom: 20,
    },
    postAuthor: {
        fontSize: 15,
        fontStyle: 'italic',
        color: colors.secondaryText || '#6c757d',
        textAlign: 'right',
        width: '100%',
    },
});
//========> Fim Styles - Transferir para o arquivo de estilos src/styles/detailAppStyles.js
export default DetailApp;