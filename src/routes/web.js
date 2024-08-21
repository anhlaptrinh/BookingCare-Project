import express from "express";
import { getCRUD, getHomePage, postCRUD,displayGetCRUD,getEditCRUD,putCRUD,deleteCRUD } from "../controllers/homeController";
import { handleLogin } from "../controllers/userController";


let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCRUD);
  router.get("/get-crud", displayGetCRUD);
  router.get("/edit-crud", getEditCRUD);
  router.get("/put-crud", putCRUD);
  router.get("/delete-crud", deleteCRUD);

  router.post('/api/login',handleLogin);

  //rest api
  router.get("/anhdev", (req, res) => {
    return res.send("Hello Anh");
  });
  return app.use("/", router);
};
export default initWebRoutes;
