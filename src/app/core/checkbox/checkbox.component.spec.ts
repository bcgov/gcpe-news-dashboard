import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('AccountSettingsComponent', () => {
    let component: CheckboxComponent;
    let fixture: ComponentFixture<CheckboxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [
            CheckboxComponent
          ],
        })
        .compileComponents();
      }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxComponent);
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
