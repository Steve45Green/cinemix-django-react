// src/features/reviews/components/ReviewForm.tsx
import React, { useState } from 'react';
import { createMovieReview } from '../../../lib/api';
import { Review } from '../../../types';

interface ReviewFormProps {
  movieSlug: string;
  onReviewSubmit: (newReview: Review) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ movieSlug, onReviewSubmit }) => {
  const [texto, setTexto] = useState('');
  const [rating, setRating] = useState(0);
  const [spoiler, setSpoiler] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Por favor, selecione uma avaliação.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const newReview = await createMovieReview(movieSlug, { texto, rating, spoiler });
      onReviewSubmit(newReview);
      // Limpar o formulário
      setTexto('');
      setRating(0);
      setSpoiler(false);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ocorreu um erro ao submeter a sua review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-light p-4 rounded-lg">
      <h3 className="font-bold text-xl mb-4">A sua review</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Avaliação</label>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <button type="button" key={i} onClick={() => setRating(i + 1)} className="focus:outline-none">
                <svg className={`w-8 h-8 ${i < rating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escreva a sua review aqui..."
          className="w-full p-2 rounded-md bg-brand-dark border border-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-accent"
          rows={4}
          required
        />
        <div className="flex items-center my-4">
          <input
            id="spoiler"
            type="checkbox"
            checked={spoiler}
            onChange={(e) => setSpoiler(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-brand-accent focus:ring-brand-accent"
          />
          <label htmlFor="spoiler" className="ml-2 block text-sm text-gray-300">
            Esta review contém spoilers
          </label>
        </div>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <button type="submit" disabled={loading} className="bg-brand-accent text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50">
          {loading ? 'A submeter...' : 'Submeter Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
