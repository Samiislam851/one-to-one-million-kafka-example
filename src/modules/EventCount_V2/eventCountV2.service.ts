import { Request, Response } from "express";

export const addClickV2 = async (req: Request, res: Response) =>{
    console.log("🚀 ~ addClickV2 ~ req:", req)

    try {
        // validate the request body
        //count up the click in a separate table and add the click event to the event table
        //if adding event fails rollback the click count
    } catch (error) {
        res.send({
            success: false,
            error: error
        })
    }

}