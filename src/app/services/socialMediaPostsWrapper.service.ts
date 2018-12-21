import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { Activity } from '../view-models/activity';
import { Post } from '../view-models/news/post';
import { SocialMediaType } from '../view-models/social-media-type';
import { BASE_PATH } from '../variables';
import { InstagramPost } from '../view-models/instagram-post';
import { FacebookPost } from '../view-models/facebook-post';
import { map, concatAll } from 'rxjs/operators';
import { interval } from 'rxjs';
import { ApiService } from './api.service';
import { SocialMediaPostsService } from './socialMediaPosts.service';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { SocialMediaPostViewModel } from '../view-models/social-media-post';
import { post } from 'selenium-webdriver/http';


@Injectable({
    providedIn: 'root'
})

export class SocialMediaApiService {
    API_URL = '';
    NEWS_API_URL = '';
    instagramList: any[];
    constructor(private httpClient: HttpClient, @Inject(BASE_PATH) baseApiUrl: string, @Inject('BASE_NEWS_API_URL') baseNewsApiUrl: string, private socialMediaService: SocialMediaPostsService) {
        this.API_URL = baseApiUrl;
        this.NEWS_API_URL = baseNewsApiUrl;
    }

    getAllSocialMediaPosts() {
        let list: any[];
        list = [];
        let postList: SocialMediaPostViewModel[];
        postList = [];
        return this.socialMediaService.getAllSocialMediaPosts().pipe(
            map(res => {
                res.map(item => {
                    let post: SocialMediaPostViewModel = new SocialMediaPostViewModel(item);
                    post.mediaType = this.getMediaType(item.url);
                    
                    postList.push(post);
                });
                console.log("result");
                console.log(postList);
                console.log(res);
                
            }
            )).subscribe(
                res => {
                return res;
            }
                    
            );
            
    }

    requestInstagramEmbed(): Observable<InstagramPost[]> {
        let instagramPostList: any;
        let postList: SocialMediaPostViewModel[];
        postList = [];
        this.socialMediaService.getAllSocialMediaPosts().pipe(
            map(res => res.map(item => ({
                id: item.id,
                url: item.url,
                sortOrder: item.sortOrder,
                mediaType: this.getMediaType(item.url),
            })))
        ).subscribe(res => {
            console.info(res);
            this.instagramList = res;
            console.info('list', this.instagramList)
            return res;
        });

        if (this.instagramList.length>0)
        {
            console.log(this.instagramList.length);
            instagramPostList = this.instagramList.filter(item => item.mediaType==='Instagram');
        }
        else{
            console.log("equal 0");
        }
        


        let responses: InstagramPost[];
        responses = [];
        let temp: InstagramPost;
        instagramPostList.forEach((item) => {
            var url = `https://api.instagram.com/oembed?url=${item.url}&omitscript=true`;
            let response = this.httpClient.get<InstagramPost>(url, { responseType: "json" }).subscribe(data => {
                console.log(data);
                temp = data;
            });
            responses.push(temp);
        });

        //let result = forkJoin(responses);
        console.log('response' + responses);
        return of(responses);
    }

    getMediaType(url:string): string{
        let type: string;
        type = '';
        if (url.indexOf('facebook')>=0)
        {
            type = 'Facebook';
        }
        else if (url.indexOf('twitter')>=0)
        {
            type = 'Twitter';
        }
        else if (url.indexOf('instagram') >=0)
        {
            type = 'Instagram';
        }
        return type;
    }


}
