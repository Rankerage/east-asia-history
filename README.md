# 역사강역도 — Historical Territorial Atlas

**책고보(Chaekgobo)** 연구 기반의 동아시아 역사 강역도 인터랙티브 지도.

## 🗺️ 구조

```
docs/
├── index.html          # 메인 지도 페이지
├── editor.html         # GeoJSON 강역도 편집기
├── css/style.css       # 다크 테마 스타일
├── js/app.js           # Leaflet 지도 엔진 + 타임라인
└── data/
    ├── eras.json       # 13개 시대 정의
    └── geojson/        # 시대별 강역도 GeoJSON 파일
```

## 🚀 실행

```bash
cd docs && python3 -m http.server 8898
# → http://localhost:8898
```

## 🎨 편집기

`http://localhost:8898/editor.html` 에서:
1. Leaflet Draw로 폴리곤 영역 그리기
2. 시대·이름·색상 설정
3. GeoJSON 다운로드
4. `data/geojson/` 폴더에 저장

## 📡 GitHub Pages 배포

1. GitHub에 `historical-atlas` 저장소 생성
2. Settings → Pages → Source: `Deploy from a branch` → `main` → `/docs`
3. `git push` → `https://<username>.github.io/historical-atlas/`

## 📚 데이터 출처

- 삼국사기, 삼국유사
- 중국 정사 (사기, 한서, 후한서, 삼국지, 진서, 위서, 수서, 당서 등)
- 대청광여도 (大清廣輿圖)
- 대명여지도 (大明輿地圖)
- 구글맵·바이두맵 지명 데이터
- [유튜브 '책고보'](https://www.youtube.com/@chaekgobo) 연구

## ⚠️ GeoJSON 데이터 상태

현재 GeoJSON 파일들은 **플레이스홀더**입니다. 책고보 연구와 각종 사서를 교차검증하여 실제 강역 경계를 그려넣어야 합니다. `editor.html`을 사용하여 정밀한 경계를 직접 그릴 수 있습니다.
