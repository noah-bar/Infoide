export interface ILLM {
    chat(message: string): Promise<string>;
}
