---
'payblocks': minor
---

Add JSON-LD BreadcrumbList structured data to the Breadcrumbs component. When breadcrumbs are enabled via CMS, a `<script type="application/ld+json">` tag is emitted alongside the visual breadcrumb nav with schema.org BreadcrumbList markup. Includes E2E tests for visual rendering and JSON-LD output on top-level pages, nested child pages, and the disabled state.
