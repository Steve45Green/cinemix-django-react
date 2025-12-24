// src/pages/HomePage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getFilmes } from '../lib/api';
import MovieCarousel from '../features/movie-discorvery/components/MovieCarousel';
import ErrorMessage from '../components/ErrorMessage';
import { Filme } from '../types';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [popularMovies, setPopularMovies] = useState<Filme[]>([]);
  const [recentMovies, setRecentMovies] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [popularResponse, recentResponse] = await Promise.all([
        getFilmes({ ordering: '-popularidade' }),
        getFilmes({ ordering: '-ano_lancamento' }),
      ]);
      
      setPopularMovies(popularResponse.results);
      setRecentMovies(recentResponse.results);
      
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  if (loading) {
    return <div className="text-center text-white py-10">A carregar filmes...</div>;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchMovies} />;
  }

  return (
    <div className="space-y-12">
      <MovieCarousel title={t('homePage.popular')} movies={popularMovies} />
      <MovieCarousel title={t('homePage.recent')} movies={recentMovies} />
    </div>
  );
};

export default HomePage;
