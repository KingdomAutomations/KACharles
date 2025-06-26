# Charles Peralta Personal Website

## Overview

This is a personal website for Charles Peralta, Founder of Kingdom Automations and VP at WHESPC. The application is built as a full-stack web application using React for the frontend and Express/Node.js for the backend, with PostgreSQL as the database. The site serves as a personal portfolio and business landing page with meeting scheduling functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Tailwind CSS with custom theming
- **Component Library**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Email Service**: Nodemailer for meeting confirmations
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **Build Tool**: esbuild for server-side bundling

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Meetings Table**: Meeting scheduling (id, name, email, meetingType, date, time, message, createdAt)

## Key Components

### Frontend Components
1. **Header**: Navigation with smooth scroll to sections
2. **ProfileSection**: Personal information and social media links
3. **ScheduleSection**: Calendly integration for meeting scheduling
4. **LinkTreeSection**: Quick links to business services
5. **Footer**: Social media links and copyright information

### Backend Services
1. **Meeting Scheduler**: POST /api/schedule endpoint for meeting creation
2. **Email Service**: Automated email notifications for new meetings
3. **Storage Layer**: Abstracted storage interface with in-memory implementation (ready for database integration)

### Third-Party Integrations
- **Calendly**: Embedded widget for meeting scheduling
- **Neon Database**: PostgreSQL database hosting
- **Email Service**: Gmail SMTP for production emails

## Data Flow

1. **Meeting Scheduling**:
   - User clicks "Schedule Time With Me" button
   - Calendly popup widget opens
   - Meeting details are captured via Calendly
   - Optional: Custom form submission to /api/schedule endpoint
   - Email notifications sent to admin and user

2. **Static Content**:
   - Profile information and links are statically rendered
   - Social media links direct to external platforms
   - Quick links redirect to business services

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **@radix-ui/***: UI component primitives
- **@tanstack/react-query**: Server state management
- **connect-pg-simple**: PostgreSQL session store
- **drizzle-orm**: Database ORM
- **nodemailer**: Email service
- **react**: Frontend framework
- **tailwindcss**: CSS framework
- **wouter**: Lightweight routing

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **tsx**: TypeScript execution
- **esbuild**: Server bundling

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server to `dist/index.js`
3. **File Reorganization**: Custom build script moves files for static deployment
4. **Environment Variables**: DATABASE_URL, EMAIL_USER, EMAIL_PASS, ADMIN_EMAIL

### Deployment Configuration
- **Target**: Static deployment with API routes
- **Port**: 5000 (internal), 80 (external)
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`

### Database Setup
- **Development**: Uses DATABASE_URL from environment
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Neon serverless PostgreSQL

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 26, 2025. Initial setup