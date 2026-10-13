# Design guide

No historical chat proposal has yet been confirmed as a durable project-wide design constraint for this guide.

For the current visual and interaction implementation, inspect index.html and the relevant files in assets/ and prototypes/. Existing implementation is evidence of what is present, not proof that every choice is permanently approved. Keep unapproved alternatives in OPEN_QUESTIONS.md or outside the public repository; add a durable rule here only after the Portfolio owner explicitly confirms it.

## Japan Creator Marketing detail view

In the desktop case-study modal, the interactive screening canvas should retain roughly two thirds of the width, with the project-detail area limited to roughly one third. The detail area should show the HoYoverse and Reverse: 1999 summaries together without its own scrollbar. On narrow screens, preserve complete text in the normal page flow rather than clipping content to force a fixed-height panel.

The Japan Creator Marketing card on the Works page presents both programs' headline outcomes in one compact bottom bar without enlarging it. Show HoYoverse's three figures and Reverse: 1999's 715 submissions and weekly content review; leave the platform breakdown in the detail view. Keep the visual archive above the bar and match the detail view's metric definitions.

When Works cards appear side by side, their visual frames should have equal heights so the project titles align. Fit the Japan Creator Marketing image area around its outcome bar within that shared frame height.

## NIKKE detail view

Use the existing case modal, roughly two-thirds content and one-third project introduction on desktop, with the shared top and Previous/Next navigation. Four internal pages separate the Operating System, Operations Evidence, Creator Activation, and Community & Follow-through so each page fits a normal desktop viewport without an inner vertical scrollbar. The Operating System lifecycle uses six icon-led steps with arrows between them. Switching pages changes only the left content. Keep typography readable, parallel scale figures separate from any conversion funnel, and evidence-led editorial sections with thin dividers. Stack content on smaller screens using the existing case layout strategy. Show official campaign visuals and clearly identified sanitized material; never imitate a real screenshot when source evidence is unavailable.

## Page scroll behavior

Hide the root browser scrollbar visually without disabling vertical page scrolling. Use restrained desktop wheel easing and a modest reduction in scroll distance; preserve native mobile touch scrolling, keyboard navigation, nested case-study/dialog scrolling, and reduced-motion preferences. Avoid replacing the page with a transformed scrolling container or locking normal navigation.

## Pointer trail

The pointer trail uses one continuous, spring-followed path rather than layered strands, avoiding concentric-ring ghosting when the cursor circles quickly. At sharp turns, slight spring inertia creates natural curls; the path is drawn with tangent-continuous cubic Bézier segments and rounded caps, and old portions fade within 220 ms. Keep the established light/dark surface-contrast colors, line-width taper, cursor appearance, and reduced-motion/mobile behavior. The legacy inline trail remains an invisible fallback only while the enhanced script is not active. Do not delay the actual cursor or change unrelated interactions.
