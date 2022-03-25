import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useFetchData } from 'hooks/fecthData.hook';
import { ItemType } from 'stores/types';
import theme from 'styles/theme';
import { getItemUrl, getMB } from 'utils';
import Text from './base/Text';
import { comment } from 'constant';

interface CommentProps {
  id: number;
  isChild?: boolean;
}

const Comment: React.FC<CommentProps> = ({ id, isChild }) => {
  const url = getItemUrl(id);
  const item = useFetchData<ItemType | null>({ url, initialState: null });
  const [isOpen, setIsOpen] = useState(false);

  if (item?.deleted || item?.dead) return null;

  return (
    <CommentContainer>
      <StyleComment isChild={isChild} style={getMB(8)}>
        {isChild && (
          <Text
            tag="h1"
            style={{ display: 'block', width: '25px', marginBottom: '8px' }}
            color="purple"
          >
            {comment.prime}
          </Text>
        )}
        {item?.by && (
          <Text size="medium" style={getMB(8)}>
            {item.by}
          </Text>
        )}
        <div
          style={getMB(8)}
          dangerouslySetInnerHTML={{ __html: item?.text as string }}
        />
        {item?.kids && (
          <OpenText onClick={() => setIsOpen(!isOpen)}>
            <Text color="purple" type="title">
              {isOpen ? comment.close : comment.open}
            </Text>
          </OpenText>
        )}
      </StyleComment>
      {isOpen &&
        item?.kids &&
        item.kids.map((id) => <Comment key={id} id={id} isChild />)}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
`;

const StyleComment = styled.div<Pick<CommentProps, 'isChild'>>`
  width: ${({ isChild }) => (isChild ? 'calc(100% - 20px)' : '100%')};
  min-height: 100px;
  border: 1px solid ${theme.color.purple};
  padding: 16px;
  border-radius: 10px;
`;

const OpenText = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  cursor: pointer;
`;

export default Comment;
