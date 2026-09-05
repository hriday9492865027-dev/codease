# 🚀 Automated Coding Question Hub

> A centralized platform for automatically organizing and tracking Monday and Wednesday coding questions, with student progress tracking, archives, bookmarks, and an automated synchronization system.

---

## 📌 Project Overview

Automated Coding Question Hub is a web platform designed to collect, organize, and display recurring coding question sets in one centralized dashboard.

The platform focuses on providing students with an easy way to access:

- 📅 Monday DSA Questions
- ⚡ Wednesday Question Sets
- 📚 Previous Question Archives
- 🔖 Bookmarked Problems
- 📊 Personal Progress Tracking
- 🔥 Coding Streaks
- 🔍 Search and Filtering
- 🤖 Automated Question Synchronization

The main objective is to eliminate the need for manually updating question lists every week.

The system follows this automation pipeline:

```text
Source Platform
      ↓
Python Automation Bot
      ↓
Detect New Question Set
      ↓
Validate Data
      ↓
Check for Duplicates
      ↓
Neon PostgreSQL Database
      ↓
Next.js Website
      ↓
Students
```

---

# 🎯 Project Objectives

The platform aims to:

- Automatically detect new Monday and Wednesday question sets.
- Store question metadata in a centralized database.
- Prevent duplicate question entries.
- Provide an organized archive of previous questions.
- Allow students to track their coding progress.
- Allow users to bookmark important problems.
- Provide topic and difficulty-based filtering.
- Maintain synchronization logs.
- Provide an admin dashboard for managing the platform.
- Build a scalable foundation for future AI features.

---

# 🏗️ Technology Stack

## Frontend

```text
Next.js
TypeScript
Tailwind CSS
shadcn/ui
Lucide Icons
```

## Backend

```text
Next.js Server Components
Next.js Route Handlers
Server Actions
```

## Database

```text
Neon PostgreSQL
Drizzle ORM
```

## Automation

```text
Python
Playwright
GitHub Actions
```

## Authentication

```text
Better Auth
```

## Deployment

```text
Vercel
GitHub
```

---

# 🧠 System Architecture

```text
                        ┌─────────────────┐
                        │ Source Platform │
                        └────────┬────────┘
                                 │
                                 ▼
                     ┌──────────────────────┐
                     │ Python Automation Bot│
                     │                      │
                     │ • Detect Updates     │
                     │ • Extract Metadata   │
                     │ • Validate Data      │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │ Duplicate Detection  │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │ Neon PostgreSQL      │
                     │                      │
                     │ • Question Sets      │
                     │ • Questions          │
                     │ • Users              │
                     │ • Progress           │
                     │ • Logs               │
                     └──────────┬───────────┘
                                │
                                ▼
                     ┌──────────────────────┐
                     │ Next.js Application  │
                     └──────────┬───────────┘
                                │
                 ┌──────────────┼──────────────┐
                 ▼              ▼              ▼
              Homepage        Dashboard       Admin
                 │              │              │
                 └──────────────┼──────────────┘
                                ▼
                              Users
```

---

# 🌐 Website Pages

## 1. Homepage

Route:

```text
/
```

The homepage provides a quick overview of the platform.

### Features

- Latest Monday Question Set
- Latest Wednesday Question Set
- Total Questions Available
- Recently Added Questions
- Quick Navigation
- Platform Statistics
- Latest Update Time

### Homepage Layout

```text
┌──────────────────────────────────────┐
│              LOGO                    │
│                                      │
│     AUTOMATED CODING QUESTION HUB    │
│                                      │
│  Never miss your weekly challenges.  │
│                                      │
│  ┌──────────────┐ ┌──────────────┐   │
│  │   MONDAY     │ │  WEDNESDAY   │   │
│  │   DSA 🔥     │ │   ⚡          │   │
│  └──────────────┘ └──────────────┘   │
│                                      │
│        Latest Questions              │
│                                      │
│        Platform Statistics           │
└──────────────────────────────────────┘
```

---

# 📅 Monday DSA Section

Route:

```text
/monday
```

This page displays all Monday question sets.

### Features

- Latest Monday Questions
- Previous Monday Question Sets
- Question Difficulty
- Topics and Tags
- Direct Problem Links
- Search Questions
- Filter by Date
- Filter by Difficulty
- Mark Questions as Completed
- Bookmark Questions

### Example

```text
MONDAY DSA
━━━━━━━━━━━━━━━━━━━━

September 7, 2026

01  Arrays Problem
    Easy
    Arrays

    [Solve Problem]

02  Binary Search
    Medium
    Searching

    [Solve Problem]

03  Dynamic Programming
    Hard
    DP

    [Solve Problem]
```

---

# ⚡ Wednesday Questions Section

Route:

```text
/wednesday
```

This page displays all Wednesday question sets.

### Features

- Latest Wednesday Questions
- Previous Question Sets
- Difficulty Labels
- Topic Classification
- Direct Source Links
- Completion Tracking
- Bookmarks
- Search and Filters

### Example

```text
WEDNESDAY QUESTIONS
━━━━━━━━━━━━━━━━━━━━

Latest Question Set

01  Problem One
02  Problem Two
03  Problem Three
04  Problem Four

[View Problem]
```

---

# 📚 Question Archive

Route:

```text
/archive
```

The archive stores all previously synchronized question sets.

### Features

- View Previous Weeks
- Search by Problem Name
- Search by Problem Code
- Filter by Date
- Filter by Category
- Filter by Difficulty
- Filter by Topic
- View Historical Question Sets

### Example

```text
QUESTION ARCHIVE

2026
│
├── September
│   ├── Monday - Week 1
│   ├── Wednesday - Week 1
│   ├── Monday - Week 2
│   └── Wednesday - Week 2
│
├── August
│
└── July
```

---

# 🔍 Global Search

Users should be able to search questions using:

- Question Title
- Problem Code
- Topic
- Difficulty
- Question Set Name

### Example

```text
Search: Binary Search

Results:

✓ Binary Search Basics
✓ Advanced Binary Search
✓ Binary Search Trees
✓ Search in Rotated Array
```

---

# 🎯 Filtering System

Questions can be filtered using:

### Difficulty

```text
Easy
Medium
Hard
```

### Topics

```text
Arrays
Strings
Linked Lists
Stacks
Queues
Trees
Graphs
Dynamic Programming
Greedy
Recursion
Searching
Sorting
```

### Category

```text
Monday
Wednesday
```

### Completion Status

```text
Not Started
Attempting
Completed
Bookmarked
```

---

# 👤 Authentication

Authentication will allow users to maintain their personal progress.

### Features

- Sign Up
- Login
- Logout
- Protected Dashboard
- User Profile

Future authentication options may include:

```text
Email Authentication
Google Sign In
GitHub Sign In
```

---

# 📊 Student Dashboard

Route:

```text
/dashboard
```

Each student gets a personal coding dashboard.

### Dashboard Features

- Total Questions
- Completed Questions
- Questions Attempted
- Bookmarked Questions
- Current Coding Streak
- Weekly Progress
- Recent Activity

### Example

```text
WELCOME BACK 👋

━━━━━━━━━━━━━━━━━━━━

🔥 Current Streak
7 Days

━━━━━━━━━━━━━━━━━━━━

Questions Completed
42 / 100

██████████░░░░░░ 42%

━━━━━━━━━━━━━━━━━━━━

Monday Progress
8 / 15 Completed

Wednesday Progress
6 / 10 Completed
```

---

# ✅ Question Progress Tracking

Users can update their progress for every question.

### Available Status

```text
⬜ Not Started

🟡 Attempting

✅ Completed

🔖 Bookmarked
```

Example:

```text
Problem: Binary Search

Status:

[ Not Started ]
[ Attempting ]
[ Completed ]
[ Bookmark ]
```

---

# 🔖 Bookmark System

Users can bookmark questions for future practice.

Route:

```text
/bookmarks
```

### Features

- Save Questions
- Remove Bookmarks
- View All Saved Questions
- Filter Bookmarks
- Quickly Navigate to Original Problems

---

# 🔥 Coding Streak System

The platform can track consistent activity.

Example:

```text
🔥 Current Streak: 7 Days

Mon  Tue  Wed  Thu  Fri  Sat  Sun

 🔥    🔥    🔥    🔥    🔥    🔥    🔥
```

### Streak Logic

A streak increases when a user:

- Marks a question as completed.
- Completes a coding activity.
- Makes meaningful progress.

---

# 📈 Progress Analytics

The dashboard can display:

- Questions solved per week
- Questions solved per month
- Most practiced topics
- Difficulty distribution
- Completion percentage

Example:

```text
Easy Questions     ████████  20

Medium Questions   ██████    15

Hard Questions     ███       7
```

---

# 🛠️ Admin Dashboard

Route:

```text
/admin
```

The admin dashboard should only be accessible to authorized administrators.

### Admin Features

- View Synchronization Status
- View Last Sync Time
- View Sync Logs
- View Question Sets
- Edit Question Metadata
- Delete Incorrect Entries
- Trigger Manual Synchronization
- View Database Statistics

### Example

```text
ADMIN DASHBOARD

━━━━━━━━━━━━━━━━━━━━

Last Sync

September 6, 2026
08:30 AM

Status

🟢 Successful

━━━━━━━━━━━━━━━━━━━━

Questions Added

12

━━━━━━━━━━━━━━━━━━━━

[ 🔄 Run Manual Sync ]

━━━━━━━━━━━━━━━━━━━━

Recent Logs

✓ Monday Sync Successful

✓ Wednesday Sync Successful

⚠ Previous Sync Failed
```

---

# 🤖 Automated Synchronization System

The automation system is one of the most important components.

It should run automatically and check for newly available question sets.

## Automation Flow

```text
GitHub Actions Starts
        │
        ▼
Run Python Script
        │
        ▼
Open Data Provider
        │
        ▼
Check Latest Question Set
        │
        ▼
Is New Data Available?
       │
   ┌───┴────┐
   │        │
  NO       YES
   │        │
 STOP       ▼
        Extract Metadata
              │
              ▼
        Validate Data
              │
              ▼
       Check Duplicate
              │
         ┌────┴────┐
         │         │
       Exists     New
         │         │
        Skip      Insert
                    │
                    ▼
              Save to Neon
                    │
                    ▼
              Create Sync Log
```

---

# 🐍 Python Automation Bot

The Python automation service is responsible for backend synchronization.

### Responsibilities

```text
✓ Check for new question sets
✓ Extract question metadata
✓ Validate extracted data
✓ Detect duplicates
✓ Insert new records
✓ Generate sync logs
✓ Handle errors
```

### Suggested Structure

```text
automation/

├── main.py
├── sync.py
├── provider.py
├── database.py
├── models.py
├── config.py
├── logger.py
└── requirements.txt
```

---

# 🔄 Duplicate Prevention

The system should never add the same question twice.

Every question set should contain a unique identifier.

Example:

```text
external_id = monday-2026-09-07
```

Before insertion:

```text
Check Database
      │
      ▼
Does external_id exist?
      │
  ┌───┴────┐
  │        │
 YES       NO
  │        │
Skip     Insert
```

---

# 🗄️ Database Architecture

## Question Sets

```text
question_sets
```

Stores information about each weekly question collection.

Fields:

```text
id
title
category
event_date
source_url
external_id
created_at
updated_at
```

---

## Questions

```text
questions
```

Stores individual questions.

Fields:

```text
id
question_set_id
problem_code
title
difficulty
tags
problem_url
position
created_at
```

---

## Users

```text
users
```

Stores authenticated users.

Fields:

```text
id
name
email
image
created_at
```

---

## User Progress

```text
user_progress
```

Tracks each user's question progress.

Fields:

```text
id
user_id
question_id
status
completed_at
created_at
updated_at
```

Status:

```text
not_started
attempting
completed
```

---

## Bookmarks

```text
bookmarks
```

Fields:

```text
id
user_id
question_id
created_at
```

---

## Sync Logs

```text
sync_logs
```

Fields:

```text
id
sync_type
status
message
questions_found
questions_added
started_at
completed_at
```

---

# 🔐 Security

The application must follow proper security practices.

## Never expose:

```text
DATABASE_URL
DATABASE_PASSWORD
SERVICE_ROLE_KEYS
SESSION_COOKIES
AUTOMATION CREDENTIALS
```

## Environment Variables

Example:

```env
DATABASE_URL=

BETTER_AUTH_SECRET=

NEXT_PUBLIC_APP_URL=
```

GitHub Actions secrets:

```text
DATABASE_URL
AUTOMATION_SECRET
```

---

# 📂 Recommended Project Structure

```text
coding-question-hub/

│
├── app/
│   │
│   ├── page.tsx
│   │
│   ├── monday/
│   │   └── page.tsx
│   │
│   ├── wednesday/
│   │   └── page.tsx
│   │
│   ├── archive/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── bookmarks/
│   │   └── page.tsx
│   │
│   ├── profile/
│   │   └── page.tsx
│   │
│   └── admin/
│       └── page.tsx
│
├── components/
│   │
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── question-card.tsx
│   ├── question-set-card.tsx
│   ├── search-bar.tsx
│   ├── filter-panel.tsx
│   ├── stats-card.tsx
│   └── progress-card.tsx
│
├── db/
│   │
│   ├── index.ts
│   └── schema.ts
│
├── lib/
│   │
│   ├── auth.ts
│   ├── utils.ts
│   └── queries.ts
│
├── automation/
│   │
│   ├── main.py
│   ├── sync.py
│   ├── provider.py
│   ├── database.py
│   └── requirements.txt
│
├── .github/
│   │
│   └── workflows/
│       │
│       └── sync.yml
│
├── public/
│
├── drizzle.config.ts
│
├── package.json
│
└── README.md
```

---

# ⏰ Automation Schedule

The synchronization worker can run on scheduled intervals.

Recommended strategy:

```text
Monday
├── Morning Check
├── Afternoon Check
└── Evening Check

Wednesday
├── Morning Check
├── Afternoon Check
└── Evening Check
```

Alternatively:

```text
Daily Background Check
```

Every sync should:

1. Detect available data.
2. Compare with existing database records.
3. Insert only new data.
4. Generate logs.
5. Handle failures safely.

---

# 🔗 Question Source Strategy

The platform should maintain a modular provider architecture.

```text
Question Provider
       │
       ├── Provider A
       │
       ├── Provider B
       │
       └── Future Provider
```

This ensures the rest of the application does not depend on one specific implementation.

The provider should return standardized data:

```text
Question Set

{
    title,
    category,
    eventDate,
    externalId,
    sourceUrl,
    questions: []
}
```

---

# 🎨 UI/UX Requirements

The website should have a modern developer-focused design.

### Design Principles

```text
✓ Clean
✓ Minimal
✓ Fast
✓ Responsive
✓ Dark Mode Support
✓ Mobile Friendly
✓ Easy Navigation
```

### Recommended Navigation

```text
Logo

Home

Monday

Wednesday

Archive

Dashboard

Bookmarks

Profile
```

Admin links should only appear for authorized administrators.

---

# 📱 Responsive Design

The website must support:

```text
Desktop
Tablet
Mobile
```

Mobile navigation should use:

```text
☰ Menu
```

Question cards should automatically adapt to smaller screens.

---

# ⚡ Performance Requirements

The application should prioritize:

- Server-side rendering where appropriate.
- Efficient database queries.
- Pagination for large archives.
- Cached queries where useful.
- Optimized images.
- Minimal client-side JavaScript.

---

# 🚨 Error Handling

The system should gracefully handle:

```text
Database Connection Failure

Automation Failure

Invalid Question Data

Duplicate Records

Source Unavailability

Authentication Errors
```

Every automation failure should generate a sync log.

Example:

```text
SYNC FAILED

Date: September 7, 2026

Reason:
Unable to retrieve latest metadata.

Action:
Retry on next scheduled run.
```

---

# 🧪 Future Feature: Notifications

Users can optionally receive notifications.

Examples:

```text
🔔 New Monday Questions Available!

5 new questions were added.
```

```text
⚡ Wednesday Question Set Updated!

Start solving now.
```

Possible channels:

- In-app notifications
- Email
- Browser notifications

---

# 🤖 Future Feature: AI Assistant

Future versions can integrate an AI coding assistant.

Features:

```text
Explain Problem

Give Hint

Explain Algorithm

Suggest Approach

Analyze Complexity

Generate Similar Practice Questions
```

Example:

```text
Question
    ↓
AI Assistant
    ↓
Hint Level 1
    ↓
Hint Level 2
    ↓
Solution Explanation
```

The AI should provide progressive hints rather than immediately revealing solutions.

---

# 🏆 Future Feature: Leaderboard

A leaderboard can encourage consistent practice.

Example:

```text
RANK     USER           SOLVED

🥇       Alex           120

🥈       Rahul          105

🥉       Priya          98
```

Possible ranking metrics:

- Questions Completed
- Weekly Progress
- Coding Streak
- Difficulty Score

---

# 📊 Future Feature: Advanced Analytics

Future analytics can include:

```text
Most Solved Topics

Weakest Topics

Difficulty Distribution

Weekly Performance

Monthly Performance

Average Completion Rate
```

Example:

```text
Your Strongest Topic

Arrays
████████████ 85%

Needs Improvement

Dynamic Programming
████░░░░░░░░ 30%
```

---

# 🗺️ Development Roadmap

## Phase 1 — MVP

```text
✓ Setup Next.js
✓ Setup Neon Database
✓ Setup Drizzle ORM
✓ Create Homepage
✓ Create Monday Page
✓ Create Wednesday Page
✓ Create Archive
✓ Create Question Database Schema
✓ Build Python Automation Framework
✓ Add GitHub Actions
✓ Implement Duplicate Detection
✓ Deploy to Vercel
```

---

## Phase 2 — User System

```text
✓ Authentication
✓ User Profiles
✓ Progress Tracking
✓ Bookmarks
✓ Dashboard
✓ Coding Streaks
```

---

## Phase 3 — Advanced Features

```text
✓ Search System
✓ Advanced Filters
✓ Analytics
✓ Notifications
✓ Admin Dashboard
✓ Manual Sync Controls
```

---

## Phase 4 — AI Features

```text
✓ AI Hints
✓ AI Explanations
✓ Complexity Analysis
✓ Personalized Recommendations
✓ Similar Question Suggestions
```

---

# 💰 Free Tier Stack

| Service | Technology | Starting Cost |
|---|---|---|
| Frontend | Next.js | Free |
| Hosting | Vercel | Free Tier |
| Database | Neon PostgreSQL | Free Tier |
| ORM | Drizzle | Free |
| Styling | Tailwind CSS | Free |
| Components | shadcn/ui | Free |
| Automation | Python | Free |
| Browser Automation | Playwright | Free |
| Scheduling | GitHub Actions | Free Tier |
| Repository | GitHub | Free |
| Icons | Lucide | Free |
| Authentication | Better Auth | Open Source |

---

# 🧩 Core System Principle

The entire platform is based on one simple principle:

```text
DETECT
   ↓
VALIDATE
   ↓
CHECK DUPLICATES
   ↓
STORE
   ↓
DISPLAY
   ↓
TRACK USER PROGRESS
```

---

# 🚀 Final Vision

The goal is to create more than just a question listing website.

The platform should evolve into a complete **coding practice ecosystem**.

```text
                AUTOMATED CODING HUB

                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼

    QUESTION         STUDENT          AUTOMATION
    LIBRARY          PROGRESS          ENGINE

        │                │                │

        └────────────────┼────────────────┘
                         │
                         ▼

                  AI FEATURES

                         │
                         ▼

                 CODING ECOSYSTEM
```

---

# ⚠️ Important Compliance Note

This project should respect the terms, access controls, and content policies of any third-party platform used as a source.

The recommended approach is to:

- Store and organize metadata where permitted.
- Link users to the original problem pages.
- Avoid exposing credentials or session information.
- Avoid redistributing full copyrighted problem statements without authorization.
- Use official APIs or explicit permission where required.

---

# 👨‍💻 Project Status

```text
🚧 Planning & Architecture Phase
```

### Next Steps

1. Initialize Next.js project.
2. Connect Neon PostgreSQL.
3. Configure Drizzle ORM.
4. Design database schema.
5. Build core website pages.
6. Implement authentication.
7. Build Python automation framework.
8. Configure scheduled synchronization.
9. Add admin dashboard.
10. Deploy to Vercel.

---

## 🌟 Vision Statement

> **A centralized, automated platform that helps students discover, organize, track, and consistently solve coding questions without manually searching for every new weekly challenge.**