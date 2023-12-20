import { type CategoryFilterType } from '../types/commonTypes';

export const DIVIDER_SIGN: string = '$$==$$';

export const JOBPLANET_CATE_URL =
  'https://www.jobplanet.co.kr/api/v1/common/wizard/meta_info?fields=display_filters';

export const PROGRAMMERS_CATE_URL =
  'https://career.programmers.co.kr/api/job_positions/job_categories';

export const REMEMBER_CATE_URL = 'https://api.rememberapp.co.kr/v2/open_profiles/options';

export const jumpitCategories: CategoryFilterType[] = [
  {
    label: '전체',
    children: [
      { label: '서버/백엔드 개발자', value: 1 },
      { label: '프론트엔드 개발자', value: 2 },
      { label: '웹 풀스택 개발자', value: 3 },
      { label: '안드로이드 개발자', value: 4 },
      { label: 'IOS 개발자', value: 16 },
      { label: '크로스플랫폼 앱개발자', value: 18 },
      { label: '게임 클라이언트 개발자', value: 5 },
      { label: '게임 서버 개발자', value: 6 },
      { label: 'DBA', value: 7 },
      { label: '빅데이터 엔지니어', value: 19 },
      { label: '인공지능/머신러닝', value: 8 },
      { label: 'devops/시스템 엔지니어', value: 9 },
      { label: '정보보안 담당자', value: 10 },
      { label: 'QA 엔지니어', value: 11 },
      { label: '개발 PM', value: 12 },
      { label: 'HW/임베디드', value: 13 },
      { label: 'SW/솔루션', value: 15 },
      { label: '웹퍼블리셔', value: 17 },
      { label: 'VR/AR/3D', value: 20 },
      { label: '블록체인', value: 22 },
      { label: '기술지원', value: 21 },
    ],
  },
];

export const wantedCategories = [
  {
    id: 518,
    tags: [
      {
        id: 10110,
        title: '소프트웨어 엔지니어',
      },
      {
        id: 873,
        title: '웹 개발자',
      },
      {
        id: 872,
        title: '서버 개발자',
      },
      {
        id: 669,
        title: '프론트엔드 개발자',
      },
      {
        id: 660,
        title: '자바 개발자',
      },
      {
        id: 900,
        title: 'C,C++ 개발자',
      },
      {
        id: 899,
        title: '파이썬 개발자',
      },
      {
        id: 1634,
        title: '머신러닝 엔지니어',
      },
      {
        id: 674,
        title: 'DevOps / 시스템 관리자',
      },
      {
        id: 665,
        title: '시스템,네트워크 관리자',
      },
      {
        id: 655,
        title: '데이터 엔지니어',
      },
      {
        id: 895,
        title: 'Node.js 개발자',
      },
      {
        id: 677,
        title: '안드로이드 개발자',
      },
      {
        id: 678,
        title: 'iOS 개발자',
      },
      {
        id: 658,
        title: '임베디드 개발자',
      },
      {
        id: 877,
        title: '개발 매니저',
      },
      {
        id: 1024,
        title: '데이터 사이언티스트',
      },
      {
        id: 1026,
        title: '기술지원',
      },
      {
        id: 676,
        title: 'QA,테스트 엔지니어',
      },
      {
        id: 672,
        title: '하드웨어 엔지니어',
      },
      {
        id: 1025,
        title: '빅데이터 엔지니어',
      },
      {
        id: 671,
        title: '보안 엔지니어',
      },
      {
        id: 876,
        title: '프로덕트 매니저',
      },
      {
        id: 10111,
        title: '크로스플랫폼 앱 개발자',
      },
      {
        id: 1027,
        title: '블록체인 플랫폼 엔지니어',
      },
      {
        id: 10231,
        title: 'DBA',
      },
      {
        id: 893,
        title: 'PHP 개발자',
      },
      {
        id: 661,
        title: '.NET 개발자',
      },
      {
        id: 896,
        title: '영상,음성 엔지니어',
      },
      {
        id: 10230,
        title: 'ERP전문가',
      },
      {
        id: 939,
        title: '웹 퍼블리셔',
      },
      {
        id: 898,
        title: '그래픽스 엔지니어',
      },
      {
        id: 795,
        title: 'CTO,Chief Technology Officer',
      },
      {
        id: 10112,
        title: 'VR 엔지니어',
      },
      {
        id: 1022,
        title: 'BI 엔지니어',
      },
      {
        id: 894,
        title: '루비온레일즈 개발자',
      },
      {
        id: 793,
        title: 'CIO,Chief Information Officer',
      },
    ],
    title: '개발',
  },
  {
    id: 507,
    tags: [
      {
        id: 559,
        title: 'PM·PO',
      },
      {
        id: 564,
        title: '사업개발·기획자',
      },
      {
        id: 565,
        title: '서비스 기획자',
      },
      {
        id: 563,
        title: '전략 기획자',
      },
      {
        id: 552,
        title: '경영지원',
      },
      {
        id: 554,
        title: '운영 매니저',
      },
      {
        id: 1034,
        title: '회계·경리',
      },
      {
        id: 656,
        title: '데이터 분석가',
      },
      {
        id: 10232,
        title: '상품기획자(BM)',
      },
      {
        id: 10116,
        title: '자금담당',
      },
      {
        id: 562,
        title: '총무',
      },
      {
        id: 10115,
        title: '해외 사업개발·기획자',
      },
      {
        id: 570,
        title: '컨설턴트',
      },
      {
        id: 10122,
        title: '사무보조',
      },
      {
        id: 557,
        title: '오피스 관리',
      },
      {
        id: 10233,
        title: '정보보호 담당자',
      },
      {
        id: 567,
        title: '조직관리',
      },
      {
        id: 561,
        title: '구매담당',
      },
      {
        id: 568,
        title: '경영 혁신가',
      },
      {
        id: 10234,
        title: 'ISMS(정보보호체계)',
      },
      {
        id: 569,
        title: '리스크 관리 전문가',
      },
      {
        id: 550,
        title: '비서',
      },
      {
        id: 792,
        title: 'CFO,Chief Financial Officer',
      },
      {
        id: 10117,
        title: '전시 기획자',
      },
      {
        id: 10119,
        title: '공연 기획자',
      },
      {
        id: 794,
        title: 'COO,Chief Operation Officer',
      },
      {
        id: 10118,
        title: '세미나/포럼 기획자',
      },
      {
        id: 798,
        title: 'CSO,Chief Strategy Officer',
      },
      {
        id: 10120,
        title: '애자일코치',
      },
      {
        id: 558,
        title: '지역 관리 매니저',
      },
      {
        id: 555,
        title: '안내원',
      },
      {
        id: 791,
        title: 'CEO,Chief Executive Officer',
      },
      {
        id: 560,
        title: '지점장',
      },
      {
        id: 10121,
        title: '사내 심리상담가',
      },
    ],
    title: '경영·비즈니스',
  },
  {
    id: 523,
    tags: [
      {
        id: 710,
        title: '마케터',
      },
      {
        id: 1030,
        title: '디지털 마케터',
      },
      {
        id: 1635,
        title: '콘텐츠 마케터',
      },
      {
        id: 10138,
        title: '퍼포먼스 마케터',
      },
      {
        id: 707,
        title: '브랜드 마케터',
      },
      {
        id: 719,
        title: '마케팅 전략 기획자',
      },
      {
        id: 763,
        title: '광고 기획자(AE)',
      },
      {
        id: 950,
        title: '글로벌 마케팅',
      },
      {
        id: 721,
        title: '소셜 마케터',
      },
      {
        id: 714,
        title: 'PR 전문가',
      },
      {
        id: 717,
        title: '그로스 해커',
      },
      {
        id: 1032,
        title: '마케팅 디렉터',
      },
      {
        id: 1033,
        title: '모바일마케팅',
      },
      {
        id: 708,
        title: '카피라이터',
      },
      {
        id: 722,
        title: '키워드광고',
      },
      {
        id: 720,
        title: '제휴',
      },
      {
        id: 716,
        title: 'BTL 마케터',
      },
      {
        id: 709,
        title: '마켓 리서처',
      },
      {
        id: 715,
        title: 'ATL 마케터',
      },
      {
        id: 799,
        title: 'CMO,Chief Marketing Officer',
      },
      {
        id: 801,
        title: 'CBO,Chief Brand Officer',
      },
      {
        id: 1031,
        title: 'Sports 전문가',
      },
    ],
    title: '마케팅·광고',
  },
  {
    id: 511,
    tags: [
      {
        id: 599,
        title: 'UX 디자이너',
      },
      {
        id: 597,
        title: 'UI,GUI 디자이너',
      },
      {
        id: 594,
        title: '웹 디자이너',
      },
      {
        id: 592,
        title: '그래픽 디자이너',
      },
      {
        id: 595,
        title: '모바일 디자이너',
      },
      {
        id: 603,
        title: '제품 디자이너',
      },
      {
        id: 1029,
        title: '광고 디자이너',
      },
      {
        id: 879,
        title: 'BI/BX 디자이너',
      },
      {
        id: 602,
        title: '영상,모션 디자이너',
      },
      {
        id: 10130,
        title: '패키지 디자이너',
      },
      {
        id: 929,
        title: '3D 디자이너',
      },
      {
        id: 928,
        title: '2D 디자이너',
      },
      {
        id: 593,
        title: '아트 디렉터',
      },
      {
        id: 596,
        title: '일러스트레이터',
      },
      {
        id: 953,
        title: '패션 디자이너',
      },
      {
        id: 606,
        title: '공간 디자이너',
      },
      {
        id: 952,
        title: '출판, 편집 디자이너',
      },
      {
        id: 601,
        title: '인테리어 디자이너',
      },
      {
        id: 951,
        title: '캐릭터 디자이너',
      },
      {
        id: 600,
        title: '산업 디자이너',
      },
      {
        id: 10129,
        title: '전시 디자이너',
      },
      {
        id: 10127,
        title: '가구 디자이너',
      },
      {
        id: 10131,
        title: 'VMD',
      },
      {
        id: 10128,
        title: '패브릭 디자이너',
      },
      {
        id: 605,
        title: '조경 디자이너',
      },
    ],
    title: '디자인',
  },
  {
    id: 530,
    tags: [
      {
        id: 1036,
        title: '기업영업',
      },
      {
        id: 766,
        title: '외부영업',
      },
      {
        id: 954,
        title: '영업 관리자',
      },
      {
        id: 770,
        title: '기술영업',
      },
      {
        id: 768,
        title: '주요고객사 담당자',
      },
      {
        id: 955,
        title: '해외영업',
      },
      {
        id: 1035,
        title: '솔루션 컨설턴트',
      },
      {
        id: 1633,
        title: '미디어 세일즈',
      },
      {
        id: 767,
        title: '내부영업',
      },
      {
        id: 1037,
        title: '고객성공매니저',
      },
      {
        id: 772,
        title: '의료기기 영업',
      },
      {
        id: 773,
        title: '세일즈 엔지니어',
      },
      {
        id: 771,
        title: '제약영업',
      },
    ],
    title: '영업',
  },
  {
    id: 510,
    tags: [
      {
        id: 758,
        title: 'MD',
      },
      {
        id: 1028,
        title: 'CS 매니저',
      },
      {
        id: 10126,
        title: '서비스 운영',
      },
      {
        id: 760,
        title: '리테일 MD',
      },
      {
        id: 586,
        title: 'CS 어드바이저',
      },
      {
        id: 759,
        title: '패션 MD',
      },
      {
        id: 901,
        title: 'CRM 전문가',
      },
      {
        id: 752,
        title: '매장 관리자',
      },
      {
        id: 769,
        title: '인바운드 텔레마케터',
      },
      {
        id: 754,
        title: '매장점원',
      },
      {
        id: 762,
        title: '가맹점 관리자',
      },
      {
        id: 902,
        title: '아웃바운드 텔레마케터',
      },
      {
        id: 639,
        title: '이벤트 기획자',
      },
      {
        id: 591,
        title: 'AS 기술자',
      },
      {
        id: 10125,
        title: '리셉션',
      },
      {
        id: 757,
        title: '비주얼머천다이저',
      },
      {
        id: 641,
        title: '여행 에이전트',
      },
      {
        id: 1637,
        title: '헬스케어매니저',
      },
      {
        id: 589,
        title: '승무원',
      },
      {
        id: 640,
        title: '플로리스트',
      },
      {
        id: 755,
        title: '피부관리사',
      },
      {
        id: 756,
        title: '헤어 디자이너',
      },
      {
        id: 10123,
        title: '미용사',
      },
      {
        id: 10124,
        title: '애견 미용사',
      },
    ],
    title: '고객서비스·리테일',
  },
  {
    id: 524,
    tags: [
      {
        id: 1046,
        title: '콘텐츠 크리에이터',
      },
      {
        id: 727,
        title: 'PD',
      },
      {
        id: 723,
        title: '영상 편집가',
      },
      {
        id: 725,
        title: '에디터',
      },
      {
        id: 3351,
        title: '비디오 제작',
      },
      {
        id: 10235,
        title: '연예,엔터테인먼트',
      },
      {
        id: 724,
        title: '작가',
      },
      {
        id: 940,
        title: '통·번역',
      },
      {
        id: 729,
        title: '사진작가',
      },
      {
        id: 1636,
        title: '라이센스 관리자',
      },
      {
        id: 956,
        title: '출판 기획자',
      },
      {
        id: 726,
        title: '저널리스트',
      },
      {
        id: 728,
        title: '리포터',
      },
      {
        id: 957,
        title: '음향 엔지니어',
      },
      {
        id: 1045,
        title: '큐레이터',
      },
    ],
    title: '미디어',
  },
  {
    id: 513,
    tags: [
      {
        id: 823,
        title: '전자 엔지니어',
      },
      {
        id: 843,
        title: '기계 엔지니어',
      },
      {
        id: 10145,
        title: '로봇·자동화',
      },
      {
        id: 821,
        title: '전기 엔지니어',
      },
      {
        id: 10132,
        title: 'CAD·3D 설계자',
      },
      {
        id: 817,
        title: '제어 엔지니어',
      },
      {
        id: 856,
        title: '제품 엔지니어',
      },
      {
        id: 822,
        title: '전기기계 공학자',
      },
      {
        id: 826,
        title: '장비 엔지니어',
      },
      {
        id: 828,
        title: '설비 엔지니어',
      },
      {
        id: 857,
        title: '프로젝트 엔지니어',
      },
      {
        id: 859,
        title: 'QA 엔지니어',
      },
      {
        id: 804,
        title: '자동차 공학자',
      },
      {
        id: 836,
        title: '산업 엔지니어',
      },
      {
        id: 839,
        title: '인허가 담당 엔지니어',
      },
      {
        id: 810,
        title: '도면 담당자',
      },
      {
        id: 855,
        title: '공정 엔지니어',
      },
      {
        id: 864,
        title: 'RF 엔지니어',
      },
      {
        id: 860,
        title: 'QC 엔지니어',
      },
      {
        id: 819,
        title: '도면 작성가',
      },
      {
        id: 824,
        title: '환경 엔지니어',
      },
      {
        id: 861,
        title: '전자계전 엔지니어',
      },
      {
        id: 802,
        title: '항공우주 공학자',
      },
      {
        id: 812,
        title: '시운전 엔지니어',
      },
      {
        id: 815,
        title: '건설 엔지니어',
      },
      {
        id: 825,
        title: '환경 안전기사',
      },
      {
        id: 853,
        title: '플랜트 엔지니어',
      },
      {
        id: 867,
        title: '구조공학 엔지니어',
      },
      {
        id: 809,
        title: '화학공학 엔지니어',
      },
      {
        id: 811,
        title: '토목기사',
      },
      {
        id: 831,
        title: '지리정보시스템',
      },
      {
        id: 842,
        title: '재료공학자',
      },
      {
        id: 848,
        title: '원자력·에너지',
      },
      {
        id: 854,
        title: '플라스틱 엔지니어',
      },
      {
        id: 858,
        title: '사업수주 엔지니어',
      },
      {
        id: 865,
        title: '회전기계 엔지니어',
      },
      {
        id: 803,
        title: '농업 공학자',
      },
      {
        id: 805,
        title: '유전 공학자',
      },
      {
        id: 806,
        title: '생물의학자',
      },
      {
        id: 807,
        title: '보일러 엔지니어',
      },
      {
        id: 808,
        title: '세라믹 엔지니어',
      },
      {
        id: 820,
        title: '시추 엔지니어',
      },
      {
        id: 830,
        title: '소방안전 기술자',
      },
      {
        id: 832,
        title: '지리학자',
      },
      {
        id: 833,
        title: '지질공학자',
      },
      {
        id: 834,
        title: '보건안전 엔지니어',
      },
      {
        id: 835,
        title: '고압설계 엔지니어',
      },
      {
        id: 838,
        title: 'I\u0026C 엔지니어',
      },
      {
        id: 840,
        title: '생산공학 엔지니어',
      },
      {
        id: 841,
        title: '해양공학자',
      },
      {
        id: 844,
        title: '금속 공학자',
      },
      {
        id: 845,
        title: '광산 기술자',
      },
      {
        id: 846,
        title: '광산 안전 기술자',
      },
      {
        id: 847,
        title: '선박 공학자',
      },
      {
        id: 850,
        title: '석유공학 엔지니어',
      },
      {
        id: 852,
        title: '배관설계 엔지니어',
      },
      {
        id: 863,
        title: '저수처리 엔지니어',
      },
      {
        id: 869,
        title: '터빈공학자',
      },
    ],
    title: '엔지니어링·설계',
  },
  {
    id: 517,
    tags: [
      {
        id: 643,
        title: '인사담당',
      },
      {
        id: 649,
        title: '조직문화',
      },
      {
        id: 644,
        title: '리크루터',
      },
      {
        id: 645,
        title: '평가·보상',
      },
      {
        id: 648,
        title: 'HRD',
      },
      {
        id: 650,
        title: '급여담당',
      },
      {
        id: 647,
        title: '노무·노사',
      },
      {
        id: 1041,
        title: '헤드헌터',
      },
      {
        id: 1043,
        title: 'HRBP',
      },
      {
        id: 642,
        title: 'HR 컨설턴트',
      },
      {
        id: 1044,
        title: '사내 강사',
      },
      {
        id: 611,
        title: '기술 교육',
      },
      {
        id: 651,
        title: 'E-러닝',
      },
      {
        id: 608,
        title: '교사',
      },
      {
        id: 1042,
        title: '교수',
      },
    ],
    title: 'HR',
  },
  {
    id: 959,
    tags: [
      {
        id: 892,
        title: '게임 기획자',
      },
      {
        id: 961,
        title: '게임 클라이언트 개발자',
      },
      {
        id: 881,
        title: '게임 아티스트',
      },
      {
        id: 880,
        title: '게임 그래픽 디자이너',
      },
      {
        id: 878,
        title: '유니티 개발자',
      },
      {
        id: 962,
        title: '모바일 게임 개발자',
      },
      {
        id: 960,
        title: '게임 서버 개발자',
      },
      {
        id: 897,
        title: '언리얼 개발자',
      },
      {
        id: 958,
        title: '게임운영자(GM)',
      },
    ],
    title: '게임 제작',
  },
  {
    id: 508,
    tags: [
      {
        id: 534,
        title: '회계담당',
      },
      {
        id: 1048,
        title: '재무 담당자',
      },
      {
        id: 920,
        title: 'IR',
      },
      {
        id: 10056,
        title: '투자·증권',
      },
      {
        id: 538,
        title: '재무 분석가',
      },
      {
        id: 547,
        title: '내부통제 담당자',
      },
      {
        id: 936,
        title: '자산운용가',
      },
      {
        id: 882,
        title: '애널리스트',
      },
      {
        id: 938,
        title: '준법감시인',
      },
      {
        id: 934,
        title: '금융공학자',
      },
      {
        id: 1047,
        title: '세무사',
      },
      {
        id: 542,
        title: '공인회계사',
      },
      {
        id: 933,
        title: '트레이더',
      },
      {
        id: 742,
        title: '부동산 자산 관리자',
      },
      {
        id: 1049,
        title: '청구 담당자',
      },
      {
        id: 682,
        title: '손해 사정관',
      },
      {
        id: 743,
        title: '부동산 중개사',
      },
      {
        id: 935,
        title: '자산관리사',
      },
      {
        id: 683,
        title: '계리사',
      },
      {
        id: 937,
        title: '투자은행가',
      },
      {
        id: 681,
        title: '보험 에이전트',
      },
      {
        id: 684,
        title: '언더라이터',
      },
      {
        id: 745,
        title: '감정평가사',
      },
    ],
    title: '금융',
  },
  {
    id: 522,
    tags: [
      {
        id: 701,
        title: '생산 관리자',
      },
      {
        id: 704,
        title: '품질 관리자',
      },
      {
        id: 699,
        title: '자재관리·구매',
      },
      {
        id: 700,
        title: '기계·설비·설계',
      },
      {
        id: 702,
        title: '생산직 종사자',
      },
      {
        id: 10113,
        title: '섬유·의류·패션',
      },
      {
        id: 698,
        title: '제조 엔지니어',
      },
      {
        id: 703,
        title: '공정 관리자',
      },
      {
        id: 10114,
        title: '반도체·디스플레이',
      },
      {
        id: 695,
        title: '조립 기술자',
      },
      {
        id: 696,
        title: '화학자',
      },
      {
        id: 706,
        title: '제조 테스트 엔지니어',
      },
      {
        id: 697,
        title: '기계제작 기술자',
      },
      {
        id: 705,
        title: '안전 관리자',
      },
    ],
    title: '제조·생산',
  },
  {
    id: 10101,
    tags: [
      {
        id: 10103,
        title: '교재·교육기획',
      },
      {
        id: 10102,
        title: '전문강사',
      },
      {
        id: 10104,
        title: '학원강사',
      },
      {
        id: 10106,
        title: '외국어교육',
      },
      {
        id: 10109,
        title: '자격증·기술전문교육',
      },
      {
        id: 10105,
        title: '교직원',
      },
      {
        id: 10107,
        title: '유치원·보육교사',
      },
      {
        id: 10108,
        title: '초·중·고 교사',
      },
    ],
    title: '교육',
  },
  {
    id: 515,
    tags: [
      {
        id: 739,
        title: '연구원',
      },
      {
        id: 735,
        title: '임상시험 연구원',
      },
      {
        id: 740,
        title: '생명공학 연구원',
      },
      {
        id: 737,
        title: '미생물학자',
      },
      {
        id: 627,
        title: '간호사',
      },
      {
        id: 633,
        title: '의사',
      },
      {
        id: 634,
        title: '수의사',
      },
      {
        id: 733,
        title: '약사',
      },
      {
        id: 736,
        title: '임상시험 간호사',
      },
      {
        id: 738,
        title: '유전공학자',
      },
      {
        id: 1040,
        title: '한의사',
      },
      {
        id: 10054,
        title: '방사선사',
      },
      {
        id: 635,
        title: '간호 조무사',
      },
      {
        id: 10147,
        title: '임상심리사',
      },
      {
        id: 626,
        title: '임상병리사',
      },
      {
        id: 630,
        title: '물리 치료사',
      },
      {
        id: 632,
        title: '수의 테크니션',
      },
      {
        id: 731,
        title: '약학 분석 화학자',
      },
      {
        id: 732,
        title: '연구실 기사',
      },
      {
        id: 10134,
        title: '병원 코디네이터',
      },
      {
        id: 622,
        title: '치과 위생사',
      },
      {
        id: 623,
        title: '증례 관리자',
      },
      {
        id: 624,
        title: '간병인',
      },
      {
        id: 625,
        title: '조무사',
      },
      {
        id: 629,
        title: '작업 치료사',
      },
      {
        id: 631,
        title: '호흡장애 치료사',
      },
      {
        id: 636,
        title: '치과의사',
      },
      {
        id: 637,
        title: '검안사',
      },
      {
        id: 734,
        title: '약사 보조원',
      },
      {
        id: 10135,
        title: '의무기록사',
      },
    ],
    title: '의료·제약·바이오',
  },
  {
    id: 532,
    tags: [
      {
        id: 783,
        title: '물류담당',
      },
      {
        id: 10148,
        title: '입·출고 관리자',
      },
      {
        id: 782,
        title: '물류 분석가',
      },
      {
        id: 10149,
        title: '유통 관리자',
      },
      {
        id: 10151,
        title: '수출입사무',
      },
      {
        id: 10053,
        title: '무역사무',
      },
      {
        id: 777,
        title: '배송담당',
      },
      {
        id: 786,
        title: '운송 관리자',
      },
      {
        id: 789,
        title: '해운·해양 운송',
      },
      {
        id: 10140,
        title: '원산지관리사',
      },
      {
        id: 10150,
        title: '바이어관리·상담·개발',
      },
      {
        id: 785,
        title: '선적,발송 사무원',
      },
      {
        id: 787,
        title: '웨어하우스',
      },
      {
        id: 788,
        title: '항공 운송',
      },
      {
        id: 10139,
        title: '관세사',
      },
      {
        id: 778,
        title: '디젤 정비공',
      },
      {
        id: 779,
        title: '운행 관리원',
      },
      {
        id: 780,
        title: '지게차 운전사',
      },
      {
        id: 781,
        title: '운전기사',
      },
      {
        id: 784,
        title: '화물트럭 운전기사',
      },
      {
        id: 790,
        title: '보세사',
      },
      {
        id: 10236,
        title: '항해사',
      },
      {
        id: 10237,
        title: '기관사',
      },
    ],
    title: '물류·무역',
  },
  {
    id: 521,
    tags: [
      {
        id: 1002,
        title: '법무담당',
      },
      {
        id: 691,
        title: '변호사',
      },
      {
        id: 692,
        title: '법무 자문위원',
      },
      {
        id: 10136,
        title: '변리사',
      },
      {
        id: 10137,
        title: '특허담당',
      },
      {
        id: 694,
        title: '법무사',
      },
      {
        id: 686,
        title: '수사관',
      },
      {
        id: 687,
        title: '보호 관찰관',
      },
      {
        id: 688,
        title: '경찰관',
      },
      {
        id: 689,
        title: '보안요원',
      },
      {
        id: 690,
        title: '경호원',
      },
      {
        id: 693,
        title: '법무관',
      },
    ],
    title: '법률·법집행기관',
  },
  {
    id: 10057,
    tags: [
      {
        id: 10153,
        title: '식품가공·개발',
      },
      {
        id: 761,
        title: '식품 MD',
      },
      {
        id: 10058,
        title: '메뉴개발',
      },
      {
        id: 749,
        title: '외식업 종사자',
      },
      {
        id: 750,
        title: '레스토랑 관리자',
      },
      {
        id: 747,
        title: '바텐더',
      },
      {
        id: 748,
        title: '요리사',
      },
      {
        id: 10152,
        title: '소믈리에',
      },
      {
        id: 628,
        title: '영양사',
      },
      {
        id: 746,
        title: '제과·제빵사',
      },
      {
        id: 10141,
        title: '푸드스타일리스트',
      },
      {
        id: 10154,
        title: '바리스타',
      },
    ],
    title: '식·음료',
  },
  {
    id: 509,
    tags: [
      {
        id: 10143,
        title: '건축시공·감리',
      },
      {
        id: 572,
        title: '현장 소장',
      },
      {
        id: 10142,
        title: '실내건축',
      },
      {
        id: 604,
        title: '건축가',
      },
      {
        id: 10144,
        title: '건설 안전·품질·검사',
      },
      {
        id: 584,
        title: '견적 기술자',
      },
      {
        id: 575,
        title: '유지보수 관리자',
      },
      {
        id: 576,
        title: '관리인',
      },
      {
        id: 577,
        title: '전기 기술자',
      },
      {
        id: 578,
        title: '인스톨러',
      },
      {
        id: 585,
        title: '측량·계측',
      },
      {
        id: 571,
        title: '목수',
      },
      {
        id: 573,
        title: '중장비 기술자',
      },
      {
        id: 574,
        title: '정비공',
      },
      {
        id: 579,
        title: '페인터',
      },
      {
        id: 580,
        title: '플랜트 관리자',
      },
      {
        id: 581,
        title: '용접기사',
      },
      {
        id: 582,
        title: '배관공',
      },
      {
        id: 583,
        title: '연관공',
      },
    ],
    title: '건설·시설',
  },
  {
    id: 514,
    tags: [
      {
        id: 609,
        title: '카운셀러',
      },
      {
        id: 615,
        title: '소방관',
      },
      {
        id: 616,
        title: '환경 전문가',
      },
      {
        id: 617,
        title: '정보 분석가',
      },
      {
        id: 618,
        title: '인명 구조원',
      },
      {
        id: 619,
        title: '지역 전문가',
      },
      {
        id: 620,
        title: '공무원',
      },
      {
        id: 621,
        title: '직업군인',
      },
      {
        id: 730,
        title: '자원봉사자',
      },
      {
        id: 10055,
        title: '사회복지사',
      },
      {
        id: 10133,
        title: '응급구조사',
      },
      {
        id: 10146,
        title: '요양보호사',
      },
    ],
    title: '공공·복지',
  },
];
