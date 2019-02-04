import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { IHash } from '../interfaces/IHash';
import { ActivatedRoute } from '@angular/router';

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

    constructor(private authService: AuthService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.userMinistry = this.authService.userMinistry;
        this.route.data.subscribe(data => {
            this.ministries = data['ministries'];
            this.ministriesListMidPoint = this.ministries.length / 2;
        });

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
