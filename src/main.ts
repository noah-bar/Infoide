import 'dotenv/config'
import {newsApiMajorFeedFetcher} from "./ingest/NewsApiMajorFeedFetcher.js"
import {AlertClassifier} from "./llms/prompts/AlertClassifier.js";
import {TAlert} from "./types.js";
import {AlertService} from "./services/AlertService.js";
import {TweetGenerator} from "./llms/prompts/TweetGenerator.js";

async function main() {
    console.log("🚀 Starting alert ingestion process...")

    const alerts = await newsApiMajorFeedFetcher.fetch()
    console.log(`📥 Fetched ${alerts.length} alerts from NewsAPI.`)

    const alertClassifier = new AlertClassifier()
    const tweetGenerator = new TweetGenerator()

    for (const alert of alerts) {
        const exists = await AlertService.exists(alert.externalId)
        if (exists) continue

        console.log(`🔎 Processing alert: "${alert.title}"`)
        console.log("🧠 Classifying alert...")
        const classification = await alertClassifier.classify(alert)
        const classifiedAlert = {...alert, ...classification} as TAlert

        console.log("🐦 Generating tweet...")
        const tweet = await tweetGenerator.generate(classifiedAlert)

        await AlertService.create({...classifiedAlert, tweet})
        console.log(`✅ New alert inserted: "${alert.title}" (${classification.category}, importance: ${classification.importance})`)
        console.log(tweet + "\n")
    }

    console.log("🎉 Ingestion process completed.")
}

main().then()
