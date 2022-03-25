import React, { useEffect, useRef, useState } from 'react';
import { getCategoryUrl, getItemUrl, getMB } from 'utils';
import { useFetchData } from 'hooks/fecthData.hook';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import Item from 'components/Item';
import { useRecoilState } from 'recoil';
import { storiesAtom } from 'stores/stories';
import { itemState } from 'stores/item';
import axios from 'axios';
import { ItemType } from 'stores/types';

const StoriesPage = () => {
  const params = useParams();
  const url = getCategoryUrl(params.title as string);
  const ref = useRef<HTMLDivElement[]>([]);
  const stories = useFetchData<number[]>({ url, initialState: [] });
  const [storiesInfo, setStoriesInfo] = useRecoilState(storiesAtom);
  const io = new IntersectionObserver((entries, observer) => {
    const fetchData = async ({ url, id }: { url: string; id: number }) => {
      try {
        const res = await axios.get<ItemType>(url);
        return res.data;
      } catch {
        return itemState;
      }
    };

    const all = async (
      io: IntersectionObserver,
      entries: IntersectionObserverEntry[]
    ) => {
      const promises = entries.map((entry) => {
        if (!entry.isIntersecting) return null;

        const { id } = entry.target as HTMLDivElement;
        const { id: itemId } = storiesInfo?.[Number(id)];
        const itemUrl = getItemUrl(itemId);
        const data = fetchData({ url: itemUrl, id: Number(id) });
        io.unobserve(entry.target);

        return data;
      });

      const data = await Promise.all(promises);
      const nextState = storiesInfo.map((story) => {
        for (let nextData of data) {
          if (nextData === null) continue;
          if (nextData.id === story.id) return nextData;
        }
        return story;
      });
      setStoriesInfo(nextState);
    };

    all(io, entries);
  }, {});

  useEffect(() => {
    if (!ref.current.length || !stories.length) return;

    ref.current.forEach((ref) => {
      io.observe(ref);
    });
  }, [url, stories.length, ref.current.length]);

  useEffect(() => {
    if (!stories.length) return;

    const nextState = stories.map((story) => ({ ...itemState, id: story }));
    setStoriesInfo(nextState);
  }, [stories.length]);

  if (!stories.length) return null;

  return (
    <StyleStories>
      {stories.length &&
        stories
          .sort((a, b) => b - a)
          .map((story, i) => (
            <Item
              key={story}
              id={`${i}`}
              ref={(el) => (ref.current[i] = el as HTMLDivElement)}
              style={getMB(16)}
            />
          ))}
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

/*      // .map((story, i) => (
            //   <div
            //     ref={(el) => (ref.current[i] = el as HTMLDivElement)}
            //     key={story}
            //     style={{ display: 'block', width: '100%', height: '100px' }}
            //   >
            //     {story}
            //   </div>
            // ))
       */
