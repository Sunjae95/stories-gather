## 🎊실행방법

### 데모 확인하기

> 👉 [데모확인하기](https://stories-gather.netlify.app/)

### 프로젝트 시작

```
npm install
yarn install
```

```
npm start
yarn start
```

## 🛠기술 스택

“JavaScript” “TypeScript” “Emotion”을 활용하여 구현했습니다.
“recoil”를 사용하여 item정보 상태를 관리했습니다.
“figma”를 활용하여 와이어프레임 작업을 했습니다. 👉 [피그마 링크 확인하기](https://www.figma.com/file/GiElZN7BXluQB4guO70yqH/Untitled?node-id=0%3A1)

## 📗구현 리스트

- [x] 카테고리 정보를 활용하여 List를 구현
- [x] 가져온 리스트의 ID값을 클릭할 경우 상세 내용 출력
- [ ] 카테고리 정보는 내림차순

## 📙추가 구현 사항

- [x] Item, StoriesPage, Comment컴포넌트 재사용
- [x] DataFetching Customhook 구현
- [x] TypeScript 사용

## 🕹구현 내용

### Stories페이지

- API를 받고 분석하면서 카테고리로 Stories페이지를 보여주기에는 사용자 입장에서는 정보가 부족해 카테고리요청과 각각의 item요청을 하여 List를 표현했습니다.
- 각 Stories페이지는 공통점이 존재했기에 하나의 라우터의 url에 따라 다르게 출력했습니다.

```tsx
const StoriesPage = () => {
  const params = useParams();
  const url = getCategoryUrl(params.title as string);
  const stories = useFetchData<number[]>({ url, initialState: [] });

  if (!stories.length) return null;

  return (
    <StyleStories>
      {stories &&
        stories
          .sort((a, b) => b - a)
          .map((story) => <Item key={story} id={story} style={getMB(16)} />)}
    </StyleStories>
  );
};
```

### 상세페이지

- 상세페이지 이동 시 이미 item에 대한 정보를 불러왔기 때문에 클릭 시 전역 상태에 추가하여 페이지 이동 시 API요청 없이 구현했습니다.

```tsx
//Item.tsx
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

  //...UI...
};

//DetailPage.tsx
const DetailPage: React.FC = () => {
  const item = useRecoilValue(clickedItemInfo);

  return (
    <StyleDetailPage>
      <StyleContainer>
        <Text tag="h1" size="xLarge" style={getMB(16)}>
          {item.title}
        </Text>
        {/* ...위와 같이 item 속성을 사용하여 UI구성 ...*/}
      </StyleContainer>
    </StyleDetailPage>
  );
};
```

### Item 컴포넌트

- Props로 내려진 id에 따라 일에 관한 것 인지 다른 Story인지를 구분하고, 로딩 중을 표시하여 3가지 경우를 조건부 렌더링했습니다.

### Comment 컴포넌트

- 댓글의 응답 값을 고려하여 구현했습니다.
- 재 댓글이 있는 경우를 고려하여 댓글달기 버튼 클릭 시 새로운 댓글을 불러오도록 구현했습니다.
- 댓글에 대한 응답 값이 HTML로 오는 경우도 있어 이를 해결하기 위해 dangerouslySetInnerHTML을 사용했습니다.

```tsx
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
```

### Custom Hook - DataFetching

- API 요청은 Stories, Item컴포넌트에서 일어나기 때문에 CustomHook을 구현하여 재사용성을 높였습니다.
- 해당 url가 바뀌면 Stories의 값이 변경돼야 하므로 의존성배열에 url를 추가했습니다.

```ts
const useFetchData = <T>({
  url,
  initialState,
}: {
  url: string;
  initialState: T;
}) => {
  const [data, setData] = useState<T>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<T>(url);
        setData(res.data);
      } catch {
        setData(initialState);
      }
    };

    fetchData();
  }, [url]);

  return data;
};
```

### 코드 유지보수 및 확장성

- 코드 유지보수를 위해 util함수, 상수, theme을 적극 활용했습니다.
- 확장성을 고려해 5개의 페이지를 만드는 것이 아니라 URL에 따라 렌더링하여 하나의 페이지로 구현했습니다.

```tsx
//App.tsx
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RecoilRoot>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/stories/:title" element={<StoriesPage />} />
            <Route path="/stories/:title/:id" element={<DetailPage />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
};
```

### 소감 및 시도한 내용

1. 혼자서 디자인, 설계 이후 다 끝났다고 생각했는데 구현하면서 설계에서 벗어나는 부분이 있어 설계의 중요성을 다시 느끼게 됐습니다.
2. 많이 아쉬운 과제였습니다. Stories페이지를 구현할 때 API를 두번 불러오는 방법도 있지만 부분적으로 API를 불러오는 방법을 도입하다 시간상 구현을 하지못했습니다.
3. intersection observer를 활용하여 뷰포트에 있다면 불러오기를 시도했지만 받아온 값을 상태에 저장하기가 어려웠습니다.
4. 비동기 로직을 병렬처리하기 위해 Promise.all를 활용하여 시도했습니다.
