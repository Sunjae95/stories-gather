import React from 'react';
import { getCategoryUrl, getMB } from 'utils';
import { useFetchData } from 'hooks/fecthData.hook';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import Item from 'components/Item';

const StoriesPage = () => {
  const params = useParams();
  const url = getCategoryUrl(params.title as string);
  const stories = useFetchData<number[]>({ url, initialState: [] });

  if (!stories.length) return null;

  return (
    <StyleStories>
      {stories &&
        stories
          .sort((a, b) => b - a)
          .map((story) => <Item key={story} id={story} style={getMB(16)} />)}
    </StyleStories>
  );
};

const StyleStories = styled.div`
  padding: 60px 160px 0 160px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export default StoriesPage;
