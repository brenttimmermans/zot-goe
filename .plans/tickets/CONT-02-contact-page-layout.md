# CONT-02: Contact Page Layout

**Status:** `todo`
**Priority:** High
**Track:** Contact
**Dependencies:** CONT-01 (ContactForm), FOUND-03 (BaseLayout)
**Blocked by:** CONT-01, FOUND-03

---

## Description

Build the contact page at `/contact` using BaseLayout and the ContactForm component. The page has a heading, optional introductory text, the form centered in the layout, and handles the success state (shown after form submission via query parameter).

## Acceptance Criteria

- [ ] `src/pages/contact.astro` exists
- [ ] Page heading: "Get in Touch"
- [ ] ContactForm component rendered below the heading
- [ ] Form is centered with a max-width for readability (`max-w-xl` or `max-w-2xl`)
- [ ] Success message displayed when URL has `?success=true` query parameter
- [ ] Wrapped in BaseLayout with page-specific title and description
- [ ] Uses semantic HTML

## Implementation Details

### Page Template

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import ContactForm from "../components/ContactForm.astro";

const success = Astro.url.searchParams.get("success") === "true";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact — Zot Goe Photography",
  "description": "Get in touch with Zot Goe for photography inquiries.",
  "url": "https://zotgoe.com/contact",
};
---

<BaseLayout
  title="Contact"
  description="Get in touch with Zot Goe for photography inquiries, collaborations, and commissions."
  structuredData={structuredData}
>
  <section class="py-20">
    <div class="max-w-xl mx-auto px-6">
      <h1 class="text-4xl font-bold text-heading mb-4">Get in Touch</h1>
      <p class="text-body mb-10">
        Have a project in mind or just want to say hello? Drop me a message below.
      </p>

      {success ? (
        <div class="bg-surface rounded p-8 text-center">
          <h2 class="text-2xl font-bold text-heading mb-2">Message sent!</h2>
          <p class="text-body">Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      ) : (
        <ContactForm />
      )}
    </div>
  </section>
</BaseLayout>
```

### Success State

- Web3Forms redirects to `/contact?success=true` after successful submission
- The page checks for this query parameter and shows a success message instead of the form
- The success message is in a `bg-surface` card for visual distinction
- No JavaScript needed — this is server-rendered by Astro

### Styling Notes

- `max-w-xl mx-auto` keeps the form at a readable width
- `py-20` for generous vertical spacing
- The intro text sets expectations before the form

## Files to Create/Modify

- `src/pages/contact.astro` — create the contact page
