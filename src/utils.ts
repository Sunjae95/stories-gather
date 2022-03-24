export const getCategoryUrl = (category: string): string =>
  `https://hacker-news.firebaseio.com/v0/${category}.json?print=pretty`;
export const getItemUrl = (item: number): string =>
  `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`;
export const getTime = (time: number): string => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();

  return `${year}년 ${month}월 ${day}일`;
};
export const getMB = (px: number) => {
  return { marginBottom: `${px}px` };
};
