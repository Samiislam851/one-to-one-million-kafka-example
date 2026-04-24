import { Request, Response } from "express";
import { query } from "../../db/postgres";

export const addClickV2 = async (req: Request, res: Response) =>{
    console.log("🚀 ~ addClickV2 ~ req:", req)
    if(req?.body?.type !== 'click'){
        return res.status(400).send({
            success: false,
            message: "Invalid request body"
        })
    }
    try {
        console.log("🚀 ~ addClickV2 ~ req:", req.body)
        // not using single query for ease of implementation for now
        // using a single query would save round trips to the database
        // but for now we are using a separate query for each operation 
        // but we are going to use transaction over here to ensure data consistency
        
        await query("BEGIN");
        await query(`INSERT INTO click_counts (count) Values (1) RETURNING *`,[])
        await query(`INSERT INTO events (type) Values ($1) RETURNING *`,[req.body.type || 'click'])
        await query("COMMIT");
        //if adding event fails rollback the click count
        return res.status(200).send({
            success: true,
            message: "Click added successfully"
        })
    } catch (error) {
        await query("ROLLBACK");
        return res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error
        })
    }
}
