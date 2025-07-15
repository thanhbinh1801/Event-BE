import { Router } from "express";
import AuthControllers from "../controllers/auth.controller.js";
import AuthService from "../services/auth.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import UserModel from '../models/user.model.js'

export default class AuthRouter {
  constructor(){
    this.router = Router();
    this.AuthService = new AuthService(UserModel);
    this.AuthControllers = new AuthControllers(this.AuthService);
    this.setupRouter();
  }

  setupRouter() {
    this.router.post('/register', asyncHandler(this.AuthControllers.Register));
    this.router.post('/login', asyncHandler(this.AuthControllers.Login));
    this.router.post('/forgot-password', asyncHandler(this.AuthControllers.ForgotPassword));
    this.router.post('/reset-password', asyncHandler(this.AuthControllers.ResetPassword));
  }

  getRouter() {
    return this.router;
  }
}