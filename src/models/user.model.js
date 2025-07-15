import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  passwordResetToken : {
    type : String
  },
  passwordResetExpiration : {
    type : Date
  }
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;