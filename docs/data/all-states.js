// ============================================
// 전 국가 목록 (All East Asian States)
// 각 국가의 전성기 시대 매핑
// ============================================
var ALL_STATES = [
  // === 한국사 (Korean) ===
  {name:'고조선', era:'gojoseon', peak:'기원전 10세기', region:'한국', color:'#c49a3c'},
  {name:'부여', era:'buyeo', peak:'기원전 1세기', region:'한국', color:'#8b4513'},
  {name:'고구려', era:'goguryeo_late', peak:'사막까지 정복(5세기)', region:'한국', color:'#e74c3c'},
  {name:'백제', era:'baekje', peak:'산동반도 대제국(4세기·NO한반도)'}, region:'한국', color:'#8e44ad'},
  {name:'신라', era:'silla_late', peak:'양자강대제국(8세기·NO한반도)'}, region:'한국', color:'#2ecc71'},
  {name:'가야', era:'goguryeo_early', peak:'중국남부·하이난(5세기)', region:'한국', color:'#f39c12'},
  {name:'발해', era:'balhae', peak:'8세기(문왕)', region:'한국', color:'#d35400'},
  {name:'고려', era:'goryeo_early', peak:'중국대륙제국(11세기)', region:'한국', color:'#1a5276'},
  {name:'조선', era:'joseon_early', peak:'15세기(세종)', region:'한국', color:'#c0392b'},
  {name:'대한제국', era:'daehan', peak:'1900년(광무)', region:'한국', color:'#f39c12'},

  // === 중국 고대 (Ancient China) ===
  {name:'하(夏)', era:'gojoseon', peak:'기원전 20세기', region:'중국', color:'#bdc3c7'},
  {name:'상(商)', era:'gojoseon', peak:'기원전 13세기', region:'중국', color:'#bdc3c7'},
  {name:'주(周)', era:'gojoseon', peak:'기원전 8세기', region:'중국', color:'#bdc3c7'},
  {name:'연(燕)', era:'gojoseon', peak:'기원전 3세기', region:'중국', color:'#95a5a6'},
  {name:'제(齊)', era:'gojoseon', peak:'기원전 4세기', region:'중국', color:'#95a5a6'},
  {name:'조(趙)', era:'gojoseon', peak:'기원전 3세기', region:'중국', color:'#95a5a6'},
  {name:'진(秦)', era:'gojoseon', peak:'기원전 221년', region:'중국', color:'#7f8c8d'},
  {name:'한(漢)', era:'buyeo', peak:'기원전 1세기(무제)', region:'중국', color:'#c0392b'},
  {name:'위(魏)', era:'goguryeo_early', peak:'3세기(조조)', region:'중국', color:'#3498db'},
  {name:'촉(蜀)', era:'goguryeo_early', peak:'3세기(제갈량)', region:'중국', color:'#2ecc71'},
  {name:'오(吳)', era:'goguryeo_early', peak:'3세기(손권)', region:'중국', color:'#e74c3c'},
  {name:'진(晉)', era:'goguryeo_early', peak:'3세기(사마염)', region:'중국', color:'#95a5a6'},
  {name:'전조(前趙)', era:'goguryeo_early', peak:'4세기', region:'중국', color:'#8d6e63'},
  {name:'후조(後趙)', era:'goguryeo_early', peak:'4세기', region:'중국', color:'#8d6e63'},
  {name:'전진(前秦)', era:'goguryeo_early', peak:'4세기(부견)', region:'중국', color:'#8d6e63'},
  {name:'후연(後燕)', era:'goguryeo_early', peak:'4세기(모용수)', region:'중국', color:'#8d6e63'},
  {name:'북위(北魏)', era:'goguryeo_late', peak:'5세기', region:'중국', color:'#78909c'},
  {name:'수(隋)', era:'goguryeo_late', peak:'7세기(양제)', region:'중국', color:'#3498db'},
  {name:'당(唐)', era:'silla_late', peak:'8세기(현종)', region:'중국', color:'#2980b9'},
  {name:'요(遼)', era:'goryeo_early', peak:'10세기(야율아보기)', region:'중국', color:'#7f8c8d'},
  {name:'송(宋)', era:'goryeo_early', peak:'11세기(인종)', region:'중국', color:'#2ecc71'},
  {name:'금(金)', era:'goryeo_early', peak:'12세기(세종)', region:'중국', color:'#bdc3c7'},
  {name:'원(元)', era:'goryeo_late', peak:'13세기(쿠빌라이)', region:'중국', color:'#95a5a6'},
  {name:'명(明)', era:'joseon_early', peak:'15세기(영락)', region:'중국', color:'#e67e22'},
  {name:'청(清)', era:'joseon_late', peak:'18세기(건륭)', region:'중국', color:'#f1c40f'},

  // === 일본 (Japan) ===
  {name:'야마토(大和)', era:'goguryeo_late', peak:'5세기', region:'일본', color:'#e91e63'},
  {name:'아스카(飛鳥)', era:'silla_late', peak:'7세기(쇼토쿠)', region:'일본', color:'#e91e63'},
  {name:'나라(奈良)', era:'balhae', peak:'8세기', region:'일본', color:'#e91e63'},
  {name:'헤이안(平安)', era:'goryeo_early', peak:'10세기', region:'일본', color:'#e91e63'},
  {name:'가마쿠라(鎌倉)', era:'goryeo_late', peak:'13세기', region:'일본', color:'#e91e63'},
  {name:'무로마치(室町)', era:'joseon_early', peak:'15세기', region:'일본', color:'#e91e63'},
  {name:'에도(江戶)', era:'joseon_late', peak:'18세기', region:'일본', color:'#e91e63'},
  {name:'유구왕국(琉球)', era:'goryeo_early', peak:'15세기', region:'일본', color:'#66bb6a'},

  // === 동남아시아 (Southeast Asia) ===
  {name:'부남(扶南·Funan)', era:'goguryeo_early', peak:'5세기', region:'동남아', color:'#26a69a'},
  {name:'진랍(眞臘·Chenla)', era:'silla_late', peak:'8세기', region:'동남아', color:'#26a69a'},
  {name:'크메르(앙코르)', era:'goryeo_early', peak:'12세기', region:'동남아', color:'#ab47bc'},
  {name:'대월(大越)', era:'goryeo_early', peak:'11세기(리 왕조)', region:'동남아', color:'#e53935'},
  {name:'참파(Champa)', era:'goryeo_early', peak:'8세기', region:'동남아', color:'#ff7043'},
  {name:'버마(파간)', era:'goryeo_early', peak:'12세기', region:'동남아', color:'#ffa726'},
  {name:'시암(아유타야)', era:'joseon_early', peak:'16세기', region:'동남아', color:'#42a5f5'},
  {name:'스리위자야', era:'goryeo_early', peak:'8세기', region:'동남아', color:'#26a69a'},
  {name:'마자파힛', era:'joseon_early', peak:'14세기', region:'동남아', color:'#ef5350'},
  {name:'말라카', era:'joseon_early', peak:'15세기', region:'동남아', color:'#26c6da'},
  {name:'란쌍(Lan Xang)', era:'joseon_early', peak:'16세기', region:'동남아', color:'#66bb6a'},

  // === 유목/스텝 (Steppe) ===
  {name:'흉노', era:'gojoseon', peak:'기원전 2세기', region:'스텝', color:'#8d6e63'},
  {name:'선비', era:'buyeo', peak:'2세기(단석괴)', region:'스텝', color:'#795548'},
  {name:'유연(柔然)', era:'goguryeo_late', peak:'5세기', region:'스텝', color:'#8d6e63'},
  {name:'돌궐(突厥)', era:'silla_late', peak:'6세기', region:'스텝', color:'#8d6e63'},
  {name:'위구르(回鶻)', era:'balhae', peak:'8세기', region:'스텝', color:'#8d6e63'},
  {name:'몽골', era:'goryeo_late', peak:'13세기(칭기즈칸)', region:'스텝', color:'#9e9e9e'},
  {name:'러시아', era:'daehan', peak:'1900년', region:'스텝', color:'#607d8b'},

  // === 기타 (Others) ===
  {name:'티베트(토번)', era:'silla_late', peak:'8세기(송첸감포)', region:'기타', color:'#e67e22'},
  {name:'대만', era:'daehan', peak:'1900년', region:'기타', color:'#78909c'},
  {name:'여진(말갈)', era:'goryeo_early', peak:'12세기', region:'스텝', color:'#bdc3c7'},
];
