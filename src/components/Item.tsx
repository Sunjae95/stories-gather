/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import styled from '@emotion/styled';
import theme from 'styles/theme';
import { ItemType } from 'stores/types';
import Text from './base/Text';
import Wrapper from './base/Wrapper';
import { getItemUrl, getTime, getMB } from 'utils';
import { useFetchData } from 'hooks/fecthData.hook';
import { useRecoilState } from 'recoil';
import { clickedItemInfo } from 'stores/item';
import { useNavigate, useParams } from 'react-router-dom';
import UrlLink from './base/UrlLink';
import { detail } from 'constant';

interface StoryProps {
  id: number;
  [props: string]: any;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const Item: React.FC<StoryProps> = ({ id, onClick, ...props }) => {
  const url = getItemUrl(id);
  const params = useParams();
  const navigate = useNavigate();
  const item = useFetchData<ItemType | null>({ url, initialState: null });
  const [itemInfo, setItemInfo] = useRecoilState(clickedItemInfo);
  const handleDetailPage = (e: React.MouseEvent<HTMLElement>) => {
    setItemInfo(item as ItemType);
    navigate(`/stories/${params.title}/${id}`);
  };
  if (!item) return <StyleItem>불러오는중</StyleItem>;

  return (
    <>
      {item.type === 'job' ? (
        <StyleJob onClick={handleDetailPage} {...props}>
          <Wrapper style={getMB(16)}>
            <Text type="title" size="medium">
              {detail.name}
            </Text>
            <Text type="content" size="medium">
              {item.by}
            </Text>
          </Wrapper>
          <Wrapper style={getMB(16)}>
            <Text type="title" size="medium">
              {detail.url}
            </Text>
            <Text type="content" size="medium">
              {item.url ? (
                <UrlLink href={item.url}>{detail.goLink}</UrlLink>
              ) : (
                `${detail.noLink}`
              )}
            </Text>
          </Wrapper>
          <Wrapper style={getMB(16)}>
            <Text type="title" size="medium">
              {detail.date}
            </Text>
            <Text type="content" size="medium">
              {getTime(item.time)}
            </Text>
          </Wrapper>
          <Wrapper style={getMB(16)}>
            <Text type="title" size="medium">
              {detail.intro}
            </Text>
            <Text type="content" size="medium">
              {item.title}
            </Text>
          </Wrapper>
        </StyleJob>
      ) : (
        <StyleItem onClick={handleDetailPage} {...props}>
          <Wrapper style={getMB(16)}>
            <Text type="title" size="medium">
              {detail.title}
            </Text>
            <Text type="content" size="medium">
              {item.title}
            </Text>
          </Wrapper>
          <Wrapper style={getMB(16)}>
            <Text type="title">{detail.writer}</Text>
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
