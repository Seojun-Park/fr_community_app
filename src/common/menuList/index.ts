interface MenuTypes {
  title: string;
  category: string;
  subTitle: Array<string>;
  filter: Array<string>;
}

export const profileMenuList: MenuTypes[] = [
  {
    title: '중고장터',
    category: 'market',
    subTitle: ['삽니다', '팝니다'],
    filter: ['sell, buy'],
  },
  {
    title: '집구하기',
    category: 'rent',
    subTitle: ['집구하기'],
    filter: ['rent'],
  },
  {
    title: '구인구직',
    category: 'recruit',
    subTitle: ['일자리찾기', '구인하기'],
    filter: ['find', 'recruiting'],
  },
  {
    title: '모임',
    category: 'meet',
    subTitle: ['모임'],
    filter: ['meet', 'class'],
  },
  {
    title: '커뮤니티',
    category: 'board',
    subTitle: ['자유게시판', '정보글', '밋업', '클래스'],
    filter: ['board', 'info', 'meetup', 'class'],
  },
];

export const menuList: MenuTypes[] = [
  {
    title: '커뮤니티',
    subTitle: ['자유게시판'],
    filter: ['notice'],
  },
  {
    title: '중고장터',
    subTitle: ['삽니다', '팝니다'],
    filter: ['sell, buy'],
  },
  {
    title: '집구하기',
    subTitle: ['집구하기'],
    filter: ['rent'],
  },
  {
    title: '구인구직',
    subTitle: ['일자리찾기', '구인하기'],
    filter: ['find', 'recruiting'],
  },
  {
    title: '커뮤니티',
    subTitle: ['자유게시판', '정보글', '밋업', '클래스'],
    filter: ['board', 'info', 'meetup', 'class'],
  },
];
