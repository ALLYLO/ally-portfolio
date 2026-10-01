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
  const metric = (value, label, note = '') => `<div class="nk-metric"><strong>${value}</strong><b>${label}</b>${note ? `<small>${note}</small>` : ''}</div>`;
  const pageHead = (number, title) => `<div class="nk-page-head"><span class="nk-kicker">NIKKE / NORTH AMERICA</span><span class="nk-kicker">${number} / 04</span></div><h2 class="nk-page-title" id="nk-page-title" tabindex="-1">${title}</h2>`;

  function operatingSystem() {
    const stages = [['SOURCE','Discovery · Fit','search'],['OUTREACH','Email · Discord','send'],['ONBOARD','NDA · Documentation','document'],['SUPPORT','Q&amp;A · Issues','support'],['ACTIVATE','Brief · Submission','document'],['RETAIN','Performance · Reward','retain']];
    return `${pageHead('01', 'CREATOR<br>OPERATING SYSTEM')}
      <section class="nk-scale" aria-label="Project scale — independent measures">
        ${metric('154', 'CREATORS RECOMMENDED', 'Qualified for client review')}
        ${metric('176', 'CREATORS REACHED', 'Progressed through outreach')}
        ${metric('47', 'KOCs DIRECTLY MANAGED', 'Supported across ongoing operations')}
      </section>
      <section class="nk-section nk-lifecycle"><div class="nk-section-heading"><h3>CREATOR LIFECYCLE</h3><span class="nk-kicker">END-TO-END OPERATING FLOW</span></div>
        <ol>${stages.map(([name, text, icon], i) => `<li>${lifecycleIcon(icon)}<span>0${i + 1}</span><strong>${name}</strong><p>${text}</p></li>`).join('')}</ol>
      </section>`;
  }

  function operationsEvidence() {
    return `${pageHead('02', 'OPERATIONS<br>EVIDENCE')}
      <div class="nk-evidence-grid">
        <section class="nk-section nk-playbook"><div class="nk-section-heading"><h3>OPERATIONS PLAYBOOK</h3><span class="nk-kicker">ORIGINAL HANDOVER DOCUMENTATION</span></div>
          <div class="nk-document-excerpt"><span class="nk-kicker">SANITIZED TRANSCRIPTION · TRANSLATED FROM CHINESE</span><h4>Campaign reporting &amp; handover</h4><ol><li>Send the data-collection request ahead of the deadline and remind creators to submit.</li><li>Record submitted performance in the tracking sheet; organize screenshots by campaign and creator.</li><li>Include a screenshot of the live broadcast in each Twitch data package.</li></ol><details><summary>READ SOURCE EXCERPT <span aria-hidden="true">↗</span></summary><div lang="zh-CN"><p>可以提前一天将数据收集文案的word发给KOC，并提醒他们尽快提交。</p><p>Twitch直播的数据包中是需要有当次直播截图，我们自己截图上传即可。</p></div></details></div>
          <p class="nk-playbook-flow">Campaign Brief <i>→</i> Submission Collection <i>→</i> Deadline Check <i>→</i> Data Collection <i>→</i> Reward Confirmation</p>
          <p class="nk-caption">Campaign execution · Reporting · Handover</p>
        </section>
        <section class="nk-section nk-tracking"><div class="nk-section-heading"><h3>CREATOR TRACKING</h3><span class="nk-kicker">ANONYMIZED · ILLUSTRATIVE SAMPLE</span></div>
          <div class="nk-table-wrap"><table><thead><tr><th>CREATOR</th><th>STATUS</th><th>CAMPAIGN</th><th>REWARD</th></tr></thead><tbody>
            <tr><th scope="row">KOC 012</th><td>Signed</td><td>Anniversary</td><td>Delivered</td></tr>
            <tr><th scope="row">KOC 021</th><td>Follow-up</td><td>Anniversary</td><td>Pending</td></tr>
            <tr><th scope="row">KOC 034</th><td>Discord Joined</td><td>—</td><td>—</td></tr>
          </tbody></table></div>
          <p class="nk-tracking-note">One creator pool.<br>Multiple stages.<br>One shared operating record.</p>
        </section>
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
  window.renderNikkeShowcase = () => `<div class="nikke-showcase"><div class="nk-stage" role="region" aria-label="NIKKE case study content" tabindex="0">${operatingSystem()}</div><nav class="cm-pagination nk-pagination" aria-label="NIKKE case study pages"><button type="button" data-nikke-page="1" class="active" aria-current="page"><small>01</small><b>OPERATING<br>SYSTEM</b></button><button type="button" data-nikke-page="2" aria-current="false"><small>02</small><b>OPERATIONS<br>EVIDENCE</b></button><button type="button" data-nikke-page="3" aria-current="false"><small>03</small><b>CREATOR<br>ACTIVATION</b></button><button type="button" data-nikke-page="4" aria-current="false"><small>04</small><b>COMMUNITY &amp;<br>FOLLOW-THROUGH</b></button></nav></div>`;

  window.renderNikkeDetails = () => `<section class="case-details nk-details" aria-label="NIKKE project introduction">
    <div class="nk-intro-head"><span class="nk-kicker">THE PROJECT</span><h2 id="case-title">NIKKE Creator<br>&amp; Community Operations</h2><span class="nk-kicker">CREATOR MARKETING / NORTH AMERICA</span></div>
    <section class="nk-intro-section"><h3>PROJECT OVERVIEW</h3><p>A long-term KOC program supporting NIKKE’s creator ecosystem through sourcing, onboarding, community support and recurring campaign operations.</p><p>Alongside creator operations, I produced Reddit content around key game moments to encourage organic community discussion.</p></section>
    <section class="nk-intro-section"><h3>PROJECT INFO</h3><dl class="nk-metadata"><div><dt>ROLE</dt><dd>Creator &amp; Community Operations Intern</dd></div><div><dt>MARKET</dt><dd>North America / English-speaking</dd></div><div><dt>CHANNELS</dt><dd>YouTube · Twitch · Discord · Reddit</dd></div><div><dt>PROJECT TYPE</dt><dd>Long-term KOC Program</dd></div></dl></section>
    <section class="nk-intro-section"><h3>CORE RESPONSIBILITIES</h3><ol class="nk-responsibilities"><li><span>01</span><div><b>Creator Acquisition</b><p>Sourcing · Outreach · Onboarding</p></div></li><li><span>02</span><div><b>Community Operations</b><p>Discord Support · Creator Relations</p></div></li><li><span>03</span><div><b>Campaign Operations</b><p>Activation · Performance · Fulfillment</p></div></li><li><span>04</span><div><b>Process Documentation</b><p>SOP · Tracking · Handover</p></div></li></ol></section>
    <section class="nk-intro-section nk-featured"><h3>FEATURED CONTRIBUTION</h3><p>Created the project’s operations playbook and handover guide, documenting recurring workflows from creator onboarding to campaign tracking and reward fulfillment.</p></section>
  </section>`;

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
