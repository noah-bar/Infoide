import {Ollama} from "ollama";
import {ILLM} from "./ILLM.js";

export abstract class OllamaLLM implements ILLM {
    protected readonly llm = new Ollama({ host: process.env.OLLAMA_HOST });
    protected context: string;
    protected model: string;

    protected constructor(context: string, model: string) {
        this.context = context;
        this.model = model
    }

    public async chat(message: string): Promise<string> {
        const res = await this.llm.chat({
            model: this.model,
            messages: [
                {role: 'system', content: this.context},
                {role: 'user', content: message},
            ],
        })

        return res.message.content
    }
}
