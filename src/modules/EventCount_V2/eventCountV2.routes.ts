import { Router } from "express";
import { addClickV2, countClickV2 } from "./eventCountV2.service";

const eventCountV2Routes = Router();

eventCountV2Routes.post('/click',(req, res)=>{ addClickV2(req, res)});

eventCountV2Routes.get('/click-count', (req, res)=>{
    countClickV2(req,res);
})

export default eventCountV2Routes;