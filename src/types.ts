export interface ItemType {
  id: number;
  type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt';
  by: string;
  time: number;
  url?: string;
  descendants?: number;
  parts?: any;
  score?: number;
  title: string;
  parent?: number;
  kids?: number[];
  poll?: number;
  deleted?: boolean;
  text?: string;
  dead?: boolean;
}
