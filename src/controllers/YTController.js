import axios from 'axios';  
import {ResponseYT} from '../models/ResponseYT.js';
import dotenv from 'dotenv'
dotenv.config();

class YTController {
    constructor() {}

    async getList(req, res) {
        try 
        {    
            var includes = req.body.include?.split(',') || [];
            var excludes = req.body.exclude?.split(',') || [];
            var relevanceLanguage = req.body.relevanceLanguage?.split(',') || [];
            var regionCode = req.body.regionCode?.split(',') || [];
            var publishedAfter = req.body.publishedAfter?.split(',') || [];
            const combinaciones = new Set();
            combinaciones.add(includes.map(w => w.trim()).join(' '));
            includes.forEach(w => combinaciones.add(w.trim()));


            const includeStr = Array.from(combinaciones).join('|');
            const excludeStr = excludes.map(w => `-${w.trim()}`).join(' '); 
            
            const q = `${includeStr} ${excludeStr}`.trim();
            const searchTerm = encodeURIComponent(q);
            
            console.log("🧠 q:", q);
            console.log("🌐 URL encoded:", searchTerm);

            const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YT_KEY}&part=snippet&type=video&q=${searchTerm}&maxResults=50&relevanceLanguage=${relevanceLanguage}&regionCode=${regionCode}&publishedAfter=${publishedAfter}`; 
            console.log(url);
            const response = await axios.get(url);
            const items = response.data.items; 
            const titulos = items.map(video => video.snippet.title);
            const descripcion = items.map(video => video.snippet.description); 
            const imageUrl = items.map(imgUrl => imgUrl.snippet.thumbnails.medium.url);
 
            const videos = response.data.items.map(item => new ResponseYT(item));
 
            const videosFiltered = videos.filter(video => {
                const textoCompleto = `${video.title} ${video.description}`.toLowerCase();
              
                return includes.some(p => textoCompleto.includes(p.toLowerCase())) &&
                       !excludes.some(p => textoCompleto.includes(p.toLowerCase()));
              });
              
             
            videosFiltered.forEach(video => { 
              console.log(`
              🎥 ${video.title}
              📺 Canal: ${video.channelTitle}
              📅 Fecha: ${video.publishedAt}
              📝 Descripción: ${video.description}
              🖼️ Imagen: ${video.thumbnailUrl}
              🔗 Link: ${video.videoUrl}
              `);
            });

            console.log(videos.length);

            console.log(videosFiltered.length);

            res.status(200).json(videos);
        } catch (error) {
            console.error("Error al obtener videos de YouTube:",error.stack);
            res.status(500).json({ Error: error ,Include: includes, Exclude: excludes});
        }
    }
}

export default new YTController();
