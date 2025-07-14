// src/styles/detailAppStyles.js
import { StyleSheet, Platform, StatusBar } from 'react-native'; 
import colors from './colors';

const detailAppStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background || '#f8f9fa',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },

    scrollViewContent: {
        padding: 20, 
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
    
    postDescription: { // Estilo para o corpo do texto (descrição)
        fontSize: 17,
        lineHeight: 26,
        color: colors.text || '#333333',
        marginBottom: 20,
    },
    metaContainer: { // Container para alinhamento de autor e data
        flexDirection: 'row',
        justifyContent: 'space-between', // Alinha autor à esquerda e data à direita
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10, // Espaçamento antes do final do conteúdo
    },
    postAuthor: { // Estilo para o autor
        fontSize: 15,
        fontStyle: 'italic',
        color: colors.secondaryText || '#6c757d',
    },
    postDate: { // Estilo para a data
        fontSize: 13,
        color: colors.secondaryText || '#6c757d',
        textAlign: 'right', // Garante alinhamento à direita dentro do metaContainer
    },

});

export default detailAppStyles;