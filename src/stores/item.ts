import { atom } from 'recoil';
import { ItemType } from 'stores/types';

export const itemState: ItemType = {
  id: 0,
  type: 'story',
  by: '',
  time: 0,
  title: '',
};

export const clickedItemInfo = atom({
  key: 'clickedItemInfo',
  default: itemState,
});
