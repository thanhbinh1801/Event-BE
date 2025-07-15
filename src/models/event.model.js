import mongoose, { mongo } from "mongoose";

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  isLocked: {
    type: Boolean,
    required: true
  },
  createdBy: {
    type: String,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default : Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
});

const Event = mongoose.model('Event', EventSchema);
export default Event;