import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AccountSettingsComponent } from './account-settings.component';
import { AuthService } from '../services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormsModule } from '@angular/forms';

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
});
