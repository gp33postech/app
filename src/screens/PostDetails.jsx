import React from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator,SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useFetch } from '../hooks/useFetch';
import API_BASE_URL from '../config/apiConfig';
import Header from '../components/header';
import colors from '../styles/colors';
import detailAppStyles from '../styles/detailsPostsStyles';

const POST_PLACEHOLDER_IMAGE = require('../../assets/post_placeholder.jpg'); // Imagem de placeholder para posts sem imagem

export default function PostDetails ({ route }){
    const { id } = route.params ?? {}; 

    if (!id) {
        return (
            <View style={detailAppStyles.container}>             
                <View style={detailAppStyles.centeredContent}>
                    <Text style={detailAppStyles.errorText}>Não foi possível carregar os detalhes do post.</Text>
                    <Text style={detailAppStyles.errorText}>O identificador do post (ID) não foi fornecido ou é inválido.</Text>
                    <Text style={detailAppStyles.errorText}>Por favor, retorne e tente acessar o post novamente.</Text>
                </View>
            </View>
        );
    }

    const postUrl = `${API_BASE_URL}/posts/${id}`;
    
    const { data: post, loading, error } = useFetch(postUrl);

    if (loading) {
        return (
            <View style={detailAppStyles.container}>              
                <View style={detailAppStyles.centeredContent}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={detailAppStyles.loadingText}>Carregando detalhes do post...</Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={detailAppStyles.container}>          
                <View style={detailAppStyles.centeredContent}>
                    <Text style={detailAppStyles.errorText}>Erro ao carregar o post:</Text>
                    <Text style={detailAppStyles.errorText}>{error.message || 'Erro desconhecido'}</Text>
                    <Text style={detailAppStyles.errorText}>Por favor, verifique sua conexão ou tente novamente.</Text>
                </View>
            </View>
        );
    }

    if (!post) {
        return (
            <View style={detailAppStyles.container}>            
                <View style={detailAppStyles.centeredContent}>
                    <Text style={detailAppStyles.notFoundText}>O post solicitado não foi encontrado.</Text>
                    <Text style={detailAppStyles.notFoundText}>Verifique se o ID está correto.</Text>
                </View>
            </View>
        );
    }

    const postImageSource = post.image ? { uri: post.image } : POST_PLACEHOLDER_IMAGE;

    return (
        <SafeAreaView style={detailAppStyles.container}>             
            <ScrollView contentContainerStyle={detailAppStyles.scrollViewContent}>
                <Image source={postImageSource} style={detailAppStyles.postImage} resizeMode="cover" />
                <Text style={detailAppStyles.postTitle}>{post.title}</Text>
                
                {post.description && ( // Exibe a descrição se ela existir no post
                    <Text style={detailAppStyles.postDescription}>{post.description}</Text>
                )}

                <View style={detailAppStyles.metaContainer}>
                  {post.author && (
                    <Text style={detailAppStyles.postAuthor}>Por: {post.author}</Text>
                )}
                  {post.updatedAt && (
                    <Text style={detailAppStyles.postDate}>
                    Publicado em: {new Date(post.updatedAt).toLocaleDateString('pt-BR')}
                    </Text>
                )}
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

