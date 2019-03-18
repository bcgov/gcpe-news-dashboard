import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GcpeCheckboxComponent } from 'gcpe-shared/public_api';
import { UserPreferencesService } from '../services/userPreferences.service';
import { Ministry } from '../view-models/ministry';
import { AlertsService } from '../services/alerts.service';


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
        });

        this.userPreferencesService.getUserMinistryPreferences(false).subscribe(
            userMinistries => {
                userMinistries.forEach(userMinistry => {
                    this.checkboxes.forEach(c => {
                        if (c.label === userMinistry) {
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
