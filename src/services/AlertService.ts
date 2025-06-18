import { PrismaClient } from "../generated/prisma/index.js";
import { TAlert } from "../types.js";

const prisma = new PrismaClient();

export class AlertService {
    public static async exists(externalId: string): Promise<boolean> {
        const alert = await prisma.alert.findUnique({
            where: { externalId },
            select: { id: true },
        });

        return !!alert;
    }

    public static async create(alert: TAlert): Promise<boolean> {
        if (await this.exists(alert.externalId)) return false;

        await prisma.alert.create({
            data: {
                title: alert.title,
                body: alert.body,
                source: alert.source,
                externalId: alert.externalId,
                category: alert.category,
                importance: alert.importance,
                publishedAt: alert.publishedAt,
            }
        });

        return true;
    }
}
