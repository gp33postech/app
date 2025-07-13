// src/hooks/useFetchPosts.js
import { useState, useEffect } from 'react';
import API_BASE_URL from '../config/apiConfig';

export default function useFetchPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(`${API_BASE_URL}/posts/`)
      .then(res => {
        if (!res.ok) throw new Error('Erro na consulta');
        return res.json();
      })
      .then(posts => {
        if (isMounted && Array.isArray(posts)) {
          // Ordena do mais recente ao mais antigo
          const sorted = [...posts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          setPosts(sorted);
        } else {
          setPosts([]);
        }
      })
      .catch(() => setError('Erro ao carregar postagens'))
      .finally(() => setLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  return { posts, loading, error };
}