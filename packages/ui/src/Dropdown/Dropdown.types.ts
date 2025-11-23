import type { CSSProperties } from 'react';

export interface Data {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  data: Data[] | string[];
  width?: CSSProperties['width'];
  value?: string;
  onChange: (value: string, name: string) => void;
  name: string;
  placeholder?: string;
  doubled?: number;
  isError?: boolean;
  disabled?: boolean;
  background?: 'White' | 'Gray';
}
