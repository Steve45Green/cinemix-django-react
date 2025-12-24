// src/features/movie-discovery/components/MovieCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Filme } from '../../../types';

interface MovieCardProps {
  movie: Filme;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/filme/${movie.slug}`} className="block group">
      <div className="aspect-[2/3] w-full bg-gray-700 rounded-lg overflow-hidden">
        {movie.poster && (
          <img
            src={movie.poster}
            alt={movie.titulo}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-yellow-400">
          {movie.titulo}
        </h3>
        <p className="text-xs text-gray-400">{movie.ano_lancamento}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
