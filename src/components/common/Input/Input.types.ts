import { InputHTMLAttributes } from 'react';

export interface BaseInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: number | string;
  height?: number | string;
}
