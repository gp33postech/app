import { useState, useCallback, useEffect } from 'react';
import API_BASE_URL from '../config/apiConfig';

export default function useFetchPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Defina fetchPosts
  const fetchPosts = useCallback(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/posts/`)
      .then(res => {
        if (!res.ok) throw new Error('Erro na consulta');
        return res.json();
      })
      .then(posts => {
        const sorted = Array.isArray(posts)
          ? [...posts].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          : [];
        setPosts(sorted);
      })
      .catch(() => setError('Erro ao carregar postagens'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}