import type React from 'react';
import type { CSSProperties } from 'react';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: CSSProperties['flexDirection'];
  justify?: CSSProperties['justifyContent'];
  align?: CSSProperties['alignItems'];
  gap?: CSSProperties['gap'];
  wrap?: CSSProperties['flexWrap'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  flex?: CSSProperties['flex'];
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer' | 'nav';
  children: React.ReactNode;
}
