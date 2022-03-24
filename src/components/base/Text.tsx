import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from 'styles/theme';

export interface TextProps {
  type?: 'content' | 'title';
  size?: 'medium' | 'large' | 'xLarge';
  color?: 'white' | 'purple';
  children: React.ReactChild;
}

const Text: React.FC<TextProps> = ({
  type = 'content',
  size,
  color,
  children,
}) => {
  return (
    <StyleText
      as={type === 'content' ? 'span' : 'h1'}
      size={size}
      color={color}
    >
      {children}
    </StyleText>
  );
};

const StyleText = styled.span<TextProps>`
  ${({ size, color }) => css`
    font-size: ${size ? theme.fontSize[size] : theme.fontSize.original};
    color: ${color ? theme.color[color] : theme.color.primary};
  `}
`;

export default Text;
