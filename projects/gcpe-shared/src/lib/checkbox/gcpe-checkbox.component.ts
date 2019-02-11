import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'lib-gcpe-checkbox',
    templateUrl: './gcpe-checkbox.component.html',
    styleUrls: ['./gcpe-checkbox.component.scss']
})
export class GcpeCheckboxComponent implements OnInit, OnDestroy {

    private eventsSubscription: any;

    @Input() label: string;
    @Output() checkboxChanged = new EventEmitter();
    @Input() events: Observable<boolean>;

    constructor() {
        this.events = new Observable<boolean>();
    }

    isChecked: boolean;

    ngOnInit() {
        this.eventsSubscription = this.events.subscribe((checkAll) => {
            if (checkAll === true) {
                this.isChecked = true;
            } else {
                this.isChecked = false;
            }
        });
    }

    ngOnDestroy() {
        this.eventsSubscription.unsubscribe();
    }

    handleChanged(event: any) {
        this.checkboxChanged.emit(this.label);
    }
}
