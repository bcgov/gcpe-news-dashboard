import { SocialMediaPost } from './socialMediaPost';

export class SocialMediaPostViewModel implements SocialMediaPost {
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
    }

}