// \src\styles\detailAppStyles.js

import { StyleSheet } from 'react-native';
import  colors  from './colors';

const detailAppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.text,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 16,
    color: colors.danger,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  noPostContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  noPostText: {
    fontSize: 16,
    color: colors.text,
  },
  scrollViewContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.heading,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: colors.text,
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic',
    color: colors.secondaryText,
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: colors.secondaryText,
  },
});

export default detailAppStyles;