import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { IHash } from '../interfaces/IHash';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {
    userMinistry: string;
    allSelected = false;
    selectedMinistries: IHash = {};
    eventsSubject: Subject<boolean> = new Subject<boolean>();
    ministries = [];
    ministriesListMidPoint = 0;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.userMinistry = this.authService.userMinistry;
        this.ministries = [
            'Premier\'s Office',
            'Intergovernmental Relations Secretariat',
            'Advanced Education, Skills and Training',
            'Agriculture',
            'Attorney General',
            'Children and Family Development',
            'Citizen\'s Services',
            'Education',
            'Energy, Mines and Petroleum Resources',
            'Environment and Climate Change Strategy',
            'Finance',
            'Forests, Lands, Natrual Resource Operations and Rural Development',
            'Health',
            'Indigenous Relations and Reconciliation',
            'Jobs, Trade, Technology',
            'Labour',
            'Mental Health Addictions',
            'Municipal Affairs and Housing',
            'Public Safety and Solicitor General',
            'Social Development and Poverty Reduction',
            'Tourism, Arts and Culture',
            'Transportation and Infrastructure'
        ];
        this.ministriesListMidPoint = this.ministries.length / 2;
    }

    handleCheckboxChanged(label: string): void {
        if (this.selectedMinistries[label] && this.selectedMinistries[label] === true) {
            this.selectedMinistries[label] = false;
            return;
        }
        this.selectedMinistries[label] = true;
    }

    updateSettings(): void {
        for (const key in this.selectedMinistries) {
            if (this.selectedMinistries[key] === true) {
                console.log(key);
            }
        }
    }

    emitAllSelectionEvent(): void {
        this.eventsSubject.next(this.allSelected);
    }

    selectAll(): void {
        this.selectedMinistries = {};
        this.allSelected = !this.allSelected;

        if (this.allSelected === false) {
            this.ministries.forEach(label => {
                this.selectedMinistries[label] = false;
            });
            this.emitAllSelectionEvent();
            return;
        }

        this.ministries.forEach(label => {
            this.selectedMinistries[label] = true;
        });
        this.emitAllSelectionEvent();
    }
}
