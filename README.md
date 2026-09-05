# 🚀 CodeChef Weekly Question Hub (Monday DSA & Wednesday Starters)

An automated platform for collecting, organizing, and tracking **CodeChef's Monday DSA Challenges** and **Wednesday Starters Contests** across all 4 divisions (**Div 1, Div 2, Div 3, Div 4**), equipped with a student progress tracker, streak counter, and Python automation scraper.

---

## 🌟 Key Features

1. **⚡ Wednesday Starters Multi-Division Arena**:
   - Division 1 (Rating 2000+)
   - Division 2 (Rating 1600 - 1999)
   - Division 3 (Rating 1400 - 1599)
   - Division 4 (Rating 0 - 1399)
   - Direct CodeChef problem URLs, points, and verified test solve links.

2. **📅 Monday DSA Practice Hub**:
   - Weekly curated topics: Trees, Dynamic Programming, Graphs, Binary Search, Arrays.
   - Filter by difficulty (Easy, Medium, Hard) and topic tags.
   - Direct editorial and discussion links.

3. **📊 Student Performance & Streak Dashboard**:
   - 5-day active coding streak tracker with weekly calendar view.
   - Live completion rate meters (Total, Monday, Wednesday).
   - Difficulty breakdown progress bars (Easy / Medium / Hard).
   - Problem status toggles: `Not Started`, `Attempting`, `Completed`.

4. **🔖 Bookmarked Problem Library**:
   - Save problems for interview prep and revisions.

5. **🤖 Python Automation & Sync Engine**:
   - Scraper for CodeChef contest APIs (`START<num>A`, `START<num>B`, `START<num>C`, `START<num>D`).
   - Secure account login handling.
   - Duplicate check and automated data synchronization.
   - GitHub Actions workflow for weekly scheduled execution.

---

## 🚀 Quick Start Guide

### 1. Run the Web Application

```bash
# Install dependencies (already installed)
npm install

# Start local Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 2. Run Python Automation Sync Bot

```bash
# Optional: install Python dependencies
pip install -r automation/requirements.txt

# Run sync for all contests (Monday DSA + Wednesday Starters)
python automation/sync.py --category all

# Or sync specific Starters contest (e.g. Starters 176)
python automation/sync.py --category wednesday --contest 176
```

---

## 📁 Project Structure

```text
Codease/
├── automation/
│   ├── .env                    # Secure CodeChef credentials
│   ├── codechef_scraper.py     # CodeChef API & Div 1-4 parser
│   ├── sync.py                 # Sync CLI orchestrator
│   └── requirements.txt        # Python libraries
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # App shell (Dark theme, Nav, Footer)
│   │   ├── page.tsx            # Home page & live highlights
│   │   ├── monday/page.tsx     # Monday DSA Hub
│   │   ├── wednesday/page.tsx  # Wednesday Starters (Div 1-4)
│   │   ├── archive/page.tsx    # Problem Archive
│   │   ├── dashboard/page.tsx  # Progress & Streak Dashboard
│   │   ├── bookmarks/page.tsx  # Saved Problems
│   │   ├── admin/page.tsx      # Sync Hub & Account Status
│   │   └── api/                # Sync & Question endpoints
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── QuestionCard.tsx
│   │   └── ContestCard.tsx
│   └── lib/
│       ├── types.ts
│       ├── utils.ts
│       ├── data-store.ts
│       └── scraped_data.json   # Live scraped CodeChef problems
│
├── .github/workflows/
│   └── sync.yml                # Scheduled weekly automation
├── tailwind.config.js
├── tsconfig.json
└── package.json
```
