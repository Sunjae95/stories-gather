import React from 'react';
import styled from '@emotion/styled';
import theme from 'styles/theme';
import { categoryItems } from 'constant';
import Text from './base/Text';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <StyleNavigation>
      {categoryItems.map((categoryItem, i) => (
        <Link key={categoryItem} to={`/stories/${categoryItem}`}>
          <Text color="white" size="large">
            {categoryItem.toLocaleUpperCase()}
          </Text>
        </Link>
      ))}
    </StyleNavigation>
  );
};

const StyleNavigation = styled.nav`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${theme.color.purple};
`;

export default React.memo(Navigation);
