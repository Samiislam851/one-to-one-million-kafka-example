import { Router } from "express";
import { addClickV1, countClickV1 } from "./eventCountV1.service";

export const eventCountV1Router = Router();

eventCountV1Router.post('/click', (req, res) => {
   addClickV1(req, res);
});

eventCountV1Router.get('/click-count', (req, res)=>{
     countClickV1(req,res);
})