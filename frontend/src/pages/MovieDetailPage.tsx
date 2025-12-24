// src/pages/MovieDetailPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getFilmeDetail, getMovieStatus, toggleWatchlist, toggleFavorite, getMovieReviews } from '../lib/api';
import { Filme, MovieStatus, Review } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import { useUserStore } from '../store/userStore';
import ReviewCard from '../features/reviews/components/ReviewCard';
import ReviewForm from '../features/reviews/components/ReviewForm';

const MovieDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [movie, setMovie] = useState<Filme | null>(null);
  const [status, setStatus] = useState<MovieStatus>({ in_watchlist: false, is_favorite: false });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { isAuthenticated, user } = useUserStore();

  const fetchMovieData = useCallback(async () => {
    if (!slug) return;
    try {
      setLoading(true);
      setError(null);
      
      const [movieData, reviewsData] = await Promise.all([
        getFilmeDetail(slug),
        getMovieReviews(slug)
      ]);
      setMovie(movieData);
      setReviews(reviewsData);

      if (isAuthenticated) {
        const statusData = await getMovieStatus(slug);
        setStatus(statusData);
      }
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [slug, isAuthenticated]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleToggleWatchlist = async () => {
    if (!slug) return;
    const originalStatus = status.in_watchlist;
    setStatus(prev => ({ ...prev, in_watchlist: !prev.in_watchlist }));
    try {
      await toggleWatchlist(slug);
    } catch (err) {
      setStatus(prev => ({ ...prev, in_watchlist: originalStatus }));
      console.error("Failed to toggle watchlist", err);
    }
  };

  const handleToggleFavorite = async () => {
    if (!slug) return;
    const originalStatus = status.is_favorite;
    setStatus(prev => ({ ...prev, is_favorite: !prev.is_favorite }));
    try {
      await toggleFavorite(slug);
    } catch (err) {
      setStatus(prev => ({ ...prev, is_favorite: originalStatus }));
      console.error("Failed to toggle favorite", err);
    }
  };

  const handleReviewSubmit = (newReview: Review) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };

  const userHasReviewed = reviews.some(review => review.autor.id === user?.id);

  // CORREÇÃO: Reintroduzir as guardas de segurança
  if (loading) {
    return <div className="text-center text-white py-10">A carregar detalhes...</div>;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchMovieData} />;
  }

  if (!movie) {
    return <div className="text-center text-white py-10">Filme não encontrado.</div>;
  }

  return (
    <div className="text-white">
      <div className="relative h-[60vh] -mb-48">
        <div className="absolute inset-0 overflow-hidden">
          <img src={movie.backdrop || movie.poster} alt={`Backdrop for ${movie.titulo}`} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
        </div>
        <div className="relative container mx-auto px-8 h-full flex items-end pb-8">
          <div className="w-1/4 flex-shrink-0 shadow-2xl">
            <img src={movie.poster} alt={`Poster for ${movie.titulo}`} className="rounded-lg w-full" />
          </div>
          <div className="ml-8">
            <p className="text-xl text-gray-300">{movie.ano_lancamento}</p>
            <h1 className="text-6xl font-bold leading-tight">{movie.titulo}</h1>
          </div>
        </div>
      </div>

      <div className="relative bg-transparent pt-52">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              {isAuthenticated && (
                <div className="flex flex-col space-y-3 p-4 bg-brand-light rounded-lg">
                  <button 
                    onClick={handleToggleWatchlist}
                    className={`px-4 py-2 rounded-md transition-colors text-center font-semibold ${status.in_watchlist ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-green-600 text-white hover:bg-green-700'}`}
                  >
                    {status.in_watchlist ? 'Remover da Watchlist' : 'Adicionar à Watchlist'}
                  </button>
                  <button 
                    onClick={handleToggleFavorite}
                    className={`px-4 py-2 rounded-md transition-colors text-center font-semibold ${status.is_favorite ? 'bg-gray-500 text-white hover:bg-gray-600' : 'bg-pink-600 text-white hover:bg-pink-700'}`}
                  >
                    {status.is_favorite ? 'Remover dos Favoritos' : 'Marcar como Favorito'}
                  </button>
                </div>
              )}
            </div>

            <div className="md:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Sinopse</h2>
                <p className="text-gray-300 leading-relaxed text-justify">
                  {movie.descricao || "Sinopse não disponível."}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                {isAuthenticated && !userHasReviewed && (
                  <div className="mb-8">
                    <ReviewForm movieSlug={slug!} onReviewSubmit={handleReviewSubmit} />
                  </div>
                )}
                {isAuthenticated && userHasReviewed && (
                  <div className="mb-8 bg-brand-light p-4 rounded-lg text-center text-gray-400">
                    Você já fez uma review para este filme.
                  </div>
                )}
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map(review => <ReviewCard key={review.id} review={review} />)
                  ) : (
                    <p className="text-gray-400">Ainda não há reviews para este filme. Seja o primeiro!</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
