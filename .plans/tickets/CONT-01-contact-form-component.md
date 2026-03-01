# CONT-01: ContactForm Component with Web3Forms

**Status:** `todo`
**Priority:** High
**Track:** Contact
**Dependencies:** FOUND-01 (Tailwind colors)
**Blocked by:** FOUND-01

---

## Description

Build the `ContactForm.astro` component that integrates with Web3Forms for serverless form handling. The form has fields for Name, Email, and Message, with a honeypot for spam protection and HTML5 validation.

## Acceptance Criteria

- [ ] `src/components/ContactForm.astro` exists
- [ ] Form posts to `https://api.web3forms.com/submit` via POST
- [ ] Hidden `access_key` input (placeholder value — owner will replace with real key)
- [ ] Hidden `redirect` input pointing to `/contact?success=true`
- [ ] Honeypot field (`botcheck` checkbox, hidden via CSS)
- [ ] Fields: Name (text, required), Email (email, required), Message (textarea, required)
- [ ] HTML5 `required` attributes for client-side validation
- [ ] Submit button: "Send Message"
- [ ] All form elements use the neutral palette (no pure black/white)
- [ ] Inputs styled with `bg-surface`, `border-muted`, `text-body`

## Implementation Details

### Template

```astro
<form action="https://api.web3forms.com/submit" method="POST" class="space-y-6">
  <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY_HERE" />
  <input type="hidden" name="redirect" value="https://zotgoe.be/contact?success=true" />

  <!-- Honeypot spam protection -->
  <input type="checkbox" name="botcheck" class="hidden" style="display:none" />

  <div>
    <label for="name" class="block text-sm font-medium text-heading mb-2">Name</label>
    <input
      type="text"
      id="name"
      name="name"
      required
      placeholder="Your name"
      class="w-full px-4 py-3 bg-surface border border-muted/30 rounded text-body placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
    />
  </div>

  <div>
    <label for="email" class="block text-sm font-medium text-heading mb-2">Email</label>
    <input
      type="email"
      id="email"
      name="email"
      required
      placeholder="your@email.com"
      class="w-full px-4 py-3 bg-surface border border-muted/30 rounded text-body placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
    />
  </div>

  <div>
    <label for="message" class="block text-sm font-medium text-heading mb-2">Message</label>
    <textarea
      id="message"
      name="message"
      required
      placeholder="Your message"
      rows="5"
      class="w-full px-4 py-3 bg-surface border border-muted/30 rounded text-body placeholder:text-muted focus:outline-none focus:border-accent transition-colors resize-vertical"
    ></textarea>
  </div>

  <button
    type="submit"
    class="px-8 py-3 bg-heading text-bg rounded font-medium hover:bg-accent transition-colors"
  >
    Send Message
  </button>
</form>
```

### Styling Notes

- Input fields: `bg-surface` background, `border-muted/30` border (subtle), rounded
- Focus state: `focus:border-accent` for a visible but subtle focus indicator
- Submit button: dark background (`bg-heading`) with light text (`text-bg`) — inverted from the page
- `space-y-6` for consistent vertical spacing between fields
- `placeholder:text-muted` for lighter placeholder text
- `resize-vertical` on textarea allows vertical resizing only

### Web3Forms Notes

- The `access_key` value `YOUR_WEB3FORMS_KEY_HERE` is a placeholder — the site owner needs to sign up at https://web3forms.com and replace this with their actual API key
- The `redirect` field sends users back to the contact page with a success query parameter
- The honeypot field is invisible to users but visible to bots — if checked, Web3Forms rejects the submission

## Files to Create/Modify

- `src/components/ContactForm.astro` — create the form component
