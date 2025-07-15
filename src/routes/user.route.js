import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import UserService from "../services/user.sevice.js";
import UserModel from "../models/user.model.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import AuthValidate from "../validators/Auth.validate.js"

export default class UserRouter {
  constructor() {
    this.router = Router();
    this.AuthValidate = new AuthValidate();
    this.UserService = new UserService(UserModel);
    this.UserController= new UserController(this.UserService);
    this.setupRouter();
  }

  setupRouter() {
    this.router.post("/", validate(this.AuthValidate.checkAuth), validate(this.AuthValidate.checkAdmin), asyncHandler(this.UserController.createUser)); //admin
    this.router.get("/", validate(this.AuthValidate.checkAuth), validate(this.AuthValidate.checkAdmin), asyncHandler(this.UserController.getAllUsers)); //admin 
    this.router.get("/me", validate(this.AuthValidate.checkAuth), asyncHandler(this.UserController.getMe));
    this.router.put("/me", validate(this.AuthValidate.checkAuth), asyncHandler(this.UserController.updateUser));// update infor
    this.router.delete("/:id", validate(this.AuthValidate.checkAuth), validate(this.AuthValidate.checkAdmin), asyncHandler(this.UserController.deleteUser));//admin
  }
  getRouter(){
    return this.router;
  }
}