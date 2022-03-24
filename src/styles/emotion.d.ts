import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: string;
      white: string;
      purple: string;
    };
    fontSize: {
      original: string;
      medium: string;
      large: string;
      xLarge: string;
    };
    margin: {
      original: string;
      large: string;
    };
  }
}
