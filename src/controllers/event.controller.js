import { OK, CREATED } from '../handler/success.response.js';


export default class EventControllers {
  constructor(UserService){
    this.UserService = UserService;
  }

  createEvent = async (req, res, next) => {
    const data = req.body;
    const event = await this.UserService.createEvent(data);
    new CREATED({
      message: "create event successfully",
      metadata: event
    }).send(res);
  }

  getAllEvents = async (req, res, next) => {
    const allEvents = await this.UserService.getAllEvents();
    new OK({
      message: "event retrieved successfully",
      metadata: allEvents
    }).send(res);
  }

  getEventById = async (req, res, next) => {
    const eventId = req.params;
    const event = await this.UserService.getEventById(eventId);
    new OK({
      message: "event retrieved successfully",
      metadata: event
    }).send(res);
  }

  updateEvent = async (req, res, next) => {
    const data = req.body;
    const eventId = req.params;
    const updateEvent = await this.UserService.updateEvent(data,eventId);
    new OK({
      message: "update event successfully",
      metadata: updateEvent
    }).send(res);
  }

  deleteEvent = async (req, res, next) => {
    const eventId = req.params;
    const event = await this.UserService.deleteEvent(eventId);
    new OK({
      message: "delete event successfully"
    }).send(res);
  }
  
  deleteEvent = async (req, res, next) => {
    const eventId = req.params;
    const event = await this.UserService.getEventById(eventId);
    new OK({
      message: "event retrieved successfully",
      metadata: event
    }).send(res);
  }

  lockEvent = async (req, res, next) => {
    const eventId = req.params;
    const event = await this.UserService.lockEvent(eventId);
    new OK({
      message: "lock event successfully",
      metadata: event
    }).send(res);
  }

  unlockEvent = async (req, res, next) => {
    const eventId = req.params;
    const event = await this.UserService.unlockEvent(eventId);
    new OK({
      message: "unlock event successfully",
      metadata: event
    }).send(res);
  }

  registerEvent = async (req, res, next) => {
    const eventId = req.params;
    const user = req.user;
    const event = await this.UserService.registerEvent(eventId, user);
    new CREATED({
      message: "register event successfully",
      metadata: event
    }).send(res);
  }

  cancelEventRegistration = async (req, res, next) => {
    const eventId = req.params;
    const user = req.user;
    const event = await this.UserService.cancelEventRegistration(eventId,user);
    new OK({
      message: "cancel event successfully",
    }).send(res);
  }

  getEventRegistrations = async (req, res, next) => {
    const eventId = req.params;
    const allRegistrations = await this.UserService.getEventRegistrations(eventId);
    new OK({
      message: "registrations retrieved successfully",
      metadata: allRegistrations
    }).send(res);
  }
}
