interface MenuType {
  bg: string;
  color: string;
  category: string;
  subCategories: Array<string>;
  filter: Array<string>;
}
export const homeData: MenuType[] = [
  {
    bg: '#A8DDE9',
    color: '#3F5B98',
    category: '공지사항',
    subCategories: ['공지사항'],
    filter: ['notice'],
  },
  {
    bg: '#086E4B',
    color: '#FCBE4A',
    category: '중고장터',
    subCategories: ['삽니다', '팝니다'],
    filter: ['sell', 'buy'],
  },
  {
    bg: '#FECBCA',
    color: '#FD5963',
    category: '집구하기',
    subCategories: ['집구하기'],
    filter: ['rent'],
  },
  {
    bg: '#193B8C',
    color: '#FECBCD',
    category: '구인구직',
    subCategories: ['일자리찾기', '구인하기'],
    filter: ['find', 'recruiting'],
  },
  {
    bg: '#FDBD50',
    color: '#F5F5EB',
    category: '커뮤니티',
    subCategories: ['자유게시판', '정보글', '밋업', '클래스'],
    filter: ['board', 'info', 'meetup', 'class'],
  },
];
