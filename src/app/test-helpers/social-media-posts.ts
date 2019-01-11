import { SocialMediaPost } from '../view-models/socialMediaPost';

export function FakeSocialMediaPostsData(count: number) {
  const list: SocialMediaPost[] = [];

  for (let i = 0; i < count; i++) {
    const post = { url: 'https://www.instagram.com/p/BrTJd9yBvVy/', sortOrder: i, timestamp: new Date() } as SocialMediaPost;
    list.push(post);
  }
  return list;
}
