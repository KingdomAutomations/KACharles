// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  meetings;
  userIdCounter;
  meetingIdCounter;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.meetings = /* @__PURE__ */ new Map();
    this.userIdCounter = 1;
    this.meetingIdCounter = 1;
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userIdCounter++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Meeting operations
  async createMeeting(insertMeeting) {
    const id = this.meetingIdCounter++;
    const createdAt = /* @__PURE__ */ new Date();
    const meeting = {
      id,
      name: insertMeeting.name,
      email: insertMeeting.email,
      meetingType: insertMeeting.meetingType,
      date: insertMeeting.date,
      time: insertMeeting.time,
      message: insertMeeting.message || null,
      createdAt
    };
    this.meetings.set(id, meeting);
    return meeting;
  }
  async getMeetingById(id) {
    return this.meetings.get(id);
  }
  async getAllMeetings() {
    return Array.from(this.meetings.values());
  }
};
var storage = new MemStorage();

// server/routes.ts
import { z } from "zod";

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var meetings = pgTable("meetings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  meetingType: text("meeting_type").notNull(),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertMeetingSchema = createInsertSchema(meetings).pick({
  name: true,
  email: true,
  meetingType: true,
  date: true,
  time: true,
  message: true
});

// server/email.ts
import nodemailer from "nodemailer";
import { format } from "date-fns";
var emailUser = process.env.EMAIL_USER || "";
var emailPass = process.env.EMAIL_PASS || "";
var adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
var transporter;
if (process.env.NODE_ENV === "production" && emailUser && emailPass) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
} else {
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "ethereal.user@ethereal.email",
      pass: "ethereal_pass"
    }
  });
}
async function sendMeetingConfirmation(meeting) {
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
    `
  };
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
    `
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

// server/routes.ts
async function registerRoutes(app2) {
  const apiRouter = app2.route("/api");
  app2.post("/api/schedule", async (req, res) => {
    try {
      const meetingData = insertMeetingSchema.parse(req.body);
      const meeting = await storage.createMeeting(meetingData);
      await sendMeetingConfirmation(meeting);
      res.status(201).json({
        message: "Meeting scheduled successfully",
        meetingId: meeting.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid meeting data",
          errors: error.errors
        });
      } else {
        console.error("Error scheduling meeting:", error);
        res.status(500).json({ message: "Failed to schedule meeting" });
      }
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
