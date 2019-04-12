import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'lib-gcpe-checkbox',
    templateUrl: './gcpe-checkbox.component.html',
    styleUrls: ['./gcpe-checkbox.component.scss']
})
export class GcpeCheckboxComponent {
    @Input() label: string;
    @Input() key: string;

    constructor() {}

    @Input() isChecked: boolean;

    handleChanged(event: any) {
        this.isChecked = !this.isChecked;
    }
}
