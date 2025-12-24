// src/features/movie-discovery/components/MovieCarousel.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Filme } from '../../../types';

interface MovieCarouselProps {
  title: string;
  movies: Filme[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ title, movies }) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4">
        {movies.map((movie) => (
          <Link to={`/filme/${movie.slug}`} key={movie.id} className="flex-shrink-0 w-40 md:w-48 group">
            <div className="relative rounded-lg overflow-hidden border-2 border-transparent group-hover:border-brand-accent transition-all duration-300">
              <img 
                src={movie.poster} 
                alt={movie.titulo} 
                className="w-full h-60 md:h-72 object-cover bg-brand-light"
                // Adiciona um placeholder em caso de erro na imagem
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/192x288.png?text=No+Image'; }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-white text-sm mt-2 truncate group-hover:text-brand-accent transition-colors">
              {movie.titulo}
            </h3>
            <p className="text-brand-text text-xs">{movie.ano_lancamento}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MovieCarousel;
