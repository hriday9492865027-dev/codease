import re
import json
import scrapy
from datetime import datetime, timezone

try:
    from codechef_crawler.items import CodeChefContestItem
except (ImportError, ModuleNotFoundError):
    from ..items import CodeChefContestItem

class StartersSpider(scrapy.Spider):
    name = "starters"
    allowed_domains = ["codechef.com", "www.codechef.com"]

    def __init__(self, contest=None, start=None, end=None, *args, **kwargs):
        super().__init__(*args, **kwargs)
        c_arg = contest or getattr(self, "contest", None)
        s_arg = start or getattr(self, "start", None)
        e_arg = end or getattr(self, "end", None)

        if c_arg is not None:
            self.contest_range = [int(c_arg)]
        else:
            start_num = int(s_arg) if s_arg is not None else 1
            end_num = int(e_arg) if e_arg is not None else 254
            self.contest_range = list(range(end_num, start_num - 1, -1))

        self.start_urls = [
            f"https://www.codechef.com/api/contests/START{c}D" for c in self.contest_range
        ]

    def parse(self, response):
        match = re.search(r"START(\d+)", response.url)
        if not match:
            return
        c = int(match.group(1))

        all_problems = {}
        try:
            data = json.loads(response.text)
            if data.get("status") == "success" and data.get("problems"):
                for code, prob in data["problems"].items():
                    all_problems[code] = {
                        "code": prob.get("code") or code,
                        "title": prob.get("name") or code,
                        "subs": int(prob.get("successful_submissions") or 0),
                        "acc": float(prob.get("accuracy") or 50.0),
                        "is_scorable": prob.get("category_name") == "main"
                    }
        except Exception as e:
            self.logger.warning(f"Error parsing contest START{c}: {e}")

        # Suffix chain for other divisions (C, B, A, general)
        suffixes = ["C", "B", "A", ""]
        next_suffix = suffixes[0]
        next_url = f"https://www.codechef.com/api/contests/START{c}{next_suffix}"
        yield scrapy.Request(
            url=next_url,
            callback=self.parse_division_chain,
            meta={
                "contest_num": c,
                "suffixes": suffixes[1:],
                "all_problems": all_problems
            },
            dont_filter=True
        )

    def parse_division_chain(self, response):
        c = response.meta["contest_num"]
        suffixes = response.meta["suffixes"]
        all_problems = response.meta["all_problems"]

        try:
            data = json.loads(response.text)
            if data.get("status") == "success" and data.get("problems"):
                for code, prob in data["problems"].items():
                    if code not in all_problems:
                        all_problems[code] = {
                            "code": prob.get("code") or code,
                            "title": prob.get("name") or code,
                            "subs": int(prob.get("successful_submissions") or 0),
                            "acc": float(prob.get("accuracy") or 50.0),
                            "is_scorable": prob.get("category_name") == "main"
                        }
        except Exception as e:
            self.logger.warning(f"Error parsing division for START{c}: {e}")

        if suffixes:
            next_suffix = suffixes[0]
            next_url = f"https://www.codechef.com/api/contests/START{c}{next_suffix}"
            yield scrapy.Request(
                url=next_url,
                callback=self.parse_division_chain,
                meta={
                    "contest_num": c,
                    "suffixes": suffixes[1:],
                    "all_problems": all_problems
                },
                dont_filter=True
            )
        else:
            if all_problems:
                item = CodeChefContestItem()
                item["contest_code"] = f"START{c}"
                item["contest_num"] = c
                item["category"] = "wednesday"
                item["title"] = f"CodeChef Starters {c}"
                item["problems"] = list(all_problems.values())
                item["timestamp"] = datetime.now(timezone.utc).isoformat()
                self.logger.info(f"[SUCCESS] Extracted START{c} ({len(all_problems)} unique problems)")
                yield item
