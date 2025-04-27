import UsersModel from "../models/UsersModel.js";

class UsersController{
    constructor(){

    }

    async create(req,res)
    {
        try{
            const data = await UsersModel.create(req.body);
            res.status(201).json(data);
        }catch(e){
            res.status(500).send(e);
        }
    }

}


export default new UsersController();