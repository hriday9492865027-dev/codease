"""
Automated Synchronization Engine for CodeChef Question Hub
Supports individual sync, scheduled runs, and complete historical archiving
"""

import sys
import os
import json
import argparse
from datetime import datetime, timezone
from codechef_scraper import CodeChefScraper

DATA_OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "src", "lib", "scraped_data.json")

def run_sync(category: str = "all", contest_num: int = 176, all_history: bool = False, start_contest: int = 165, end_contest: int = 176):
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting CodeChef Question Sync...")
    scraper = CodeChefScraper()
    scraper.login()

    scraped_sets = []

    if all_history:
        print(f"[ARCHIVE] Fetching ALL historical Starters contests (from {start_contest} to {end_contest})...")
        starters_sets = scraper.fetch_all_historical_starters(start_contest=start_contest, end_contest=end_contest)
        scraped_sets.extend(starters_sets)

        print("[ARCHIVE] Fetching ALL historical Monday DSA Challenge weeks (Weeks 1 to 10)...")
        monday_sets = scraper.fetch_all_historical_monday()
        scraped_sets.extend(monday_sets)
    else:
        if category in ("all", "wednesday"):
            print(f"[SYNC] Fetching Wednesday Starters {contest_num}...")
            starters_set = scraper.fetch_starters_contest(contest_num)
            scraped_sets.append(starters_set)

        if category in ("all", "monday"):
            print("[SYNC] Fetching all Monday DSA Challenge sets...")
            monday_sets = scraper.fetch_all_historical_monday()
            scraped_sets.extend(monday_sets)

    output_data = {
        "lastSynced": datetime.now(timezone.utc).isoformat(),
        "category": "all_history" if all_history else category,
        "sets": scraped_sets,
        "totalQuestions": sum(len(s["questions"]) for s in scraped_sets),
    }

    try:
        with open(DATA_OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump(output_data, f, indent=2)
        print(f"[SUCCESS] Scraped data saved to {DATA_OUTPUT_PATH}")
    except Exception as e:
        print(f"[WARN] Could not write to local file: {e}")

    print(f"[DONE] Sync completed: {len(scraped_sets)} sets with {output_data['totalQuestions']} total questions recorded.")
    return output_data

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CodeChef Weekly Question Hub Sync Bot")
    parser.add_argument("--category", choices=["all", "monday", "wednesday"], default="all", help="Contest category to sync")
    parser.add_argument("--contest", type=int, default=176, help="Specific Starters contest number")
    parser.add_argument("--all-history", action="store_true", help="Fetch complete historical archive of previous Starters & Monday DSA")
    parser.add_argument("--start-contest", type=int, default=165, help="Starting historical contest number")
    parser.add_argument("--end-contest", type=int, default=176, help="Ending contest number")
    args = parser.parse_args()

    run_sync(
        category=args.category, 
        contest_num=args.contest, 
        all_history=args.all_history, 
        start_contest=args.start_contest, 
        end_contest=args.end_contest
    )
