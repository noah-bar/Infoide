export class InvalidLLMResponseException extends Error {
    public readonly response: string;

    constructor(message: string, response: string) {
        super(message);
        this.name = "InvalidLLMResponseError";
        this.response = response;
    }
}
