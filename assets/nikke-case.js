/* NIKKE content within the shared Portfolio case modal and navigation. */
(() => {
  const visuals = { nier: 'assets/nikke/nier-collaboration.png', anniversary: 'assets/nikke/anniversary-our-story.png', kyomaf: 'assets/nikke/kyomaf-2023.png' };
  const assetLabels = {
    nier: 'NIKKE × NieR · official campaign visual',
    anniversary: 'OUR STORY GOES ON · 1st Anniversary visual',
    kyomaf: 'KYOMAF 2023 · kimono visual'
  };
  const visual = (key) => `<img src="${visuals[key]}" alt="${assetLabels[key]}" loading="lazy">`;
  const lifecycleIcons = {
    search: '<circle cx="13" cy="13" r="8"/><path d="m19 19 8 8"/>',
    send: '<path d="M28 4 4 14l10 4 4 10L28 4Z"/><path d="m14 18 8-8"/>',
    document: '<path d="M8 3h11l6 6v20H8z"/><path d="M19 3v7h6M12 15h9M12 20h9M12 25h7"/>',
    support: '<path d="M7 23a6 6 0 0 1-1-11 8 8 0 0 1 15-3 6 6 0 0 1 4 10 5 5 0 0 1-3 8H11a5 5 0 0 1-4-4Z"/><path d="M13 19c2 2 4 2 6 0"/>',
    retain: '<path d="M5 28h23M9 26V16M16 26V10M23 26V5"/>'
  };
  const lifecycleIcon = (key) => `<svg class="nk-lifecycle-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${lifecycleIcons[key]}</svg>`;
  const channelIcons = {
    youtube: '<rect x="1" y="3" width="22" height="18" rx="5" fill="#ff0033"/><path d="m10 8 7 4-7 4z" fill="#fff"/>',
    twitch: '<path d="M2 2h20v14l-5 5h-5l-3 3v-3H2z" fill="#9146ff"/><path d="M8 7v8m7-8v8" stroke="#fff" stroke-width="2"/>',
    discord: '<path d="M5 5q7-4 14 0l3 13q-3 3-6 3l-1-2q-3 1-6 0l-1 2q-3 0-6-3z" fill="#5865f2"/><circle cx="9" cy="13" r="1.3" fill="#fff"/><circle cx="15" cy="13" r="1.3" fill="#fff"/>',
    reddit: '<circle cx="12" cy="13" r="10" fill="#ff4500"/><path d="m12 7 1-4 4 1M6 11l-3-1m15 1 3-1" fill="none" stroke="#fff" stroke-width="1.5"/><circle cx="9" cy="13" r="1.2" fill="#fff"/><circle cx="15" cy="13" r="1.2" fill="#fff"/><path d="M9 17q3 2 6 0" fill="none" stroke="#fff" stroke-width="1.4"/>'
  };
  const metric = (value, label, note = '') => `<div class="nk-metric"><strong>${value}</strong><b>${label}</b>${note ? `<small>${note}</small>` : ''}</div>`;
  const pageHead = (number, title) => `<div class="nk-page-head"><span class="nk-kicker">NIKKE / NORTH AMERICA</span><span class="nk-kicker">${number} / 04</span></div><h2 class="nk-page-title" id="nk-page-title" tabindex="-1">${title}</h2>`;

  function operatingSystem() {
    const stages = [['SOURCE','Discovery · Fit','search'],['OUTREACH','Email · Discord','send'],['ONBOARD','NDA · Documentation','document'],['SUPPORT','Q&amp;A · Issues','support'],['ACTIVATE','Brief · Submission','document'],['RETAIN','Performance · Reward<br>Re-engage','retain']];
    const touchpoints = [
      ['YouTube', 'Video content creation', 'youtube'],
      ['Twitch', 'Live streams &amp; events', 'twitch'],
      ['Discord', 'Creator support &amp; communication', 'discord'],
      ['Reddit', 'Community content &amp; discussion', 'reddit']
    ];
    return `<div class="nk-operating-page">
      <div class="nk-hero">${pageHead('01', 'CREATOR<br>OPERATING SYSTEM')}<p>A structured approach to manage the creator lifecycle<br>from sourcing to long-term collaboration.</p></div>
      <section class="nk-scale" aria-label="Project scale — independent measures">
        ${metric('154', 'CREATORS RECOMMENDED', 'Qualified for client review')}
        ${metric('176', 'CREATORS REACHED', 'Progressed through outreach')}
        ${metric('47', 'KOCs DIRECTLY MANAGED', 'Supported across ongoing operations')}
      </section>
      <section class="nk-section nk-lifecycle"><div class="nk-section-heading"><h3>CREATOR LIFECYCLE</h3><span class="nk-kicker">END-TO-END OPERATING FLOW</span></div>
        <ol>${stages.map(([name, text, icon], i) => `<li>${lifecycleIcon(icon)}<span>0${i + 1}</span><strong>${name}</strong><p>${text}</p></li>`).join('')}</ol>
      </section>
      <section class="nk-touchpoints" aria-label="Key touchpoints"><div class="nk-section-heading"><h3>KEY TOUCHPOINTS</h3><span class="nk-kicker">CREATOR OPERATIONS ACROSS MULTIPLE CHANNELS</span></div>
        <div class="nk-touchpoint-grid">${touchpoints.map(([name, description, key]) => `<article class="nk-touchpoint nk-touchpoint--${key}"><div class="nk-touchpoint-label"><svg viewBox="0 0 24 24" aria-hidden="true">${channelIcons[key]}</svg><strong>${name}</strong></div><p>${description}</p></article>`).join('')}</div>
      </section></div>`;
  }

  function operationsEvidence() {
    const steps = [
      ['01','Campaign Brief','Confirm the brief and send it before the campaign starts.'],
      ['02','Submission Collection','Record video and stream links in the internal master sheet.'],
      ['03','Deadline Check','Check missing submissions and follow up before the deadline.'],
      ['04','Data Collection','Verify performance and organize screenshots by campaign.'],
      ['05','Reward Confirmation','Confirm distribution and update the operating record.']
    ];
    return `<div class="nk-system-page">
      <div class="nk-system-hero">${pageHead('02', 'SYSTEM<br>IN PRACTICE')}<p>From documentation to daily operations,<br>keeping the creator program running.</p></div>
      <section class="nk-system-playbook" aria-label="Operations playbook"><button type="button" class="nk-open-playbook" data-nk-open-playbook aria-label="Open Operations Playbook document"><span class="nk-section-heading"><h3>OPERATIONS PLAYBOOK</h3><span class="nk-kicker">END-TO-END CAMPAIGN EXECUTION · OPEN DOCUMENT ↗</span></span><span class="nk-system-steps">${steps.map(([n,title,summary]) => `<span class="nk-system-step"><b>${n}</b><strong>${title}</strong><small>${summary}</small></span>`).join('')}</span><span class="nk-system-flow">BRIEF <i>→</i> SUBMISSION <i>→</i> CHECK <i>→</i> DATA <i>→</i> REWARD</span></button></section>
      <div class="nk-system-bottom"><section class="nk-operating-record"><div class="nk-section-heading"><h3>OPERATING RECORD</h3><span class="nk-kicker">INTERNAL-TO-CLIENT DATA FLOW</span></div><div class="nk-record-grid"><div><b>01 / INTERNAL MASTER SHEET</b><p>Creator status · campaign data · performance · rewards</p></div><div><b>02 / DAILY CHECK</b><p>Outreach · submissions · pending follow-ups</p></div><div><b>03 / CLIENT UPDATE</b><p>Verified progress · creator list · final data</p></div></div></section><section class="nk-system-support"><div class="nk-section-heading"><h3>CREATOR SUPPORT &amp; DATA FOLLOW-UP</h3></div><p><b>DISCORD</b> Participation, onboarding and reward questions.</p><p><b>YOUTUBE / TWITCH</b> Post-campaign analytics and screenshots.</p></section></div>
    </div>`;
  }

  function activation() {
    const campaigns = [
      ['01','NIKKE × NieR Lucky Streak','SEP 01–15','nier','39','14'],
      ['02','First Impression vs. Now','SEP–OCT',null,'15','14'],
      ['03','1st Anniversary','OCT 27–NOV 15','anniversary','68','44']
    ];
    return `${pageHead('03', 'CREATOR<br>ACTIVATION')}
      <section class="nk-campaign-section" aria-label="Three recurring campaigns"><div class="nk-section-heading"><h3>3 RECURRING CAMPAIGNS</h3></div>
        <div class="nk-campaigns">${campaigns.map(([n,title,date,asset,yt,twitch]) => `<article class="nk-campaign"><div class="nk-campaign-art">${asset ? visual(asset) : '<div class="nk-type-art"><span>NIKKE / CREATOR CAMPAIGN</span><strong>FIRST<br>IMPRESSION<br><em>VS. NOW</em></strong></div>'}</div><div class="nk-campaign-date"><span>${n}</span><span>${date}</span></div><h4>${title}</h4><p><b>${yt}</b> YouTube Videos<br><b>${twitch}</b> Twitch Streams</p></article>`).join('')}</div>
      </section>
      <section class="nk-results" aria-label="Campaign results"><div>${metric('194', 'VIDEOS &amp; STREAMS TRACKED')}${metric('306K+', 'YOUTUBE VIEWS RECORDED')}</div><p>122 YouTube videos · 72 Twitch streams · 42.8K Twitch live views</p></section>`;
  }

  function communityActivation() {
    const posts = [
      ['Excited for the NieR NIKKE collab?', '325 upvotes · 71 comments', 'nier', 'https://www.reddit.com/r/NikkeMobile/comments/15y751m/excited_for_the_nier_nikke_collab/'],
      ['KYOMAF · Kimono Looks', '200 upvotes · 39 comments', 'kyomaf', 'https://www.reddit.com/r/NikkeMobile/comments/15yylv5/nikke_characters_debuts_new_kimono_looks_at_kyoto/']
    ];
    return `${pageHead('04', 'COMMUNITY &amp;<br>FOLLOW-THROUGH')}
      <div class="nk-activation-grid">
        <section class="nk-section nk-reddit"><div class="nk-section-heading"><h3>REDDIT COMMUNITY ACTIVATION</h3></div><div class="nk-reddit-metrics">${metric('2','ORIGINAL POSTS')}${metric('525+','UPVOTES')}${metric('110','COMMENTS')}</div>
          <div class="nk-posts">${posts.map(([title,stats,asset,url]) => `<article class="nk-post"><div class="nk-post-art">${visual(asset)}</div><h4>${title}</h4><p>${stats}</p><a class="nk-post-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="View Reddit post: ${title} (opens in new tab)">VIEW POST <span aria-hidden="true">↗</span></a></article>`).join('')}</div>
          <p class="nk-caption">Original topic selection, copy, visuals and active comment engagement.</p>
        </section>
        <div class="nk-operations">
          <section class="nk-section"><div class="nk-section-heading"><h3>KEEPING PARTICIPATION MOVING</h3></div><ol class="nk-vertical-flow"><li>NO SUBMISSION</li><li>FOLLOW-UP</li><li>REASON IDENTIFIED</li><li>NEXT ACTION</li></ol><p class="nk-reasons">Busy · Health · Travel · No response</p><p class="nk-support-copy">Followed up individually to understand participation blockers and maintain creator relationships.</p></section>
          <section class="nk-section"><div class="nk-section-heading"><h3>REWARD FULFILLMENT</h3></div><ol class="nk-vertical-flow nk-reward-flow"><li>Content delivered <span>✓</span></li><li>Account info collected <span>✓</span></li><li>Reward tracking <span>…</span></li><li>Confirmed <span>✓</span></li></ol><p class="nk-support-copy">Tracked fulfillment after content delivery to close the campaign loop.</p></section>
        </div>
      </div>`;
  }

  const pages = [operatingSystem, operationsEvidence, activation, communityActivation];
  window.renderNikkeShowcase = () => `<div class="nikke-showcase"><div class="nk-stage" role="region" aria-label="NIKKE case study content" tabindex="0">${operatingSystem()}</div><nav class="cm-pagination nk-pagination" aria-label="NIKKE case study pages"><button type="button" data-nikke-page="1" class="active" aria-current="page"><small>01</small><b>OPERATING<br>SYSTEM</b></button><button type="button" data-nikke-page="2" aria-current="false"><small>02</small><b>SYSTEM<br>IN PRACTICE</b></button><button type="button" data-nikke-page="3" aria-current="false"><small>03</small><b>CREATOR<br>ACTIVATION</b></button><button type="button" data-nikke-page="4" aria-current="false"><small>04</small><b>COMMUNITY &amp;<br>FOLLOW-THROUGH</b></button></nav></div>`;

  window.renderNikkeDetails = () => `<section class="case-details nk-details" aria-label="NIKKE project introduction">
    <div class="nk-intro-head"><span class="nk-kicker">THE PROJECT</span><h2 id="case-title">NIKKE Creator<br>&amp; Community Operations</h2><span class="nk-kicker">CREATOR MARKETING / NORTH AMERICA</span></div>
    <section class="nk-intro-section"><h3>PROJECT OVERVIEW</h3><p>A long-term KOC program supporting NIKKE’s creator ecosystem through sourcing, onboarding, community engagement and recurring campaign operations.</p></section>
    <section class="nk-intro-section"><h3>PROJECT INFO</h3><dl class="nk-metadata"><div><dt>ROLE</dt><dd>Creator &amp; Community Operations Intern</dd></div><div><dt>MARKET</dt><dd>North America / English-speaking</dd></div><div><dt>CHANNELS</dt><dd>YouTube · Twitch · Discord · Reddit</dd></div><div><dt>PROJECT TYPE</dt><dd>Long-term KOC Program</dd></div></dl></section>
    <section class="nk-intro-section"><h3>CORE RESPONSIBILITIES</h3><ol class="nk-responsibilities"><li><span>01</span><div><b>Creator Acquisition</b><p>Sourcing · Outreach · Onboarding</p></div></li><li><span>02</span><div><b>Community Operations</b><p>Discord Support · Reddit Content · Creator Relations</p></div></li><li><span>03</span><div><b>Campaign Operations</b><p>Activation · Performance · Fulfillment</p></div></li><li><span>04</span><div><b>Process Documentation</b><p>SOP · Tracking · Handover</p></div></li></ol></section>
    <section class="nk-intro-section nk-featured"><h3>FEATURED CONTRIBUTION</h3><p>Created the project’s operations playbook and handover guide, documenting recurring workflows from creator onboarding to campaign tracking and reward fulfillment.</p></section>
  </section>`;

  const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function playbookReader() {
    const source = window.nikkePlaybookData;
    const blocks = (items) => items.map(({type,text}) => {
      const safe = escapeHtml(text.startsWith('• ') ? text.slice(2) : text);
      if (type === 'Heading2') return `<h3>${safe}</h3>`;
      if (type === 'Heading3') return `<h4>${safe}</h4>`;
      return `<p class="${text.startsWith('• ') ? 'nk-reader-bullet' : ''}">${safe}</p>`;
    }).join('');
    return `<div class="nk-reader-overlay" aria-label="Operations Playbook document" role="region"><aside class="nk-reader-nav"><div class="nk-reader-intro"><span class="nk-kicker">END-TO-END CAMPAIGN EXECUTION</span><h2>OPERATIONS<br>PLAYBOOK</h2><p>Public-sanitized handover documentation covering the creator workflow, operating records and campaign data collection.</p></div><nav aria-label="Playbook chapters">${source.chapters.map((chapter,i) => `<button type="button" data-nk-reader-chapter="${i}" class="${i===0?'active':''}" aria-current="${i===0?'true':'false'}"><b>0${i+1}</b><span>${escapeHtml(chapter.title.replace(/^[一二三四五]、/,''))}</span></button>`).join('')}</nav><button type="button" class="nk-reader-back" data-nk-reader-close>← BACK TO CASE STUDY</button></aside><div class="nk-reader-document"><div class="nk-reader-toolbar"><span><b id="nk-reader-current">01 / 05</b> &nbsp; <span id="nk-reader-current-title">${escapeHtml(source.chapters[0].title)}</span></span><span>SOURCE: PUBLIC-SANITIZED NIKKE HANDOVER DOCUMENT</span></div><div class="nk-reader-scroll" id="nk-reader-scroll" tabindex="0"><article lang="zh-CN"><div class="nk-reader-title"><h1>${escapeHtml(source.title)}</h1><p>NIKKE CREATOR OPERATIONS · HANDOVER DOCUMENTATION</p></div>${source.chapters.map((chapter,i) => `<section class="nk-reader-chapter" id="nk-reader-chapter-${i}"><h2><span>0${i+1}</span>${escapeHtml(chapter.title)}</h2>${blocks(chapter.blocks)}</section>`).join('')}</article></div></div></div>`;
  }

  document.addEventListener('click', (event) => {
    const open = event.target.closest('[data-nk-open-playbook]');
    if (open) {
      const content = document.querySelector('#case-content');
      content.insertAdjacentHTML('beforeend', playbookReader());
      const reader = content.querySelector('.nk-reader-overlay');
      const scroller = reader.querySelector('.nk-reader-scroll');
      scroller.addEventListener('scroll', () => {
        const sections = [...reader.querySelectorAll('.nk-reader-chapter')];
        let index = 0;
        sections.forEach((section,i) => {if (section.getBoundingClientRect().top <= scroller.getBoundingClientRect().top + 45) index = i;});
        reader.querySelector('#nk-reader-current').textContent = `0${index+1} / 05`;
        reader.querySelector('#nk-reader-current-title').textContent = window.nikkePlaybookData.chapters[index].title;
        reader.querySelectorAll('[data-nk-reader-chapter]').forEach((button,i) => {const active=i===index;button.classList.toggle('active',active);button.setAttribute('aria-current',active?'true':'false');});
      }, {passive:true});
      content.querySelector('.nk-reader-back').focus();
      return;
    }
    const close = event.target.closest('[data-nk-reader-close]');
    if (close) {
      close.closest('.nk-reader-overlay').remove();
      document.querySelector('[data-nk-open-playbook]')?.focus();
      return;
    }
    const chapter = event.target.closest('[data-nk-reader-chapter]');
    if (chapter) {
      const index = Number(chapter.dataset.nkReaderChapter);
      const reader = chapter.closest('.nk-reader-overlay');
      const scroller = reader.querySelector('.nk-reader-scroll');
      const section = reader.querySelector(`#nk-reader-chapter-${index}`);
      scroller.scrollTo({top:scroller.scrollTop + section.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 14,behavior:'smooth'});
      reader.querySelector('#nk-reader-current').textContent = `0${index+1} / 05`;
      reader.querySelector('#nk-reader-current-title').textContent = window.nikkePlaybookData.chapters[index].title;
      reader.querySelectorAll('[data-nk-reader-chapter]').forEach((button) => {const active=button===chapter;button.classList.toggle('active',active);button.setAttribute('aria-current',active?'true':'false');});
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const reader = document.querySelector('.nk-reader-overlay');
    if (!reader) return;
    event.preventDefault();
    event.stopPropagation();
    reader.remove();
    document.querySelector('[data-nk-open-playbook]')?.focus();
  }, true);

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-nikke-page]');
    if (!button || button.getAttribute('aria-current') === 'page') return;
    const shell = button.closest('.nikke-showcase');
    const stage = shell.querySelector('.nk-stage');
    stage.innerHTML = pages[Number(button.dataset.nikkePage) - 1]();
    stage.scrollTop = 0;
    shell.querySelectorAll('[data-nikke-page]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-current', active ? 'page' : 'false');
    });
    const heading = stage.querySelector('h2');
    heading.focus({ preventScroll: true });
    if (window.matchMedia('(max-width: 1100px)').matches) {
      const dialog = shell.closest('dialog');
      requestAnimationFrame(() => {
        dialog.scrollTop += heading.getBoundingClientRect().top - dialog.getBoundingClientRect().top - 72;
      });
    }
  });
})();
