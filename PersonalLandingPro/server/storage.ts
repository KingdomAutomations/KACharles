import { users, type User, type InsertUser, meetings, type Meeting, type InsertMeeting } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Meeting related operations
  createMeeting(meeting: InsertMeeting): Promise<Meeting>;
  getMeetingById(id: number): Promise<Meeting | undefined>;
  getAllMeetings(): Promise<Meeting[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private meetings: Map<number, Meeting>;
  private userIdCounter: number;
  private meetingIdCounter: number;

  constructor() {
    this.users = new Map();
    this.meetings = new Map();
    this.userIdCounter = 1;
    this.meetingIdCounter = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Meeting operations
  async createMeeting(insertMeeting: InsertMeeting): Promise<Meeting> {
    const id = this.meetingIdCounter++;
    const createdAt = new Date();
    const meeting: Meeting = { ...insertMeeting, id, createdAt };
    this.meetings.set(id, meeting);
    return meeting;
  }
  
  async getMeetingById(id: number): Promise<Meeting | undefined> {
    return this.meetings.get(id);
  }
  
  async getAllMeetings(): Promise<Meeting[]> {
    return Array.from(this.meetings.values());
  }
}

export const storage = new MemStorage();
