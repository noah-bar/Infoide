import 'dotenv/config'
import {newsApiMajorFeedFetcher} from "./ingest/NewsApiMajorFeedFetcher.js"
import {AlertClassifier} from "./llms/prompts/AlertClassifier.js";
import {TAlert} from "./types.js";
import {AlertService} from "./services/AlertService.js";

async function main() {
    const alerts = await newsApiMajorFeedFetcher.fetch()
    const alertClassifier = new AlertClassifier()

    for (const alert of alerts) {
        const exists = await AlertService.exists(alert.externalId)
        if (!exists) {
            const classification = await alertClassifier.classify(alert)
            const classifiedAlert = {...alert, ...classification} as TAlert
            await AlertService.create(classifiedAlert)

            console.log(`✅ New alert inserted: "${alert.title}" (${classification.category}, importance: ${classification.importance})`)
        }
    }
}

main().then()