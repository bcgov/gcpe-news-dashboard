import { SocialMediaType } from '../view-models/social-media-type';

export function FakeSocialMediaTypesData() {
  let list: SocialMediaType[] = [];

  return list = [
    {
        id: 1,
        name: 'Facebook'
    },
    {
        id: 2,
        name: 'Twitter'
    },
    {
      id: 3,
      name: 'Instagram'
    }
  ];
}
