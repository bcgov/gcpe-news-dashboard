import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';

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

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.userMinistry = this.authService.userMinistry;
    }

    handleCheckboxChanged(label: string) {
        if (this.selectedMinistries[label] && this.selectedMinistries[label] === true) {
            this.selectedMinistries[label] = false;
        } else {
            this.selectedMinistries[label] = true;
        }
    }

    updateSettings() {
        // get the selected ministries
        for (const key in this.selectedMinistries) {
            if (this.selectedMinistries[key] === true) {
                console.log(key);
            }
        }
    }

    emitAllSelectionEvent() {
        this.eventsSubject.next(this.allSelected);
    }

    selectAll() {
        this.allSelected = !this.allSelected;
        this.emitAllSelectionEvent();
    }
}


interface IHash {
    [ministry: string]: boolean;
}
