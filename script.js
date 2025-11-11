// script.js - 간단한 인터랙션: SVG 경로 클릭 시 정보 표시 및 디자인 제안 버튼 활성화

document.addEventListener('DOMContentLoaded', () => {
  const routes = document.querySelectorAll('.route');
  const miTitle = document.getElementById('mi-title');
  const miText = document.getElementById('mi-text');
  const suggestBtn = document.getElementById('suggestBtn');

  // 간단한 디자인 제안 텍스트(각 경로별)
  const suggestions = {
    'route-mammal': {
      title: '너구리 / 고양이 이동로',
      text: '중간 도로구간이 단절되어 있습니다. 제안: 저지대 녹지 확장(식생서식지), 작은 생태통로(식물 브릿지) 설치.',
      design: '미니 생태통로(목재+식생)와 횡단경로 스티커 캠페인'
    },
    'route-pollinator': {
      title: '벌 · 나비 이동로',
      text: '건물 가장자리로 인한 서식지 단절. 제안: ' + 
            '건물 옥상·벽면에 토종 꽃심기(스티커 가이드와 굿즈 연계) 및 ' + 
            '꽃띠(파티션형 작은 화단) 설치.',
      design: '토종 꽃 패턴 굿즈(스티커, 북마크)'
    },
    'route-bird': {
      title: '도심 조류 항로',
      text: '고층 건물로 항로가 변경되며 충돌 위험 증가. 제안: 조류 친화적 유리(반사 저감), 야생 서식대 조성.',
      design: '조류 일러스트 포스터와 교육 팸플릿'
    }
  };

  // 클릭 이벤트
  routes.forEach(route => {
    route.addEventListener('click', (e) => {
      // 시각적으로 강조
      routes.forEach(r => r.style.opacity = '0.25'); // 다른 경로 비활성화
      route.style.opacity = '0.95';
      route.style.strokeWidth = '9';

      const id = route.id;
      const info = suggestions[id] || { title: '경로', text: '정보 없음' };

      miTitle.textContent = info.title;
      miText.textContent = info.text;
      suggestBtn.disabled = false;

      // 버튼에 데이터 저장
      suggestBtn.dataset.design = info.design || '';
    });
  });

  // 디자인 제안 버튼 클릭
  suggestBtn.addEventListener('click', () => {
    if (suggestBtn.disabled) return;
    const design = suggestBtn.dataset.design || '디자인 제안이 준비되어 있지 않습니다.';
    alert('디자인 제안:\n\n' + design);
  });

  // 지도 바깥 클릭 시 리셋
  document.addEventListener('click', (e) => {
    const isRoute = e.target.closest('.route') || e.target.closest('#urbanMap');
    if (!isRoute) {
      routes.forEach(r => { r.style.opacity = '0.25'; r.style.strokeWidth = '6'; });
      miTitle.textContent = '경로를 클릭하세요';
      miText.textContent = '도시 생물의 이동 경로를 시각적으로 확인할 수 있습니다.';
      suggestBtn.disabled = true;
      delete suggestBtn.dataset.design;
    }
  });
});
