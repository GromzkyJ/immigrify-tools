# n8n Setup Guide - Contact Form Integration

Complete step-by-step guide for setting up n8n webhook integration with the contact form.

## 📋 Overview

This guide will help you:
1. Create an n8n webhook
2. Get your webhook URL
3. Configure the contact form
4. Set up form submission automation
5. Set up password reset email automation

## 🎯 Prerequisites

- n8n instance (self-hosted or cloud)
- Access to your n8n dashboard
- Email service configured in n8n (for password reset)

## 🚀 Step 1: Create Webhook in n8n

### 1.1 Access Your n8n Instance

1. Open your n8n dashboard
2. Click **"Workflows"** in the sidebar
3. Click **"New Workflow"** button

### 1.2 Add Webhook Node

1. In the workflow editor, click **"+"** to add a node
2. Search for **"Webhook"**
3. Select **"Webhook"** node
4. Click on the webhook node to configure it

### 1.3 Configure Webhook

1. **HTTP Method**: Select **"POST"**
2. **Path**:** Enter a path (e.g., `/contact-form` or `/immigrify-contact`)
3. **Response Mode**: Select **"Respond to Webhook"**
4. **Authentication**: Select **"None"** (or add authentication if needed)

### 1.4 Get Webhook URL

1. Click **"Execute Node"** button (play icon)
2. Copy the **"Webhook URL"** shown
   - Example: `https://your-n8n-instance.com/webhook/contact-form`
3. **Save this URL** - you'll need it for the contact form

### 1.5 Save Workflow

1. Click **"Save"** button
2. Click **"Active"** toggle to activate the workflow
3. Your webhook is now ready!

## 🔧 Step 2: Configure Contact Form

### 2.1 Access Admin Panel

1. Visit: `https://immigrify.ca/tools/contact-form/admin`
2. Login with your admin password

### 2.2 Add Webhook URL

1. Click **"n8n Integration"** tab
2. Paste your webhook URL in the **"n8n Webhook URL"** field
3. Click **"Test Connection"** to verify
4. Click **"Save Changes"**

## 📨 Step 3: Set Up Form Submission Automation

### 3.1 Add Nodes After Webhook

In your n8n workflow, after the webhook node:

1. **Add "Set" Node** (optional - to format data)
2. **Add "Google Sheets" Node** (to save submissions)
3. **Add "Email" Node** (to send notifications)

### 3.2 Configure Google Sheets Node

1. Add **"Google Sheets"** node
2. Connect it to the webhook node
3. Configure:
   - **Operation**: "Append Row"
   - **Spreadsheet**: Select your Google Sheet
   - **Sheet**: Select the sheet name
   - **Columns**: Map form fields
     - Column A: `{{ $json.data.name }}`
     - Column B: `{{ $json.data.email }}`
     - Column C: `{{ $json.data.phone }}`
     - Column D: `{{ $json.data.subject }}`
     - Column E: `{{ $json.data.message }}`
     - Column F: `{{ $json.timestamp }}`

### 3.3 Configure Email Notification

1. Add **"Email"** node (Gmail, SMTP, etc.)
2. Connect it after Google Sheets
3. Configure:
   - **To**: Your email address
   - **Subject**: `New Contact Form Submission - {{ $json.data.name }}`
   - **Body**: 
     ```
     New contact form submission:
     
     Name: {{ $json.data.name }}
     Email: {{ $json.data.email }}
     Phone: {{ $json.data.phone }}
     Subject: {{ $json.data.subject }}
     
     Message:
     {{ $json.data.message }}
     
     Submitted: {{ $json.timestamp }}
     ```

### 3.4 Test Workflow

1. Click **"Execute Workflow"**
2. Submit a test form on your website
3. Check if data appears in Google Sheets
4. Check if email notification is received

## 🔐 Step 4: Set Up Password Reset Email

### 4.1 Create Separate Workflow (Recommended)

1. Create a **new workflow** in n8n
2. Add **"Webhook"** node (same as before)
3. Configure webhook path: `/password-reset` (or your choice)

### 4.2 Add Email Node

1. Add **"Email"** node after webhook
2. Configure email template:

**Subject:**
```
Password Reset Request - Contact Form Admin
```

**Body:**
```
Hello,

You requested a password reset for the Contact Form Admin Panel.

Click the link below to reset your password:
{{ $json.resetLink }}

This link will expire in 1 hour.

If you didn't request this, please ignore this email.

Best regards,
Immigrify.ca
```

### 4.3 Add Conditional Logic

1. Add **"IF"** node after webhook
2. Condition: `{{ $json.type }}` equals `password_reset`
3. Connect email node to "true" branch
4. This allows one webhook to handle both form submissions and password resets

### 4.4 Alternative: Single Webhook for Both

You can use the same webhook for both by adding an IF node:

1. After webhook, add **"IF"** node
2. Condition: `{{ $json.type }}` equals `form_submission`
3. **True branch**: Form submission automation
4. **False branch**: Password reset email automation

## 📊 Step 5: Advanced Automation (Optional)

### 5.1 Auto-Response Email

Add an email node to send auto-response to form submitter:

1. Add **"Email"** node
2. Configure:
   - **To**: `{{ $json.data.email }}`
   - **Subject**: `Thank you for contacting us!`
   - **Body**: Your auto-response message

### 5.2 CRM Integration

Connect to your CRM (if applicable):

1. Add CRM node (HubSpot, Salesforce, etc.)
2. Map form fields to CRM fields
3. Create contact/lead automatically

### 5.3 Slack/Discord Notifications

Get instant notifications:

1. Add **"Slack"** or **"Discord"** node
2. Configure webhook URL
3. Format message with form data

## 🧪 Step 6: Testing

### 6.1 Test Form Submission

1. Fill out the contact form on your website
2. Submit the form
3. Check n8n workflow execution
4. Verify data in Google Sheets
5. Check email notifications

### 6.2 Test Password Reset

1. Go to admin login page
2. Click "Forgot Password?"
3. Enter admin email
4. Check n8n workflow execution
5. Check email inbox for reset link
6. Click reset link and set new password

### 6.3 Test Webhook Connection

1. In admin panel, go to "n8n Integration" tab
2. Click "Test Connection"
3. Should show "Webhook connection successful"

## 🔍 Troubleshooting

### Webhook Not Receiving Data

1. **Check workflow is active**: Toggle must be ON
2. **Check webhook URL**: Must match exactly
3. **Check CORS**: n8n should allow requests from your domain
4. **Check n8n logs**: Look for errors in execution history

### Email Not Sending

1. **Check email service**: Verify SMTP/Gmail credentials
2. **Check email node**: Ensure it's connected properly
3. **Check spam folder**: Emails might be filtered
4. **Test email node**: Execute node manually with test data

### Data Not Saving to Google Sheets

1. **Check Google Sheets credentials**: Re-authenticate if needed
2. **Check sheet name**: Must match exactly
3. **Check column mapping**: Verify field names
4. **Check permissions**: Google account must have access

### Password Reset Not Working

1. **Check webhook URL**: Must be configured in admin panel
2. **Check email service**: Must be working in n8n
3. **Check token expiration**: Links expire after 1 hour
4. **Check email address**: Must match admin email in config

## 📝 Webhook Payload Reference

### Form Submission Payload

```json
{
  "type": "form_submission",
  "timestamp": "2024-12-XXT...",
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

```json
{
  "type": "password_reset",
  "email": "admin@immigrify.ca",
  "resetToken": "abc123xyz789...",
  "resetLink": "https://immigrify.ca/tools/contact-form/admin/reset?token=abc123xyz789...",
  "expiresAt": "2024-12-XXT...",
  "timestamp": "2024-12-XXT..."
}
```

## 🎯 Best Practices

1. **Use separate workflows** for form submissions and password resets (or use IF node)
2. **Test thoroughly** before going live
3. **Monitor workflow executions** regularly
4. **Keep webhook URLs secure** - don't share publicly
5. **Set up error handling** in n8n workflows
6. **Use webhook authentication** for production (optional but recommended)

## 🔗 Next Steps

1. ✅ Webhook created and configured
2. ✅ Contact form connected
3. ✅ Form submissions saving to Google Sheets
4. ✅ Email notifications working
5. ✅ Password reset emails configured
6. ✅ All tested and working

## 📚 Additional Resources

- [n8n Documentation](https://docs.n8n.io/)
- [n8n Webhook Guide](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)
- [Google Sheets Integration](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.googlesheets/)

---

**Need Help?** Check the troubleshooting section or review n8n execution logs for detailed error messages.
