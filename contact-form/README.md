# Simple Contact Form

A lightweight HTML contact form that integrates with n8n webhooks.

## Features

- Simple, lightweight HTML/CSS/JavaScript (no build process needed)
- Beautiful, modern design
- Mobile responsive
- Form validation
- n8n webhook integration
- Thank you message after submission

## Setup

### 1. Configure n8n Webhook URL

Edit `index.html` and update the `N8N_WEBHOOK_URL` variable at the top of the script section:

```javascript
const N8N_WEBHOOK_URL = 'https://your-n8n-instance.com/webhook/your-webhook-id';
```

### 2. Deploy

This is a simple HTML app - just upload the `index.html` file to your server.

**Via GitHub Actions** (automatic):
- Push to `test` branch → Deploys to `https://immigrify.ca/tools-test/contact-form/`
- Merge to `main` branch → Deploys to `https://immigrify.ca/tools/contact-form/`

**Manual Upload**:
- Upload `index.html` to `/public_html/tools-test/contact-form/` (test)
- Or `/public_html/tools/contact-form/` (production)

## Form Fields

- **Name** (required)
- **Email** (required)
- **Phone** (optional)
- **Subject** (optional)
- **Message** (required)

## n8n Integration

The form sends a POST request to your n8n webhook with the following JSON payload:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "subject": "Inquiry",
  "message": "Hello, I have a question...",
  "timestamp": "2024-01-17T20:12:00.000Z"
}
```

### Setting Up n8n Webhook

1. In n8n, create a new workflow
2. Add a "Webhook" node
3. Set it to trigger on POST requests
4. Copy the webhook URL
5. Paste it into `index.html` as `N8N_WEBHOOK_URL`

## Access

- Test: `https://immigrify.ca/tools-test/contact-form/`
- Production: `https://immigrify.ca/tools/contact-form/`
