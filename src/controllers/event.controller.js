import { OK, CREATED } from '../handler/success.response.js';


export default class EventControllers {
  constructor(EventService){
    this.EventService = EventService;
  }

  createEvent = async (req, res, next) => {
    const data = req.body;
    const userId = req.user.id;
    const event = await this.EventService.createEvent(data, userId);
    new CREATED({
      message: "create event successfully",
      metadata: event
    }).send(res);
  }

  getAllEvents = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const allEvents = await this.EventService.getAllEvents(page, limit);
    new OK({
      message: "event retrieved successfully",
      metadata: allEvents
    }).send(res);
  }

  getEventById = async (req, res, next) => {
    const eventId = req.params;
    const event = await this.EventService.getEventById(eventId);
    new OK({
      message: "event retrieved successfully",
      metadata: event
    }).send(res);
  }

  updateEvent = async (req, res, next) => {
    const data = req.body;
    const eventId = req.params;
    const updateEvent = await this.EventService.updateEvent(data,eventId);
    new OK({
      message: "update event successfully",
      metadata: updateEvent
    }).send(res);
  }

  deleteEvent = async (req, res, next) => {
    const eventId = req.params;
    const event = await this.EventService.deleteEvent(eventId);
    new OK({
      message: "delete event successfully"
    }).send(res);
  }
  
  lockEvent = async (req, res, next) => {
    const eventId = req.params;
    const event = await this.EventService.lockEvent(eventId);
    new OK({
      message: "lock event successfully",
      metadata: event
    }).send(res);
  }

  unlockEvent = async (req, res, next) => {
    const eventId = req.params;
    const event = await this.EventService.unlockEvent(eventId);
    new OK({
      message: "unlock event successfully",
      metadata: event
    }).send(res);
  }

  registerEvent = async (req, res, next) => {
    const eventId = req.params;
    const user = req.user;
    const event = await this.EventService.registerEvent(eventId, user);
    new CREATED({
      message: "register event successfully",
      metadata: event
    }).send(res);
  }

  cancelEventRegistration = async (req, res, next) => {
    const eventId = req.params;
    const user = req.user;
    const event = await this.EventService.cancelEventRegistration(eventId,user);
    new OK({
      message: "cancel event successfully",
    }).send(res);
  }

  getEventRegistrations = async (req, res, next) => {
    const eventId = req.params;
    const allRegistrations = await this.EventService.getEventRegistrations(eventId);
    new OK({
      message: "registrations retrieved successfully",
      metadata: allRegistrations
    }).send(res);
  }
}
