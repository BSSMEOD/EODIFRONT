import type React from 'react';
import type { CSSProperties } from 'react';

export type TextVariant =
  | 'D1'
  | 'H1'
  | 'H2'
  | 'H3'
  | 'H4'
  | 'H5'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'p4';

export type AllowedHTMLElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'p'
  | 'span'
  | 'div';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  color?: string;
  width?: string;
  textAlign?: CSSProperties['textAlign'];
  whiteSpace?: CSSProperties['whiteSpace'];
  ellipsis?: boolean;
  as?: AllowedHTMLElement;
  children: React.ReactNode;
}
