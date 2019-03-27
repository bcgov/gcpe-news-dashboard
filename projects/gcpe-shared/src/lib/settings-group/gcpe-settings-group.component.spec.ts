import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { GcpeSettingsGroupComponent } from './gcpe-settings-group.component';

describe('GcpeSettingsGroupComponent', () => {
    let component: GcpeSettingsGroupComponent;
    let fixture: ComponentFixture<GcpeSettingsGroupComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            GcpeSettingsGroupComponent
          ],
        })
        .compileComponents();
      }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GcpeSettingsGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be truthy', () => {
        expect(component).toBeTruthy();
    });
});
