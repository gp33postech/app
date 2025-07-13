// src/styles/homeStyles.js
import { StyleSheet } from 'react-native';
import colors from './colors';

// 20mm ≈ 126dp (calculo explicado antes)
const MM_20 = 165;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // cinza claro
    alignItems: 'center',
    // Remover o velho paddingTop ou substituí-lo
    marginTop: MM_20,
    marginBottom: MM_20,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default styles;