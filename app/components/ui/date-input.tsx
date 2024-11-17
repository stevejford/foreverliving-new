'use client';

import { useState } from 'react';

type DateInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
  error?: string;
  id: string;
};

export default function DateInput({ value, onChange, label, error, id, ...props }: DateInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined;
    onChange(date);
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="date"
        id={id}
        {...props}
        value={value ? value.toISOString().split('T')[0] : ''}
        onChange={handleChange}
        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
          error ? 'border-red-500' : ''
        } ${props.className || ''}`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
