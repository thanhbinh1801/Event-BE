import { Router } from "express";
import EventControllers from "../controllers/event.controller.js";
import EventService from "../services/event.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import validate from "../middlewares/validate.js";
import AuthValidate from "../validators/Auth.validate.js";
import EventModel from "../models/event.model.js";
import RegistrationModel from "../models/registrations.model.js";


export default class EventRouter{
  constructor(){
    this.router = Router();
    this.EventService = new EventService(EventModel, RegistrationModel)
    this.EventControllers = new EventControllers(this.EventService);
    this.AuthValidate = new AuthValidate();
    this.setupRouter();
  }

  setupRouter(){
    this.router.post('/', validate(this.AuthValidate.checkAuth), validate(this.AuthValidate.checkAdmin), asyncHandler(this.EventControllers.createEvent)); //admin //create event
    this.router.get('/', validate(this.AuthValidate.checkAuth), asyncHandler(this.EventControllers.getAllEvents)); //public 
    this.router.get('/:id', validate(this.AuthValidate.checkAuth), asyncHandler(this.EventControllers.getEventById));
    this.router.put('/:id', validate(this.AuthValidate.checkAuth), validate(this.AuthValidate.checkAdmin), asyncHandler(this.EventControllers.updateEvent)); //admin
    this.router.delete('/:id', validate(this.AuthValidate.checkAuth), validate(this.AuthValidate.checkAdmin), asyncHandler(this.EventControllers.deleteEvent)); //admin
    this.router.patch('/:id/lock', validate(this.AuthValidate.checkAuth), validate(this.AuthValidate.checkAdmin), asyncHandler(this.EventControllers.lockEvent));//admin
    this.router.patch('/:id/unlock', validate(this.AuthValidate.checkAuth), validate(this.AuthValidate.checkAdmin), asyncHandler(this.EventControllers.unlockEvent));//admin

    this.router.post('/:id/register', validate(this.AuthValidate.checkAuth), asyncHandler(this.EventControllers.registerEvent)); //user
    this.router.delete('/:id/register', validate(this.AuthValidate.checkAuth), asyncHandler(this.EventControllers.cancelEventRegistration));//user
    this.router.get('/:id/registrations', validate(this.AuthValidate.checkAuth), validate(this.AuthValidate.checkAdmin), asyncHandler(this.EventControllers.getEventRegistrations)); //admin
  }

  getRouter(){
    return this.router;
  }
}