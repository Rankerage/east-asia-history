// 역사강역도 타임라인 이벤트 데이터
// DB 기반 자동 생성
var TIMELINE_EVENTS = [
  // ── 고조선 ──
  {era:"gojoseon",year:-2333,lat:39.4,lng:125.0,title:"단군 건국",desc:"아사달에 도읍. 홍익인간 이화세계.",type:"foundation"},
  {era:"gojoseon",year:-194,lat:39.03,lng:125.75,title:"위만 집권",desc:"위만, 준왕 축출하고 왕위 찬탈.",type:"political"},
  {era:"gojoseon",year:-109,lat:39.03,lng:125.75,title:"한 무제 침공",desc:"5만 대군으로 왕검성 공격.",type:"battle"},
  {era:"gojoseon",year:-108,lat:39.03,lng:125.75,title:"고조선 멸망",desc:"한사군 설치. 낙랑·진번·임둔·현도.",type:"fall"},

  // ── 부여 ──
  {era:"buyeo",year:-200,lat:44.99,lng:126.03,title:"부여 건국",desc:"만주 중북부 송화강 유역.",type:"foundation"},
  {era:"buyeo",year:49,lat:44.99,lng:126.03,title:"부여왕, 후한에 사신",desc:"후한 광무제에 조공, 비단 하사받음.",type:"diplomatic"},
  {era:"buyeo",year:285,lat:44.99,lng:126.03,title:"선비 모용부 침공",desc:"의려(依慮)왕 자결. 수도 함락.",type:"battle"},
  {era:"buyeo",year:494,lat:41.12,lng:126.18,title:"부여 멸망",desc:"고구려 문자명왕에게 병합됨.",type:"fall"},

  // ── 고구려 전기 ──
  {era:"goguryeo_early",year:-37,lat:41.27,lng:125.35,title:"고구려 건국",desc:"동명성왕(주몽), 졸본에 도읍.",type:"foundation"},
  {era:"goguryeo_early",year:3,lat:41.12,lng:126.18,title:"국내성 천도",desc:"유리왕, 국내성으로 도읍 옮김.",type:"political"},
  {era:"goguryeo_early",year:53,lat:41.12,lng:126.18,title:"태조왕 즉위",desc:"중앙집권 체제 확립. 옥저·동예 복속.",type:"political"},
  {era:"goguryeo_early",year:244,lat:41.12,lng:126.18,title:"관구검 침공",desc:"위나라 관구검, 국내성 함락. 동천왕 피신.",type:"battle"},

  // ── 고구려 후기·전성기 ──
  {era:"goguryeo_late",year:313,lat:39.03,lng:125.75,title:"낙랑군 병합",desc:"미천왕, 낙랑군을 병합하여 요동 진출 기반 마련.",type:"expansion"},
  {era:"goguryeo_late",year:391,lat:41.12,lng:126.18,title:"광개토대왕 즉위",desc:"영락(永樂) 연호. 최대 정복군주.",type:"political"},
  {era:"goguryeo_late",year:400,lat:37.00,lng:121.00,title:"산동 진출",desc:"광개토대왕, 후연 격파하고 산동반도 진출.",type:"expansion"},
  {era:"goguryeo_late",year:427,lat:39.03,lng:125.75,title:"평양 천도",desc:"장수왕, 평양으로 천도. 남진정책 본격화.",type:"political"},
  {era:"goguryeo_late",year:475,lat:37.50,lng:127.10,title:"한성 함락",desc:"장수왕, 백제 한성 함락. 개로왕 전사.",type:"battle"},
  {era:"goguryeo_late",year:612,lat:39.70,lng:126.00,title:"살수대첩",desc:"을지문덕, 수 양제 30만 별동대 궤멸.",type:"battle"},
  {era:"goguryeo_late",year:645,lat:40.65,lng:122.85,title:"안시성 전투",desc:"양만춘, 당 태종의 공격 방어 성공.",type:"battle"},
  {era:"goguryeo_late",year:668,lat:39.03,lng:125.75,title:"고구려 멸망",desc:"나당연합군에 의한 평양성 함락.",type:"fall"},

  // ── 백제 ──
  {era:"baekje",year:-18,lat:37.50,lng:127.10,title:"백제 건국",desc:"온조왕, 위례성에 도읍.",type:"foundation"},
  {era:"baekje",year:346,lat:37.50,lng:127.10,title:"근초고왕 즉위",desc:"백제 전성기. 요서·산동·규슈 진출.",type:"political"},
  {era:"baekje",year:475,lat:37.50,lng:127.10,title:"한성 함락",desc:"고구려 장수왕의 공격. 웅진으로 천도.",type:"battle"},
  {era:"baekje",year:538,lat:36.28,lng:126.91,title:"사비 천도",desc:"성왕, 사비(부여)로 천도. 국호 남부여로 개칭.",type:"political"},
  {era:"baekje",year:660,lat:36.28,lng:126.91,title:"백제 멸망",desc:"나당연합군. 황산벌 계백 장군 최후 항전.",type:"fall"},

  // ── 신라 전기 ──
  {era:"silla_early",year:-57,lat:35.84,lng:129.21,title:"신라 건국",desc:"혁거세 거서간, 서라벌(경주)에 도읍.",type:"foundation"},
  {era:"silla_early",year:527,lat:35.84,lng:129.21,title:"불교 공인",desc:"법흥왕, 이차돈 순교로 불교 공식 인정.",type:"cultural"},
  {era:"silla_early",year:562,lat:35.50,lng:128.50,title:"가야 병합",desc:"진흥왕, 대가야 완전 병합.",type:"expansion"},

  // ── 통일신라 ──
  {era:"silla_late",year:668,lat:35.84,lng:129.21,title:"삼국통일 선포",desc:"문무왕, 당과 연합하여 고구려·백제 멸망.",type:"political"},
  {era:"silla_late",year:676,lat:37.50,lng:127.00,title:"나당전쟁 승리",desc:"당군을 한반도에서 축출. 대동강~원산만 이남 통일.",type:"battle"},
  {era:"silla_late",year:751,lat:35.79,lng:129.34,title:"불국사·석굴암 창건",desc:"김대성 발원. 신라 불교문화의 정점.",type:"cultural"},

  // ── 발해 ──
  {era:"balhae",year:698,lat:43.00,lng:129.00,title:"발해 건국",desc:"대조영, 동모산에서 발해 건국.",type:"foundation"},
  {era:"balhae",year:713,lat:44.05,lng:129.13,title:"당과 국교 수립",desc:"당 현종이 대조영을 발해군왕으로 책봉.",type:"diplomatic"},
  {era:"balhae",year:926,lat:44.05,lng:129.13,title:"발해 멸망",desc:"거란 야율아보기 침공. 상경 함락.",type:"fall"},

  // ── 고려 전기 ──
  {era:"goryeo_early",year:918,lat:37.97,lng:126.55,title:"고려 건국",desc:"왕건(태조), 궁예 축출하고 고려 건국.",type:"foundation"},
  {era:"goryeo_early",year:936,lat:37.97,lng:126.55,title:"후삼국 통일",desc:"신라 경순왕 항복, 후백제 견훤 격파.",type:"political"},
  {era:"goryeo_early",year:993,lat:40.00,lng:125.00,title:"제1차 거란 침입",desc:"서희의 외교 담판. 강동6주 확보.",type:"battle"},
  {era:"goryeo_early",year:1019,lat:40.00,lng:125.50,title:"귀주대첩",desc:"강감찬 장군, 거란군 대파.",type:"battle"},
  {era:"goryeo_early",year:1107,lat:40.50,lng:128.00,title:"동북9성 축조",desc:"윤관, 별무반으로 여진 정벌. 9성 축조.",type:"expansion"},

  // ── 고려 후기 ──
  {era:"goryeo_late",year:1170,lat:37.97,lng:126.55,title:"무신정변",desc:"정중부·이의방·이고, 문신 대량 학살.",type:"political"},
  {era:"goryeo_late",year:1232,lat:37.60,lng:126.50,title:"강화 천도",desc:"몽골 침입에 강화도로 수도를 옮김.",type:"political"},
  {era:"goryeo_late",year:1270,lat:37.97,lng:126.55,title:"개경 환도",desc:"원에 항복. 삼별초는 진도·제주로 저항.",type:"political"},
  {era:"goryeo_late",year:1356,lat:39.00,lng:125.75,title:"쌍성총관부 회복",desc:"공민왕, 원의 쌍성총관부 공격하여 수복.",type:"expansion"},
  {era:"goryeo_late",year:1388,lat:39.50,lng:125.50,title:"위화도 회군",desc:"이성계, 요동 정벌 중 회군. 정권 장악.",type:"political"},
  {era:"goryeo_late",year:1392,lat:37.97,lng:126.55,title:"고려 멸망",desc:"이성계, 조선 건국.",type:"fall"},

  // ── 조선 전기 ──
  {era:"joseon_early",year:1392,lat:37.57,lng:126.98,title:"조선 건국",desc:"태조 이성계, 한양에 도읍.",type:"foundation"},
  {era:"joseon_early",year:1419,lat:34.50,lng:128.50,title:"대마도 정벌",desc:"세종, 이종무 파견하여 왜구 소탕.",type:"battle"},
  {era:"joseon_early",year:1446,lat:37.57,lng:126.98,title:"훈민정음 반포",desc:"세종대왕, 한글 창제·반포.",type:"cultural"},
  {era:"joseon_early",year:1592,lat:34.80,lng:128.50,title:"임진왜란 발발",desc:"도요토미 히데요시, 조선 침공. 한산도대첩.",type:"battle"},
  {era:"joseon_early",year:1597,lat:34.55,lng:126.35,title:"명량대첩",desc:"이순신, 13척으로 133척 왜선 격파.",type:"battle"},
  {era:"joseon_early",year:1637,lat:37.57,lng:126.98,title:"병자호란 종결",desc:"인조 삼전도 항복. 청의 속국 체제.",type:"political"},

  // ── 조선 후기 ──
  {era:"joseon_late",year:1776,lat:37.57,lng:126.98,title:"정조 즉위",desc:"조선 르네상스. 수원화성 건설, 규장각 설치.",type:"political"},
  {era:"joseon_late",year:1811,lat:39.80,lng:125.80,title:"홍경래의 난",desc:"평안도 농민 대규모 반란. 세도정치에 저항.",type:"rebellion"},
  {era:"joseon_late",year:1866,lat:37.60,lng:126.50,title:"병인양요",desc:"프랑스 극동함대 강화도 침공.",type:"battle"},
  {era:"joseon_late",year:1876,lat:37.60,lng:126.50,title:"강화도조약",desc:"일본과 불평등조약 체결. 개항 시작.",type:"diplomatic"},
  {era:"joseon_late",year:1894,lat:37.57,lng:126.98,title:"갑오개혁",desc:"급진적 근대화 개혁. 신분제·과거제 폐지.",type:"political"},

  // ── 대한제국 ──
  {era:"daehan",year:1897,lat:37.56,lng:126.98,title:"대한제국 선포",desc:"고종, 환구단에서 황제 즉위. 연호 광무.",type:"foundation"},
  {era:"daehan",year:1905,lat:37.57,lng:126.98,title:"을사늑약",desc:"일본, 대한제국 외교권 박탈. 통감부 설치.",type:"diplomatic"},
  {era:"daehan",year:1907,lat:37.57,lng:126.97,title:"헤이그 특사 사건",desc:"이준·이상설·이위종, 만국평화회의에 파견.",type:"diplomatic"},
  {era:"daehan",year:1909,lat:42.80,lng:129.50,title:"간도협약",desc:"청일 간도협약으로 간도 영유권 상실.",type:"diplomatic"},
  {era:"daehan",year:1910,lat:37.57,lng:126.98,title:"경술국치",desc:"일본에 의한 강제병합. 대한제국 멸망.",type:"fall"}
];
