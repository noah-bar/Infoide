export type TAlertInput = {
    title: string
    body: string
    source: string
    externalId: string
    publishedAt: Date
}

export type TClassification = {
    category: string;
    importance: number;
};

export type TAlert = TAlertInput & TClassification