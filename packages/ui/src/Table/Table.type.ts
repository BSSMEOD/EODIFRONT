import type { CSSProperties, ReactNode } from 'react';

export interface TableProps {
  children: ReactNode;
  width: CSSProperties['width'];
  height: CSSProperties['height'];
  backgroundColor?: CSSProperties['backgroundColor'];
  borderTopLeftRadius?: CSSProperties['borderTopLeftRadius'];
  borderTopRightRadius?: CSSProperties['borderTopRightRadius'];
  borderBottomLeftRadius?: CSSProperties['borderBottomLeftRadius'];
  borderBottomRightRadius?: CSSProperties['borderBottomRightRadius'];
  isBottom?: boolean;
  isBottomBold?: boolean;
  isTop?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}
