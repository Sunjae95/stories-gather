import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

export interface WrapperProps {
  width: number;
  height: number;
  children: React.ReactChild;
}

const Wrapper: React.FC<WrapperProps> = ({ width, height, children }) => {
  return (
    <StyleWrapper width={width} height={height}>
      {children}
    </StyleWrapper>
  );
};

const StyleWrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  ${({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
  `}
`;

export default Wrapper;
