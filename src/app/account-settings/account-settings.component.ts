import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserPreferencesService } from '../services/userPreferences.service';
import { Ministry } from '../view-models/ministry';
import { AlertsService } from '../services/alerts.service';
import { GcpeCheckboxComponent } from 'projects/gcpe-shared/src/public_api';
import { UtilsService } from '../services/utils.service';
import { SnowplowService } from '../services/snowplow.service';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
    allSelected = false;
    ministries = Array<Ministry>();
    ministriesListMidPoint = 0;

      ministriesToExclude = [
      'E6177CCB-93EC-4AB5-A75C-F795337A39CF',
      '579184C3-DB0C-47D7-BC86-E0BDF78AE4D0',
      '768DBF29-89C6-48D1-901E-017A8A3557A4',
      '321D9C68-96BA-417B-BB89-78C7CE275458',
      '85CCAA2B-2A53-4CF5-9A16-1C7FE7698EA1',
      'bc-coroners-service',
      'child-care',
      'bc-wildfire-service',
      'local-governments-and-rural-communities',
      'community-safety-and-integrated-services',
      'trade'
      ];

    @ViewChildren('checkbox') checkboxes: QueryList<GcpeCheckboxComponent>;

    constructor(
        private route: ActivatedRoute,
        private userPreferencesService: UserPreferencesService,
        private alerts: AlertsService,
        private utils: UtilsService,
        private snowplowService: SnowplowService) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.ministries = data['ministries'];
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
            // intergovernmental secretariat is still in the rest of the list, so we need to remove it
            const indexOfIrs = restOfMinistries.indexOf(irsMinistry);
            restOfMinistries.splice(indexOfIrs, 1);
            // compose the list of ministries and exclude the ones that should not be displayed on the UI
            this.ministries = [officeOfThePremier, irsMinistry].concat(restOfMinistries);
            this.ministries = this.ministries
              .filter(m => {
                return !this.utils.includes(this.ministriesToExclude, m.key);
              });
            }
            this.ministriesListMidPoint = this.ministries.length / 2;
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
        this.snowplowService.trackPageView();
    }

    updateSettings(): void {
        const selectedMinistries = this.checkboxes.filter(c => {
            return c.isChecked === true;
        });

        const ministryKeys = this.ministries.filter(m => {
          return this.utils.includes(selectedMinistries.map(c => c.label), m.displayName);
        });

        this.userPreferencesService
          .addUserMinistryPreference(ministryKeys.map(m => m.key)).subscribe(
            (res) => {
              this.alerts.showSuccess('Settings saved. Click the BC Gov News logo to go back.');
              window.scrollTo(0, 0);
            },
            (err) => {
              this.alerts.showError('Failed to save settings.');
              window.scrollTo(0, 0);
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
