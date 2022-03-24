export const getCategoryUrl = (category: string) =>
  `https://hacker-news.firebaseio.com/v0/${category}.json?print=pretty`;
export const getItemUrl = (item: number) =>
  `https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`;
