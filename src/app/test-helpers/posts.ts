import { Post } from '../view-models/post';

export function FakePostsData(count: number) {
  const list: Post[] = [];

  for (let i = 0; i < count; i++) {
    const post = {
        assetUrl: '',
        isCommitted: true,
        key: `2019MIN0000${i}-00000${i}`,
        kind: 'Release',
        leadMinistryKey: 'fake-ministry',
        leadMinistryName: 'FakeMinistry',
        location: '',
        ministryKeys: [`2019MIN0000${i}-00000${i}`],
        publishDateTime: new Date(),
        reference: `NEWS-${i}${i}${i}${i}${i}`,
        summary: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
        timestamp: new Date()
    } as Post;
    list.push(post);
  }
  return list;
}
