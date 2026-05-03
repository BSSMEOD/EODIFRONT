import { Global, css } from '@emotion/react';
import breakpoint from '@styles/breakpoint';

const GlobalStyle = () => (
  <Global
    styles={css`
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
      @import url('https://cdn.jsdelivr.net/gh/fonts-archive/SacheonHangGong/SacheonHangGong.css');
      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html {
        width: 100%;
        height: 100%;
      }

      body {
        min-width: 1140px;
        width: 100%;
        min-height: 100vh;
        height: 100%;
        font-family:
          -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
          Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
        color: #000;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -ms-overflow-style: none;
        scrollbar-width: none;

        ${breakpoint.mobile} {
          min-width: auto;
        }
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button {
        all: unset;
        cursor: pointer;
      }

      ul,
      ol {
        list-style: none;
      }

      input,
      textarea {
        border: none;
        outline: none;
        font-family: inherit;
      }

      img {
        display: block;
        max-width: 100%;
        height: auto;
      }

      ::-webkit-scrollbar {
        display: none;
      }
    `}
  />
);

export default GlobalStyle;
