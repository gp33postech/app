// src/styles/homeStyles.js
import { StyleSheet } from 'react-native';
import colors from './colors'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Mantém o espaçamento lateral para o conteúdo
  }
});

export default styles;