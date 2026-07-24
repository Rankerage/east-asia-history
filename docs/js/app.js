// ============================================
// 역사강역도 — Historical Atlas Map Engine
// 책고보(Chaekgobo) research-based
// ============================================
(function() {
  'use strict';

  // ── State ──
  var map, eras = [], geoLayers = {}, activeEra = null;
  var modernBorderLayer, labelsLayer, eventMarkersLayer;

  // ── Event type icons ──
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

  // ── Base map layers ──
  var baseLayers = {
    '🌙 Dark': L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }),
    '☀️ Light': L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }),
    '🗺️ Terrain': L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg', {
      attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
      subdomains: 'abcd',
      maxZoom: 16
    })
  };

  // ── East Asia center ──
  var DEFAULT_CENTER = [40.0, 122.0];
  var DEFAULT_ZOOM = 5;

  // ── Init ──
  function init() {
    map = L.map('map', {
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: true,
      preferCanvas: true
    });

    baseLayers['🌙 Dark'].addTo(map);
    L.control.layers(baseLayers, {}, {position: 'topright', collapsed: true}).addTo(map);

    loadEras().then(function() {
      buildEraNav();
      buildTimeline();
      loadModernBorders();
      loadLabels();
      bindControls();
      document.getElementById('loading').classList.add('hidden');
      selectEra(3); // Default: 고구려 전성기
    });
  }

  // ── Load era definitions ──
  function loadEras() {
    return fetch('data/eras.json')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        eras = data;
        return eras;
      });
  }

  // ── Build era navigation buttons ──
  function buildEraNav() {
    var nav = document.getElementById('eraNav');
    var html = '';
    eras.forEach(function(era, i) {
      html += '<div class="era-btn" data-idx="' + i + '" data-id="' + era.id + '">' +
        '<span class="era-dot" style="background:' + era.color + '"></span>' +
        '<span class="era-name">' + era.name_ko + '</span>' +
        '<span class="era-year">' + fmtYear(era.start_year) + '~' + fmtYear(era.end_year) + '</span>' +
        '</div>';
    });
    nav.innerHTML = html;

    nav.addEventListener('click', function(e) {
      var btn = e.target.closest('.era-btn');
      if (!btn) return;
      var idx = parseInt(btn.getAttribute('data-idx'));
      selectEra(idx);
    });
  }

  // ── Build timeline slider ──
  function buildTimeline() {
    var labels = document.getElementById('timelineLabels');
    var marks = eras.map(function(e) { return e.name_ko; });
    // Show every other label if > 8 eras
    if (marks.length > 8) {
      marks = marks.map(function(m, i) { return i % 2 === 0 ? m : ''; });
    }
    labels.innerHTML = marks.map(function(m) { return '<span>' + m + '</span>'; }).join('');

    var slider = document.getElementById('timelineSlider');
    slider.max = eras.length - 1;
    slider.addEventListener('input', function() {
      selectEra(parseInt(this.value));
    });
  }

  // ── Format year ──
  function fmtYear(y) {
    if (y < 0) return '기원전 ' + Math.abs(y);
    return y + '년';
  }

  // ── Select era ──
  function selectEra(idx) {
    if (idx < 0 || idx >= eras.length) return;
    var era = eras[idx];
    activeEra = era;

    // Update UI
    document.querySelectorAll('.era-btn').forEach(function(b, i) {
      b.classList.toggle('active', i === idx);
    });
    document.getElementById('timelineSlider').value = idx;

    // Update info panel
    var panel = document.getElementById('infoPanel');
    panel.innerHTML =
      '<div class="info-title">' +
        '<span class="info-color" style="background:' + era.color + '"></span>' +
        era.name_ko + ' <small>(' + era.name_en + ')</small>' +
      '</div>' +
      '<div class="info-desc">' +
        '<strong>시기:</strong> ' + fmtYear(era.start_year) + ' ~ ' + fmtYear(era.end_year) + '<br>' +
        era.description +
      '</div>';

    // Load GeoJSON layer
    loadEraLayer(era);

    // Show timeline events
    showTimelineEvents(era);
    buildEventsList(era);
  }

  // ── Load GeoJSON for an era ──
  function loadEraLayer(era) {
    // Clear previous era layers
    Object.values(geoLayers).forEach(function(l) { map.removeLayer(l); });
    geoLayers = {};

    fetch('data/geojson/' + era.geojson)
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var layer = L.geoJSON(data, {
          style: function(feature) {
            return {
              fillColor: feature.properties.color || era.color,
              fillOpacity: feature.properties.opacity || 0.35,
              color: feature.properties.color || era.color,
              weight: 2,
              opacity: 0.8
            };
          },
          onEachFeature: function(feature, l) {
            if (feature.properties && feature.properties.name_ko) {
              var tip = '<strong>' + feature.properties.name_ko + '</strong>' +
                (feature.properties.description ? '<br>' + feature.properties.description : '') +
                '<br><small>' + feature.properties.year_range + '</small>';
              l.bindTooltip(tip, {
                className: 'era-tooltip',
                sticky: true,
                direction: 'top'
              });
            }
          }
        }).addTo(map);
        geoLayers[era.id] = layer;

        // Fit bounds
        try {
          map.fitBounds(layer.getBounds().pad(0.1), { maxZoom: 7 });
        } catch(e) {
          map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
        }
      })
      .catch(function() {
        console.warn('GeoJSON not found for', era.id, '- using placeholder');
        // Show info that data is pending
      });
  }

  // ── Modern borders (light overlay) ──
  function loadModernBorders() {
    // Use Natural Earth admin boundaries via GeoJSON
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(function(r) { return r.json(); })
      .then(function(data) {
        // Filter to East Asia + surrounding
        var asianCodes = ['KOR','PRK','CHN','JPN','MNG','TWN','RUS'];
        var filtered = {
          type: 'FeatureCollection',
          features: data.features.filter(function(f) {
            return asianCodes.indexOf(f.properties.ISO_A3) >= 0;
          })
        };
        modernBorderLayer = L.geoJSON(filtered, {
          style: {
            fill: false,
            color: '#505d7a',
            weight: 1,
            opacity: 0.4,
            dashArray: '4 4'
          }
        }).addTo(map);
      })
      .catch(function() {});
  }

  // ── City/region labels ──
  function loadLabels() {
    var cities = [
      {name:'평양',lat:39.03,lng:125.75},
      {name:'국내성(집안)',lat:41.12,lng:126.18},
      {name:'졸본(환인)',lat:41.27,lng:125.35},
      {name:'서울',lat:37.57,lng:126.98},
      {name:'경주',lat:35.84,lng:129.21},
      {name:'부여(농안)',lat:44.99,lng:126.03},
      {name:'책성(심양)',lat:41.80,lng:123.43},
      {name:'북경',lat:39.90,lng:116.40},
      {name:'장안(서안)',lat:34.27,lng:108.90},
      {name:'낙양',lat:34.62,lng:112.45},
      {name:'도쿄',lat:35.68,lng:139.76},
      {name:'산동(제남)',lat:36.67,lng:116.98},
      {name:'광개토대왕릉비',lat:41.15,lng:126.22},
      {name:'용담(상경용천부)',lat:44.05,lng:129.13},
    ];

    labelsLayer = L.layerGroup();
    cities.forEach(function(c) {
      L.circleMarker([c.lat, c.lng], {
        radius: 4,
        fillColor: '#d2991d',
        fillOpacity: 0.8,
        color: '#d2991d',
        weight: 1,
        opacity: 0.6
      })
      .bindTooltip(c.name, {
        className: 'era-tooltip',
        direction: 'top',
        offset: [0, -6]
      })
      .addTo(labelsLayer);
    });
    labelsLayer.addTo(map);
  }

  // ── Bind controls ──
  function bindControls() {
    document.getElementById('showModern').addEventListener('change', function() {
      if (modernBorderLayer) {
        this.checked ? modernBorderLayer.addTo(map) : map.removeLayer(modernBorderLayer);
      }
    });

    document.getElementById('showLabels').addEventListener('change', function() {
      if (labelsLayer) {
        this.checked ? labelsLayer.addTo(map) : map.removeLayer(labelsLayer);
      }
    });

    document.getElementById('resetBtn').addEventListener('click', function() {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      if (activeEra) selectEra(eras.indexOf(activeEra));
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        var idx = parseInt(document.getElementById('timelineSlider').value);
        if (e.key === 'ArrowLeft') idx = Math.max(0, idx - 1);
        else idx = Math.min(eras.length - 1, idx + 1);
        selectEra(idx);
      }
    });
  }

  // ── Show timeline events on map ──
  function showTimelineEvents(era) {
    if (eventMarkersLayer) map.removeLayer(eventMarkersLayer);
    eventMarkersLayer = L.layerGroup();

    var eraEvents = (typeof TIMELINE_EVENTS !== 'undefined')
      ? TIMELINE_EVENTS.filter(function(e) { return e.era === era.id; })
      : [];

    eraEvents.forEach(function(evt) {
      var color = eventColors[evt.type] || '#d2991d';
      var icon = eventIcons[evt.type] || '📌';

      var marker = L.circleMarker([evt.lat, evt.lng], {
        radius: 8,
        fillColor: color,
        fillOpacity: 0.7,
        color: '#fff',
        weight: 1.5,
        opacity: 0.9
      });

      marker.bindTooltip(
        '<strong>' + icon + ' ' + evt.title + '</strong>' +
        '<br><small>' + fmtYear(evt.year) + '</small>' +
        (evt.desc ? '<br>' + evt.desc : ''),
        { className: 'event-tooltip', direction: 'top', offset: [0, -10] }
      );

      marker.on('click', function() {
        map.setView([evt.lat, evt.lng], Math.max(map.getZoom(), 6));
      });

      eventMarkersLayer.addLayer(marker);
    });

    eventMarkersLayer.addTo(map);
  }

  // ── Build events list panel ──
  function buildEventsList(era) {
    var list = document.getElementById('eventsList');
    var eraEvents = (typeof TIMELINE_EVENTS !== 'undefined')
      ? TIMELINE_EVENTS.filter(function(e) { return e.era === era.id; })
      : [];

    if (!eraEvents.length) {
      list.innerHTML = '<p class=\"placeholder\">등록된 사건이 없습니다</p>';
      return;
    }

    // Sort by year
    eraEvents.sort(function(a, b) { return a.year - b.year; });

    var html = '';
    eraEvents.forEach(function(evt) {
      var icon = eventIcons[evt.type] || '📌';
      html +=
        '<div class=\"event-item\" data-lat=\"' + evt.lat + '\" data-lng=\"' + evt.lng + '\">' +
          '<span class=\"event-icon\">' + icon + '</span>' +
          '<div class=\"event-content\">' +
            '<div class=\"event-title\">' + evt.title + '</div>' +
            '<div class=\"event-year\">' + fmtYear(evt.year) + '</div>' +
            (evt.desc ? '<div class=\"event-desc\">' + evt.desc + '</div>' : '') +
          '</div>' +
        '</div>';
    });
    list.innerHTML = html;

    // Click to fly to event location
    list.addEventListener('click', function(e) {
      var item = e.target.closest('.event-item');
      if (!item) return;
      var lat = parseFloat(item.getAttribute('data-lat'));
      var lng = parseFloat(item.getAttribute('data-lng'));
      map.setView([lat, lng], Math.max(map.getZoom(), 6));
    });
  }

})();
