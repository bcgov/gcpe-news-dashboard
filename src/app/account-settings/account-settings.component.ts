import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AccountSettingsService } from '../services/account-settings.service';
import { GcpeCheckboxComponent } from 'gcpe-shared/public_api';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
    allSelected = false;
    ministries = [];
    ministriesListMidPoint = 0;

    @ViewChildren('checkbox') checkboxes: QueryList<GcpeCheckboxComponent>;

    constructor(
        private route: ActivatedRoute,
        private accountSettingsService: AccountSettingsService) { }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.ministries = data['ministries'];
            this.ministriesListMidPoint = this.ministries.length / 2;
        });

        this.accountSettingsService.getUserMinistries().subscribe(
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
        this.accountSettingsService.saveUserMinistrySelections(selectedMinistries.map(m => m.label)).subscribe();
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
