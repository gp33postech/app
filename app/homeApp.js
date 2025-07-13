// app/homeApp.js
import React, { useState } from 'react';
// ALTERAÇÃO: Importado Platform e StatusBar para calcular a margem do topo dinamicamente
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import Header from '../src/components/header';
import useFetchPosts from '../src/hooks/useFetchPosts';

export default function HomeApp() {
  const { posts, loading, error } = useFetchPosts();
  const [current, setCurrent] = useState(0);

  // Navegação do carrossel
  const handlePrev = () => setCurrent(prev => prev === 0 ? posts.length - 1 : prev - 1);
  const handleNext = () => setCurrent(prev => prev === posts.length - 1 ? 0 : prev + 1);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <ActivityIndicator style={{marginTop: 32}} size="large" color="#888" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={{color: 'red', fontSize: 18, margin: 38}}>{error.message || 'Ocorreu um erro'}</Text>
      </View>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <View style={styles.container}>
        <Header />
        <Text style={{fontSize: 18, margin: 48}}>Nenhuma postagem encontrada.</Text>
      </View>
    );
  }

  const post = posts[current];

  return (
    // ALTERAÇÃO: Trocado SafeAreaView por View para usar o padding manual
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* Carrossel com setas */}
        <View style={styles.carouselContainer}>
          {/* Seta esquerda */}
          <TouchableOpacity
            style={[styles.arrowButton, {left: 16}]}
            onPress={handlePrev}
            accessibilityLabel="Anterior"
          >
            <Text style={styles.arrowText}>{'‹'}</Text>
          </TouchableOpacity>
          
          {/* Card da postagem */}
          <View style={styles.card}>
            <Image
              source={post.image ? { uri: post.image } : require('../assets/post_placeholder.jpg')}
              style={styles.postImage}
              resizeMode="cover"
            />
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.description}>{post.description}</Text>
            <View style={styles.meta}>
              <Text style={styles.author}>Autor: {post.author}</Text>
              <Text style={styles.date}>
                {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString('pt-BR') : '--/--/----'}
              </Text>
            </View>
          </View>
          
          {/* Seta direita */}
          <TouchableOpacity
            style={[styles.arrowButton, {right: 16}]}
            onPress={handleNext}
            accessibilityLabel="Próxima"
          >
            <Text style={styles.arrowText}>{'›'}</Text>
          </TouchableOpacity>
        </View>

        {/* Indicadores de página */}
        <View style={styles.dotsContainer}>
          {posts.map((_, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => setCurrent(idx)}
              style={[styles.dot, current === idx && styles.dotActive]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ALTERAÇÃO: Adicionado paddingTop dinâmico para afastar o conteúdo da barra de status
  container: { 
    flex: 1, 
    backgroundColor: '#f2f2f2',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  content: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
  carouselContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 30,
  },
  card: {
    width: 320,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
    marginHorizontal: 14,
  },
  postImage: {
    width: '100%',
    height: 170,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    backgroundColor: '#eee',
    marginBottom: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'flex-start',
    marginLeft: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginHorizontal: 18,
    marginBottom: 15,
    textAlign: 'left',
    alignSelf: 'stretch'
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
    alignSelf: 'center',
    marginTop: 0,
  },
  author: {
    color: '#666',
    fontWeight: '500',
    fontSize: 14,
  },
  date: {
    color: '#bbb',
    fontSize: 14,
    fontWeight: '500',
  },
  arrowButton: {
    position: 'absolute',
    top: '45%',
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.8)',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  arrowText: { fontSize: 36, color: '#444', fontWeight: 'bold' },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
    marginBottom: 9,
    gap: 7,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#bbb'
  },
  dotActive: {
    backgroundColor: '#5c6bc0',
    transform: [{ scale: 1.26 }]
  }
});