// src/styles/homeStyles.js
import { StyleSheet } from 'react-native';
import colors from './colors'; // Supondo que você tenha um arquivo de cores

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // ALTERAÇÃO: Removidos paddingTop e paddingBottom excessivos. 
    // O SafeAreaView no componente irá gerenciar o espaçamento do topo.
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