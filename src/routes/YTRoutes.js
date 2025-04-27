import { Router } from "express";
import YTController from  '../controllers/YTController.js';

const YTRoutes = Router();
 
YTRoutes.post("/search", YTController.getList.bind(YTController));

export default YTRoutes;