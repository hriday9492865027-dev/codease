import re
import json
import scrapy
from datetime import datetime, timezone

try:
    from codechef_crawler.items import CodeChefContestItem
except (ImportError, ModuleNotFoundError):
    from ..items import CodeChefContestItem

class MondaySpider(scrapy.Spider):
    name = "monday"
    allowed_domains = ["codechef.com", "www.codechef.com"]

    def __init__(self, week=None, start_week=None, end_week=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        w_arg = week or getattr(self, "week", None)
        s_arg = start_week or getattr(self, "start_week", None)
        e_arg = end_week or getattr(self, "end_week", None)

        if w_arg is not None:
            self.weeks = [int(w_arg)]
        else:
            s_num = int(s_arg) if s_arg is not None else 1
            e_num = int(e_arg) if e_arg is not None else 18
            self.weeks = list(range(e_num, s_num - 1, -1))

        self.start_urls = [
            f"https://www.codechef.com/api/contests/DSAMONDAY{str(w).zfill(3)}" for w in self.weeks
        ]

    def parse(self, response):
        match = re.search(r"DSAMONDAY(\d+)", response.url)
        if not match:
            return
        w = int(match.group(1))

        try:
            data = json.loads(response.text)
            if data.get("status") == "success" and data.get("problems"):
                problems = []
                for code, prob in data["problems"].items():
                    problems.append({
                        "code": prob.get("code") or code,
                        "title": prob.get("name") or code,
                        "subs": int(prob.get("successful_submissions") or 0),
                        "acc": float(prob.get("accuracy") or 50.0),
                        "is_scorable": prob.get("category_name") == "main"
                    })
                
                # Sort scorable problems by submissions descending
                problems.sort(key=lambda x: x["subs"], reverse=True)

                item = CodeChefContestItem()
                item["contest_code"] = f"DSAMONDAY{str(w).zfill(3)}"
                item["contest_num"] = w
                item["category"] = "monday"
                item["title"] = f"DSA Monday Contest Week {w}"
                item["problems"] = problems
                item["timestamp"] = datetime.now(timezone.utc).isoformat()
                self.logger.info(f"[SUCCESS] Extracted DSA Monday Week {w} ({len(problems)} problems)")
                yield item
        except Exception as e:
            self.logger.warning(f"Error parsing DSA Monday Week {w}: {e}")
