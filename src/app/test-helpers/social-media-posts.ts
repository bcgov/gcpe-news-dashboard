import { SocialMediaPost } from '../view-models/socialMediaPost';

export function FakeSocialMediaPostsData(count: number) {
    let list: SocialMediaPost[] = [];

    for (var i = 0; i < count; i++) {
        var post = { url: 'https://www.instagram.com/p/BrTJd9yBvVy/', sortOrder: i, timestamp: new Date() } as SocialMediaPost;
        list.push(post);
    }

    return list;
}
