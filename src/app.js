import express from 'express';
import openAIRoutes from './routes/openAIRoutes.js'; 
import AuthRoutes  from './routes/AuthRoutes.js';
import UsersRoutes  from './routes/UsersRoutes.js';
import YTRoutes  from './routes/YTRoutes.js';
import dbClient from './config/dbClient.js';

import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport'; 
import './middlewares/passport-config.js';  
 
import os from 'os'; 
import axios from 'axios'; 

dbClient.conectarBD();

const app = express();
 
app.use(cookieParser());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'src','public'))); 

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});
 
  
app.use('/openai', openAIRoutes) 
app.use('/Auth',AuthRoutes)
app.use('/Users',UsersRoutes)
app.use('/search',YTRoutes)

const interfaces = os.networkInterfaces();

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ' + process.env.PORT);
    Object.entries(interfaces).forEach(([nombre, infos]) => {
        infos.forEach((iface) => {
          if (!iface.internal) {
            console.log(`🌐 IP ${iface.family} detectada en interfaz ${nombre}: ${iface.address}`);
          }
        });
      });
    });
 
    axios.get('https://api.ipify.org?format=json')
    .then(res => console.log("🌐 IP pública usada por Axios:", res.data.ip));
  
 

export default app;
