/* tslint:disable:no-unused-variable */

import { TestBed, waitForAsync } from '@angular/core/testing';
import { PluralizeKindPipe } from './pluralize-kind.pipe';

describe('Pipe: PluralizeKind', () => {
  it('create an instance', () => {
    let pipe = new PluralizeKindPipe();
    expect(pipe).toBeTruthy();
  });

  it('correctly pluralizes release', () => {
    let pipe = new PluralizeKindPipe();
    expect(pipe.transform('release')).toBe('releases');
  });

  it('correctly pluralizes story', () => {
    let pipe = new PluralizeKindPipe();
    expect(pipe.transform('story')).toBe('stories');
  });

  it('correctly pluralizes update', () => {
    let pipe = new PluralizeKindPipe();
    expect(pipe.transform('update')).toBe('updates');
  });
});
