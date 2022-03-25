import styled from '@emotion/styled';
import React from 'react';

export interface WrapperProps {
  children: React.ReactNode;
  [props: string]: any;
}

const Wrapper: React.FC<WrapperProps> = ({ children, ...props }) => {
  return <StyleWrapper {...props}>{children}</StyleWrapper>;
};

const StyleWrapper = styled.div<WrapperProps>`
  display: flex;
`;

export default Wrapper;
