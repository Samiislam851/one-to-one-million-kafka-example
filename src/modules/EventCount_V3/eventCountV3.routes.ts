import { Router } from "express";
import { addClickV3, countClickV3 } from "./eventCountV3.service";

const eventCountV2Routes = Router();

eventCountV2Routes.post('/click',(req, res)=>{ addClickV3(req, res)});

eventCountV2Routes.get('/click-count', (req, res)=>{
    countClickV3(req,res);
})

export default eventCountV2Routes;