// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react';

// Este é um hook genérico para buscar dados de uma API
// Ele aceita uma URL e um objeto de opções para o fetch (como método, headers, body, etc.)
export const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usamos useCallback para memoizar a função fetchData
  // Isso evita que ela seja recriada a cada renderização se não for necessário
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null); // Resetar erros a cada nova requisição

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        // Lidar com respostas HTTP que não são sucesso (ex: 404, 500)
        const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err); // Captura erros de rede ou de processamento da resposta
      console.error("Erro no useFetch:", err); // Para depuração
    } finally {
      setLoading(false);
    }
  }, [url, options]); // Dependências do useCallback: url e options

  useEffect(() => {
    if (url) { // Só executa a busca se a URL estiver definida
      fetchData();
    }
  }, [url, options, fetchData]); // Dependências do useEffect

  return { data, loading, error };
};