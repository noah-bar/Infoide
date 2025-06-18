import {NewsFetcher, ParserFunction} from "./NewsFetcher.js";
import {TAlertInput} from "../types.js";
import {sources} from "../config/sources.js";
import crypto from 'crypto';

const parser: ParserFunction = (data) => {
    return (data.articles || []).map((article: any): TAlertInput => ({
        title: article.title,
        body: article.description,
        source: article.source?.name,
        externalId: crypto.createHash('md5').update(article.url).digest('hex'),
        publishedAt: new Date(article.publishedAt),
    }));
};

export const newsApiMajorFeedFetcher = new NewsFetcher(
    sources.newsApi.endpoints.majorFeed.url,
    parser,
)