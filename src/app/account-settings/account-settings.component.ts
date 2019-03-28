import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPreferencesService } from '../services/userPreferences.service';
import { Ministry } from '../view-models/ministry';
import { AlertsService } from '../services/alerts.service';
import { GcpeCheckboxComponent } from 'projects/gcpe-shared/src/public_api';


@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
    allSelected = false;
    ministries = Array<Ministry>();
    ministriesListMidPoint = 0;

    @ViewChildren('checkbox') checkboxes: QueryList<GcpeCheckboxComponent>;

    constructor(
        private route: ActivatedRoute,
        private userPreferencesService: UserPreferencesService,
        private alerts: AlertsService) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.ministries = data['ministries'];
            this.ministriesListMidPoint = this.ministries.length / 2;

            // cache the first two entries
            const officeOfThePremier = this.ministries.find(m => m.key === 'office-of-the-premier');
            const irsMinistry = this.ministries.find(m => m.key === 'intergovernmental-relations-secretariat');
            if (officeOfThePremier !== undefined && irsMinistry !== undefined) {
              // sort the rest of the list by display name, ignoring sort order
              const restOfMinistries = this.ministries.splice(2, this.ministries.length).sort((a, b) => {
                const keyA = a.displayName,
                keyB = b.displayName;
                if (keyA < keyB) { return -1; }
                if (keyA > keyB) { return 1; }
                return 0;
              });
            const indexOfIrs = restOfMinistries.indexOf(irsMinistry);
            restOfMinistries.splice(indexOfIrs, 1);
            this.ministries = [officeOfThePremier, irsMinistry].concat(restOfMinistries);
            this.ministries = this.ministries
              .filter(m => {
                return ![
                  'E6177CCB-93EC-4AB5-A75C-F795337A39CF',
                  '579184C3-DB0C-47D7-BC86-E0BDF78AE4D0',
                  'child-care',
                  'trade'].includes(m.key);
              });
            }
        });

        this.userPreferencesService.getUserMinistryPreferences().subscribe(
            userMinistries => {
                userMinistries.forEach(userMinistry => {
                    this.checkboxes.forEach(c => {
                        if (c.key === userMinistry) {
                            c.isChecked = true;
                        }
                    });
                });

                if (userMinistries.length === this.ministries.length) {
                    this.allSelected = true;
                }
            });
    }

    updateSettings(): void {
        const selectedMinistries = this.checkboxes.filter(c => {
            return c.isChecked === true;
        });

        const ministryKeys = this.ministries.filter(m => {
          return selectedMinistries.map(c => c.label).includes(m.displayName);
        });

        this.userPreferencesService
          .addUserMinistryPreference(ministryKeys.map(m => m.key)).subscribe(
            (res) => {
              this.alerts.showSuccess('Settings saved.');
            },
            (err) => {
              this.alerts.showError('Failed to save settings.');
            });
    }

    selectAll(): void {
        this.allSelected = !this.allSelected;
        this.checkboxes.forEach(c => {
            c.isChecked = this.allSelected;
        });
    }

    changeAllSelected(): void {
        const checkedCheckboxesCount = this.checkboxes.filter(c => c.isChecked === true).length;
        const allCheckboxesChecked = checkedCheckboxesCount === this.ministries.length;
        if (!allCheckboxesChecked) {
            this.allSelected = false;
            return;
        }
        this.allSelected = true;
    }
}
