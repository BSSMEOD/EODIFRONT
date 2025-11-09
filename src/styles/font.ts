import { css } from '@emotion/react';

const fontGenerator = (
  fontFamily: string,
  weight: number,
  size: number,
  lineHeight: number,
  letterSpacing: number
) => css`
  font-family: ${fontFamily}, serif;
  font-weight: ${weight};
  font-size: ${size}rem;
  line-height: ${lineHeight}%;
  letter-spacing: ${letterSpacing}px;
`;

const fontFamily = {
  default: 'Pretendard Variable',
  logo: 'SacheonHangGong',
};

const font = {
  D1: fontGenerator(fontFamily.logo, 400, 1.5, 150, 0),

  H1: fontGenerator(fontFamily.default, 700, 1.5, 150, 0),
  H2: fontGenerator(fontFamily.default, 700, 1.25, 150, 0),
  H3: fontGenerator(fontFamily.default, 700, 1.125, 150, 0),
  H4: fontGenerator(fontFamily.default, 700, 1, 150, 0),
  H5: fontGenerator(fontFamily.default, 700, 0.875, 150, 0),

  p1: fontGenerator(fontFamily.default, 400, 1.125, 160, 0),
  p2: fontGenerator(fontFamily.default, 400, 1, 160, 0),
  p3: fontGenerator(fontFamily.default, 400, 0.875, 160, 0),
  p4: fontGenerator(fontFamily.default, 400, 0.75, 160, 0),
};

export default font;
