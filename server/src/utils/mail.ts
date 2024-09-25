import nodemailer from 'nodemailer';

interface MailOptions {
  to: string;
  link: string;
}

// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const mail = {
  async sendVerificationEmail(options: MailOptions) {
    await transport.sendMail({
      to: options.to,
      from: process.env.VERIFICATION_EMAIL,
      subject: 'Auth Verification',
      html: `
    <div>
           <p>Please click on <a href="${options.link}">this link </a> to verify your email address.</p>
    </div>
    `,
    });
  },
};

export default mail;
