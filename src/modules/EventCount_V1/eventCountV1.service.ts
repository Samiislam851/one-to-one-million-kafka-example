import { Request, Response } from "express";
import { query } from "../../db/postgres";

export const addClickV1 = async (req: Request, res : Response) =>{
    try {
        console.log(req.body);
        await query(`INSERT INTO events (type) Values ($1) RETURNING *`,
            [req?.body?.type]
        )
        res.send({
            success: true,
            message: "saved click"
        });
    } catch (error) {
        res.send({
            success: false,
            error: error
        })
    }
}

export const countClickV1 = async (req: Request, res: Response) =>{
    // console.log("🚀 ~ countClickV1 ~ req:", req);
    try {
       const clickCount =  await query(`SELECT COUNT(*) FROM events WHERE type=$1`,['click'])
       res.send({
        success: true,
        clicks: parseInt(clickCount?.rows[0]?.count)
       })
    } catch (error) {
       res.send({
            success: false,
            error: error
        })
    }
}