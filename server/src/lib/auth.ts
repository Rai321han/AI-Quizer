import { betterAuth } from "better-auth";
import pool from "../db";
import Mailjet from "node-mailjet";

const mailjet = new Mailjet({
  apiKey: process.env.MJ_APIKEY_PUBLIC || "",
  apiSecret: process.env.MJ_APIKEY_PRIVATE || "",
});

export const auth = betterAuth({
  database: pool,
  trustedOrigins: ["http://localhost:3000", "https://ai-quizer.vercel.app"],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },

  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: {
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
      secure: true,
    },
  },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET,
    },
  },

  emailVerification: {
    sendOnSignIn: true,
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        url: url,
        name: user.name || "",
      });
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
});

async function sendEmail({
  to,
  subject,
  url,
  name,
}: {
  to: string;
  subject: string;
  url: string;
  name: string;
}) {
  const Messages = [
    {
      From: {
        Email: "uddinraihan797@gmail.com",
        Name: "AI-Quizer",
      },
      To: [
        {
          Email: `${to}`,
          Name: name,
        },
      ],
      Subject: subject,
      TextPart: "Greetings from AI-Quizer!",
      HTMLPart: `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      /* Basic Reset */
      body,html{margin:0;padding:0;height:100%}
      body{font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; background:#f6f7fb; color:#111; -webkit-font-smoothing:antialiased}
      .container{max-width:640px;margin:32px auto;padding:24px;background:#ffffff;border-radius:14px;box-shadow:0 6px 30px rgba(12,20,40,0.08);overflow:hidden}
      .brand{display:flex;gap:12px;align-items:center;margin-bottom:18px}
      .logo{width:48px;height:48px;border-radius:10px;object-fit:cover}
      h1{font-size:20px;margin:0 0 8px 0}
      p{margin:0 0 16px 0;line-height:1.5;color:#334155}
      .button-wrap{margin:18px 0;text-align:center}
      .cta{
        display:inline-block;
        text-decoration:none;
        padding:12px 22px;
        border-radius:10px;
        font-weight:600;
        background: white;
        color: #ffffff;
        box-shadow:0 6px 18px rgba(77,99,242,0.24);
        border: 1px solid blue;
      }
      .small{font-size:13px;color:#667085}
      .muted{color:#94a3b8}
      .footer{font-size:13px;color:#9aa4b2;text-align:center;margin-top:22px}
      .card{background:#f8fafc;padding:14px;border-radius:10px;margin-top:8px;border:1px solid #eef2ff}
      a.fallback{word-break:break-all;color:#4d63f2}
      /* Mobile adjustments */
      @media (max-width:460px){
        .container{margin:16px;padding:16px;border-radius:12px}
        h1{font-size:18px}
      }
    </style>
  </head>

  <body>
    <div class="container" role="article" aria-roledescription="email" aria-label="Email verification">
      <div class="brand">  
        <div>
          <div style="font-weight:700">AI Quizer</div>
        </div>
      </div>

      <h1>Hello ${name} 👋</h1>

      <p>
        Thanks for creating an account in <strong>AI Quizer</strong>.<br/>Tap the button below to verify your email address.
      </p>

      <div class="button-wrap">
        <a href=${url} class="cta" target="_blank" rel="noopener noreferrer">
          Verify my email
        </a>
      </div>

      <div class="card">
        <div class="small"><strong>Why this?</strong></div>
        <div class="small muted" style="margin-top:6px">
    If the button doesn't work, copy and paste
          the URL below into your browser:
          <div style="margin-top:8px">
            <a class="fallback" href=${url} target="_blank" rel="noopener noreferrer">${url}</a>
          </div>
        </div>
      </div>

      <p class="small" style="margin-top:14px">
        If you didn't sign up for a AI Quizer account, you can safely ignore this email and no changes will
        be made.
      </p>

      <div class="footer">
        <div>Need help? Contact <a href="mailto:uddinraihan797@gmail.com">uddinraihan797@gmail.com</a></div>
        <div style="margin-top:8px;color:#cbd5e1;font-size:12px">© 2025 AI Quizer. All rights reserved.</div>
      </div>
    </div>
  </body>
</html>`,
    },
  ];

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages,
  });

  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode, "email sending failed for verification");
    });
}
