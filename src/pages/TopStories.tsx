import React from 'react';
import Story from 'components/Story';
import { getCategoryUrl } from 'utils';
import { useFetchData } from 'hooks/fecthData.hook';
import styled from '@emotion/styled';

const TopStories = () => {
  const url = getCategoryUrl('topstories');
  const stories = useFetchData({ url, initialState: [] });

  if (!stories.length) return null;

  return (
    <StyleStories>
      {stories &&
        stories
          .sort((a, b) => b - a)
          .map((story) => <Story key={story} id={story} />)}
    </StyleStories>
  );
};

const StyleStories = styled.div`
  padding: 60px 160px 0 160px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export default TopStories;
