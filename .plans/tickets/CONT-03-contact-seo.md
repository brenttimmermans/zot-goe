# CONT-03: Contact Page — SEO & Structured Data

**Status:** `todo`
**Priority:** Medium
**Track:** Contact
**Dependencies:** CONT-02 (contact page layout)
**Blocked by:** CONT-02

---

## Description

Verify and finalize SEO meta tags and JSON-LD structured data on the contact page. This is a verification/polish pass — CONT-02 includes basic SEO, but this ticket ensures completeness.

## Acceptance Criteria

- [ ] Page title: "Contact | Zot Goe Photography"
- [ ] Meta description is relevant to contact/inquiries
- [ ] JSON-LD `ContactPage` schema is present and valid
- [ ] Open Graph tags are set
- [ ] Canonical URL is correct
- [ ] HTML uses semantic elements: `<section>`, `<form>`, `<label>`
- [ ] All form inputs have associated `<label>` elements for accessibility

## Implementation Details

### JSON-LD Schema

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact — Zot Goe Photography",
  "description": "Get in touch with Zot Goe for photography inquiries.",
  "url": "https://zotgoe.be/contact"
}
```

### Accessibility Checklist

- [ ] Every `<input>` and `<textarea>` has a `<label>` with matching `for`/`id` attributes
- [ ] The submit button has descriptive text ("Send Message", not just "Submit")
- [ ] Form fields have `autocomplete` attributes where appropriate (`name`, `email`)
- [ ] Color contrast between text and background meets WCAG AA standards

### Verification

- Test structured data with Google Rich Results Test
- Verify title and description render in browser tab
- Check that OG tags produce a good preview when shared on social media

## Files to Create/Modify

- `src/pages/contact.astro` — verify/enhance SEO markup
- `src/components/ContactForm.astro` — verify accessibility of form fields
