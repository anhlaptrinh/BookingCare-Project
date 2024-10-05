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
import {
  handleCreateNewUser,
  handleDeleteNewUser,
  handleEditNewUser,
  handleGetAllUsers,
  handleLogin,
} from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", getHomePage);
  router.get("/crud", getCRUD);
  router.post("/post-crud", postCRUD);
  router.get("/get-crud", displayGetCRUD);
  router.get("/edit-crud", getEditCRUD);
  router.get("/put-crud", putCRUD);
  router.get("/delete-crud", deleteCRUD);

  // api
  router.post("/api/login", handleLogin);
  router.get("/api/get-all-users", handleGetAllUsers);
  router.post("/api/create-new-users", handleCreateNewUser);
  router.put("/api/edit-users", handleEditNewUser);
  router.delete("/api/delete-users", handleDeleteNewUser);

  return app.use("/", router);
};
export default initWebRoutes;
