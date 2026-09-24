(() => {
  const functions = [
    ['01', 'KEEP INFORMED', 'Campaign updates'],
    ['02', 'ENABLE CREATION', 'Resources & templates'],
    ['03', 'STAY CONNECTED', 'Q&A & support']
  ];
  const toolkit = [
    ['Campaign Brief', 'Objectives, key messages & requirements'],
    ['Key Messages', 'Core points and brand positioning'],
    ['Creative Examples', 'Reference content & inspiration'],
    ["Do's & Don'ts", 'Content guidelines'],
    ['Templates & Assets', 'Thumbnails, subtitles & editable assets'],
    ['FAQ', 'Answers to common questions']
  ];
  const flow = [
    ['ANNOUNCE', 'Share new opportunities'],
    ['BRIEF', 'Provide clear guidance'],
    ['ENABLE', 'Assets & examples'],
    ['SUPPORT', 'Answer questions'],
    ['DELIVER', 'Support completion']
  ];
  const relationship = () => `
    <section class="connect-reference-crop" aria-label="Connect page 1: creator community">
      <img src="assets/connect01-visual-source.png" alt="Creator community: from one-off contacts to ongoing relationships, with a Discord announcement and support conversation">
    </section>`;
  const activation = () => `
    <section class="connect-reference-crop connect-reference-crop--second" aria-label="Connect page 2: community operations">
      <img src="assets/connect02-visual-source.png" alt="Community operations: support, submission tracking, topic discussion, reference content and creator recognition">
    </section>`;
  window.renderConnectPage = page => page === 'community-2' ? activation() : relationship();
})();
