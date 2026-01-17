# Contact Form - Immigrify.ca Tools

A modern, customizable contact form with admin panel and n8n automation integration.

## 🎯 Features

- ✅ **Beautiful Contact Form** - Responsive, iframe-optimized design
- ✅ **Admin Panel** - Full control over form fields and settings
- ✅ **Password Protection** - Secure admin access
- ✅ **Password Reset** - Email-based password recovery via n8n
- ✅ **n8n Integration** - Automatic webhook submission
- ✅ **WordPress Compatible** - Works perfectly in iframes
- ✅ **Fully Customizable** - Enable/disable fields, customize messages
- ✅ **Setup Wizard** - Easy initial configuration

## 📁 Project Structure

```
contact-form/
├── package.json
├── public/
│   ├── index.html
│   └── config.json          # Configuration file
├── src/
│   ├── components/          # React components
│   ├── utils/               # Utility functions
│   ├── App.js               # Main router
│   └── index.js             # Entry point
└── README.md
```

## 🚀 Quick Start

### 1. Initial Setup

After deployment, visit the admin panel:
```
https://immigrify.ca/tools/contact-form/admin
```

You'll be guided through the setup wizard:
1. Set admin password
2. Enter admin email (for password reset)
3. Configure n8n webhook URL (optional - can add later)

### 2. Access Admin Panel

1. Visit: `https://immigrify.ca/tools/contact-form/admin`
2. Enter your admin password
3. Configure form settings, fields, and messages

### 3. Embed in WordPress

Use an iframe plugin in Elementor:
```html
<iframe src="https://immigrify.ca/tools/contact-form/" 
        width="100%" 
        height="600" 
        frameborder="0">
</iframe>
```

## 📋 Default Form Fields

- **Name** (required) - Full name
- **Email** (required) - Email address
- **Phone** (optional) - Phone number
- **Subject** (optional) - Message subject
- **Message** (required) - Message content
- **Address** (optional, disabled by default) - Physical address

## ⚙️ Configuration

### Admin Panel Features

1. **Form Fields Tab**
   - Enable/disable fields
   - Customize field labels
   - Edit placeholder text

2. **Messages Tab**
   - Customize success message
   - Customize error message

3. **n8n Integration Tab**
   - Configure webhook URL
   - Test webhook connection
   - View payload format

4. **Settings Tab**
   - Form title and description
   - Submit button text
   - Export/import configuration

### Configuration File

The configuration is stored in:
- `public/config.json` (default)
- `localStorage` (overrides, saved via admin panel)

## 🔐 Security

- **Password Protection**: Admin panel requires password
- **Session Management**: Login persists in browser
- **Password Reset**: Secure token-based reset via email
- **No WordPress Dependencies**: Self-contained, no conflicts

## 🔗 n8n Integration

### Webhook Payload Format

When a form is submitted, the following payload is sent to your n8n webhook:

```json
{
  "type": "form_submission",
  "timestamp": "2024-12-XX...",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "General Inquiry",
    "message": "Hello, I need help...",
    "address": "123 Main St"
  },
  "source": "immigrify-contact-form"
}
```

### Password Reset Payload

When password reset is requested:

```json
{
  "type": "password_reset",
  "email": "admin@immigrify.ca",
  "resetToken": "abc123xyz...",
  "resetLink": "https://immigrify.ca/tools/contact-form/admin/reset?token=abc123xyz...",
  "expiresAt": "2024-12-XX...",
  "timestamp": "2024-12-XX..."
}
```

For detailed n8n setup instructions, see [N8N_SETUP_GUIDE.md](./N8N_SETUP_GUIDE.md).

## 🎨 Customization

### Styling

The form uses modern CSS with:
- Responsive design
- Mobile-friendly layout
- Clean, professional appearance
- iframe-optimized

### Field Management

- Enable/disable any field
- Customize labels and placeholders
- Set required/optional status
- Reorder fields (coming soon)

## 📱 iframe Compatibility

This form is designed to work perfectly in iframes:
- No parent window access
- Self-contained styling
- Responsive at any size
- WordPress/Elementor compatible

## 🔄 Password Reset Flow

1. Click "Forgot Password?" on login page
2. Enter admin email address
3. Reset link sent via n8n webhook
4. Click link in email (valid for 1 hour)
5. Set new password
6. Login with new password

## 🛠️ Development

### Local Development

```bash
cd contact-form
npm install
npm start
```

### Build for Production

```bash
npm run build
```

The build output will be in the `build/` folder.

## 📚 Documentation

- **This README** - Project overview and quick start
- **[N8N_SETUP_GUIDE.md](./N8N_SETUP_GUIDE.md)** - Detailed n8n setup instructions

## 🐛 Troubleshooting

### Form Not Submitting

1. Check n8n webhook URL is configured
2. Test webhook connection in admin panel
3. Check browser console for errors
4. Verify n8n workflow is active

### Admin Panel Not Loading

1. Clear browser cache
2. Check if configuration is set up
3. Try accessing `/admin/setup` directly
4. Check browser console for errors

### Password Reset Not Working

1. Verify admin email is correct
2. Check n8n webhook is configured
3. Verify email is being sent (check n8n logs)
4. Check reset link hasn't expired (1 hour limit)

## 🔗 URLs

- **Form**: `https://immigrify.ca/tools/contact-form/`
- **Admin Login**: `https://immigrify.ca/tools/contact-form/admin`
- **Admin Panel**: `https://immigrify.ca/tools/contact-form/admin/panel`
- **Setup Wizard**: `https://immigrify.ca/tools/contact-form/admin/setup`

## 📝 Notes

- Configuration is saved in localStorage for immediate effect
- To make changes permanent, update `config.json` manually
- Form submissions are sent to n8n webhook in real-time
- Password reset tokens expire after 1 hour
- All form data is sent to n8n for processing

## 🎉 Ready to Use!

1. Deploy to test environment
2. Complete setup wizard
3. Configure n8n webhook
4. Test form submission
5. Embed in WordPress via iframe
6. Deploy to production

---

**Project**: Contact Form  
**Location**: `immigrify-tools/contact-form/`  
**Deployment**: Auto-deploys via GitHub Actions
