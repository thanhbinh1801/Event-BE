import { BadRequestError, ConflictRequestError, NotFoundError } from '../handler/error.response.js';

export default class EventService {
  constructor(EventModel, RegistrationsModel) {
    this.EventModel = EventModel;
    this.RegistrationsModel = RegistrationsModel;
  }

  async createEvent(data) {
    if(!data){
      throw new BadRequestError("event data is required");
    }
    const event = await this.EventModel.create(data);
    return event;
  }

  async getAllEvent(){
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const allEvents = await this.EventModel.find().skip( (page-1) * limit).limit(limit);
    if(!allEvents){
      throw new NotFoundError("event not found");
    }
    return allEvents;
  }

  async getEventById(eventId){
    if(!eventId){
      throw new BadRequestError("eventId is required");
    }
    const event = await this.EventModel.findById(eventId);
    if(!event){
      throw new NotFoundError("event not found");
    }
    return event;
  }

  async updateEvent(data, eventId) {
    if (!data || !eventId) {
      throw new BadRequestError("Event data and ID are required");
    }

    const event = await this.EventModel.findById(eventId);
    if (!event) {
      throw new NotFoundError("Event not found");
    } 

    const updateData = {
      title: data.title !== undefined ? data.title : event.title,
      description: data.description !== undefined ? data.description : event.description,
      location: data.location !== undefined ? data.location : event.location,
      image: data.image !== undefined ? data.image : event.image,
      startTime: data.startTime !== undefined ? data.startTime : event.startTime,
      endTime: data.endTime !== undefined ? data.endTime : event.endTime,
      updatedAt: new Date()
    };

    const updatedEvent = await this.EventModel.findByIdAndUpdate(
      eventId,
      { $set: updateData },
      { new: true } 
    );

    return updatedEvent;
  }

  async deleteEvent(eventId){
    if(!eventId){
      throw new BadRequestError("event id is required");
    }
    const deleteEvent = await this.EventModel.findByIdAndDelete(eventId);
    return deleteEvent;
  }

  async lockEvent(eventId){
    if(!eventId){
      throw new BadRequestError("event id is required");
    }
    const isLocked = await this.EventModel.findByIdAndUpdate(eventId, { $set: {isLocked: true}}, {new: true});
    return isLocked;
  }

  async unlockEvent(eventId){
    if(!eventId){
      throw new BadRequestError("event id is required");
    }
    const isUnlocked = await this.EventModel.findByIdAndUpdate(eventId, { $set: {isLocked: false}}, {new: true});
    return isUnlocked;
  }

  async registerEvent(eventId, user){
    if(!eventId || !user){
      throw new BadRequestError("event id and data of user are required");
    }
    const registerEvent = await this.RegistrationsModel.create({eventId: eventId, userId: user.id});
    return registerEvent;
  }

  async cancelEventRegistration(eventId, user){
    if(!eventId || !user){
      throw new BadRequestError("event id and data of user are required");
    }
    const cancelEvent = await this.RegistrationsModel.findOneAndDelete({eventId: eventId, userId: user.id});
    if(!cancelEvent){
      throw new NotFoundError("registration not found")
    }
    return cancelEvent;
  }

  async getEventRegistrations(eventId){
    if(!eventId){
      throw new BadRequestError("event id is required");
    }
    const registration = await this.RegistrationsModel.find({eventId}).populate('userId', 'name email').lean();
    const registrationsData = {
      total: registration.length,
      users: registration.map( u => ({
        name: u.userId.name,
        email: u.userId.email
      }))
    };
    return registrationsData;
  }
}