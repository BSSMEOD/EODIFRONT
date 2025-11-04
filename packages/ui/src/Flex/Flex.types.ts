import type React from 'react';
import type { CSSProperties } from 'react';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  gap?: number | string;
  wrap?: CSSProperties['flexWrap'];
  children: React.ReactNode;
  width?: string;
  height?: string;
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'nav';
  flex?: CSSProperties['flex'];
}

export interface StyledFlexProps {
  direction: CSSProperties['flexDirection'];
  justify: CSSProperties['justifyContent'];
  align: CSSProperties['alignItems'];
  gap: string;
  wrap: CSSProperties['flexWrap'];
  width: string;
  height: string;
  flex?: CSSProperties['flex'];
}
