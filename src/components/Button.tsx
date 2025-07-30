import React from 'react';

export type ButtonProps = { label: string; onClick?: () => void };
export const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);
