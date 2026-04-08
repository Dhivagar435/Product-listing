export interface EmailTemplateProps {
  username: string;
  firstName:string;
  password?: string;
  portalUrl: string;
  schoolName?: string;
  userType: string;
  welcomeMessage: string;
  userTypeDescription?: string;
}

export function EmailTemplate({
  username,
  firstName,
  password,
  portalUrl,
  schoolName = "VILORA TECHNOLOGY HIGHER SECONDARY SCHOOL",
  userType,
  welcomeMessage,
  userTypeDescription = "portal access",
}: EmailTemplateProps): string {
 return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${schoolName} Portal Access</title>
</head>

<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 15px;">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">

<!-- HEADER -->
<tr>
<td style="background:linear-gradient(135deg,#1e3a8a,#2563eb);padding:35px 30px;text-align:center;">
  <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:700;letter-spacing:0.3px;">
    ${schoolName}
  </h1>
  <p style="color:#dbeafe;margin:8px 0 0;font-size:14px;text-transform:capitalize;">
    ${userType} ${userTypeDescription}
  </p>
</td>
</tr>

<!-- BODY -->
<tr>
<td style="padding:40px 32px;">

<h2 style="margin:0 0 10px;color:#111827;font-size:20px;font-weight:700;">
  ${welcomeMessage}
</h2>

<p style="margin:0 0 20px;color:#6b7280;font-size:14px;line-height:1.6;">
  Your ${userType.toLowerCase()} portal account has been successfully created.
</p>

<p style="margin:0 0 20px;color:#374151;font-size:14px;">
  Dear <strong>${firstName}</strong>,
</p>

<p style="margin:0 0 30px;color:#374151;font-size:14px;line-height:1.7;">
  Welcome to ${schoolName}. Below are your login credentials. 
  Please use them to access the portal.
</p>

<!-- CREDENTIAL BOX -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:25px;margin-bottom:30px;">
<tr>
<td style="font-size:14px;color:#374151;line-height:1.8;">
  <p style="margin:0 0 10px;">
    <strong style="color:#111827;">Username:</strong><br/>
    <span style="font-family:monospace;font-size:15px;color:#1e3a8a;">${username}</span>
  </p>

  <p style="margin:0 0 10px;">
    <strong style="color:#111827;">Temporary Password:</strong><br/>
    <span style="font-family:monospace;font-size:15px;color:#b91c1c;">${password}</span>
  </p>

  <p style="margin:0;">
    <strong style="color:#111827;">Portal URL:</strong><br/>
    <a href="${portalUrl}" style="color:#2563eb;text-decoration:none;">
      ${portalUrl}
    </a>
  </p>
</td>
</tr>
</table>

<!-- SECURITY NOTICE -->
<table width="100%" cellpadding="0" cellspacing="0" style="background:#fff7ed;border-left:4px solid #f59e0b;padding:18px 20px;border-radius:8px;margin-bottom:30px;">
<tr>
<td style="font-size:13px;color:#92400e;line-height:1.6;">
  <strong>Security Notice:</strong><br/>
  Please change your temporary password immediately after logging in. 
  Never share your credentials with anyone.
</td>
</tr>
</table>

<!-- CTA BUTTON -->
<div style="text-align:center;margin-bottom:35px;">
  <a href="${portalUrl}"
     style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#2563eb);
            color:#ffffff;padding:14px 34px;
            border-radius:8px;text-decoration:none;
            font-size:15px;font-weight:600;">
    Access ${userType} Portal
  </a>
</div>

<p style="margin:0;color:#374151;font-size:14px;">
  Regards,<br/>
  <strong>${schoolName} Administration</strong>
</p>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td style="background:#f9fafb;padding:22px;text-align:center;border-top:1px solid #e5e7eb;">
  <p style="margin:0;font-size:12px;color:#9ca3af;">
    © ${new Date().getFullYear()} ${schoolName}. All rights reserved.
  </p>
  <p style="margin:6px 0 0;font-size:11px;color:#d1d5db;">
    This email contains confidential login information.
  </p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;}
