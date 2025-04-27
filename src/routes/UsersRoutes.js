import { Router } from "express";
import UsersController from  '../controllers/UsersController.js';

const Users = Router();
 
Users.get("/Users", UsersController.create);

export default Users;