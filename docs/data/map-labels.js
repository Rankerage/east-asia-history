// ============================================
// 책고보 대형지도 — 전 지명 라벨 (161개)
// 좌표 + 한자 + 시대 + 사료출처
// ============================================
var MAP_LABELS = [
  // === 베이징·하북 (Beijing·Hebei) ===
  {name:'북경(北京)',lng:116.40,lat:39.90,era:'goguryeo_late,goryeo_early',hanja:'北京'},
  {name:'천진(天津)',lng:117.20,lat:39.13,era:'goguryeo_late,goryeo_early',hanja:'天津'},
  {name:'탕산(唐山)',lng:118.20,lat:39.63,era:'goryeo_early',hanja:'唐山'},
  {name:'승덕(承德)',lng:117.93,lat:40.97,era:'goguryeo_late,goryeo_early',hanja:'承德'},
  {name:'진황도(秦皇島)',lng:119.60,lat:39.93,era:'goguryeo_late',hanja:'秦皇島'},
  {name:'장가구(張家口)',lng:114.88,lat:40.82,era:'goguryeo_late,goryeo_early',hanja:'張家口'},
  {name:'보정(保定)',lng:115.47,lat:38.87,era:'goguryeo_late,goryeo_early',hanja:'保定'},
  {name:'계(薊)',lng:116.40,lat:39.90,era:'gojoseon,goguryeo_early',hanja:'薊'},

  // === 산동 (Shandong) ===
  {name:'제남(濟南)',lng:116.98,lat:36.67,era:'baekje,goguryeo_late',hanja:'濟南'},
  {name:'청도(靑島)',lng:120.38,lat:36.07,era:'baekje',hanja:'靑島'},
  {name:'연태(煙臺)',lng:121.40,lat:37.53,era:'baekje,goguryeo_late',hanja:'煙臺'},
  {name:'위해(威海)',lng:122.12,lat:37.51,era:'baekje',hanja:'威海'},
  {name:'치박(淄博)',lng:118.05,lat:36.81,era:'baekje',hanja:'淄博'},
  {name:'유방(潍坊)',lng:119.16,lat:36.71,era:'baekje',hanja:'潍坊'},
  {name:'태산(泰山)',lng:117.10,lat:36.25,era:'baekje,goryeo_early',hanja:'泰山'},
  {name:'임치(臨淄)',lng:118.35,lat:36.80,era:'baekje',hanja:'臨淄'},
  {name:'내주(萊州)',lng:119.93,lat:37.18,era:'baekje',hanja:'萊州'},

  // === 요동·요서 (Liaodong·Liaoxi) ===
  {name:'심양(瀋陽)',lng:123.43,lat:41.80,era:'goguryeo_early,goguryeo_late,goryeo_early',hanja:'瀋陽'},
  {name:'요양(遼陽)',lng:123.20,lat:41.27,era:'goguryeo_early,goguryeo_late',hanja:'遼陽'},
  {name:'대련(大連)',lng:121.62,lat:38.92,era:'goguryeo_late',hanja:'大連'},
  {name:'안시성(安市城)',lng:116.70,lat:39.90,era:'goguryeo_late',hanja:'安市城'},
  {name:'책성(柵城)',lng:123.43,lat:41.80,era:'goguryeo_late',hanja:'柵城'},
  {name:'요동성(遼東城)',lng:123.01,lat:41.20,era:'goguryeo_late',hanja:'遼東城'},
  {name:'건안성(建安城)',lng:122.40,lat:40.50,era:'goguryeo_late',hanja:'建安城'},
  {name:'유성(柳城)',lng:120.50,lat:41.60,era:'goguryeo_early,goguryeo_late',hanja:'柳城'},
  {name:'창려(昌黎)',lng:119.20,lat:39.70,era:'goguryeo_late',hanja:'昌黎'},
  {name:'북평(北平)',lng:119.50,lat:39.90,era:'goguryeo_late',hanja:'北平'},
  {name:'산해관(山海關)',lng:119.75,lat:40.00,era:'goguryeo_late',hanja:'山海關'},
  {name:'난하(灤河)',lng:119.00,lat:39.50,era:'goguryeo_late',hanja:'灤河'},

  // === 만주 (Manchuria) ===
  {name:'장춘(長春)',lng:125.32,lat:43.88,era:'goguryeo_late,balhae,goryeo_early',hanja:'長春'},
  {name:'길림(吉林)',lng:126.55,lat:43.84,era:'goguryeo_late,balhae,goryeo_early',hanja:'吉林'},
  {name:'하얼빈(哈爾濱)',lng:126.53,lat:45.80,era:'goguryeo_late,balhae,goryeo_early',hanja:'哈爾濱'},
  {name:'목단강(牡丹江)',lng:129.63,lat:44.55,era:'balhae',hanja:'牡丹江'},
  {name:'연길(延吉)',lng:129.50,lat:42.90,era:'balhae,joseon_late',hanja:'延吉'},
  {name:'농안(農安)',lng:126.03,lat:44.99,era:'buyeo',hanja:'農安'},
  {name:'제제합이(齊齊哈爾)',lng:123.97,lat:47.35,era:'goryeo_early',hanja:'齊齊哈爾'},
  {name:'용담(상경용천부)',lng:129.13,lat:44.05,era:'balhae',hanja:'上京龍泉府'},

  // === 한반도 (Korean Peninsula) ===
  {name:'평양(平壤)',lng:125.75,lat:39.03,era:'gojoseon,goguryeo_late,goryeo_early',hanja:'平壤'},
  {name:'국내성(國內城)',lng:126.18,lat:41.12,era:'goguryeo_early,goguryeo_late',hanja:'國內城'},
  {name:'졸본(卒本)',lng:125.35,lat:41.27,era:'goguryeo_early',hanja:'卒本'},
  {name:'한성(漢城)',lng:126.98,lat:37.57,era:'joseon_early,joseon_late,daehan',hanja:'漢城'},
  {name:'개성(開城)',lng:126.55,lat:37.97,era:'goryeo_early,goryeo_late',hanja:'開城'},
  {name:'경주(慶州)',lng:129.21,lat:35.84,era:'silla_early,silla_late',hanja:'慶州'},
  {name:'부산(釜山)',lng:129.08,lat:35.18,era:'joseon_late,daehan',hanja:'釜山'},
  {name:'인천(仁川)',lng:126.62,lat:37.47,era:'joseon_late,daehan',hanja:'仁川'},
  {name:'의주(義州)',lng:124.53,lat:40.15,era:'joseon_early,joseon_late',hanja:'義州'},
  {name:'함흥(咸興)',lng:127.50,lat:39.91,era:'joseon_early',hanja:'咸興'},
  {name:'청진(淸津)',lng:129.78,lat:41.80,era:'joseon_late,daehan',hanja:'淸津'},
  {name:'원산(元山)',lng:127.45,lat:39.15,era:'joseon_late',hanja:'元山'},
  {name:'해주(海州)',lng:125.72,lat:38.04,era:'joseon_early',hanja:'海州'},
  {name:'백두산(白頭山)',lng:128.08,lat:41.99,era:'goguryeo_late,balhae,joseon_early',hanja:'白頭山'},

  // === 산서·태행 (Shanxi·Taihang) ===
  {name:'태원(太原)',lng:112.55,lat:37.87,era:'goguryeo_late,goryeo_early',hanja:'太原'},
  {name:'대동(大同)',lng:113.30,lat:40.08,era:'goguryeo_early,goguryeo_late',hanja:'大同'},
  {name:'정형(井陘)',lng:114.20,lat:38.05,era:'goguryeo_late',hanja:'井陘'},
  {name:'태행산맥(太行山脈)',lng:114.00,lat:37.50,era:'gojoseon,goguryeo_late',hanja:'太行山脈'},

  // === 하남 (Henan) ===
  {name:'낙양(洛陽)',lng:112.45,lat:34.62,era:'goguryeo_late,sui,tang,goryeo_early',hanja:'洛陽'},
  {name:'개봉(開封)',lng:114.31,lat:34.80,era:'goryeo_early',hanja:'開封'},
  {name:'정주(鄭州)',lng:113.65,lat:34.75,era:'goryeo_early',hanja:'鄭州'},
  {name:'안양(安陽)',lng:114.35,lat:36.10,era:'goguryeo_late',hanja:'安陽'},

  // === 양자강 유역 (Yangtze) ===
  {name:'남경(南京)',lng:118.80,lat:32.06,era:'silla_early,silla_late,goryeo_early',hanja:'南京'},
  {name:'상해(上海)',lng:121.47,lat:31.23,era:'silla_early,goryeo_early',hanja:'上海'},
  {name:'항주(杭州)',lng:120.17,lat:30.25,era:'silla_early,goryeo_early',hanja:'杭州'},
  {name:'소주(蘇州)',lng:120.60,lat:31.30,era:'silla_early,goryeo_early',hanja:'蘇州'},
  {name:'양주(揚州)',lng:119.43,lat:32.39,era:'silla_early,goryeo_early',hanja:'揚州'},
  {name:'무한(武漢)',lng:114.31,lat:30.59,era:'goryeo_early,goryeo_late',hanja:'武漢'},
  {name:'무호(蕪湖)',lng:118.38,lat:31.35,era:'goryeo_early',hanja:'蕪湖'},
  {name:'남창(南昌)',lng:115.85,lat:28.68,era:'goryeo_early',hanja:'南昌'},
  {name:'장사(長沙)',lng:112.97,lat:28.23,era:'goryeo_early',hanja:'長沙'},
  {name:'양자강(長江)',lng:121.00,lat:31.50,era:'silla_early,goryeo_early',hanja:'長江'},

  // === 서부 (West China) ===
  {name:'서안(西安)',lng:108.90,lat:34.27,era:'goryeo_early,goryeo_late',hanja:'西安'},
  {name:'성도(成都)',lng:104.07,lat:30.57,era:'goryeo_early,goryeo_late',hanja:'成都'},
  {name:'중경(重慶)',lng:106.55,lat:29.56,era:'goryeo_early',hanja:'重慶'},
  {name:'난주(蘭州)',lng:103.82,lat:36.06,era:'goryeo_early',hanja:'蘭州'},
  {name:'돈황(敦煌)',lng:94.66,lat:40.14,era:'goguryeo_late,balhae',hanja:'敦煌'},
  {name:'귀화성(歸化城)',lng:111.75,lat:40.82,era:'goguryeo_late,goryeo_early',hanja:'歸化城'},
  {name:'곤륜산(崑崙山)',lng:86.00,lat:36.00,era:'goryeo_early',hanja:'崑崙山'},
  {name:'고비사막(戈壁)',lng:105.00,lat:43.00,era:'goguryeo_late,balhae',hanja:'戈壁'},

  // === 남부·해남 (South China·Hainan) ===
  {name:'광주(廣州)',lng:113.26,lat:23.13,era:'gaya,goryeo_early',hanja:'廣州'},
  {name:'해구(海口)',lng:110.35,lat:20.02,era:'gaya',hanja:'海口'},
  {name:'하이난(海南)',lng:109.50,lat:19.00,era:'gaya',hanja:'海南'},
  {name:'담주(儋州)',lng:109.58,lat:19.52,era:'gaya',hanja:'儋州'},
  {name:'계림(桂林)',lng:110.28,lat:25.27,era:'gaya,goryeo_early',hanja:'桂林'},
  {name:'남녕(南寧)',lng:108.37,lat:22.82,era:'gaya',hanja:'南寧'},
  {name:'곤명(昆明)',lng:102.83,lat:25.05,era:'goryeo_early',hanja:'昆明'},
  {name:'하문(廈門)',lng:118.08,lat:24.48,era:'goryeo_early',hanja:'廈門'},
  {name:'복주(福州)',lng:119.30,lat:26.07,era:'goryeo_early',hanja:'福州'},
  {name:'심천(深圳)',lng:114.07,lat:22.54,era:'goryeo_early',hanja:'深圳'},

  // === 일본 (Japan) ===
  {name:'도쿄(東京)',lng:139.76,lat:35.68,era:'joseon_late,daehan',hanja:'東京'},
  {name:'오사카(大阪)',lng:135.50,lat:34.69,era:'joseon_early,joseon_late',hanja:'大阪'},
  {name:'교토(京都)',lng:135.77,lat:35.01,era:'goryeo_early,joseon_early',hanja:'京都'},
  {name:'나라(奈良)',lng:135.84,lat:34.69,era:'silla_late,balhae',hanja:'奈良'},
  {name:'후쿠오카(福岡)',lng:130.42,lat:33.59,era:'goryeo_early,joseon_early',hanja:'福岡'},
  {name:'오키나와(沖繩)',lng:127.70,lat:26.20,era:'goryeo_early,joseon_early',hanja:'琉球'},
  {name:'대마도(對馬島)',lng:129.30,lat:34.30,era:'goryeo_early,joseon_early',hanja:'對馬島'},

  // === 동남아 (SE Asia) ===
  {name:'하노이(河內)',lng:105.85,lat:21.03,era:'goryeo_early,goryeo_late',hanja:'河內'},
  {name:'방콕(曼谷)',lng:100.50,lat:13.75,era:'joseon_early,joseon_late',hanja:'曼谷'},
  {name:'프놈펜',lng:104.92,lat:11.56,era:'goryeo_early',hanja:'金邊'},
  {name:'양곤(仰光)',lng:96.16,lat:16.87,era:'goryeo_early,joseon_early',hanja:'仰光'},
  {name:'싱가포르',lng:103.85,lat:1.29,era:'joseon_early',hanja:'新加坡'},
  {name:'자카르타',lng:106.83,lat:-6.18,era:'joseon_early',hanja:'雅加達'},

  // === 몽골·스텝 (Mongolia·Steppe) ===
  {name:'울란바토르',lng:106.92,lat:47.92,era:'goguryeo_late,goryeo_early',hanja:'庫倫'},
  {name:'대흥안령(大興安嶺)',lng:122.00,lat:49.00,era:'goguryeo_late',hanja:'大興安嶺'},

  // === 자연경계 ===
  {name:'황하(黃河)',lng:115.00,lat:35.00,era:'gojoseon,goguryeo_late,goryeo_early',hanja:'黃河'},
  {name:'발해만(渤海灣)',lng:119.00,lat:38.70,era:'goguryeo_late,baekje',hanja:'渤海灣'},
  {name:'황해(黃海)',lng:124.00,lat:36.00,era:'baekje,goguryeo_late',hanja:'黃海'},
  {name:'동해(東海)',lng:131.00,lat:38.00,era:'goguryeo_late,silla_late',hanja:'東海'},
  {name:'남해(南海)',lng:115.00,lat:18.00,era:'goryeo_early',hanja:'南海'},

  // === 도서 ===
  {name:'독도(獨島)',lng:131.87,lat:37.24,era:'joseon_early,joseon_late,daehan',hanja:'獨島'},
  {name:'간도(間島)',lng:129.50,lat:42.80,era:'daehan',hanja:'間島'},
  {name:'제주(濟州)',lng:126.53,lat:33.50,era:'joseon_early,joseon_late',hanja:'濟州'},
  {name:'탐라(耽羅)',lng:126.53,lat:33.50,era:'goryeo_early',hanja:'耽羅'},
  {name:'대만(臺灣)',lng:121.00,lat:23.50,era:'daehan',hanja:'臺灣'},

  // === 추가 고대 지명 ===
  {name:'왕검성(王儉城)',lng:123.43,lat:41.80,era:'gojoseon',hanja:'王儉城'},
  {name:'백암성(白巖城)',lng:123.30,lat:41.20,era:'goguryeo_late',hanja:'白巖城'},
  {name:'위례성(慰禮城)',lng:118.00,lat:37.00,era:'baekje',hanja:'慰禮城'},
  {name:'웅진(熊津)',lng:118.50,lat:36.50,era:'baekje',hanja:'熊津'},
  {name:'사비(泗沘)',lng:119.00,lat:36.00,era:'baekje',hanja:'泗沘'},
  {name:'동경용원부',lng:131.00,lat:43.15,era:'balhae',hanja:'東京龍原府'},
  {name:'중경현덕부',lng:128.60,lat:42.60,era:'balhae',hanja:'中京顯德府'},
  {name:'서경압록부',lng:126.00,lat:41.30,era:'balhae',hanja:'西京鴨淥府'},
  {name:'남경남해府',lng:128.00,lat:40.00,era:'balhae',hanja:'南京南海府'},
  {name:'광개토대왕릉비',lng:126.22,lat:41.15,era:'goguryeo_late',hanja:'廣開土大王碑'},
  {name:'송화강(松花江)',lng:126.00,lat:45.50,era:'buyeo,goguryeo_late,balhae',hanja:'松花江'},
  {name:'흑룡강(黑龍江)',lng:132.00,lat:48.50,era:'goguryeo_late,balhae',hanja:'黑龍江'},
  {name:'압록강(鴨綠江)',lng:126.00,lat:41.00,era:'goguryeo_early,goguryeo_late',hanja:'鴨綠江'},
  {name:'두만강(豆滿江)',lng:130.00,lat:42.50,era:'joseon_early,joseon_late',hanja:'豆滿江'},
  {name:'대동강(大同江)',lng:125.70,lat:39.15,era:'goguryeo_late',hanja:'大同江'},
  {name:'백두산정계비',lng:128.08,lat:41.99,era:'joseon_late',hanja:'白頭山定界碑'},

  // === 책고보 대형지도 직접 추출 지명 (영상 설명 기반) ===
  {name:'합란(哈蘭)',hanja:'哈蘭',lng:106.0,lat:38.5,era:'goguryeo_late,goryeo_early',desc:'하란산(賀蘭山) 인근. 명나라 대명여도에 표기된 고려·고구려 지명. (책고보 지도)'},
  {name:'개평(蓋平)',hanja:'蓋平',lng:122.37,lat:40.4,era:'goguryeo_late,goryeo_early',desc:'요동반도 서부. 현 개주(蓋州). 대명여도에 표기. (책고보 지도)'},
  {name:'응창(應昌)',hanja:'應昌',lng:116.6,lat:43.3,era:'goguryeo_late,goryeo_early',desc:'내몽골 적봉(赤峰) 부근. 원나라의 옛 수도 중 하나. 대명여도 표기.'},
  {name:'금성(金城)',hanja:'金城',lng:103.8,lat:36.0,era:'goguryeo_late,goryeo_early',desc:'난주(蘭州) 일대. 황하 상류의 요충. 대명여도에 표기.'},
  {name:'요산(遼山)',hanja:'遼山',lng:123.5,lat:41.5,era:'goguryeo_early,goguryeo_late',desc:'요동의 산악지대. 고구려의 천연 방어선. 대명여도 표기.'},
  {name:'순덕(順德)',hanja:'順德',lng:114.5,lat:37.0,era:'goryeo_early',desc:'하북성 남부. 현 형대(邢台). 대명여도에 표기된 고려 지명.'},
  {name:'흥주(興州)',hanja:'興州',lng:117.3,lat:40.8,era:'goryeo_early',desc:'하북성 북부. 고려의 북부 행정구역. (책고보 지도)'},
  {name:'통주(通州)',hanja:'通州',lng:116.7,lat:39.9,era:'goryeo_early,goryeo_late',desc:'베이징 동부 교외. 고려의 수도 근교. 대운하 북단.'},
  {name:'함녕(咸寧)',hanja:'咸寧',lng:114.3,lat:29.8,era:'goryeo_early',desc:'호북성 남부. 양자강 중류. 고려의 남부 행정구역.'},
  {name:'안주(安州)',hanja:'安州',lng:115.8,lat:38.8,era:'goryeo_early',desc:'하북성 중부. 보정(保定) 인근. 고려의 행정 중심지.'},
  {name:'순천(順天)',hanja:'順天',lng:116.4,lat:39.9,era:'goryeo_early,goguryeo_late',desc:'베이징의 옛 명칭 중 하나. 고려·고구려의 핵심 도시.'},
  {name:'금주(錦州)',hanja:'錦州',lng:121.1,lat:41.1,era:'goguryeo_late,goryeo_early',desc:'요서 지역의 중심도시. 고구려·고려의 요서 거점.'},
  {name:'안문관(雁門關)',hanja:'雁門關',lng:112.8,lat:39.0,era:'goguryeo_late,goryeo_early',desc:'태행산맥 서쪽 관문. 고구려·고려의 서북 방어선. 만리장성의 중요 관문.'},
  {name:'제양(濟陽)',hanja:'濟陽',lng:117.2,lat:37.0,era:'baekje,goryeo_early',desc:'산동성 제남(濟南) 인근. 백제·고려의 산동 거점.'},
  {name:'사수(泗水)',hanja:'泗水',lng:117.3,lat:35.7,era:'baekje,goryeo_early',desc:'산동성 중남부. 공자의 고향 곡부(曲阜) 인근. 백제의 내륙 거점.'},
  {name:'고우(高郵)',hanja:'高郵',lng:119.5,lat:32.8,era:'goryeo_early',desc:'강소성 중부. 양자강 하류 북안. 고려의 강남 거점.'},
  {name:'공험진(公嶮鎭)',hanja:'公嶮鎭',lng:130.0,lat:42.5,era:'goryeo_early',desc:'고려의 동북 변경 군사기지. 윤관이 축조. 전통적으로 두만강 북쪽.'},
  {name:'선춘령(先春嶺)',hanja:'先春嶺',lng:131.0,lat:43.0,era:'goryeo_early',desc:'고려의 동북 경계. 윤관의 9성 북쪽. 연해주 남부.'},
  {name:'만수산(萬壽山)',hanja:'萬壽山',lng:116.3,lat:39.9,era:'goryeo_early,goryeo_late',desc:'베이징 서북쪽. 고려 황실의 정원. 현 이화원(頤和園) 소재지.'},
  {name:'토욕혼(吐谷渾)',hanja:'吐谷渾',lng:101.0,lat:37.0,era:'goguryeo_late',desc:'청해성(靑海省) 지역의 유목국가. 고구려와 교류·충돌. (책고보 지도)'},
  {name:'아프랍시압(Afrasiab)',hanja:'阿夫拉西阿卜',lng:66.9,lat:39.6,era:'goguryeo_late',desc:'중앙아시아 사마르칸트의 고대 유적. 고구려 벽화에 등장하는 인물의 고향. (책고보 연구)'},
  {name:'청도(靑島·칭다오)',hanja:'靑島',lng:120.4,lat:36.1,era:'baekje,goryeo_early',desc:'산동반도 남부 항구도시. 백제·고려의 해상교역 중심. 칭다오맥주의 고장.'},
];
