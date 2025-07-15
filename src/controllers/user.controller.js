import { OK, CREATED } from '../handler/success.response.js';

export default class UserController {
  constructor(UserService){
    this.UserService = UserService;
  }

  getAllUsers = async ( req, res, next ) => {
    const users = await this.UserService.getAllUsers();
    return new OK ({
      message: "Users retrieved successfully",
      metadata: users
    }).send(res);
  }

  createUser = async (req, res, next) => {
    const data = req.body;
    const newUser = await this.UserService.createUser(data);
    new CREATED({
      message: "create user successfully",
      metadata: newUser
    }).send(res);
  }

  updateUser = async (req, res, next) => {
    const data = req.body;
    const updateUser = await this.UserService.updateUser(data);
    new OK({
      message: "update user successfully",
      metadata: updateUser
    }).send(res);
  }

  deleteUser = async (req, res, next) => {
    const id = req.params;
    const deleteUser = await this.UserService.deleteUser(id);
    new OK({
      message: "delete user successfully"
    }).send(res);
  }

  getMe = async  (req, res, next) => {
    const id = req.params;
    const userData = await this.UserService.getMe(id);
    new OK({
      message: "Get user info successfully",
      metadata: userData
    }).send(res);
  }
}
