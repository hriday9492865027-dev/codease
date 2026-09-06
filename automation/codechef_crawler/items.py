import scrapy

class CodeChefProblemItem(scrapy.Item):
    contest_code = scrapy.Field()
    contest_num = scrapy.Field()
    category = scrapy.Field() # 'wednesday' | 'monday'
    division = scrapy.Field() # 'div4' | 'div3' | 'div2' | 'div1' | 'all'
    problem_code = scrapy.Field()
    title = scrapy.Field()
    successful_submissions = scrapy.Field()
    accuracy = scrapy.Field()
    difficulty = scrapy.Field()
    rating = scrapy.Field()
    tags = scrapy.Field()
    problem_url = scrapy.Field()
    submit_url = scrapy.Field()
    is_scorable = scrapy.Field()
    position = scrapy.Field()

class CodeChefContestItem(scrapy.Item):
    contest_code = scrapy.Field()
    contest_num = scrapy.Field()
    category = scrapy.Field()
    title = scrapy.Field()
    problems = scrapy.Field()
    timestamp = scrapy.Field()
