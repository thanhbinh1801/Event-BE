import { BadRequestError, NotFoundError } from '../handler/error.response.js';
import HashUtil from '../utils/hashUtils.js';
import AuthUtil from '../utils/authUtils.js';
import crypto from 'crypto';
import mailService from '../utils/mail.service.js';
import dotenv from 'dotenv';
dotenv.config();

export default class AuthService {
  constructor(UserModel) {
    this.UserModel = UserModel;
  }

  async Register(data) {
    const userExist = await this.UserModel.findOne({email: data.email});
    if(userExist){
      throw new BadRequestError("Email already exist")
    }
    const hashedPW = await HashUtil.hashPW(data.password);
    const newUser = new this.UserModel({
      name: data.name,
      email: data.email,
      password: hashedPW
    });
    await newUser.save();
    const {password, ...userData} = newUser.toObject();
    return userData;
  }

  async Login(data){
    const user = await this.UserModel.findOne({email: data.email});
    if(!user){
      throw new NotFoundError("User not found");
    }
    const isMatch = await HashUtil.verifyPW(data.password, user.password);
    if (!isMatch) {
      throw new BadRequestError("Invalid password");
    }

    const accessToken = AuthUtil.genAccessToken(user);
    const refreshToken = AuthUtil.genRefreshToken(user);
    return {accessToken, refreshToken};
  }

  async sendTokenByEmail(email) {
    const userEmail = await this.UserModel.findOne({email: email});
    if(!userEmail){
      throw new NotFoundError("Email not found");
    }
    const token = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    const passwordResetExpiration = new Date(Date.now() + 10*60*1000);
    const updateStatus = await this.UserModel.updateOne({email: email},
        { $set: {passwordResetToken, passwordResetExpiration}}
    );
    if (updateStatus.modifiedCount == 1) {
      mailService.sendEmail({
        emailFrom: process.env.SMTP_USER,
        emailTo: email,
        emailSubject: 'Reset password',
        emailText: 'Here is your reset password token: ' + token
      });
      return passwordResetToken;
    }
    else{
      throw new BadRequestError("Fail to send email");
    }
  }

  async resetPassword(data){
    const hashedToken = crypto.createHash('sha256').update(data.passwordResetToken).digest('hex');
    const user = await this.UserModel.findOne({
      email: data.email,
      passwordResetToken: hashedToken,
      passwordResetExpiration: {$gt: Date.now() }
    });
    if(!user){
      throw new NotFoundError("Email or passwordResetToken not found");
    }
    const hashedNewPassword = await HashUtil.hashPW(data.newPassword);
    user.password = hashedNewPassword;
    user.passwordResetToken = null;
    user.passwordResetExpiration = null
    await user.save();
    return true;
  }
}