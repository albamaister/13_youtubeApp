import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyBdbyMA9a30tA-BokioFA-Mn_1PjUWNrCU';
  private playlist = 'UUsdZtEZd5UREPRnrhcGt0kg';
  private nextPageToken = '';

  constructor(public http: HttpClient) { }

  getVideos() {
    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams();

    params = params.set('part', 'snippet');
    params = params.set('maxResults', '10');
    params = params.set('playlistId', this.playlist);
    params = params.set('key', this.apiKey);

    if (this.nextPageToken) {
      params = params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, {params}).pipe(map((res: any) => {
      console.log(res);
      this.nextPageToken = res.nextPageToken;
      let videos: any [] = [];
      for (let video of res.items) {
        let snippet = video.snippet;
        videos.push(snippet);
      }
      return videos;
    }));
  }
}
