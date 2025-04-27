import {MongoClient,ServerApiVersion } from "mongodb";
import dotenv from 'dotenv'
dotenv.config();
const uri = process.env.MONGO;

class dbClient{
    constructor()
    { 
        this.client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
    }

    async conectarBD()
    {console.log("conectado a mongo");
        try{
            await this.client.connect("YTNotification"); 
            await this.client.db("admin").command({ ping: 1 });
            this.db = this.client.db("YTNotification"); 
            console.log("conectado a mongo");
        }
        catch(e){
            console.log("Error al conectarse a mongo: "+e);
        }finally {  

        }
    }
}

export default new dbClient();