import { atom } from 'recoil';
import { ItemType } from 'stores/types';

export const storiesState: ItemType[] = [];

export const storiesAtom = atom({
  key: 'storiesAtom',
  default: storiesState,
});
