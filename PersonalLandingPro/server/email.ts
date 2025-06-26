import nodemailer from "nodemailer";
import { Meeting } from "@shared/schema";
import { format } from "date-fns";

// Create a transporter for sending emails
const emailUser = process.env.EMAIL_USER || "";
const emailPass = process.env.EMAIL_PASS || "";
const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";

let transporter: nodemailer.Transporter;

// Configure the email transporter based on environment
if (process.env.NODE_ENV === "production" && emailUser && emailPass) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
} else {
  // For development/testing, use a test account
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "ethereal.user@ethereal.email",
      pass: "ethereal_pass",
    },
  });
}



export async function sendMeetingConfirmation(meeting: Meeting) {
  // Email to admin
  const adminMailOptions = {
    from: emailUser || "noreply@example.com",
    to: adminEmail,
    subject: `New Meeting Scheduled: ${meeting.meetingType}`,
    html: `
      <h2>New Meeting Scheduled</h2>
      <p><strong>Name:</strong> ${meeting.name}</p>
      <p><strong>Email:</strong> ${meeting.email}</p>
      <p><strong>Meeting Type:</strong> ${meeting.meetingType}</p>
      <p><strong>Date:</strong> ${format(new Date(meeting.date), "MMMM d, yyyy")}</p>
      <p><strong>Time:</strong> ${meeting.time}</p>
      ${meeting.message ? `<p><strong>Message:</strong> ${meeting.message}</p>` : ""}
    `,
  };

  // Email to user
  const userMailOptions = {
    from: emailUser || "noreply@example.com",
    to: meeting.email,
    subject: `Meeting Confirmation: ${meeting.meetingType}`,
    html: `
      <h2>Your Meeting is Confirmed</h2>
      <p>Thank you for scheduling a meeting with me. Here are the details:</p>
      <p><strong>Meeting Type:</strong> ${meeting.meetingType}</p>
      <p><strong>Date:</strong> ${format(new Date(meeting.date), "MMMM d, yyyy")}</p>
      <p><strong>Time:</strong> ${meeting.time}</p>
      
      <p>I look forward to our conversation!</p>
      <p>Best regards,<br>Charles Peralta</p>
    `,
  };

  try {
    const adminInfo = await transporter.sendMail(adminMailOptions);
    console.log("Admin notification email sent:", adminInfo.messageId);
    
    const userInfo = await transporter.sendMail(userMailOptions);
    console.log("User confirmation email sent:", userInfo.messageId);
    
    return true;
  } catch (error) {
    console.error("Error sending meeting emails:", error);
    throw new Error("Failed to send email notifications");
  }
}
