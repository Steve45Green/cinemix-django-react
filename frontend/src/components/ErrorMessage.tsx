// src/components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-10 px-4 bg-red-900/20 rounded-lg border border-red-700">
      <p className="text-red-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Tentar Novamente
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
