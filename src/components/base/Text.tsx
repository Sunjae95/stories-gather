import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from 'styles/theme';

export interface TextProps {
  tag?: 'span' | 'h1' | 'p';
  type?: 'content' | 'title';
  size?: 'medium' | 'large' | 'xLarge';
  color?: 'white' | 'purple';
  width?: number;
  block?: boolean;
  children: React.ReactChild;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  [props: string]: any;
}

const Text: React.FC<TextProps> = ({
  type = 'content',
  tag = 'span',
  size,
  color,
  onClick,
  children,
  ...props
}) => {
  return (
    <StyleText
      as={tag}
      type={type}
      size={size}
      color={color}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyleText>
  );
};

const StyleText = styled.span<TextProps>`
  display: inline-block;
  ${({ type, size, color }) => css`
    width: ${type === 'title' ? '80px' : '90%'};
    font-size: ${size ? theme.fontSize[size] : theme.fontSize.original};
    color: ${color ? theme.color[color] : theme.color.primary};
  `};
`;

export default Text;
