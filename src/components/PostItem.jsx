import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PostItem = ({ post, onPress }) => {
  if (!post) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
     
      <Image
        source={post.image ? { uri: post.image } : require('../../assets/post_placeholder.jpg')}
        style={styles.image}
      />
      
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>{post.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{post.description}</Text>
        <Text style={styles.author}>Por: {post.author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', 
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2.22,
    alignItems: 'center', 
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  textContainer: {
    flex: 1, 
    marginLeft: 15,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  author: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default PostItem;