# Implementation decisions after validation

> Revisión vigente de cámara, móvil y gestos: [07-mobile-and-motion-revision.md](07-mobile-and-motion-revision.md). Las decisiones anteriores sobre móvil sin pin y botones de zoom son históricas.
The four gaps are resolved as agreed: static opt-in modes independent of progress; poster latched for a late desktop pass and rearmed only after upward exit; reserved square with mobile copy/controls beneath; horizontal drag, native vertical scroll and explicit zoom, no pinch/wheel zoom.

The verified visual is `product-20` (Molletes) → alternative `mollequiles`; this supersedes assumptions from the older sprite export. NGSP v4 uses the audited PlayCanvas runtime. Exact hashes, original configuration and local vendor changes are retained in evidence and vendor provenance. The direct live-canvas poster is the master; the earlier offscreen candidate is not shipped. Only 560/1120 lossless derivatives are delivered by the page.

The adapter applies the validated distance-multiplier path rather than the old Spark camera semantics. Native runtime pointer/wheel controls are isolated behind a non-interactive canvas; a separate input surface handles deliberate product gestures, with no runtime idle resets/autoplay.

Two changes discovered during browser QA: disable scroll anchoring for the story; defer desktop engine prefetch until both scroll intent and proximity. Longest-caption measurement reserves the phase area. LAN previews, like loopback, never send form submissions.

The low-impact motif is a static purple mark in the case copy; no transformed logo or continuous decorative animation. No obsolete demo deletion was needed: the hero no longer imports/activates it, and unrelated existing vendor assets remain available to other demos.

Implementation and automated QA are available in this branch. The feature remains open pending physical QA and redistribution-permission review; see `../../qa/mollequiles/README.md`. No PR or publication yet.
