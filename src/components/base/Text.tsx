import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from 'styles/theme';

export interface TextProps {
  type?: 'content' | 'title';
  size?: 'medium' | 'large' | 'xLarge';
  color?: 'white' | 'purple';
  children: React.ReactChild;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Text: React.FC<TextProps> = ({
  type = 'content',
  size,
  color,
  onClick,
  children,
}) => {
  return (
    <StyleText
      as={type === 'content' ? 'span' : 'h1'}
      size={size}
      color={color}
      onClick={onClick}
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
