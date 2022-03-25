import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from 'styles/theme';
import { ItemType } from 'stores/types';
import Text from './base/Text';
import Wrapper from './base/Wrapper';
import { getTime, getMB } from 'utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { clickedItemInfo, itemState } from 'stores/item';
import { useNavigate, useParams } from 'react-router-dom';
import UrlLink from './base/UrlLink';
import { storiesAtom } from 'stores/stories';

interface StoryProps {
  id: string;
  [props: string]: any;
}

const Item = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<StoryProps>
>(({ id, ...props }, ref) => {
  const params = useParams();
  const navigate = useNavigate();
  const storiesInfo = useRecoilValue(storiesAtom);
  const item = storiesInfo[Number(id)];
  const handleDetailPage = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/stories/${params.title}/${item.id}`);
  };
  if (!storiesInfo.length)
    return (
      <StyleItem id={id} ref={ref} {...props}>
        불러오는중
      </StyleItem>
    );

  return (
    <>
      {item.type === 'job' ? (
        <StyleJob id={id} onClick={handleDetailPage} ref={ref} {...props}>
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
        <StyleItem id={id} onClick={handleDetailPage} ref={ref} {...props}>
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
});

const StyleItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 16px;
  border: 1px solid ${theme.color.purple};
  border-radius: 10px;
  cursor: pointer;
`;

const StyleJob = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 16px;
  border: 1px solid ${theme.color.purple};
  border-radius: 10px;
  cursor: pointer;
`;

export default Item;
