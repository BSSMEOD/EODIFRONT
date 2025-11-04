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
  | 'div'
  | 'label'
  | 'button';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  children: React.ReactNode;
  color?: string;
  width?: string;
  textAlign?: CSSProperties['textAlign'];
  whiteSpace?: CSSProperties['whiteSpace'];
  ellipsis?: boolean;
  as?: AllowedHTMLElement;
  /* as="label" 일 때만 유효함 */
  htmlFor?: string;
  /* as="button" 일 때만 유효함 */
  type?: 'button' | 'submit' | 'reset';
}

export interface StyledTextProps {
  variant: TextVariant;
  color: string;
  width: string;
  textAlign: CSSProperties['textAlign'];
  whiteSpace: CSSProperties['whiteSpace'];
  ellipsis: boolean;
}
