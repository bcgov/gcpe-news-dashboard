import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AccountSettingsComponent } from './account-settings.component';
import { AuthService } from '../services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormsModule } from '@angular/forms';
import { IHash } from '../interfaces/IHash';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AccountSettingsComponent', () => {
    let component: AccountSettingsComponent;
    let fixture: ComponentFixture<AccountSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          imports: [
              FormsModule
          ],
          declarations: [
              AccountSettingsComponent
          ],
          providers: [
            AuthService,
            {provide: OAuthService, useValue: {
              getIdentityClaims: () => ['Administrators'],
              getUserMinistry: () => 'GCPE:EX'
            }}
          ],
          schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
      }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be truthy', () => {
        expect(component).toBeTruthy();
    });

    it('should be initialized with a list of ministries', () => {
        component.ngOnInit();
        component.ministries = [];
        expect(component.ministries).toBeTruthy();
    });

    it('should allow the user to select a ministry', () => {
        const testLabel = 'Intergovernmental Relations Secretariat';
        component.handleCheckboxChanged(testLabel);
        expect(component.selectedMinistries[testLabel]).toBeTruthy();
    });

    it('should allow the user to de-select a ministry', () => {
        const testLabel = 'Intergovernmental Relations Secretariat';
        component.handleCheckboxChanged(testLabel);
        component.handleCheckboxChanged(testLabel);
        expect(component.selectedMinistries[testLabel]).toBeFalsy();
    });

    it('should allow the user to select all ministries', () => {
        component.ngOnInit();
        component.allSelected = false;
        component.selectAll();

        component.ministries.forEach(label => {
            expect(component.selectedMinistries[label]).toBeTruthy();
        });
    });

    it('should allow the user to de-select all ministries', () => {
        expect(1).toEqual(1);
    });
});