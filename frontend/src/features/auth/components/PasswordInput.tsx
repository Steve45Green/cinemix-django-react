// src/features/auth/components/PasswordInput.tsx
import React, { useState, useEffect } from 'react';

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValidityChange: (isValid: boolean) => void;
  disabled?: boolean;
}

const Requirement: React.FC<{ text: string; met: boolean }> = ({ text, met }) => (
  <li className={`flex items-center text-sm ${met ? 'text-green-400' : 'text-brand-text'}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {met ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      )}
    </svg>
    {text}
  </li>
);

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange, onValidityChange, disabled }) => {
  const [requirements, setRequirements] = useState({
    length: false,
    number: false,
    uppercase: false,
    specialChar: false,
  });

  useEffect(() => {
    const length = value.length >= 8;
    const number = /[0-9]/.test(value);
    const uppercase = /[A-Z]/.test(value);
    const specialChar = /[!@#$%^&*]/.test(value);

    setRequirements({ length, number, uppercase, specialChar });
    onValidityChange(length && number && uppercase && specialChar);
  }, [value, onValidityChange]);

  return (
    <div>
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        required
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 mt-1 text-white bg-brand-light border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
        disabled={disabled}
      />
      {value && (
        <ul className="mt-2 space-y-1">
          <Requirement text="Pelo menos 8 caracteres" met={requirements.length} />
          <Requirement text="Pelo menos uma letra maiúscula" met={requirements.uppercase} />
          <Requirement text="Pelo menos um número" met={requirements.number} />
          <Requirement text="Pelo menos um carácter especial (!@#$%^&*)" met={requirements.specialChar} />
        </ul>
      )}
    </div>
  );
};

export default PasswordInput;
