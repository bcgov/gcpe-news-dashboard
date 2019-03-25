import { Activity } from '../view-models/activity';

export function FakeActivitiesData(count: number) {
  const list: Activity[] = [];

  for (let i = 0; i < count; i++) {
    const activity = {
        categories: ['Approved Event or Activity'],
        cityName: 'Victoria, BC',
        comments: '',
        contactMinistryAbbreviation: 'FAKE',
        details: 'This is a fake activity.',
        endDateTime: new Date(),
        id: Number(`${i}1234`),
        isActive: true,
        isAllDay: false,
        isConfirmed: false,
        isIssue: false,
        lastUpdatedDateTime: new Date(),
        leadOrganization: '',
        ministriesSharedWith: [],
        nrDateTime: null,
        otherCity: '',
        potentialDates: '',
        schedule: 'Time/date set by MO.',
        significance: 'testing',
        startDateTime: new Date(),
        strategy: '',
        title: 'Fake activity title',
        venue: '1234 Fake Room, 555 Fake Road, Fake Town BC'
    } as Activity;
    list.push(activity);
  }
  return list;
}
