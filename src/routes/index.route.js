import UserRouter from "./user.route.js";
import AuthRouter from "./auth.route.js";
import EventRouter from "./event.route.js";

export default (app) => {
  const userRouter = new UserRouter();
  const authRouter = new AuthRouter();
  const eventRouter = new EventRouter();
  app.use('/api/v1/user', userRouter.getRouter());
  app.use('/api/v1/auth', authRouter.getRouter());
  app.use('/api/v1/events', eventRouter.getRouter());
  
}