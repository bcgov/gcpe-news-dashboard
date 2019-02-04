import { Ministry } from '../view-models/ministry';

export function FakeMinistryData(count: number) {
  const ministries: Ministry[] = [];

    // tslint:disable-next-line:no-shadowed-variable
    // tslint:disable-next-line:no-var-keyword
    for (var i = 0; i < count; i++) {
        // tslint:disable-next-line:no-shadowed-variable
        const ministry: Ministry = {
           displayName: `Ministry-${i}`
        };
        ministries.push(ministry);
    }
    return ministries;
}
