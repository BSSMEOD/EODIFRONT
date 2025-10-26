import { css } from '@emotion/react';

const fontGenerator = (
  weight: number,
  size: number,
  lineHeight: number,
  letterSpacing: number
) => css`
  font-family: 'Pretendard Variable';
  font-weight: ${weight};
  font-size: ${size}rem;
  line-height: ${lineHeight}%;
  letter-spacing: ${letterSpacing}px;
`;

const font = {
  H1: fontGenerator(700, 1.5, 150, -2.2),
  H2: fontGenerator(700, 1.25, 150, -2.2),
  H3: fontGenerator(700, 1.125, 150, -2.2),
  H4: fontGenerator(700, 1, 150, -2.2),
  H5: fontGenerator(700, 0.875, 150, -2.2),

  p1: fontGenerator(400, 1.125, 160, -2.2),
  p2: fontGenerator(400, 1, 160, -2.2),
  p3: fontGenerator(400, 0.875, 160, -2.2),
  p4: fontGenerator(400, 0.75, 160, -2.2),
};

export default font;
