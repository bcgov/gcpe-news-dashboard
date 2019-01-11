import { SocialMediaPost } from './socialMediaPost';

export class SocialMediaPostExtended implements SocialMediaPost {
    id?: string;
    url: string;
    sortOrder?: number;
    timestamp?: Date;
    mediaType: string;
    postType: string;

    constructor(post: SocialMediaPost) {
        this.id = post.id;
        this.url = post.url;
        this.sortOrder = post.sortOrder;
        this.timestamp = post.timestamp;
        this.mediaType = this.getMediaType(post.url);
        this.postType = this.getPostType(post.url);
    }

    getMediaType(url: string): string {
        let type: string;
        type = '';
        if (url.indexOf('facebook') >= 0) {
            type = 'Facebook';
        } else if (url.indexOf('twitter') >= 0 ) {
            type = 'Twitter';
        } else if (url.indexOf('instagram') >= 0) {
            type = 'Instagram';
        }
        return type;
    }

    getPostType(url: string): string {
        let type: string;
        type = '';
        if (url.indexOf('facebook') >= 0) {
            if (url.indexOf('post') >= 0) {
                type = 'fb-post';
            } else if (url.indexOf('video') >= 0) {
                type = 'fb-video';
            }
        }
        return type;
    }


}
