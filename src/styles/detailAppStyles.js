// \src\styles\detailAppStyles.js

import { StyleSheet, Platform, StatusBar } from 'react-native';
import  colors  from './colors';

const detailAppStyles = StyleSheet.create({
  container: { 
    flex: 1, 
   // backgroundColor: colors.background,
   backgroundColor: '#f2f2f2',
   paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  scrollViewContent: {
    padding: 20, // Isso adicionará 20 unidades de padding em todos os lados (superior, inferior, esquerda, direita)
    paddingBottom: 20, // Isso garante que o padding inferior seja 20, caso você tenha um 'padding' geral diferente.
                           // Se o padding geral já for 20, essa linha é redundante mas não causa problema.
                           // Para seu caso, onde a imagem e o texto estão colados nas laterais, o 'padding: 20' já resolve.
    },

   content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Mantém o espaçamento lateral para o conteúdo
  },
  carouselContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 30,
  },
  cardWrapper: {},
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

export default detailAppStyles;