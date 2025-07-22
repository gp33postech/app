import { useState, useCallback, useEffect, useRef } from 'react';
import API_BASE_URL from '../config/apiConfig';

export default function useFetchPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isMounted = useRef(true);

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
        if (isMounted.current) setPosts(sorted);
      })
      .catch(() => {
        if (isMounted.current) setError('Erro ao carregar postagens');
      })
      .finally(() => {
        if (isMounted.current) setLoading(false);
      });
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchPosts();
    return () => {
      isMounted.current = false;
    };
  }, [fetchPosts]);

  return { posts, loading, error, refetch: fetchPosts };
}