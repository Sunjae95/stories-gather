import React from 'react';
import styled from '@emotion/styled';
import Text from 'components/base/Text';
import Wrapper from 'components/base/Wrapper';
import { getMB, getTime } from 'utils';
import { useRecoilValue } from 'recoil';
import { clickedItemInfo } from 'stores/item';
import UrlLink from 'components/base/UrlLink';
import Comment from 'components/Comment';
import { comment, detail } from 'constant';

const DetailPage: React.FC = () => {
  const item = useRecoilValue(clickedItemInfo);

  return (
    <StyleDetailPage>
      <StyleContainer>
        <Text tag="h1" size="xLarge" style={getMB(16)}>
          {item.title}
        </Text>
        <Wrapper style={getMB(8)}>
          <Text type="title">{detail.writer}</Text>
          <Text type="content">{item.by}</Text>
        </Wrapper>
        <Wrapper style={getMB(8)}>
          <Text type="title">{detail.date}</Text>
          <Text type="content">{getTime(item.time)}</Text>
        </Wrapper>
        <Wrapper style={getMB(8)}>
          <Text type="title">{detail.writeUrl}</Text>
          <Text type="content" size="medium">
            {item.url ? (
              <UrlLink href={item.url}>{detail.goLink}</UrlLink>
            ) : (
              `${detail.noLink}`
            )}
          </Text>
        </Wrapper>
        <Wrapper style={getMB(60)}>
          <Text type="title">{detail.score}</Text>
          <Text type="content">{item.score ? item.score : 0}</Text>
        </Wrapper>
        <Wrapper style={getMB(16)}>
          <Text type="title">{comment.total}</Text>
          <Text type="content">{item.descendants ? item.descendants : 0}</Text>
        </Wrapper>
        {item.kids?.map((id) => (
          <Comment key={id} id={id} />
        ))}
      </StyleContainer>
    </StyleDetailPage>
  );
};

const StyleDetailPage = styled.main`
  display: flex;
  justify-content: center;
`;

const StyleContainer = styled.div`
  display: flex;
  width: 40%;
  margin-top: 60px;
  flex-direction: column;
`;

export default DetailPage;
