import { Request, Response } from "express";
import { redisClient } from "../../db/redis";
import { CronJob } from "cron";
import { query } from "../../db/postgres";

export async function addClickV3(req: Request, res: Response) {
    try {
        const type  = req?.body?.type;
        if (type === 'click') {
            await redisClient.lPush('click', JSON.stringify({ type, created_at: new Date().toISOString() }));
        }
        return res.status(200).send({ message: 'Click added successfully' });
    } catch (error) {
        console.error('Error adding click:', error);
        return res.status(500).send({ error: 'Internal server error' });
    }
}

//cron for storing the click count in the database
const clickQueue = 'click';
const clickProcessingQueue = 'click:processing';

const clickProcessorJob = new CronJob('*/5 * * * * *', async () => {
    try {
        while (true) {
            const processingItem = await redisClient.brPopLPush(clickQueue, clickProcessingQueue, 1);
            if (!processingItem) {
                break;
            }

            const parsedItem = JSON.parse(processingItem) as { type?: string };
            const eventType = parsedItem?.type || 'click';

            await query(`INSERT INTO events (type) VALUES ($1)`, [eventType]);
            await query(`UPDATE counts SET count = count + 1 WHERE type = $1`, [eventType]);

            await redisClient.lRem(clickProcessingQueue, 1, processingItem);
        }
    } catch (error) {
        console.error('Error processing click queue:', error);
    }
});

clickProcessorJob.start();

// export async function countClickV3(req: Request, res: Response) {
//     try {
//         const { type } = req.body;
//     } catch (error) {
//         console.error('Error counting clicks:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }