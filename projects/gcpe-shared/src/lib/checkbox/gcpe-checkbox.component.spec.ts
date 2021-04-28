import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GcpeCheckboxComponent } from './gcpe-checkbox.component';

describe('AccountSettingsComponent', () => {
    let component: GcpeCheckboxComponent;
    let fixture: ComponentFixture<GcpeCheckboxComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [
            GcpeCheckboxComponent
          ],
        })
        .compileComponents();
      }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GcpeCheckboxComponent);
        component = fixture.componentInstance;
        component.label = 'Test Label';
        fixture.detectChanges();
    });

    it('should be truthy', () => {
        expect(component).toBeTruthy();
    });

    it('should have a label', () => {
        expect(component.label).toBeTruthy();
    });
});
