import { SocialMediaPostExtended } from '../view-models/social-media-post-extended';

export function FakeSocialMediaPostsData(count: number) {
  let list: SocialMediaPostExtended[] = [];

  for (let i = 0; i < count; i++) {
    const post = {
      url: 'https://www.facebook.com/BCProvincialGovernment/posts/2469833496368261',
      sortOrder: i,
      timestamp: new Date(),
      mediaType: 'Facebook'
    } as SocialMediaPostExtended;
    list.push(post);
  }

  for (let i = count; i < count * 2; i++) {
    const post = {
      url: 'https://www.instagram.com/p/BrTJd9yBvVy/',
      sortOrder: i,
      timestamp: new Date(),
      mediaType: 'Instagram'
    } as SocialMediaPostExtended;
    list.push(post);
  }

  for (let i = count * 2; i < count * 3; i++) {
    const post = {
      url: 'https://twitter.com/BCGovNews/status/1082436421598752768',
      sortOrder: i,
      timestamp: new Date(),
      mediaType: 'Twitter'
    } as SocialMediaPostExtended;
    list.push(post);
  }
  return list;
}
