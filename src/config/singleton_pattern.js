import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connection_string = process.env.MONGO_URL;

class Database {
  constructor(){
    this.Connect();
  }

  async Connect(type ='mongodb') {
    try{
      mongoose.set('debug', true);
      await mongoose.connect(connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("Connect to mongodb successfully!");
    }
    catch{
      console.error("Fail to connect to mongodb!");
    }
  }

  static getInstance(){
    if(!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceDB = Database.getInstance();
export default instanceDB;