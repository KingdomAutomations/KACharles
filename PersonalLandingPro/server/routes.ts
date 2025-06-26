import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertMeetingSchema } from "@shared/schema";
import { sendMeetingConfirmation } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  const apiRouter = app.route("/api");
  
  // Meeting scheduler endpoint
  app.post("/api/schedule", async (req, res) => {
    try {
      // Validate request body
      const meetingData = insertMeetingSchema.parse(req.body);
      
      // Save to storage
      const meeting = await storage.createMeeting(meetingData);
      
      // Send email notifications
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


  const httpServer = createServer(app);

  return httpServer;
}
