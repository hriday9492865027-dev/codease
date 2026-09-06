"""
Automated Synchronization Engine for CodeChef Question Hub powered by Scrapy
Supports Scrapy-driven real-time crawling, scheduled workflows, and complete archive generation.
"""

import os
import sys
import argparse
from datetime import datetime

# Safe UTF-8 console output for Windows
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

def run_scrapy_sync(category: str = "all", contest: int = 254, start_contest: int = 1, end_contest: int = 254, start_week: int = 1, end_week: int = 18):
    # Ensure crawler directory is on Python path
    current_dir = os.path.dirname(os.path.abspath(__file__))
    os.environ.setdefault("SCRAPY_SETTINGS_MODULE", "codechef_crawler.settings")
    sys.path.insert(0, current_dir)

    settings = get_project_settings()
    process = CrawlerProcess(settings)

    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting Scrapy CodeChef Synchronization Pipeline...")

    from codechef_crawler.spiders.starters_spider import StartersSpider
    from codechef_crawler.spiders.monday_spider import MondaySpider

    if category in ("all", "wednesday"):
        print(f"[STARTERS] Queueing StartersSpider (Contests {start_contest} to {end_contest})...")
        process.crawl(StartersSpider, start=start_contest, end=end_contest)

    if category in ("all", "monday"):
        print(f"[MONDAY] Queueing MondaySpider (Weeks {start_week} to {end_week})...")
        process.crawl(MondaySpider, start_week=start_week, end_week=end_week)

    print("[START] Running Scrapy asynchronous engine...")
    process.start()
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] [DONE] Scrapy Sync completed successfully!")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="CodeChef Question Hub Scrapy Sync Bot")
    parser.add_argument("--category", choices=["all", "monday", "wednesday"], default="all", help="Contest category to sync")
    parser.add_argument("--contest", type=int, default=254, help="Specific Starters contest number")
    parser.add_argument("--start-contest", type=int, default=1, help="Starting Starters contest number")
    parser.add_argument("--end-contest", type=int, default=254, help="Ending Starters contest number")
    parser.add_argument("--start-week", type=int, default=1, help="Starting Monday DSA week")
    parser.add_argument("--end-week", type=int, default=18, help="Ending Monday DSA week")
    args = parser.parse_args()

    run_scrapy_sync(
        category=args.category,
        contest=args.contest,
        start_contest=args.start_contest,
        end_contest=args.end_contest,
        start_week=args.start_week,
        end_week=args.end_week
    )
