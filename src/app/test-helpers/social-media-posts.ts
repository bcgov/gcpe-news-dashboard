import { SocialMediaPostExtended } from '../view-models/social-media-post-extended';

export function FakeSocialMediaPostsData(count: number) {
<<<<<<< HEAD
  let list: SocialMediaPostExtended[] = [];
||||||| merged common ancestors
  let list: SocialMediaPost[] = [];
=======
  const list: SocialMediaPost[] = [];
>>>>>>> 97273cfc677f0906315125f6998610897fa5ed6f

<<<<<<< HEAD
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
||||||| merged common ancestors
  for (var i = 0; i < count; i++) {
    var post = { url: 'https://www.instagram.com/p/BrTJd9yBvVy/', sortOrder: i, timestamp: new Date() } as SocialMediaPost;
=======
  for (let i = 0; i < count; i++) {
    const post = { url: 'https://www.instagram.com/p/BrTJd9yBvVy/', sortOrder: i, timestamp: new Date() } as SocialMediaPost;
>>>>>>> 97273cfc677f0906315125f6998610897fa5ed6f
    list.push(post);
  }
  return list;
}
