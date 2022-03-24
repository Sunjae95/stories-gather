import React from 'react';
import styled from '@emotion/styled';
import theme from 'styles/theme';
import { ItemType } from 'types';
import Text from './base/Text';
import Wrapper from './base/Wrapper';
import { getItemUrl, getTime, getMB } from 'utils';
import { useFetchData } from 'hooks/fecthData.hook';

interface StoryProps {
  id: number;
  [props: string]: any;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Item: React.FC<StoryProps> = ({ id, onClick, ...props }) => {
  const url = getItemUrl(id);
  const item = useFetchData<ItemType | null>({ url, initialState: null });

  if (!item) return <StyleItem>불러오는중</StyleItem>;

  return (
    <>
      {' '}
      {item.type === 'job' ? (
        <StyleJob onClick={onClick} {...props}>
          <Wrapper style={getMB(16)}>
            <Text type="title" size="medium">
              이름
            </Text>
            <Text type="content" size="medium">
              {item.by}
            </Text>
          </Wrapper>
          <Wrapper style={getMB(16)}>
            <Text type="title" size="medium">
              URL
            </Text>
            <Text type="content" size="medium">
              {item.url ? (
                <UrlLink href={item.url}>링크 바로가기</UrlLink>
              ) : (
                '링크없음'
              )}
            </Text>
          </Wrapper>
          <Wrapper style={getMB(16)}>
            <Text type="title" size="medium">
              작성시기
            </Text>
            <Text type="content" size="medium">
              {getTime(item.time)}
            </Text>
          </Wrapper>
          <Wrapper style={getMB(16)}>
            <Text type="title" size="medium">
              소개
            </Text>
            <Text type="content" size="medium">
              {item.title}
            </Text>
          </Wrapper>
        </StyleJob>
      ) : (
        <StyleItem onClick={onClick} {...props}>
          <Wrapper style={getMB(16)}>
            <Text type="title" size="medium">
              제목
            </Text>
            <Text type="content" size="medium">
              {item.title}
            </Text>
          </Wrapper>
          <Wrapper style={getMB(16)}>
            <Text type="title">작성자</Text>
            <Text type="content">{item.by}</Text>
          </Wrapper>
        </StyleItem>
      )}
    </>
  );
};

const StyleItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100px;
  padding: 16px;
  border: 1px solid ${theme.color.purple};
  border-radius: 10px;
  cursor: pointer;
`;

const StyleJob = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 200px;
  padding: 16px;
  border: 1px solid ${theme.color.purple};
  border-radius: 10px;
  cursor: pointer;
`;
const UrlLink = styled.a`
  font-size: ${theme.fontSize.medium};
`;

export default Item;
