(() => {
  // Historical project VV supplied by the portfolio owner; do not replace with live counts.
  const works = {
    genshin: [
      {creator:'ラブマツ / LOVEMATSU',platform:'TikTok',type:'SHORT VIDEO',title:'原神関連ショート動画',views:'637.1K',url:'https://www.tiktok.com/@matsu_kusarine/video/7270826090518662402'},
      {creator:'凪 / Nagi-ゲーム実況',platform:'YouTube',type:'GAMEPLAY VIDEO',title:'原神関連動画',views:'307.2K',url:'https://www.youtube.com/watch?v=kO6-QgKBAGQ',video:'kO6-QgKBAGQ'},
      {creator:'変な親爺 Henna-Oyajii',platform:'YouTube',type:'GAMEPLAY VIDEO',title:'原神関連動画',views:'249.2K',url:'https://www.youtube.com/watch?v=y_RjYNKDJVk',video:'y_RjYNKDJVk'},
      {creator:'マスター TV',platform:'YouTube',type:'GAMEPLAY VIDEO',title:'原神関連動画',views:'162.2K',url:'https://www.youtube.com/watch?v=otmc7TWD29U',video:'otmc7TWD29U'}
    ],
    starrail: [
      {creator:'ボビー',platform:'YouTube',type:'GAMEPLAY VIDEO',title:'崩壊：スターレイル関連動画',views:'168.2K',url:'https://www.youtube.com/watch?v=oj0AluXe-wY',video:'oj0AluXe-wY'},
      {creator:'sub scene',platform:'YouTube',type:'GAMEPLAY VIDEO',title:'崩壊：スターレイル関連動画',views:'82.8K',url:'https://www.youtube.com/watch?v=lze0Gykxs44',video:'lze0Gykxs44'},
      {creator:'タネ / Tane🔆',platform:'TikTok',type:'SHORT VIDEO',title:'星鉄関連ショート動画',views:'58.3K',url:'https://www.tiktok.com/@tane_0405/video/7271106801037282561'},
      {creator:'草の人',platform:'YouTube',type:'GAMEPLAY VIDEO',title:'崩壊：スターレイル関連動画',views:'57.3K',url:'https://www.youtube.com/watch?v=4sJFTwBn_2w',video:'4sJFTwBn_2w'}
    ],
    'reverse-1999': [
      {creator:'茶彩なこと',platform:'X',type:'FAN ART',title:'ヴェルティン / Fan Art',views:'45K',likes:'2,470',comments:'5',reposts:'634',url:'https://twitter.com/Nakoto_Sasai/status/1722543298014032299'},
      {creator:'カジ / Kaji',platform:'X',type:'FAN ART',title:'兔毛手袋 / Fan Art',views:'27K',likes:'1,586',comments:'1',reposts:'435',url:'https://twitter.com/Kajikaji_oO/status/1721248552352203226'},
      {creator:'NAMAちゃんねる',platform:'YouTube',type:'STRATEGY GUIDE',title:'イベント召喚・天井システム解説',views:'14.4K',likes:'251',comments:'32',reposts:'0',url:'https://www.youtube.com/watch?v=A5x7rPJHbN8',video:'A5x7rPJHbN8'},
      {creator:'のぴ',platform:'YouTube',type:'STRATEGY GUIDE',title:'心相育成ガイド',views:'11.5K',likes:'192',comments:'28',reposts:'0',url:'https://www.youtube.com/watch?v=eUpHeJNgbU0',video:'eUpHeJNgbU0'}
    ]
  };
  const labels = {genshin:'GENSHIN IMPACT',starrail:'HONKAI: STAR RAIL','reverse-1999':'REVERSE: 1999'};
  const themes = {genshin:'SCALE',starrail:'CREATOR MANAGEMENT','reverse-1999':'CONTENT DIVERSITY & ENGAGEMENT'};
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  window.renderContentShowcase = (campaign='genshin') => {
    const selected = works[campaign] ? campaign : 'genshin';
    return `<div class="cm-view cm-content cm-content--works" data-campaign="${selected}">
      <div class="cm-view-head"><span>03 / SELECTED CREATOR CONTENT</span><span>DATA RECORDED / NOV 2023</span></div>
      <div class="campaign-tabs" role="tablist" aria-label="Games">${Object.entries(labels).map(([key,label])=>`<button type="button" role="tab" aria-selected="${key===selected}" data-campaign-tab="${key}" class="${key===selected?'active':''}">${label}</button>`).join('')}</div>
      <div class="content-showcase-theme"><span>SELECTED WORKS / 04</span><strong>${themes[selected]}</strong><span>↗ OPEN ORIGINAL WORK</span></div>
      <div class="campaign-grid">${works[selected].map((work,index)=>`<a class="campaign-item content-work-card content-work-card--${work.platform.toLowerCase()}" href="${esc(work.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${esc(work.creator)} original ${esc(work.platform)} work in a new tab">
        <div class="content-work-art">${work.video?`<img src="assets/youtube/${work.video}.jpg" alt="" loading="lazy" onerror="this.style.display='none'">`:''}<span class="content-work-art-label">${esc(work.type)}</span><b aria-hidden="true">${work.platform==='TikTok'?'♪':work.platform==='X'?'𝕏':'▶'}</b></div>
        <div class="content-work-info"><div class="content-work-top"><span>${String(index+1).padStart(2,'0')} / ${esc(work.platform.toUpperCase())}</span><span>↗</span></div><strong>${esc(work.creator)}</strong><p>${esc(work.title)}</p><div class="content-work-metrics"><span><b>${esc(work.views)}</b> VV</span>${work.likes?`<span>♥ ${esc(work.likes)}</span>`:''}${work.comments?`<span>▤ ${esc(work.comments)}</span>`:''}${work.reposts?`<span>↗ ${esc(work.reposts)}</span>`:''}</div></div>
      </a>`).join('')}</div>
    </div>`;
  };
})();
