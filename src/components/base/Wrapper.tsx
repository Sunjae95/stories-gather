import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

export interface WrapperProps {
  width?: number;
  height?: number;
  children: React.ReactNode;
  [props: string]: any;
}

const Wrapper: React.FC<WrapperProps> = ({
  width,
  height,
  children,
  ...props
}) => {
  return (
    <StyleWrapper width={width} height={height} {...props}>
      {children}
    </StyleWrapper>
  );
};

const StyleWrapper = styled.div<WrapperProps>`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  ${({ width, height }) => css`
    width: ${width ? `${width}px` : 'auto'};
    height: ${height ? `${height}px` : 'auto'};
  `}
`;

export default Wrapper;
