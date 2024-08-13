import express from 'express';
import { getHomePage } from '../controllers/homeController';

let router=express.Router();

let initWebRoutes = (app) => {
    router.get("/", getHomePage);

    //rest api
    router.get("/anhdev", (req,res)=>{
        return res.send("Hello Anh")
    });
    return app.use("/", router);
}
export default initWebRoutes