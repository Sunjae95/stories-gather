import React from 'react';
import styled from '@emotion/styled';
import theme from 'styles/theme';
import { ItemType } from 'types';
import Text from './base/Text';
import Wrapper from './base/Wrapper';
import { getItemUrl } from 'utils';
import { useFetchData } from 'hooks/fecthData.hook';

interface StoryProps {
  id: number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Story: React.FC<StoryProps> = ({ id, onClick }) => {
  const url = getItemUrl(id);
  const item = useFetchData<ItemType | null>({ url, initialState: null });

  if (!item) return <StyleStory>불러오는중</StyleStory>;

  return (
    <StyleStory onClick={onClick}>
      <Wrapper width={40} height={64} style={{ marginRight: '8px' }}>
        <Text size="medium">제목</Text>
        <Text>작성자</Text>
      </Wrapper>
      <Wrapper height={64}>
        <Text size="medium">{item.title}</Text>
        <Text>{item.by}</Text>
      </Wrapper>
    </StyleStory>
  );
};

const StyleStory = styled.div`
  display: flex;
  width: 500px;
  height: 100px;
  align-items: center;
  padding: 16px;
  border: 1px solid ${theme.color.purple};
  border-radius: 10px;
  cursor: pointer;
`;

export default Story;
