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

The pointer trail uses a single underdamped spring and one continuous Bézier path, never layered strands. The follower keeps advancing to its latest mouse position until settled, independently of the 220 ms ink fade. Leaving the viewport and returning preserves the last spring position, so re-entry traces from that position instead of teleporting; neither idle time nor a large pointer jump resets it. A fresh page load initializes at the first mouse event without a streak. Render the enhanced canvas as white ink with mix-blend-mode: difference to invert pixels beneath the trail across light and dark areas. Use smooth per-segment alpha gradients to give the leading edge higher contrast and the trailing edge a continuous fade, preserving the 220 ms ink lifetime. Keep line-width taper, cursor appearance, and reduced-motion/mobile safeguards; the legacy inline trail remains the fallback only until enhancement initialization. Do not alter unrelated interactions.

## Narrow-screen homepage and navigation

At widths up to 760px, the homepage displays its title first, then the portrait collage, followed by the thesis (“Understand What Matters / Clarify What Comes Next”), Work and Resume actions, and existing supporting cards. The narrow-screen header keeps the Ally Lo wordmark and replaces the visible Home, Work, Skills and Let's Connect links with an accessible right-side hamburger. Its full-screen editorial overlay reuses the desktop section URLs and existing contact destinations. On wider screens preserve the previous header and hero layout. Keep keyboard close and focus behavior, reduced-motion support and natural mobile scrolling.

The mobile header and menu icon are rendered as white source ink under difference blending, so scrolling dark typography beneath the wordmark produces an actual inverse rather than flat dark-on-dark overlap. Do not eliminate the intended scroll overlap. Narrow-screen headline typography remains slightly restrained, with a modest gap below the wordmark at rest while retaining the intentional Logo/title overlap during scrolling. Keep the source portrait collage unchanged, remove the redundant mobile CSS paper backing, and crop the peripheral collage decorations around the subject with mobile-only framing. In narrow screens only, style VIEW WORK as a single thin-outlined pill and VIEW RESUME as a lightweight underlined text link, preserving the existing labels, destinations, and disabled state. Desktop layout, background texture, and copy stay as before.
