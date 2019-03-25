import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { GcpeSettingsPageComponent } from './gcpe-settings-page.component';

describe('GcpeSettingsPageComponent', () => {
    let component: GcpeSettingsPageComponent;
    let fixture: ComponentFixture<GcpeSettingsPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            GcpeSettingsPageComponent
          ],
        })
        .compileComponents();
      }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GcpeSettingsPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be truthy', () => {
        expect(component).toBeTruthy();
    });
});
