import json
import scrapy

try:
    from codechef_crawler.items import CodeChefProblemItem
except (ImportError, ModuleNotFoundError):
    from ..items import CodeChefProblemItem

class ProblemDetailsSpider(scrapy.Spider):
    name = "problem_details"
    allowed_domains = ["codechef.com"]

    def __init__(self, problem_code=None, *args, **kwargs):
        super(ProblemDetailsSpider, self).__init__(*args, **kwargs)
        self.problem_codes = [problem_code] if problem_code else ["MISSINGNUM7", "REACHWT", "MAXSUM77", "ALTADD"]

    def start_requests(self):
        for code in self.problem_codes:
            url = f"https://www.codechef.com/api/contests/PRACTICE/problems/{code}"
            yield scrapy.Request(
                url=url,
                callback=self.parse_problem,
                meta={"problem_code": code},
                dont_filter=True
            )

    def parse_problem(self, response):
        code = response.meta["problem_code"]
        try:
            data = json.loads(response.text)
            if data.get("status") == "success":
                item = CodeChefProblemItem()
                item["problem_code"] = code
                item["title"] = data.get("problem_name", code)
                item["difficulty"] = data.get("difficulty_rating", "Easy")
                item["accuracy"] = data.get("accuracy", 50.0)
                item["tags"] = data.get("user_tags", [])
                item["problem_url"] = f"https://www.codechef.com/problems/{code}"
                item["submit_url"] = f"https://www.codechef.com/submit/{code}"
                self.logger.info(f"[SUCCESS] Extracted metadata for {code}")
                yield item
        except Exception as e:
            self.logger.warning(f"Error parsing problem {code}: {e}")
