import os
import json
from datetime import datetime, timezone
from itemadapter import ItemAdapter

STARTERS_OUTPUT_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "src", "lib", "starters-data.json")
)
SCRAPED_DATA_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "src", "lib", "scraped_data.json")
)

class CodeChefDataSyncPipeline:
    @classmethod
    def from_crawler(cls, crawler):
        pipeline = cls()
        pipeline.crawler = crawler
        return pipeline

    def open_spider(self, spider=None):
        self.starters_data = {}
        self.scraped_items = []
        
        # Load existing Starters data if available
        if os.path.exists(STARTERS_OUTPUT_PATH):
            try:
                with open(STARTERS_OUTPUT_PATH, "r", encoding="utf-8") as f:
                    self.starters_data = json.load(f)
            except Exception:
                self.starters_data = {}

    def process_item(self, item, spider=None):
        adapter = ItemAdapter(item)
        
        if adapter.get("category") == "wednesday":
            c_num = str(adapter.get("contest_num"))
            problems = adapter.get("problems", [])
            
            # Sort problems by submissions descending to ensure scorable Que 1..N order
            cleaned_problems = []
            for p in sorted(problems, key=lambda x: int(x.get("subs", 0) or 0), reverse=True):
                cleaned_problems.append({
                    "code": p.get("code"),
                    "title": p.get("title"),
                    "subs": int(p.get("subs", 0) or 0),
                    "acc": float(p.get("acc", 50.0) or 50.0)
                })
            
            if cleaned_problems:
                self.starters_data[c_num] = cleaned_problems
                self.scraped_items.append({
                    "contest": f"START{c_num}",
                    "problems_count": len(cleaned_problems)
                })

        return item

    def close_spider(self, spider=None):
        # Save updated starters-data.json
        if self.starters_data:
            os.makedirs(os.path.dirname(STARTERS_OUTPUT_PATH), exist_ok=True)
            with open(STARTERS_OUTPUT_PATH, "w", encoding="utf-8") as f:
                json.dump(self.starters_data, f, indent=None)
            if spider:
                spider.logger.info(f"[PIPELINE] Synced {len(self.starters_data)} Starters contests to {STARTERS_OUTPUT_PATH}")

        # Save summary sync file
        sync_meta = {
            "lastSynced": datetime.now(timezone.utc).isoformat(),
            "spider": spider.name if spider else "codechef_spider",
            "totalContests": len(self.starters_data),
            "syncedCount": len(self.scraped_items)
        }
        try:
            with open(SCRAPED_DATA_PATH, "w", encoding="utf-8") as f:
                json.dump(sync_meta, f, indent=2)
        except Exception:
            pass
