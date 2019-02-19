export class SocialMediaType {

  static SocialMediaTypeList: SocialMediaType[] = [
    new SocialMediaType(1, 'Facebook'),
    new SocialMediaType(2, 'Twitter'),
    new SocialMediaType(3, 'Instagram')
  ];

  constructor(private id: number, public name: string) {
  }

  static get(url: string): SocialMediaType {
    return SocialMediaType.SocialMediaTypeList.find(t => url.indexOf(t.name.substring(1)) >= 0); // ignore the capitalized letter
  }

  // for Facebook only, the html tag is different for posts/photos and videos
  static getFacebookClass(url: string): string {
    if (url.indexOf('/post') >= 0 || url.indexOf('/photo') >= 0) {
      return 'fb-post';
    } else if (url.indexOf('/video') >= 0) {
      return 'fb-video';
    }
  }
}
