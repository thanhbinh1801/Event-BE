import mongoose, { mongo } from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  }
});

const Registration = mongoose.model('Registration', RegistrationSchema);

export default Registration;