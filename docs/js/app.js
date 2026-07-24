// ============================================
// 역사강역도 — Historical Atlas Map Engine
// 책고보(Chaekgobo) 연구 기반 · 태행산맥 기선
// 전 국가 목록 · 사료 교차인용
// ============================================
(function() {
  'use strict';

  var map, eras = [], geoLayers = {}, activeEra = null;
  var modernBorderLayer, labelsLayer, eventMarkersLayer, placesLayer, activeState = null;

  var eventIcons = {
    foundation: '🏛️', battle: '⚔️', political: '📜',
    cultural: '🎨', diplomatic: '🤝', expansion: '↗️',
    rebellion: '🔥', fall: '💀'
  };
  var eventColors = {
    foundation: '#d2991d', battle: '#e74c3c', political: '#3498db',
    cultural: '#2ecc71', diplomatic: '#9b59b6', expansion: '#e67e22',
    rebellion: '#e74c3c', fall: '#7f8c8d'
  };

  var baseLayers = {
    '🌙 Dark': L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd', maxZoom: 19
    }),
    '☀️ Light': L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd', maxZoom: 19
    }),
    '🗺️ Terrain': L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
      subdomains: 'abcd', maxZoom: 16
    })
  };

  var DEFAULT_CENTER = [40.0, 118.0];
  var DEFAULT_ZOOM = 5;

  function init() {
    map = L.map('map', { center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM, zoomControl: true, preferCanvas: true });
    baseLayers['🌙 Dark'].addTo(map);
    L.control.layers(baseLayers, {}, {position: 'topright', collapsed: true}).addTo(map);
    loadEras().then(function() {
      buildStatesList();
      buildTimeline();
      loadModernBorders();
      loadLabels();
      bindControls();
      document.getElementById('loading').classList.add('hidden');
      selectEra(4); // Default: 고구려 전성기
    });
  }

  function loadEras() {
    return fetch('data/eras.json').then(function(r) { return r.json(); }).then(function(data) {
      eras = data; return eras;
    });
  }

  function fmtYear(y) {
    if (y < 0) return '기원전 ' + Math.abs(y);
    return y + '년';
  }

  // ── Build state list grouped by region ──
  function buildStatesList() {
    var container = document.getElementById('statesList');
    if (typeof ALL_STATES === 'undefined') return;

    // Group by region
    var regions = {};
    ALL_STATES.forEach(function(s) {
      if (!regions[s.region]) regions[s.region] = [];
      regions[s.region].push(s);
    });

    var regionOrder = ['한국', '중국', '일본', '동남아', '스텝', '기타'];
    var html = '';
    regionOrder.forEach(function(region) {
      if (!regions[region]) return;
      html += '<div class="state-group">';
      html += '<div class="state-group-header">' + region + '</div>';
      regions[region].forEach(function(s) {
        var eraIdx = -1;
        for (var i = 0; i < eras.length; i++) {
          if (eras[i].id === s.era) { eraIdx = i; break; }
        }
        html += '<div class="state-item" data-era-idx="' + eraIdx + '" data-name="' + s.name + '" data-peak="' + s.peak + '">' +
          '<span class="state-dot" style="background:' + s.color + '"></span>' +
          '<span class="state-name">' + s.name + '</span>' +
          '<span class="state-peak">' + s.peak + '</span>' +
          '</div>';
      });
      html += '</div>';
    });
    container.innerHTML = html;

    // Click handler
    container.addEventListener('click', function(e) {
      var item = e.target.closest('.state-item');
      if (!item) return;
      var idx = parseInt(item.getAttribute('data-era-idx'));
      var name = item.getAttribute('data-name');
      var peak = item.getAttribute('data-peak');
      if (idx >= 0 && idx < eras.length) {
        selectEra(idx, name, peak);
      }
    });

    // Search
    document.getElementById('stateSearch').addEventListener('input', function() {
      var q = this.value.toLowerCase();
      document.querySelectorAll('.state-item').forEach(function(item) {
        var name = item.getAttribute('data-name').toLowerCase();
        item.style.display = (!q || name.indexOf(q) >= 0) ? '' : 'none';
      });
      document.querySelectorAll('.state-group').forEach(function(g) {
        var visible = g.querySelectorAll('.state-item[style*="display: none"]').length < g.querySelectorAll('.state-item').length;
        g.style.display = visible ? '' : 'none';
      });
    });
  }

  function buildTimeline() {
    var labels = document.getElementById('timelineLabels');
    var marks = eras.map(function(e) { return e.name_ko; });
    if (marks.length > 8) marks = marks.map(function(m, i) { return i % 2 === 0 ? m : ''; });
    labels.innerHTML = marks.map(function(m) { return '<span>' + m + '</span>'; }).join('');
    var slider = document.getElementById('timelineSlider');
    slider.max = eras.length - 1;
    slider.addEventListener('input', function() { selectEra(parseInt(this.value)); });
  }

  function selectEra(idx, stateName, statePeak) {
    if (idx < 0 || idx >= eras.length) return;
    var era = eras[idx];
    activeEra = era;

    // Update state list highlight
    document.querySelectorAll('.state-item').forEach(function(item) {
      var itemIdx = parseInt(item.getAttribute('data-era-idx'));
      item.classList.toggle('active', itemIdx === idx);
    });

    document.getElementById('timelineSlider').value = idx;

    // Update info panel
    var panel = document.getElementById('infoPanel');
    if (stateName) {
      panel.innerHTML =
        '<div class="info-title"><span class="info-color" style="background:' + era.color + '"></span>' +
        stateName + ' — 전성기 ' + statePeak + '</div>' +
        '<div class="info-desc"><strong>시대:</strong> ' + era.name_ko + ' (' + fmtYear(era.start_year) + ' ~ ' + fmtYear(era.end_year) + ')<br>' +
        era.description + '</div>';
    } else {
      panel.innerHTML =
        '<div class="info-title"><span class="info-color" style="background:' + era.color + '"></span>' +
        era.name_ko + ' <small>(' + era.name_en + ')</small></div>' +
        '<div class="info-desc"><strong>시기:</strong> ' + fmtYear(era.start_year) + ' ~ ' + fmtYear(era.end_year) + '<br>' +
        era.description + '</div>';
    }

    // Update timeline title
    document.getElementById('timelineTitle').innerHTML = '⏳ 시대 이동 — <strong>' + era.name_ko + '</strong>';

    loadEraLayer(era);
    showTimelineEvents(era);
    buildEventsList(era);
    showPlaces(era);
  }

  function loadEraLayer(era) {
    Object.values(geoLayers).forEach(function(l) { map.removeLayer(l); });
    geoLayers = {};
    fetch('data/geojson/' + era.geojson).then(function(r) { return r.json(); }).then(function(data) {
      var layer = L.geoJSON(data, {
        style: function(feature) {
          return {
            fillColor: feature.properties.color || era.color,
            fillOpacity: feature.properties.opacity || 0.35,
            color: feature.properties.color || era.color, weight: 2, opacity: 0.8
          };
        },
        onEachFeature: function(feature, l) {
          if (feature.properties && feature.properties.name_ko) {
            var tip = '<span style="color:' + (feature.properties.color || era.color) + ';font-weight:700;font-size:12px;text-shadow:0 0 6px rgba(0,0,0,0.8);">' +
              feature.properties.name_ko + '</span>';
            l.bindTooltip(tip, { className: 'state-label', permanent: true, direction: 'center', opacity: 0.9 });
          }
        }
      }).addTo(map);
      geoLayers[era.id] = layer;
      try { map.fitBounds(layer.getBounds().pad(0.1), { maxZoom: 7 }); }
      catch(e) { map.setView(DEFAULT_CENTER, DEFAULT_ZOOM); }
    }).catch(function() {});
  }

  function loadModernBorders() {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(function(r) { return r.json(); }).then(function(data) {
        var codes = ['KOR','PRK','CHN','JPN','MNG','TWN','RUS'];
        modernBorderLayer = L.geoJSON({
          type: 'FeatureCollection',
          features: data.features.filter(function(f) { return codes.indexOf(f.properties.ISO_A3) >= 0; })
        }, { style: { fill: false, color: '#505d7a', weight: 1, opacity: 0.4, dashArray: '4 4' } }).addTo(map);
      }).catch(function() {});
  }

  function loadLabels() {
    labelsLayer = L.layerGroup();
    var cities = [
      {name:'평양',lat:39.03,lng:125.75},{name:'베이징(서경)',lat:39.90,lng:116.40},
      {name:'국내성(집안)',lat:41.12,lng:126.18},{name:'졸본(환인)',lat:41.27,lng:125.35},
      {name:'경주',lat:35.84,lng:129.21},{name:'부여(농안)',lat:44.99,lng:126.03},
      {name:'상경용천부',lat:44.05,lng:129.13},{name:'산동(제남)',lat:36.67,lng:116.98},
      {name:'탕산(개경)',lat:39.60,lng:118.20},{name:'안시성',lat:39.90,lng:116.70}
    ];
    cities.forEach(function(c) {
      L.circleMarker([c.lat, c.lng], { radius: 4, fillColor: '#d2991d', fillOpacity: 0.8, color: '#d2991d', weight: 1, opacity: 0.6 })
        .bindTooltip(c.name, { className: 'era-tooltip', direction: 'top', offset: [0, -6] }).addTo(labelsLayer);
    });
    labelsLayer.addTo(map);
  }

  function bindControls() {
    document.getElementById('showModern').addEventListener('change', function() {
      if (modernBorderLayer) this.checked ? modernBorderLayer.addTo(map) : map.removeLayer(modernBorderLayer);
    });
    document.getElementById('showLabels').addEventListener('change', function() {
      if (labelsLayer) this.checked ? labelsLayer.addTo(map) : map.removeLayer(labelsLayer);
    });
    document.getElementById('resetBtn').addEventListener('click', function() {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      if (activeEra) selectEra(eras.indexOf(activeEra));
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        var idx = parseInt(document.getElementById('timelineSlider').value);
        if (e.key === 'ArrowLeft') idx = Math.max(0, idx - 1);
        else idx = Math.min(eras.length - 1, idx + 1);
        selectEra(idx);
      }
    });
  }

  function showTimelineEvents(era) {
    if (eventMarkersLayer) map.removeLayer(eventMarkersLayer);
    eventMarkersLayer = L.layerGroup();
    var eraEvents = (typeof TIMELINE_EVENTS !== 'undefined')
      ? TIMELINE_EVENTS.filter(function(e) { return e.era === era.id; }) : [];
    eraEvents.forEach(function(evt) {
      var color = eventColors[evt.type] || '#d2991d';
      var marker = L.circleMarker([evt.lat, evt.lng], {
        radius: 8, fillColor: color, fillOpacity: 0.7, color: '#fff', weight: 1.5, opacity: 0.9
      });
      marker.bindTooltip(
        '<strong>' + (eventIcons[evt.type] || '📌') + ' ' + evt.title + '</strong><br><small>' + fmtYear(evt.year) + '</small>' + (evt.desc ? '<br>' + evt.desc : ''),
        { className: 'event-tooltip', direction: 'top', offset: [0, -10] }
      );
      marker.on('click', function() { map.setView([evt.lat, evt.lng], Math.max(map.getZoom(), 6)); });
      eventMarkersLayer.addLayer(marker);
    });
    eventMarkersLayer.addTo(map);
  }

  function buildEventsList(era) {
    var list = document.getElementById('eventsList');
    var eraEvents = (typeof TIMELINE_EVENTS !== 'undefined')
      ? TIMELINE_EVENTS.filter(function(e) { return e.era === era.id; }) : [];
    if (!eraEvents.length) { list.innerHTML = '<p class="placeholder">등록된 사건이 없습니다</p>'; return; }
    eraEvents.sort(function(a, b) { return a.year - b.year; });
    var html = '';
    eraEvents.forEach(function(evt) {
      html += '<div class="event-item" data-lat="' + evt.lat + '" data-lng="' + evt.lng + '">' +
        '<span class="event-icon">' + (eventIcons[evt.type] || '📌') + '</span>' +
        '<div class="event-content"><div class="event-title">' + evt.title + '</div>' +
        '<div class="event-year">' + fmtYear(evt.year) + '</div>' +
        (evt.desc ? '<div class="event-desc">' + evt.desc + '</div>' : '') + '</div></div>';
    });
    list.innerHTML = html;
    list.addEventListener('click', function(e) {
      var item = e.target.closest('.event-item');
      if (!item) return;
      map.setView([parseFloat(item.getAttribute('data-lat')), parseFloat(item.getAttribute('data-lng'))], Math.max(map.getZoom(), 6));
    });
  }

  function showPlaces(era) {
    if (placesLayer) map.removeLayer(placesLayer);
    placesLayer = L.layerGroup();
    if (typeof HISTORICAL_PLACES === 'undefined') return;
    var eraPlaces = HISTORICAL_PLACES.filter(function(p) { return p.era.indexOf(era.id) >= 0; });
    eraPlaces.forEach(function(p) {
      var marker = L.circleMarker([p.lat, p.lng], {
        radius: 4, fillColor: '#d2991d', fillOpacity: 0.5, color: '#d2991d', weight: 1, opacity: 0.5
      });
      marker.bindTooltip(
        '<strong>' + p.name + '</strong><br><small>' + p.hanja + '</small><br>' + p.desc,
        { className: 'place-tooltip', direction: 'top', offset: [0, -8] }
      );
      marker.on('click', function(e) {
        var srcHtml = '';
        if (p.sources) {
          Object.keys(p.sources).forEach(function(k) {
            srcHtml += '<div class="source-item"><div class="source-name">📖 ' + k + '</div><div class="source-quote">' + (p.sources[k] || '') + '</div></div>';
          });
        }
        L.popup({ className: 'place-popup', maxWidth: 400, closeButton: true })
          .setLatLng([p.lat, p.lng])
          .setContent(
            '<div class="popup-header"><strong>' + p.name + '</strong><span class="popup-hanja">' + p.hanja + '</span></div>' +
            '<div class="popup-desc">' + p.desc + '</div>' +
            '<div class="popup-sources-header">📚 사료 교차인용</div>' + srcHtml
          ).openOn(map);
      });
      placesLayer.addLayer(marker);
    });
    placesLayer.addTo(map);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
