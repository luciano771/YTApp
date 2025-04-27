import { decode } from 'html-entities';

export class ResponseYT {
    constructor(item) {
        this.videoId = item.id?.videoId || null;
        this.title = decode(item.snippet?.title) || '';
        this.description = decode(item.snippet?.description) || '';
        this.channelTitle = decode(item.snippet?.channelTitle) || '';
        this.publishedAt = item.snippet?.publishedAt || '';
        this.thumbnailUrl = item.snippet?.thumbnails?.medium?.url || '';
        this.videoUrl = this.videoId ? `https://www.youtube.com/watch?v=${this.videoId}` : '';
    }
}
 