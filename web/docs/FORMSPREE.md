# Formspree

## What is Formspree?

Formspree is a form backend service that collects form submissions without requiring a custom server. When a user submits a form:

1. The form data is sent to Formspree's endpoint
2. Formspree receives the data and forwards it to your email or webhook
3. You can configure notifications, spam filtering, and integrations

## Configuration

The contact form endpoint is configured in `src/config/site.json`:

```json
{
  "forms": {
    "endpoint": "https://formspree.io/f/your-form-id"
  }
}
```

## Setup

1. Go to [formspree.io](https://formspree.io) and create an account
2. Create a new form
3. Copy the form ID from the URL (e.g. `https://formspree.io/f/xxxxx` → `xxxxx`)
4. Replace `your-form-id` in `site.json` with your actual form ID
5. Alternatively, set `VITE_PUBLIC_FORM_ENDPOINT` env var to override the config

## Environment

- **Production:** Set `VITE_PUBLIC_FORM_ENDPOINT` in Railway (or your host) if you prefer env over config
- **Development:** Uses `site.json` or `VITE_PUBLIC_FORM_ENDPOINT` if set

## Future Admin Panel

When an admin panel is added, the form can be switched to your own API:

1. Replace `forms.endpoint` in config with your API URL
2. Or add a new config key and update `ContactForm.tsx` to use it
3. The form component already checks for a valid endpoint and shows a message if missing
