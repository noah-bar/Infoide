import {TAlertInput, TClassification} from "../../types.js";
import {OllamaLLM} from "../OllamaLLM.js";
import {InvalidLLMResponseException} from "../../exceptions/InvalidLLMResponseException.js";

export class AlertClassifier extends OllamaLLM {

    public constructor() {
        const context = `
            You are a news alert classification assistant.
            
            I will send you **one alert at a time**. Your task is to analyze it and respond with:
            
            1. A **category**, chosen **strictly** from the following list:
            ["politics", "war", "justice", "natural_disaster", "cybersecurity", "health", "economy", "celebrity", "environment", "science", "crime", "technology", "accident", "other"]
            
            - Pick the **most relevant** category based on the alert’s content.
            - Be consistent across alerts.
            - If no category fits, use "other".
            
            2. An **importance score**, from **1** to **5**, based on the global impact:
            - 1 = very minor
            - 3 = moderate importance
            - 5 = critical or highly newsworthy
            
            ⚠️ Output format (required):
            
            You must return:
            - a valid **category** from the list above,
            - and an **importance** score between 1 and 5.
            
            ✅ Example:
            {
              "category": "justice",
              "importance": 3
            }
            
            ❗ Rules:
            - Do NOT explain or comment.
            - Do NOT add anything else.
            - Return a single valid JSON object only.
        `.trim()

        super(context, "phi3:mini");
    }

    private validateResult(result: unknown): result is {
        category: string;
        importance: number;
    } {
        return (
            typeof result === "object" &&
            result !== null &&
            "category" in result &&
            "importance" in result &&
            typeof (result as any).category === "string" &&
            typeof (result as any).importance === "number"
        );
    }

    private extractJSON(content: string): string {
        const match = content.match(/\{[\s\S]*?\}/);
        if (!match) {
            throw new InvalidLLMResponseException("No valid JSON object found", content);
        }

        return match[0].trim();
    }

    public async classify(alert: TAlertInput): Promise<TClassification> {
        const response = await this.chat(`here's the alert to analyze : ${JSON.stringify(alert)}`)

        let classification: unknown;

        try {
            classification = JSON.parse(this.extractJSON(response)) as TClassification;
        } catch (e) {
            throw new InvalidLLMResponseException("Invalid JSON format", response);
        }

        if (!this.validateResult(classification)) {
            throw new InvalidLLMResponseException("Validation failed (missing or incorrect fields)", response);
        }

        return classification;
    }
}