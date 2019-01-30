import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, OnDestroy {
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
