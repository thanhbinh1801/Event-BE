import { NotFoundError, BadRequestError } from '../handler/error.response.js';
import HashUtils from '../utils/hashUtils.js'

export default class UserService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async getAllUsers(page = 1, limit = 10) {
    const users = await this.UserModel.find({}).skip((page - 1) * limit).limit(limit);
    if (!users || users.length === 0) {
      throw new NotFoundError("No users found");
    }
    const userData = users.map(user => {
      const { password, ...rest } = user.toObject();
      return rest;
    })
    return userData;
  }

  async createUser(data){
    if(!data){
      throw new BadRequestError("user data is required")
    }
    const newUser = new this.UserModel(data);
    const saveUser = await newUser.save();
    return saveUser;
  }

  async updateUser(data) {
    if(!data){
      throw new BadRequestError("user data is required")
    }
    const user = await this.UserModel.find({email: data.email});
    if(!user) {
      throw new NotFoundError("user not found");
    }

    const dataUpdate = {
      name: data.name !== undefined ? data.name : user.name,
      email: data.email !== undefined ? data.email : user.email
    };

    if(data.password !== undefined) {
      dataUpdate.password = await HashUtils.hashPW(data.password);
    } else {
      dataUpdate.password = user.password;
    }

    const updateUser = await this.UserModel.findOneAndUpdate({email}, { $set: dataUpdate}, {new: true});
    return updateUser;
  }

  async deleteUser(id){
    if(!id){
      throw new BadRequestError("userId is required")
    }
    const user = this.UserModel.findByIdAndDelete(id);
    if(!user){
      throw new NotFoundError("user not found");
    }
    return user;
  }

  async getMe(id){
    if(!id){
      throw new BadRequestError("userId is required")
    }
    const user = await this.UserModel.findById(id);
    if(!user){
      throw new NotFoundError("user not found");
    }
    const { password, ...userData} = user.toObject();
    return userData;
  }
}