import { SocialMediaPost } from './socialMediaPost';
import { SocialMediaType } from './social-media-type';

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
    const socialMediaType = SocialMediaType.get(post.url);
    if (socialMediaType) {
      this.mediaType = socialMediaType.name;
      if (this.mediaType === 'Facebook') {
        this.postType = SocialMediaType.getFacebookClass(post.url);
      }
    }
  }
}

