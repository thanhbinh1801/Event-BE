import { OK, CREATED } from '../handler/success.response.js'

export default class AuthControllers {
  constructor(AuthService){
    this.AuthService = AuthService;
  }

  Register = async (req, res, next) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    await this.AuthService.Register(data);
    new CREATED({
      message: " User register successfully"
    }).send(res)
  }

  Login = async (req, res, next) => {
    const data ={
      email: req.body.email,
      password: req.body.password
    }
    const token = await this.AuthService.Login(data);
    res.cookie('refreshToken',token.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    })
    new OK({
      message: "Login successfully",
      metadata: {accessToken: token.accessToken}
    }).send(res);
  }

  ForgotPassword = async (req, res, next) => {
    const {email} = req.body;
    const passwordResetToken = await this.AuthService.sendTokenByEmail(email)
    new OK({
      message: "Send email successfully",
  }).send(res);
  }

  ResetPassword = async (req, res, next) => {
    const { email, passwordResetToken, newPassword } = req.body;
    const data = {email, passwordResetToken, newPassword };
    const resetedPassword = await this.AuthService.ResetPassword(data);
    new OK({
      message: "Reset password successfully"
    }).send(res);
  }
}
