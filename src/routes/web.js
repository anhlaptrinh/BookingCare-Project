import express from "express";
import {
  getCRUD,
  getHomePage,
  postCRUD,
  displayGetCRUD,
  getEditCRUD,
  putCRUD,
  deleteCRUD,
} from "../controllers/homeController";
import { handleGetAllUsers, handleLogin } from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCRUD);
  router.get("/get-crud", displayGetCRUD);
  router.get("/edit-crud", getEditCRUD);
  router.get("/put-crud", putCRUD);
  router.get("/delete-crud", deleteCRUD);

  router.post("/api/login", handleLogin);
  router.get("/api/get-all-users", handleGetAllUsers);

  return app.use("/", router);
};
export default initWebRoutes;
