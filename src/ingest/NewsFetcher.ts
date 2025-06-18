import { TAlertInput } from "../types.js";

export type ParserFunction = (data: any) => TAlertInput[];

export class NewsFetcher {
    private readonly url: string;
    private readonly parser: ParserFunction;

    constructor(url: string, parser: ParserFunction) {
        this.url = url;
        this.parser = parser;
    }

    async fetch(): Promise<TAlertInput[]> {
        try {
            const res = await fetch(this.url);
            if (!res.ok) {
                throw new Error(`HTTP error ${res.status}`);
            }

            const json = await res.json();
            return this.parser(json);
        } catch (err) {
            console.error("Failed to fetch news:", err);
            return [];
        }
    }
}
