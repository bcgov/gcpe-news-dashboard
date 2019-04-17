import { Ministry } from '../view-models/ministry';
import { FakeMinistryData } from '../test-helpers/ministries';

export class MockMinistriesProvider {
  private ministries: Ministry[] = FakeMinistryData(29);

  public getMinistries(): Ministry[] {
    return this.ministries;
  }

  public getMinistry(id: string): Ministry {
    return this.ministries.find(m => m.id === id);
  }
}
